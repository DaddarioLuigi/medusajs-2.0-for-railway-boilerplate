import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { Modules } from "@medusajs/framework/utils"
import { IUserModuleService } from "@medusajs/framework/types"
import * as bcrypt from 'bcrypt'
import { Pool } from 'pg'

/**
 * Endpoint per aggiornare la password direttamente nel database PostgreSQL
 * 
 * POST /fix-password-direct
 * Body: { 
 *   "password": "nuova-password",
 *   "secret": "chiave-segreta"
 * }
 * 
 * NOTA: Questo endpoint aggiorna direttamente nel database PostgreSQL
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
    
    // Prova ad aggiornare direttamente nel database PostgreSQL
    const databaseUrl = process.env.DATABASE_URL
    if (!databaseUrl) {
      res.status(500).json({
        error: 'DATABASE_URL non configurato'
      })
      return
    }

    try {
      // Connetti al database
      const pool = new Pool({
        connectionString: databaseUrl,
      })

      // Aggiorna direttamente nel database
      // La tabella degli utenti in Medusa 2.0 si chiama probabilmente "user" o simile
      // Prova diverse possibili tabelle
      const possibleTables = ['user', 'users', 'medusa_user']
      
      let updated = false
      let lastError: Error | null = null
      
      for (const table of possibleTables) {
        try {
          // Prova a trovare la colonna corretta
          const result = await pool.query(`
            UPDATE ${table} 
            SET password_hash = $1, updated_at = NOW()
            WHERE id = $2
            RETURNING id, email
          `, [hashedPassword, adminUser.id])
          
          if (result.rowCount && result.rowCount > 0) {
            updated = true
            await pool.end()
            
            res.json({
              success: true,
              message: `Password aggiornata direttamente nel database per l'utente ${adminUser.email}`,
              email: adminUser.email,
              table_used: table,
              password_hash_preview: hashedPassword.substring(0, 30) + '...'
            })
            return
          }
        } catch (tableError) {
          lastError = tableError instanceof Error ? tableError : new Error(String(tableError))
          // Continua con la prossima tabella
        }
      }

      await pool.end()

      if (!updated) {
        res.status(500).json({
          error: 'Impossibile trovare la tabella degli utenti nel database',
          attempted_tables: possibleTables,
          last_error: lastError?.message
        })
        return
      }
    } catch (dbError) {
      res.status(500).json({
        error: 'Errore durante l\'aggiornamento nel database',
        message: dbError instanceof Error ? dbError.message : 'Errore sconosciuto'
      })
      return
    }
  } catch (error) {
    res.status(500).json({
      error: 'Errore durante l\'aggiornamento della password',
      message: error instanceof Error ? error.message : 'Errore sconosciuto'
    })
  }
}

