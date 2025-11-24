# Come Testare i Template Email in Locale

Questa guida ti mostra come visualizzare e testare i template email in locale prima di deployarli.

## Prerequisiti

Assicurati di avere installato tutte le dipendenze:

```bash
cd backend
pnpm install
```

## Metodo 1: Usare React Email Dev Server (Consigliato)

Medusa include un comando per visualizzare i template email in locale:

```bash
cd backend
pnpm email:dev
```

Questo comando:
- Avvia un server di sviluppo su `http://localhost:3002`
- Mostra tutti i template email disponibili
- Permette di vedere l'anteprima in tempo reale
- Supporta hot-reload quando modifichi i template

### Come Usare

1. Esegui `pnpm email:dev`
2. Apri il browser su `http://localhost:3002`
3. Seleziona un template dalla lista
4. Modifica il template e vedi le modifiche in tempo reale

## Metodo 2: Testare con Dati Reali

Puoi anche testare i template con dati reali usando lo script di test:

### Creare uno Script di Test

Crea un file `src/scripts/test-email.ts`:

```typescript
import { ExecArgs } from "@medusajs/framework/types"
import { Modules } from "@medusajs/framework/utils"
import { INotificationModuleService } from "@medusajs/framework/types"
import { EmailTemplates } from '../modules/email-notifications/templates'

export default async function testEmail({ container }: ExecArgs) {
  const notificationModuleService: INotificationModuleService = container.resolve(Modules.NOTIFICATION)

  // Test Order Placed
  await notificationModuleService.createNotifications({
    to: 'test@example.com',
    channel: 'email',
    template: EmailTemplates.ORDER_PLACED,
    data: {
      emailOptions: {
        subject: 'Test Order Placed'
      },
      order: {
        id: 'test-order-123',
        display_id: 'ORD-001',
        created_at: new Date().toISOString(),
        currency_code: 'EUR',
        total: 4500,
        items: [
          { id: 'item-1', title: 'Prodotto 1', product_title: 'Prodotto 1', quantity: 2, unit_price: 2000 },
          { id: 'item-2', title: 'Prodotto 2', product_title: 'Prodotto 2', quantity: 1, unit_price: 500 }
        ],
        summary: { raw_current_order_total: { value: 4500 } }
      },
      shippingAddress: {
        first_name: 'Mario',
        last_name: 'Rossi',
        address_1: 'Via Roma 123',
        city: 'Milano',
        province: 'MI',
        postal_code: '20100',
        country_code: 'IT'
      }
    }
  })

  console.log('Email di test inviata!')
}
```

Poi esegui:

```bash
npx medusa exec ./src/scripts/test-email.ts
```

## Metodo 3: Usare Resend in Modalità Test

Resend ha una modalità test che non invia email reali ma le registra nella dashboard:

1. Vai su https://resend.com
2. Crea una API key di test
3. Usa quella API key nelle variabili d'ambiente
4. Le email appariranno nella dashboard di Resend ma non verranno inviate

## Template Disponibili

### 1. Order Placed (`order-placed`)
- **Evento**: `order.placed`
- **Quando**: Quando un cliente completa un ordine
- **File**: `src/modules/email-notifications/templates/order-placed.tsx`

### 2. Order Shipped (`order-shipped`)
- **Evento**: `order.shipment_created`
- **Quando**: Quando un ordine viene spedito
- **File**: `src/modules/email-notifications/templates/order-shipped.tsx`

### 3. Order Completed (`order-completed`)
- **Evento**: `order.completed`
- **Quando**: Quando un ordine viene completato/consegnato
- **File**: `src/modules/email-notifications/templates/order-completed.tsx`

## Personalizzazione

Tutti i template sono in `src/modules/email-notifications/templates/` e possono essere modificati liberamente.

### Modificare Colori e Stili

I template usano React Email che supporta:
- Stili inline (come nei template attuali)
- Tailwind CSS (attraverso il componente `<Tailwind>`)
- Componenti React standard

### Aggiungere Logo

Puoi aggiungere un logo nel template `base.tsx` o direttamente nei template:

```tsx
import { Img } from '@react-email/components'

<Img
  src="https://tuo-dominio.com/logo.png"
  alt="Logo"
  width="150"
  height="50"
/>
```

## Troubleshooting

### Il server email:dev non parte

Assicurati di avere installato tutte le dipendenze:
```bash
pnpm install
```

### I template non si aggiornano

1. Riavvia il server `email:dev`
2. Controlla che i file siano salvati
3. Verifica che non ci siano errori di sintassi

### Le email non vengono inviate in produzione

1. Verifica che `RESEND_API_KEY` e `RESEND_FROM_EMAIL` siano configurate
2. Controlla i log su Railway per errori
3. Verifica che l'email mittente sia verificata su Resend
4. Controlla che i subscriber siano registrati correttamente

## Best Practices

1. **Testa sempre in locale** prima di deployare
2. **Usa dati realistici** quando testi
3. **Verifica su diversi client email** (Gmail, Outlook, etc.)
4. **Mantieni i template semplici** per compatibilità
5. **Usa colori e font standard** per massima compatibilità

