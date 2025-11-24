import { Text, Section, Hr, Button } from '@react-email/components'
import * as React from 'react'
import { Base } from './base'
import { OrderDTO, OrderAddressDTO } from '@medusajs/framework/types'

export const ORDER_PLACED = 'order-placed'

interface OrderPlacedPreviewProps {
  order: OrderDTO & { display_id: string; summary: { raw_current_order_total: { value: number } } }
  shippingAddress: OrderAddressDTO
}

export interface OrderPlacedTemplateProps {
  order: OrderDTO & { display_id?: string; summary?: { raw_current_order_total?: { value: number } } }
  shippingAddress: OrderAddressDTO | null
  preview?: string
  orderUrl?: string
}

export const isOrderPlacedTemplateData = (data: any): data is OrderPlacedTemplateProps =>
  typeof data.order === 'object'

const formatPrice = (amount: number | string | undefined | null, currency: string) => {
  let numAmount: number
  if (amount === null || amount === undefined) {
    numAmount = 0
  } else if (typeof amount === 'string') {
    numAmount = parseFloat(amount)
  } else if (typeof amount === 'object' && amount !== null && 'toNumber' in amount) {
    // Handle BigNumber
    numAmount = (amount as any).toNumber()
  } else {
    numAmount = amount
  }
  return new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: currency.toUpperCase(),
  }).format(numAmount / 100)
}

export const OrderPlacedTemplate: React.FC<OrderPlacedTemplateProps> & {
  PreviewProps: OrderPlacedPreviewProps
} = ({ order, shippingAddress, preview = 'Your order has been placed!', orderUrl }) => {
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
            ✅ Ordine Confermato
          </Text>
          <Text style={{ 
            fontSize: '16px', 
            color: '#666',
            margin: '0'
          }}>
            Grazie per il tuo acquisto!
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
          Il tuo ordine è stato ricevuto e confermato. Ti invieremo un'email di aggiornamento quando l'ordine verrà spedito.
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

        {/* Shipping Address */}
        {shippingAddress && (
          <>
            <Text style={{ 
              fontSize: '18px', 
              fontWeight: 'bold', 
              color: '#1a1a1a',
              margin: '0 0 15px'
            }}>
              Indirizzo di Spedizione
            </Text>
            <Section style={{ 
              backgroundColor: '#ffffff',
              border: '1px solid #dee2e6',
              borderRadius: '8px',
              padding: '15px',
              marginBottom: '30px'
            }}>
              <Text style={{ 
                fontSize: '15px',
                color: '#1a1a1a',
                margin: '0 0 5px',
                lineHeight: '22px'
              }}>
                {shippingAddress.first_name} {shippingAddress.last_name}
              </Text>
              <Text style={{ 
                fontSize: '15px',
                color: '#1a1a1a',
                margin: '0 0 5px',
                lineHeight: '22px'
              }}>
                {shippingAddress.address_1}
              </Text>
              {shippingAddress.address_2 && (
                <Text style={{ 
                  fontSize: '15px',
                  color: '#1a1a1a',
                  margin: '0 0 5px',
                  lineHeight: '22px'
                }}>
                  {shippingAddress.address_2}
                </Text>
              )}
              <Text style={{ 
                fontSize: '15px',
                color: '#1a1a1a',
                margin: '0 0 5px',
                lineHeight: '22px'
              }}>
                {shippingAddress.postal_code} {shippingAddress.city}
                {shippingAddress.province ? `, ${shippingAddress.province}` : ''}
              </Text>
              <Text style={{ 
                fontSize: '15px',
                color: '#1a1a1a',
                margin: '0',
                lineHeight: '22px'
              }}>
                {shippingAddress.country_code}
              </Text>
            </Section>
          </>
        )}

        {/* Order Items */}
        <Text style={{ 
          fontSize: '18px', 
          fontWeight: 'bold', 
          color: '#1a1a1a',
          margin: '0 0 15px'
        }}>
          Articoli Ordinati
        </Text>

        <Section style={{
          border: '1px solid #dee2e6',
          borderRadius: '8px',
          overflow: 'hidden',
          marginBottom: '30px'
        }}>
          {order.items.map((item, index) => (
            <Section key={item.id} style={{
              backgroundColor: index % 2 === 0 ? '#ffffff' : '#f8f9fa',
              padding: '15px',
              borderBottom: index < order.items.length - 1 ? '1px solid #dee2e6' : 'none'
            }}>
              <Text style={{ 
                fontSize: '16px',
                fontWeight: 'bold',
                color: '#1a1a1a',
                margin: '0 0 5px'
              }}>
                {item.title}
              </Text>
              {item.product_title && item.product_title !== item.title && (
                <Text style={{ 
                  fontSize: '14px',
                  color: '#666',
                  margin: '0 0 10px'
                }}>
                  {item.product_title}
                </Text>
              )}
              <Section style={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                marginTop: '10px'
              }}>
                <Text style={{ 
                  fontSize: '14px',
                  color: '#666',
                  margin: '0'
                }}>
                  Quantità: {item.quantity}
                </Text>
                <Text style={{ 
                  fontSize: '16px',
                  fontWeight: 'bold',
                  color: '#1a1a1a',
                  margin: '0'
                }}>
                  {formatPrice(item.unit_price as any, order.currency_code || 'EUR')}
                </Text>
              </Section>
            </Section>
          ))}
        </Section>

        {/* CTA Button */}
        {orderUrl && (
          <Section style={{ textAlign: 'center', marginTop: '30px' }}>
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
                fontSize: '16px'
              }}
            >
              Visualizza Ordine
            </Button>
          </Section>
        )}

        {/* Footer */}
        <Hr style={{ margin: '30px 0', borderColor: '#dee2e6' }} />
        
        <Text style={{ 
          fontSize: '14px',
          color: '#666',
          margin: '0 0 10px',
          lineHeight: '20px'
        }}>
          Hai domande sul tuo ordine? Rispondi a questa email o contattaci tramite il nostro sito web.
        </Text>
        
        <Text style={{ 
          fontSize: '14px',
          color: '#666',
          margin: '0',
          lineHeight: '20px'
        }}>
          Grazie ancora per aver scelto il nostro negozio!
        </Text>
      </Section>
    </Base>
  )
}

OrderPlacedTemplate.PreviewProps = {
  order: {
    id: 'test-order-id',
    display_id: 'ORD-123',
    created_at: new Date().toISOString(),
    email: 'test@example.com',
    currency_code: 'USD',
    items: [
      { id: 'item-1', title: 'Item 1', product_title: 'Product 1', quantity: 2, unit_price: 10 },
      { id: 'item-2', title: 'Item 2', product_title: 'Product 2', quantity: 1, unit_price: 25 }
    ],
    shipping_address: {
      first_name: 'Test',
      last_name: 'User',
      address_1: '123 Main St',
      city: 'Anytown',
      province: 'CA',
      postal_code: '12345',
      country_code: 'US'
    },
    summary: { raw_current_order_total: { value: 45 } }
  },
  shippingAddress: {
    first_name: 'Test',
    last_name: 'User',
    address_1: '123 Main St',
    city: 'Anytown',
    province: 'CA',
    postal_code: '12345',
    country_code: 'US'
  }
} as OrderPlacedPreviewProps

export default OrderPlacedTemplate
