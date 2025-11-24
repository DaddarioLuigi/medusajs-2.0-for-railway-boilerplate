import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { Modules } from "@medusajs/framework/utils"
import { IUserModuleService } from "@medusajs/framework/types"
import * as bcrypt from 'bcrypt'

/**
 * Endpoint pubblico temporaneo per correggere la password admin
 * 
 * POST /fix-password
 * Body: { 
 *   "password": "nuova-password",
 *   "secret": "chiave-segreta" (richiesta per sicurezza)
 * }
 * 
 * NOTA: Questo endpoint è temporaneo e dovrebbe essere rimosso dopo l'uso.
 */
interface FixPasswordBody {
  password?: string
  secret?: string
}

export async function POST(
  req: MedusaRequest<FixPasswordBody>,
  res: MedusaResponse
): Promise<void> {
  try {
    const { password, secret } = req.body || {}

    // Verifica la chiave segreta
    const requiredSecret = process.env.ADMIN_UPDATE_SECRET || "temporary-secret-key-change-me"
    if (!secret || secret !== requiredSecret) {
      res.status(401).json({
        error: 'Chiave segreta non valida'
      })
      return
    }

    if (!password || typeof password !== 'string' || password.length < 8) {
      res.status(400).json({
        error: 'Password non valida. Deve essere una stringa di almeno 8 caratteri.'
      })
      return
    }

    const userModuleService: IUserModuleService = req.scope.resolve(Modules.USER)

    // Lista tutti gli utenti
    const users = await userModuleService.listUsers()
    
    if (users.length === 0) {
      res.status(404).json({
        error: 'Nessun utente trovato nel sistema'
      })
      return
    }

    // Trova il primo utente (di solito è l'admin iniziale)
    const adminUser = users[0]
    
    // Hasha la password con bcrypt
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(password, saltRounds)
    
    // Aggiorna la password hashata
    // Prova diversi modi per assicurarsi che venga salvata
    await userModuleService.updateUsers([{
      id: adminUser.id,
      password_hash: hashedPassword
    }] as any)

    // Verifica che sia stata salvata recuperando l'utente aggiornato
    const updatedUser = await userModuleService.retrieveUser(adminUser.id)
    const updatedUserAny = updatedUser as any
    const passwordWasSaved = !!updatedUserAny.password_hash

    res.json({
      success: true,
      message: `Password aggiornata correttamente per l'utente ${adminUser.email}`,
      email: adminUser.email,
      password_saved: passwordWasSaved,
      password_hash_preview: passwordWasSaved ? updatedUserAny.password_hash.substring(0, 30) + '...' : null
    })
  } catch (error) {
    res.status(500).json({
      error: 'Errore durante l\'aggiornamento della password',
      message: error instanceof Error ? error.message : 'Errore sconosciuto'
    })
  }
}

