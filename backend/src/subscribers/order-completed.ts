import { Modules } from '@medusajs/framework/utils'
import { INotificationModuleService, IOrderModuleService } from '@medusajs/framework/types'
import { SubscriberArgs, SubscriberConfig } from '@medusajs/framework'
import { EmailTemplates } from '../modules/email-notifications/templates'
import { BACKEND_URL } from '../lib/constants'

export default async function orderCompletedHandler({
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
      console.error('Order has no email address, cannot send completion notification')
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

    await notificationModuleService.createNotifications({
      to: order.email,
      channel: 'email',
      template: EmailTemplates.ORDER_COMPLETED,
      data: {
        emailOptions: {
          replyTo: 'bareuropa.ecommerce@gmail.com',
          subject: `Il tuo ordine #${order.display_id || order.id} è stato consegnato - Bar Europa Trani`
        },
        order,
        shippingAddress,
        orderUrl: `${BACKEND_URL}/orders/${order.id}`,
        reviewUrl: `${BACKEND_URL}/orders/${order.id}/review`,
        preview: 'Il tuo ordine è stato consegnato!'
      }
    })
  } catch (error) {
    console.error('Error sending order completed notification:', error)
  }
}

export const config: SubscriberConfig = {
  event: 'order.completed'
}

