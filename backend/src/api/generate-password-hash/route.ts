import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import * as bcrypt from 'bcrypt'

/**
 * Endpoint per generare l'hash bcrypt di una password
 * 
 * POST /generate-password-hash
 * Body: { 
 *   "password": "password-da-hashare",
 *   "secret": "chiave-segreta"
 * }
 */
interface GenerateHashBody {
  password?: string
  secret?: string
}

export async function POST(
  req: MedusaRequest<GenerateHashBody>,
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

    if (!password || typeof password !== 'string') {
      res.status(400).json({
        error: 'Password richiesta'
      })
      return
    }

    // Genera l'hash bcrypt
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    res.json({
      success: true,
      password: password,
      hash: hashedPassword,
      sql_query: `UPDATE "user" SET "password_hash" = '${hashedPassword}', "updated_at" = NOW() WHERE "email" = 'bareuropa.ecommerce@gmail.com';`
    })
  } catch (error) {
    res.status(500).json({
      error: 'Errore durante la generazione dell\'hash',
      message: error instanceof Error ? error.message : 'Errore sconosciuto'
    })
  }
}

