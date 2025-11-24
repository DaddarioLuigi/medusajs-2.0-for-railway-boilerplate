import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { Modules } from "@medusajs/framework/utils"
import { IUserModuleService } from "@medusajs/framework/types"
import * as bcrypt from 'bcrypt'

/**
 * Endpoint per aggiornare la password direttamente nel database usando query SQL
 * 
 * POST /fix-password-direct
 * Body: { 
 *   "password": "nuova-password",
 *   "secret": "chiave-segreta"
 * }
 */
interface FixPasswordDirectBody {
  password?: string
  secret?: string
}

export async function POST(
  req: MedusaRequest<FixPasswordDirectBody>,
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

    const adminUser = users[0]
    
    // Hasha la password con bcrypt
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(password, saltRounds)
    
    // Prova a usare updateUsers con tutti i campi insieme
    // Includiamo anche altri campi per assicurarci che l'update venga processato
    try {
      await userModuleService.updateUsers([{
        id: adminUser.id,
        email: adminUser.email,
        password_hash: hashedPassword,
        updated_at: new Date()
      }] as any)

      // Aspetta un momento e verifica
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // Recupera l'utente aggiornato per verificare
      const updatedUser = await userModuleService.retrieveUser(adminUser.id)
      const updatedUserAny = updatedUser as any
      const passwordWasSaved = !!updatedUserAny.password_hash

      res.json({
        success: true,
        message: `Password aggiornata per l'utente ${adminUser.email}`,
        email: adminUser.email,
        user_id: adminUser.id,
        password_saved: passwordWasSaved,
        method: 'updateUsers',
        note: passwordWasSaved 
          ? 'Password hash salvata correttamente!' 
          : 'Password hash potrebbe non essere esposta per sicurezza. Prova a fare il login.'
      })
    } catch (updateError) {
      res.status(500).json({
        error: 'Errore durante l\'aggiornamento della password',
        message: updateError instanceof Error ? updateError.message : 'Errore sconosciuto'
      })
    }
  } catch (error) {
    res.status(500).json({
      error: 'Errore durante l\'aggiornamento della password',
      message: error instanceof Error ? error.message : 'Errore sconosciuto'
    })
  }
}
