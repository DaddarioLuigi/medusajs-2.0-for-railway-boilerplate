import { Text, Section, Hr, Button } from '@react-email/components'
import * as React from 'react'
import { Base } from './base'
import { OrderDTO, OrderAddressDTO } from '@medusajs/framework/types'

export const ORDER_COMPLETED = 'order-completed'

interface OrderCompletedPreviewProps {
  order: OrderDTO & { display_id: string; summary: { raw_current_order_total: { value: number } } }
  shippingAddress: OrderAddressDTO
}

export interface OrderCompletedTemplateProps {
  order: OrderDTO & { display_id?: string; summary?: { raw_current_order_total?: { value: number } } }
  shippingAddress: OrderAddressDTO | null
  preview?: string
  orderUrl?: string
  reviewUrl?: string
}

export const isOrderCompletedTemplateData = (data: any): data is OrderCompletedTemplateProps =>
  typeof data.order === 'object'

const formatPrice = (amount: number | string | undefined | null, currency: string) => {
  let numAmount: number
  if (amount === null || amount === undefined) {
    numAmount = 0
  } else if (typeof amount === 'string') {
    numAmount = parseFloat(amount)
  } else if (typeof amount === 'object') {
    // Handle BigNumber - check if it has toNumber method
    const amountObj = amount as any
    if (typeof amountObj.toNumber === 'function') {
      numAmount = amountObj.toNumber()
    } else {
      numAmount = 0
    }
  } else {
    numAmount = amount
  }
  // I prezzi arrivano già in centesimi ma divisi per 10, quindi moltiplichiamo per 10 e poi dividiamo per 100
  // Formato en-US per avere € prima del prezzo
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency.toUpperCase(),
  }).format((numAmount * 10) / 100)
}

export const OrderCompletedTemplate: React.FC<OrderCompletedTemplateProps> & {
  PreviewProps: OrderCompletedPreviewProps
} = ({ order, shippingAddress, preview = 'Your order has been delivered!', orderUrl, reviewUrl }) => {
  const orderTotal = order.summary?.raw_current_order_total?.value || order.total || 0
  const formattedTotal = formatPrice(orderTotal as any, order.currency_code || 'EUR')

  return (
    <Base preview={preview}>
      <Section style={{ padding: '20px 0' }}>
        {/* Header */}
        <Section style={{ textAlign: 'center', marginBottom: '30px' }}>
          <Text style={{ 
            fontSize: '28px', 
            fontWeight: 'bold', 
            color: '#1a1a1a',
            margin: '0 0 10px'
          }}>
            🎉 Ordine Consegnato
          </Text>
          <Text style={{ 
            fontSize: '16px', 
            color: '#666',
            margin: '0'
          }}>
            Speriamo che tu sia soddisfatto del tuo acquisto!
          </Text>
        </Section>

        {/* Greeting */}
        {shippingAddress && (
          <Text style={{ 
            fontSize: '16px', 
            color: '#1a1a1a',
            margin: '0 0 20px',
            lineHeight: '24px'
          }}>
            Ciao {shippingAddress.first_name} {shippingAddress.last_name},
          </Text>
        )}

        <Text style={{ 
          fontSize: '16px', 
          color: '#1a1a1a',
          margin: '0 0 30px',
          lineHeight: '24px'
        }}>
          Il tuo ordine <strong>#{order.display_id || order.id}</strong> è stato consegnato con successo! 
          Speriamo che tu sia soddisfatto dei prodotti ricevuti.
        </Text>

        {/* Order Summary Card */}
        <Section style={{ 
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
          padding: '20px',
          marginBottom: '30px'
        }}>
          <Text style={{ 
            fontSize: '20px', 
            fontWeight: 'bold', 
            color: '#1a1a1a',
            margin: '0 0 15px'
          }}>
            Riepilogo Ordine
          </Text>
          
          <Section style={{ marginBottom: '10px' }}>
            <Text style={{ 
              fontSize: '14px', 
              color: '#666',
              margin: '0 0 5px'
            }}>
              Numero Ordine
            </Text>
            <Text style={{ 
              fontSize: '16px', 
              fontWeight: 'bold',
              color: '#1a1a1a',
              margin: '0 0 15px'
            }}>
              #{order.display_id || order.id}
            </Text>
          </Section>

          <Section style={{ marginBottom: '10px' }}>
            <Text style={{ 
              fontSize: '14px', 
              color: '#666',
              margin: '0 0 5px'
            }}>
              Data Ordine
            </Text>
            <Text style={{ 
              fontSize: '16px',
              color: '#1a1a1a',
              margin: '0 0 15px'
            }}>
              {new Date(order.created_at).toLocaleDateString('it-IT', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </Text>
          </Section>

          <Hr style={{ margin: '15px 0', borderColor: '#dee2e6' }} />

          <Section style={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '15px'
          }}>
            <Text style={{ 
              fontSize: '18px', 
              fontWeight: 'bold',
              color: '#1a1a1a',
              margin: '0'
            }}>
              Totale
            </Text>
            <Text style={{ 
              fontSize: '24px', 
              fontWeight: 'bold',
              color: '#1a1a1a',
              margin: '0'
            }}>
              {formattedTotal}
            </Text>
          </Section>
        </Section>

        {/* Review CTA */}
        {reviewUrl && (
          <Section style={{ 
            backgroundColor: '#fff3cd',
            border: '1px solid #ffc107',
            borderRadius: '8px',
            padding: '20px',
            marginBottom: '30px',
            textAlign: 'center'
          }}>
            <Text style={{ 
              fontSize: '18px', 
              fontWeight: 'bold', 
              color: '#1a1a1a',
              margin: '0 0 10px'
            }}>
              💬 Lascia una Recensione
            </Text>
            <Text style={{ 
              fontSize: '14px',
              color: '#666',
              margin: '0 0 15px',
              lineHeight: '20px'
            }}>
              La tua opinione è importante per noi! Condividi la tua esperienza e aiuta altri clienti a scegliere.
            </Text>
            <Button
              href={reviewUrl}
              style={{
                backgroundColor: '#ffc107',
                color: '#1a1a1a',
                padding: '12px 24px',
                borderRadius: '6px',
                textDecoration: 'none',
                display: 'inline-block',
                fontWeight: 'bold',
                fontSize: '16px'
              }}
            >
              Scrivi una Recensione
            </Button>
          </Section>
        )}

        {/* CTA Buttons */}
        <Section style={{ textAlign: 'center', marginTop: '30px' }}>
          {orderUrl && (
            <Button
              href={orderUrl}
              style={{
                backgroundColor: '#1a1a1a',
                color: '#ffffff',
                padding: '12px 24px',
                borderRadius: '6px',
                textDecoration: 'none',
                display: 'inline-block',
                fontWeight: 'bold',
                fontSize: '16px',
                marginRight: '10px'
              }}
            >
              Visualizza Ordine
            </Button>
          )}
        </Section>

        {/* Footer */}
        <Hr style={{ margin: '30px 0', borderColor: '#dee2e6' }} />
        
        <Text style={{ 
          fontSize: '14px',
          color: '#666',
          margin: '0 0 10px',
          lineHeight: '20px'
        }}>
          Se hai domande o problemi con il tuo ordine, non esitare a contattarci. Siamo qui per aiutarti!
        </Text>
        
        <Text style={{ 
          fontSize: '14px',
          color: '#666',
          margin: '0',
          lineHeight: '20px'
        }}>
          Grazie per aver scelto Bar Europa Trani e speriamo di rivederti presto! 🛍️
        </Text>
      </Section>
    </Base>
  )
}

OrderCompletedTemplate.PreviewProps = {
  order: {
    id: 'test-order-id',
    display_id: 'ORD-123',
    created_at: new Date().toISOString(),
    email: 'test@example.com',
    currency_code: 'EUR',
    total: 4500,
    summary: { raw_current_order_total: { value: 4500 } }
  },
  shippingAddress: {
    first_name: 'Test',
    last_name: 'User',
    address_1: '123 Main St',
    city: 'Anytown',
    province: 'CA',
    postal_code: '12345',
    country_code: 'IT'
  }
} as OrderCompletedPreviewProps

export default OrderCompletedTemplate

