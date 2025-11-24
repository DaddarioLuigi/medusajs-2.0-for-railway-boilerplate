import { ExecArgs } from "@medusajs/framework/types"
import { Modules } from "@medusajs/framework/utils"
import { IUserModuleService } from "@medusajs/framework/types"

/**
 * Script per aggiornare l'email dell'utente admin
 * 
 * Utilizzo:
 * 1. Imposta la variabile d'ambiente MEDUSA_ADMIN_EMAIL con la nuova email
 * 2. Esegui: npx medusa exec ./src/scripts/update-admin-email.ts
 * 
 * Oppure modifica direttamente questa funzione per specificare la nuova email
 * 
 * ALTERNATIVA: Usa l'endpoint API POST /admin/custom/update-admin-email
 */
export default async function updateAdminEmail({ container, args }: ExecArgs) {
  const logger = container.resolve("logger")
  const userModuleService: IUserModuleService = container.resolve(Modules.USER)

  // Ottieni la nuova email da argomenti, variabile d'ambiente o modifica qui
  const newEmail = args?.[0] || process.env.MEDUSA_ADMIN_EMAIL || process.env.ADMIN_EMAIL
  
  if (!newEmail) {
    logger.error('Email non specificata. Fornisci l\'email come argomento: npx medusa exec ./src/scripts/update-admin-email.ts nuova-email@example.com')
    logger.error('Oppure imposta MEDUSA_ADMIN_EMAIL o ADMIN_EMAIL come variabile d\'ambiente.')
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

    // Aggiorna l'email
    await userModuleService.updateUsers([{
      id: adminUser.id,
      email: newEmail
    }] as any)

    logger.info(`Email admin aggiornata con successo da ${adminUser.email} a ${newEmail}`)
  } catch (error) {
    logger.error('Errore durante l\'aggiornamento dell\'email admin:', error)
    process.exit(1)
  }
}

