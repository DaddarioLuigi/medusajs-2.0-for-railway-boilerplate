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
      relations: ['items', 'summary', 'shipping_address', 'fulfillments'] 
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
    let trackingNumber: string | undefined
    let carrier: string | undefined
    let trackingUrl: string | undefined

    if (order.fulfillments && order.fulfillments.length > 0) {
      const fulfillment = order.fulfillments[0]
      // I tracking numbers potrebbero essere in diversi formati a seconda del provider
      if ((fulfillment as any).tracking_numbers && (fulfillment as any).tracking_numbers.length > 0) {
        trackingNumber = (fulfillment as any).tracking_numbers[0]
      }
      if ((fulfillment as any).tracking_links && (fulfillment as any).tracking_links.length > 0) {
        trackingUrl = (fulfillment as any).tracking_links[0]
      }
      if ((fulfillment as any).provider) {
        carrier = (fulfillment as any).provider
      }
    }

    await notificationModuleService.createNotifications({
      to: order.email,
      channel: 'email',
      template: EmailTemplates.ORDER_SHIPPED,
      data: {
        emailOptions: {
          replyTo: 'info@example.com',
          subject: `Il tuo ordine #${order.display_id || order.id} è stato spedito`
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

