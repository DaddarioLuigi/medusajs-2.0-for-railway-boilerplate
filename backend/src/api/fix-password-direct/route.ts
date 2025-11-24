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
    
    // Prova a usare il database manager direttamente
    try {
      // Accedi al database manager tramite il container
      const dbManager = req.scope.resolve('manager')
      
      // Esegui query SQL diretta per aggiornare la password
      await dbManager.query(
        `UPDATE "user" SET "password_hash" = $1, "updated_at" = NOW() WHERE "id" = $2`,
        [hashedPassword, adminUser.id]
      )

      // Verifica che sia stata salvata
      const result = await dbManager.query(
        `SELECT "id", "email", "password_hash" IS NOT NULL as has_password FROM "user" WHERE "id" = $1`,
        [adminUser.id]
      )

      const passwordWasSaved = result[0]?.has_password || false

      res.json({
        success: true,
        message: `Password aggiornata direttamente nel database per l'utente ${adminUser.email}`,
        email: adminUser.email,
        user_id: adminUser.id,
        password_saved: passwordWasSaved,
        method: 'direct_sql_update'
      })
    } catch (dbError) {
      // Se il database manager non è disponibile, prova un altro approccio
      console.error('Errore con database manager:', dbError)
      
      // Prova a usare updateUsers con tutti i campi possibili
      try {
        await userModuleService.updateUsers([{
          id: adminUser.id,
          email: adminUser.email,
          password_hash: hashedPassword
        }] as any)

        res.json({
          success: true,
          message: `Password aggiornata (metodo alternativo) per l'utente ${adminUser.email}`,
          email: adminUser.email,
          user_id: adminUser.id,
          password_saved: 'unknown',
          method: 'updateUsers_fallback',
          note: 'Verifica manualmente se la password è stata salvata'
        })
      } catch (fallbackError) {
        res.status(500).json({
          error: 'Errore durante l\'aggiornamento della password',
          message: fallbackError instanceof Error ? fallbackError.message : 'Errore sconosciuto',
          db_error: dbError instanceof Error ? dbError.message : 'Errore database sconosciuto'
        })
      }
    }
  } catch (error) {
    res.status(500).json({
      error: 'Errore durante l\'aggiornamento della password',
      message: error instanceof Error ? error.message : 'Errore sconosciuto'
    })
  }
}
