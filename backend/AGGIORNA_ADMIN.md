# Come Aggiornare Email e Password Admin

## Metodo 1: Script CLI su Railway (Consigliato)

1. Vai su Railway e apri la console del tuo servizio backend
2. Esegui questo comando:

```bash
npx medusa exec ./src/scripts/update-admin-email-and-password.ts bareuropa.ecommerce@gmail.com naberjwz0doxhswcxqa9d0x276btymh2
```

Questo aggiornerà sia l'email che la password dell'utente admin.

## Metodo 2: Endpoint API

Puoi anche usare l'endpoint API che ho creato. Fai una richiesta POST a:

```
POST /admin/custom/update-admin-email
```

**Body:**
```json
{
  "email": "bareuropa.ecommerce@gmail.com",
  "password": "naberjwz0doxhswcxqa9d0x276btymh2"
}
```

**Headers:**
```
Content-Type: application/json
Authorization: Bearer <il-tuo-token-admin>
```

**Esempio con curl:**
```bash
curl -X POST https://tuo-backend.railway.app/admin/custom/update-admin-email \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <il-tuo-token-admin>" \
  -d '{
    "email": "bareuropa.ecommerce@gmail.com",
    "password": "naberjwz0doxhswcxqa9d0x276btymh2"
  }'
```

## Nota

Dopo aver aggiornato email e password:
- Usa la nuova email: `bareuropa.ecommerce@gmail.com`
- Usa la nuova password: `naberjwz0doxhswcxqa9d0x276btymh2`
- Per accedere al pannello admin di Medusa

