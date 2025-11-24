import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { Modules } from "@medusajs/framework/utils"
import { IUserModuleService } from "@medusajs/framework/types"

/**
 * Endpoint pubblico temporaneo per listare tutti gli utenti
 * 
 * GET /list-users?secret=chiave-segreta
 * 
 * NOTA: Questo endpoint è temporaneo e dovrebbe essere rimosso dopo l'uso.
 */
export async function GET(
  req: MedusaRequest,
  res: MedusaResponse
): Promise<void> {
  try {
    const secret = req.query.secret as string

    // Verifica la chiave segreta
    const requiredSecret = process.env.ADMIN_UPDATE_SECRET || "temporary-secret-key-change-me"
    if (!secret || secret !== requiredSecret) {
      res.status(401).json({
        error: 'Chiave segreta non valida'
      })
      return
    }

    const userModuleService: IUserModuleService = req.scope.resolve(Modules.USER)

    // Lista tutti gli utenti
    const users = await userModuleService.listUsers()
    
    const usersList = users.map(user => {
      const userAny = user as any
      return {
        id: user.id,
        email: user.email,
        created_at: user.created_at,
        updated_at: user.updated_at,
        first_name: userAny.first_name || null,
        last_name: userAny.last_name || null,
        has_password_hash: !!userAny.password_hash,
        password_hash_preview: userAny.password_hash ? userAny.password_hash.substring(0, 30) + '...' : null
      }
    })

    res.json({
      success: true,
      total: users.length,
      users: usersList
    })
  } catch (error) {
    res.status(500).json({
      error: 'Errore durante il recupero degli utenti',
      message: error instanceof Error ? error.message : 'Errore sconosciuto'
    })
  }
}

