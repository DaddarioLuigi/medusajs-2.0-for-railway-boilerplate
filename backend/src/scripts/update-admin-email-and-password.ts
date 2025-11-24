import { ExecArgs } from "@medusajs/framework/types"
import { Modules } from "@medusajs/framework/utils"
import { IUserModuleService } from "@medusajs/framework/types"
import * as bcrypt from 'bcrypt'

/**
 * Script per aggiornare l'email e la password dell'utente admin
 * 
 * Utilizzo su Railway:
 * 1. Vai nella console Railway del tuo servizio
 * 2. Esegui: npx medusa exec ./src/scripts/update-admin-email-and-password.ts email password
 * 
 * Esempio:
 * npx medusa exec ./src/scripts/update-admin-email-and-password.ts bareuropa.ecommerce@gmail.com naberjwz0doxhswcxqa9d0x276btymh2
 */
export default async function updateAdminEmailAndPassword({ container, args }: ExecArgs) {
  const logger = container.resolve("logger")
  const userModuleService: IUserModuleService = container.resolve(Modules.USER)

  // Ottieni email e password dagli argomenti
  const newEmail = args?.[0]
  const newPassword = args?.[1]
  
  if (!newEmail) {
    logger.error('Email non specificata. Fornisci email e password come argomenti:')
    logger.error('npx medusa exec ./src/scripts/update-admin-email-and-password.ts email password')
    process.exit(1)
  }

  if (!newPassword) {
    logger.error('Password non specificata. Fornisci email e password come argomenti:')
    logger.error('npx medusa exec ./src/scripts/update-admin-email-and-password.ts email password')
    process.exit(1)
  }

  try {
    // Lista tutti gli utenti admin
    const users = await userModuleService.listUsers()
    
    if (users.length === 0) {
      logger.error('Nessun utente trovato nel sistema')
      process.exit(1)
    }

    // Trova il primo utente admin (di solito c'è solo uno all'inizio)
    const adminUser = users[0]
    
    logger.info(`Trovato utente admin: ${adminUser.email}`)
    logger.info(`Aggiornamento email a: ${newEmail}`)
    logger.info(`Aggiornamento password...`)

    // Aggiorna l'email
    await userModuleService.updateUsers([{
      id: adminUser.id,
      email: newEmail
    }] as any)

    // Aggiorna la password
    // In Medusa 2.0, dobbiamo hashare la password con bcrypt prima di salvarla
    try {
      // Hasha la password con bcrypt (10 rounds è il default sicuro)
      const saltRounds = 10
      const hashedPassword = await bcrypt.hash(newPassword, saltRounds)
      
      // Aggiorna la password hashata
      await userModuleService.updateUsers([{
        id: adminUser.id,
        password_hash: hashedPassword
      }] as any)
      
      logger.info('Password hashata e aggiornata con successo')
    } catch (passwordError) {
      logger.error('Errore durante l\'aggiornamento della password: ' + (passwordError instanceof Error ? passwordError.message : String(passwordError)))
      logger.error('L\'email è stata aggiornata, ma la password NON è stata cambiata.')
      throw passwordError
    }

    logger.info(`Email admin aggiornata con successo da ${adminUser.email} a ${newEmail}`)
    logger.info('Operazione completata!')
  } catch (error) {
    logger.error('Errore durante l\'aggiornamento:', error)
    process.exit(1)
  }
}

