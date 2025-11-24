import { ExecArgs } from "@medusajs/framework/types"
import { Modules } from "@medusajs/framework/utils"
import { IUserModuleService } from "@medusajs/framework/types"

/**
 * Script per listare tutti gli utenti nel sistema
 * 
 * Utilizzo su Railway:
 * npx medusa exec ./src/scripts/list-all-users.ts
 */
export default async function listAllUsers({ container }: ExecArgs) {
  const logger = container.resolve("logger")
  const userModuleService: IUserModuleService = container.resolve(Modules.USER)

  try {
    const users = await userModuleService.listUsers()
    
    logger.info(`Trovati ${users.length} utenti nel sistema:`)
    logger.info('─'.repeat(80))
    
    for (const user of users) {
      logger.info(`ID: ${user.id}`)
      logger.info(`Email: ${user.email}`)
      logger.info(`Created At: ${user.created_at}`)
      logger.info(`Updated At: ${user.updated_at}`)
      
      // Mostra altri campi se disponibili
      const userAny = user as any
      if (userAny.first_name) logger.info(`First Name: ${userAny.first_name}`)
      if (userAny.last_name) logger.info(`Last Name: ${userAny.last_name}`)
      if (userAny.password_hash) {
        logger.info(`Password Hash: ${userAny.password_hash.substring(0, 20)}... (presente)`)
      } else {
        logger.info(`Password Hash: (non presente)`)
      }
      
      logger.info('─'.repeat(80))
    }
    
    if (users.length === 0) {
      logger.warn('Nessun utente trovato nel sistema')
    }
  } catch (error) {
    logger.error('Errore durante il recupero degli utenti:', error)
    process.exit(1)
  }
}

