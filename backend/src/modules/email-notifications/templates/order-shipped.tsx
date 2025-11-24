import { Text, Section, Hr, Button } from '@react-email/components'
import * as React from 'react'
import { Base } from './base'
import { OrderDTO, OrderAddressDTO } from '@medusajs/framework/types'

export const ORDER_SHIPPED = 'order-shipped'

interface OrderShippedPreviewProps {
  order: OrderDTO & { display_id: string }
  shippingAddress: OrderAddressDTO
  trackingNumber?: string
  carrier?: string
}

export interface OrderShippedTemplateProps {
  order: OrderDTO & { display_id?: string }
  shippingAddress: OrderAddressDTO | null
  trackingNumber?: string
  carrier?: string
  preview?: string
  trackingUrl?: string
  orderUrl?: string
}

export const isOrderShippedTemplateData = (data: any): data is OrderShippedTemplateProps =>
  typeof data.order === 'object'

export const OrderShippedTemplate: React.FC<OrderShippedTemplateProps> & {
  PreviewProps: OrderShippedPreviewProps
} = ({ order, shippingAddress, trackingNumber, carrier, preview = 'Your order has been shipped!', trackingUrl, orderUrl }) => {
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
            📦 Ordine Spedito
          </Text>
          <Text style={{ 
            fontSize: '16px', 
            color: '#666',
            margin: '0'
          }}>
            Il tuo ordine è in viaggio!
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
          Ottime notizie! Il tuo ordine <strong>#{order.display_id || order.id}</strong> è stato spedito e dovrebbe arrivare a breve.
        </Text>

        {/* Tracking Info */}
        {(trackingNumber || carrier) && (
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
              Informazioni di Spedizione
            </Text>
            
            {trackingNumber && (
              <Section style={{ marginBottom: '10px' }}>
                <Text style={{ 
                  fontSize: '14px', 
                  color: '#666',
                  margin: '0 0 5px'
                }}>
                  Numero di Tracciamento
                </Text>
                <Text style={{ 
                  fontSize: '18px', 
                  fontWeight: 'bold',
                  color: '#1a1a1a',
                  margin: '0 0 15px',
                  fontFamily: 'monospace'
                }}>
                  {trackingNumber}
                </Text>
              </Section>
            )}

            {carrier && (
              <Section style={{ marginBottom: '10px' }}>
                <Text style={{ 
                  fontSize: '14px', 
                  color: '#666',
                  margin: '0 0 5px'
                }}>
                  Corriere
                </Text>
                <Text style={{ 
                  fontSize: '16px',
                  color: '#1a1a1a',
                  margin: '0'
                }}>
                  {carrier}
                </Text>
              </Section>
            )}

            {trackingUrl && (
              <Section style={{ marginTop: '15px' }}>
                <Button
                  href={trackingUrl}
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
                  Traccia il Pacco
                </Button>
              </Section>
            )}
          </Section>
        )}

        {/* Shipping Address */}
        {shippingAddress && (
          <>
            <Text style={{ 
              fontSize: '18px', 
              fontWeight: 'bold', 
              color: '#1a1a1a',
              margin: '0 0 15px'
            }}>
              Indirizzo di Consegna
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
          Il tempo di consegna stimato è di 3-5 giorni lavorativi. Riceverai un'email quando il pacco sarà stato consegnato.
        </Text>
        
        <Text style={{ 
          fontSize: '14px',
          color: '#666',
          margin: '0',
          lineHeight: '20px'
        }}>
          Hai domande? Rispondi a questa email o contattaci tramite il nostro sito web.
        </Text>
      </Section>
    </Base>
  )
}

OrderShippedTemplate.PreviewProps = {
  order: {
    id: 'test-order-id',
    display_id: 'ORD-123',
    created_at: new Date().toISOString(),
    email: 'test@example.com',
    currency_code: 'EUR'
  },
  shippingAddress: {
    first_name: 'Test',
    last_name: 'User',
    address_1: '123 Main St',
    city: 'Anytown',
    province: 'CA',
    postal_code: '12345',
    country_code: 'IT'
  },
  trackingNumber: 'TRACK123456789',
  carrier: 'Poste Italiane'
} as OrderShippedPreviewProps

export default OrderShippedTemplate

