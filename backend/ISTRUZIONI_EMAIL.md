# Istruzioni per la Configurazione Email

Questo documento spiega come risolvere i due problemi relativi alle email in Medusa.

## Problema 1: Cambiare l'Email Admin

L'email dell'utente admin in Medusa **non** viene gestita tramite variabili d'ambiente. L'utente admin viene creato durante l'inizializzazione del backend e l'email è salvata nel database.

### Soluzione: Usare lo Script o l'Endpoint API

Ho creato due modi per aggiornare l'email admin:

#### Opzione 1: Endpoint API (Consigliato - Più Facile)

Puoi aggiornare l'email admin tramite un endpoint API. Questo è il metodo più semplice:

1. Fai una richiesta POST all'endpoint:
   ```
   POST https://tuo-backend.railway.app/admin/custom/update-admin-email
   ```

2. Includi nel body della richiesta:
   ```json
   {
     "email": "nuova-email@example.com"
   }
   ```

3. Includi il token di autenticazione admin nell'header:
   ```
   Authorization: Bearer <il-tuo-token-admin>
   ```

**Esempio con curl:**
```bash
curl -X POST https://tuo-backend.railway.app/admin/custom/update-admin-email \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <il-tuo-token-admin>" \
  -d '{"email": "nuova-email@example.com"}'
```

**Esempio con JavaScript/Fetch:**
```javascript
const response = await fetch('https://tuo-backend.railway.app/admin/custom/update-admin-email', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer <il-tuo-token-admin>'
  },
  body: JSON.stringify({
    email: 'nuova-email@example.com'
  })
});

const result = await response.json();
console.log(result);
```

#### Opzione 2: Script CLI

1. Aggiungi la variabile d'ambiente `MEDUSA_ADMIN_EMAIL` (o `ADMIN_EMAIL`) su Railway con la nuova email
2. Esegui lo script:

```bash
cd backend
npx medusa exec ./src/scripts/update-admin-email.ts
```

**Nota:** Se `npx medusa exec` non funziona, prova:
```bash
cd backend
pnpm exec medusa exec ./src/scripts/update-admin-email.ts
```

#### Opzione 3: Modificare lo Script Direttamente

1. Apri il file `src/scripts/update-admin-email.ts`
2. Modifica la riga con la nuova email (rimuovi il riferimento alla variabile d'ambiente)
3. Esegui lo script:

```bash
cd backend
npx medusa exec ./src/scripts/update-admin-email.ts
```

### Nota Importante

Dopo aver cambiato l'email admin, dovrai:
- **Usare la nuova email** per accedere al pannello admin
- La password rimane la stessa (se non l'hai cambiata)

## Problema 2: Email di Conferma Ordine Non Vengono Inviate

Le email di conferma ordine vengono inviate automaticamente quando un ordine viene creato tramite il subscriber `order-placed.ts`.

### Configurazione Richiesta

Assicurati di avere queste variabili d'ambiente configurate su Railway:

1. **RESEND_API_KEY**: La tua API key di Resend
   - Ottienila dal tuo account Resend: https://resend.com/api-keys

2. **RESEND_FROM_EMAIL**: L'email mittente (deve essere verificata su Resend)
   - Esempio: `noreply@tudominio.com` o `orders@tudominio.com`
   - **IMPORTANTE**: L'email deve essere verificata nel tuo account Resend

### Verifica della Configurazione

1. Controlla che le variabili d'ambiente siano impostate su Railway
2. Riavvia l'applicazione su Railway dopo aver aggiunto/modificato le variabili
3. Verifica che il modulo notification sia caricato correttamente controllando i log all'avvio

### Test delle Email

Per testare se le email funzionano:

1. Crea un ordine di test dal tuo frontend
2. Controlla i log dell'applicazione su Railway per eventuali errori
3. Verifica che l'email del cliente sia corretta nell'ordine
4. Controlla la dashboard di Resend per vedere se l'email è stata inviata

### Troubleshooting

#### Le email non vengono inviate

1. **Verifica le variabili d'ambiente**:
   - Assicurati che `RESEND_API_KEY` e `RESEND_FROM_EMAIL` siano impostate
   - Controlla che non ci siano spazi o caratteri speciali nelle variabili

2. **Verifica l'email mittente**:
   - L'email in `RESEND_FROM_EMAIL` deve essere verificata su Resend
   - Vai su https://resend.com/domains per verificare il tuo dominio

3. **Controlla i log**:
   - Su Railway, vai nella sezione "Logs" per vedere eventuali errori
   - Cerca messaggi come "Error sending order confirmation notification"

4. **Verifica che il subscriber sia attivo**:
   - Il file `src/subscribers/order-placed.ts` deve esistere
   - Il subscriber viene registrato automaticamente da Medusa

#### L'email viene inviata ma non arriva

1. Controlla la cartella spam
2. Verifica che l'email del cliente sia corretta
3. Controlla la dashboard di Resend per vedere lo stato dell'invio
4. Assicurati che il dominio mittente sia verificato su Resend

## Modifiche Apportate

Ho apportato le seguenti correzioni:

1. **Corretto il subscriber `order-placed.ts`**:
   - Cambiato gli import da `@medusajs/medusa` a `@medusajs/framework` (corretto per Medusa 2.0)
   - Aggiunta gestione degli errori per `shipping_address` null o mancante
   - Aggiunta verifica che l'ordine abbia un'email prima di inviare

2. **Migliorato il template email `order-placed.tsx`**:
   - Gestione del caso in cui `shippingAddress` sia null
   - Gestione del caso in cui `display_id` o `summary` non siano disponibili
   - Migliorata la formattazione dell'indirizzo

3. **Creato script e endpoint API per aggiornare email admin**:
   - Script `update-admin-email.ts` per cambiare l'email admin (CLI)
   - Endpoint API `POST /admin/custom/update-admin-email` per cambiare l'email admin (più facile)
   - Supporto per variabili d'ambiente nello script

## Prossimi Passi

1. Configura le variabili d'ambiente su Railway
2. Esegui lo script per aggiornare l'email admin (se necessario)
3. Riavvia l'applicazione
4. Testa creando un ordine di prova

