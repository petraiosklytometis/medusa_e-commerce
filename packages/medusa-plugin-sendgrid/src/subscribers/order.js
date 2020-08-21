class OrderSubscriber {
  constructor({ sendgridService, eventBusService }) {
    this.sendgridService_ = sendgridService

    this.eventBus_ = eventBusService

    this.eventBus_.subscribe("order.gift_card_created", async (order) => {
      await this.sendgridService_.transactionalEmail("order.gift_card_created", order)
    })

    this.eventBus_.subscribe("order.placed", async (order) => {
      await this.sendgridService_.transactionalEmail("order.placed", order)
    })

    this.eventBus_.subscribe("order.cancelled", async (order) => {
      await this.sendgridService_.transactionalEmail("order.cancelled", order)
    })

    this.eventBus_.subscribe("order.completed", async (order) => {
      await this.sendgridService_.transactionalEmail("order.completed", order)
    })

    this.eventBus_.subscribe("order.updated", async (order) => {
      await this.sendgridService_.transactionalEmail("order.updated", order)
    })
  }
}

export default OrderSubscriber