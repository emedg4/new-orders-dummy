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
        url: process.env.RABBITMQ_URL || null
    }
})

