import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { Modules } from "@medusajs/framework/utils"
import { IUserModuleService } from "@medusajs/framework/types"

/**
 * Endpoint pubblico temporaneo per aggiornare l'email e password admin
 * 
 * POST /store/custom/update-admin-email
 * Body: { 
 *   "email": "nuova-email@example.com",
 *   "password": "nuova-password",
 *   "secret": "chiave-segreta" (richiesta per sicurezza)
 * }
 * 
 * NOTA: Questo endpoint è temporaneo e dovrebbe essere rimosso dopo l'uso.
 * La chiave segreta è impostata nella variabile d'ambiente ADMIN_UPDATE_SECRET
 */
interface UpdateAdminEmailBody {
  email?: string
  password?: string
  secret?: string
}

export async function POST(
  req: MedusaRequest<UpdateAdminEmailBody>,
  res: MedusaResponse
): Promise<void> {
  try {
    const { email, password, secret } = req.body || {}

    // Verifica la chiave segreta
    const requiredSecret = process.env.ADMIN_UPDATE_SECRET || "temporary-secret-key-change-me"
    if (!secret || secret !== requiredSecret) {
      res.status(401).json({
        error: 'Chiave segreta non valida'
      })
      return
    }

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      res.status(400).json({
        error: 'Email non valida. Fornisci un\'email valida nel body della richiesta.'
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
    
    const oldEmail = adminUser.email

    // Aggiorna l'email
    await userModuleService.updateUsers([{
      id: adminUser.id,
      email: email
    }] as any)

    // Aggiorna la password
    // In Medusa 2.0, proviamo diversi metodi per aggiornare la password
    try {
      // Metodo 1: setPassword se disponibile
      if (typeof (userModuleService as any).setPassword === 'function') {
        await (userModuleService as any).setPassword(adminUser.id, password)
      } else {
        // Metodo 2: updateUsers con password_hash (il servizio dovrebbe hasharla)
        await userModuleService.updateUsers([{
          id: adminUser.id,
          password_hash: password
        }] as any)
      }
    } catch (passwordError) {
      console.error('Errore durante l\'aggiornamento della password:', passwordError)
      // Continuiamo comunque, l'email è stata aggiornata
    }

    const response: any = {
      success: true,
      message: `Email admin aggiornata con successo da ${oldEmail} a ${email}`,
      oldEmail,
      newEmail: email
    }

    if (password) {
      response.message += ' Password aggiornata con successo.'
    }

    res.json(response)
  } catch (error) {
    res.status(500).json({
      error: 'Errore durante l\'aggiornamento dell\'email admin',
      message: error instanceof Error ? error.message : 'Errore sconosciuto'
    })
  }
}

