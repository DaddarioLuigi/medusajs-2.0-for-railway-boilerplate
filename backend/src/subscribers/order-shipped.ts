import { Modules } from '@medusajs/framework/utils'
import { INotificationModuleService, IOrderModuleService } from '@medusajs/framework/types'
import { SubscriberArgs, SubscriberConfig } from '@medusajs/framework'
import { EmailTemplates } from '../modules/email-notifications/templates'
import { BACKEND_URL } from '../lib/constants'

export default async function orderShippedHandler({
  event: { data },
  container,
}: SubscriberArgs<any>) {
  const notificationModuleService: INotificationModuleService = container.resolve(Modules.NOTIFICATION)
  const orderModuleService: IOrderModuleService = container.resolve(Modules.ORDER)
  
  try {
    const order = await orderModuleService.retrieveOrder(data.id, { 
      relations: ['items', 'summary', 'shipping_address'] 
    })

    if (!order.email) {
      console.error('Order has no email address, cannot send shipping notification')
      return
    }

    let shippingAddress = null
    if (order.shipping_address?.id) {
      try {
        shippingAddress = await (orderModuleService as any).orderAddressService_.retrieve(order.shipping_address.id)
      } catch (error) {
        console.warn('Could not retrieve shipping address:', error)
        shippingAddress = order.shipping_address
      }
    } else if (order.shipping_address) {
      shippingAddress = order.shipping_address
    }

    // Estrai informazioni di tracking dai fulfillments
    // Nota: i fulfillments potrebbero non essere disponibili direttamente nell'OrderDTO
    // In questo caso, potremmo dover recuperarli separatamente o passare i dati dall'evento
    let trackingNumber: string | undefined
    let carrier: string | undefined
    let trackingUrl: string | undefined

    // Prova a recuperare i fulfillments se disponibili nell'evento o nell'ordine
    const orderWithFulfillments = order as any
    if (orderWithFulfillments.fulfillments && Array.isArray(orderWithFulfillments.fulfillments) && orderWithFulfillments.fulfillments.length > 0) {
      const fulfillment = orderWithFulfillments.fulfillments[0]
      // I tracking numbers potrebbero essere in diversi formati a seconda del provider
      if (fulfillment.tracking_numbers && Array.isArray(fulfillment.tracking_numbers) && fulfillment.tracking_numbers.length > 0) {
        trackingNumber = fulfillment.tracking_numbers[0]
      }
      if (fulfillment.tracking_links && Array.isArray(fulfillment.tracking_links) && fulfillment.tracking_links.length > 0) {
        trackingUrl = fulfillment.tracking_links[0]
      }
      if (fulfillment.provider) {
        carrier = fulfillment.provider
      }
    }
    
    // Alternativa: i dati potrebbero arrivare direttamente dall'evento
    if (data.fulfillment_id) {
      // Se abbiamo un fulfillment_id, potremmo recuperarlo separatamente
      // Per ora, lasciamo i valori undefined se non disponibili
    }

    await notificationModuleService.createNotifications({
      to: order.email,
      channel: 'email',
      template: EmailTemplates.ORDER_SHIPPED,
      data: {
        emailOptions: {
          replyTo: 'bareuropa.ecommerce@gmail.com',
          subject: `Il tuo ordine #${order.display_id || order.id} è stato spedito - Bar Europa Trani`
        },
        order,
        shippingAddress,
        trackingNumber,
        carrier,
        trackingUrl,
        orderUrl: `${BACKEND_URL}/orders/${order.id}`,
        preview: 'Il tuo ordine è in viaggio!'
      }
    })
  } catch (error) {
    console.error('Error sending order shipped notification:', error)
  }
}

export const config: SubscriberConfig = {
  event: 'order.shipment_created'
}

