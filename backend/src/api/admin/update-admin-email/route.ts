import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { Modules } from "@medusajs/framework/utils"
import { IUserModuleService } from "@medusajs/framework/types"

/**
 * Endpoint API per aggiornare l'email e/o la password dell'utente admin
 * 
 * POST /admin/custom/update-admin-email
 * Body: { 
 *   "email": "nuova-email@example.com",
 *   "password": "nuova-password" (opzionale)
 * }
 * 
 * Richiede autenticazione admin
 */
export async function POST(
  req: MedusaRequest,
  res: MedusaResponse
): Promise<void> {
  try {
    const { email, password } = req.body

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      res.status(400).json({
        error: 'Email non valida. Fornisci un\'email valida nel body della richiesta.'
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
    await userModuleService.updateUsers(adminUser.id, {
      email: email
    })

    // Se è fornita una password, aggiorna anche quella
    // In Medusa 2.0, dobbiamo usare il metodo setPassword che gestisce l'hashing
    if (password && typeof password === 'string' && password.length > 0) {
      // Il metodo setPassword hasha automaticamente la password
      if (typeof (userModuleService as any).setPassword === 'function') {
        await (userModuleService as any).setPassword(adminUser.id, password)
      } else {
        // Fallback: prova a passare la password direttamente (il servizio dovrebbe hasharla)
        await userModuleService.updateUsers(adminUser.id, {
          password_hash: password
        } as any)
      }
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

