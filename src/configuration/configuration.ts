export default () => ({
    app : {
        application_name: process.env.APP_NAME,
        port: process.env.PORT
    },
    rbmq: {
        user: process.env.RABBITMQ_USER,
        pass: process.env.RABBITMQ_PASSWORD,
        host: process.env.RABBITMQ_HOST,
        queue_name: process.env.RABBITMQ_QUEUE_NAME,
        modify_order_queue: process.env.MODIFY_ORDER_QUEUE,
        url: process.env.RABBITMQ_URL || null
    }
})

