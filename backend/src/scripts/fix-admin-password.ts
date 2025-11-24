import { ExecArgs } from "@medusajs/framework/types"
import { Modules } from "@medusajs/framework/utils"
import { IUserModuleService } from "@medusajs/framework/types"
import * as bcrypt from 'bcrypt'

/**
 * Script per correggere la password admin (hashata correttamente)
 * 
 * Utilizzo su Railway:
 * npx medusa exec ./src/scripts/fix-admin-password.ts password
 * 
 * Esempio:
 * npx medusa exec ./src/scripts/fix-admin-password.ts naberjwz0doxhswcxqa9d0x276btymh2
 */
export default async function fixAdminPassword({ container, args }: ExecArgs) {
  const logger = container.resolve("logger")
  const userModuleService: IUserModuleService = container.resolve(Modules.USER)

  const newPassword = args?.[0]
  
  if (!newPassword) {
    logger.error('Password non specificata. Fornisci la password come argomento:')
    logger.error('npx medusa exec ./src/scripts/fix-admin-password.ts password')
    process.exit(1)
  }

  try {
    const users = await userModuleService.listUsers()
    
    if (users.length === 0) {
      logger.error('Nessun utente trovato nel sistema')
      process.exit(1)
    }

    const adminUser = users[0]
    
    logger.info(`Trovato utente admin: ${adminUser.email}`)
    logger.info('Hashando la password con bcrypt...')

    // Hasha la password con bcrypt
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds)
    
    logger.info('Password hashata. Aggiornamento nel database...')

    // Aggiorna la password hashata
    await userModuleService.updateUsers([{
      id: adminUser.id,
      password_hash: hashedPassword
    }] as any)
    
    logger.info('✅ Password aggiornata correttamente!')
    logger.info(`Ora puoi accedere con email: ${adminUser.email} e la password fornita`)
  } catch (error) {
    logger.error('Errore durante l\'aggiornamento della password:', error)
    process.exit(1)
  }
}

