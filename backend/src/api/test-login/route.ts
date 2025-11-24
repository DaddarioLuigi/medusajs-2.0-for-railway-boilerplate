import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { Modules } from "@medusajs/framework/utils"
import { IUserModuleService } from "@medusajs/framework/types"
import * as bcrypt from 'bcrypt'

/**
 * Endpoint per testare il login con email e password
 * 
 * POST /test-login
 * Body: { 
 *   "email": "email@example.com",
 *   "password": "password",
 *   "secret": "chiave-segreta"
 * }
 */
interface TestLoginBody {
  email?: string
  password?: string
  secret?: string
}

export async function POST(
  req: MedusaRequest<TestLoginBody>,
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

    if (!email || !password) {
      res.status(400).json({
        error: 'Email e password sono richieste'
      })
      return
    }

    const userModuleService: IUserModuleService = req.scope.resolve(Modules.USER)

    // Cerca l'utente per email
    const users = await userModuleService.listUsers()
    const user = users.find(u => u.email === email)
    
    if (!user) {
      res.json({
        success: false,
        message: 'Utente non trovato',
        email
      })
      return
    }

    // Recupera l'utente completo
    const fullUser = await userModuleService.retrieveUser(user.id)
    const userAny = fullUser as any

    // Verifica se ha una password hash
    const hasPasswordHash = !!userAny.password_hash

    if (!hasPasswordHash) {
      res.json({
        success: false,
        message: 'Utente trovato ma non ha password hash nel database',
        email: user.email,
        user_id: user.id,
        has_password_hash: false
      })
      return
    }

    // Prova a verificare la password
    try {
      const passwordMatches = await bcrypt.compare(password, userAny.password_hash)
      
      res.json({
        success: passwordMatches,
        message: passwordMatches 
          ? 'Password corretta! Il login dovrebbe funzionare.' 
          : 'Password non corretta.',
        email: user.email,
        user_id: user.id,
        has_password_hash: true,
        password_matches: passwordMatches
      })
    } catch (compareError) {
      res.json({
        success: false,
        message: 'Errore durante la verifica della password',
        error: compareError instanceof Error ? compareError.message : 'Errore sconosciuto',
        email: user.email,
        user_id: user.id,
        has_password_hash: true
      })
    }
  } catch (error) {
    res.status(500).json({
      error: 'Errore durante il test del login',
      message: error instanceof Error ? error.message : 'Errore sconosciuto'
    })
  }
}

