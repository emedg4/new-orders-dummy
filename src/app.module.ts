import { Module } from '@nestjs/common'
import { ConfigModule } from "@nestjs/config"
import configuration from './configuration/configuration'
import { RmqModule } from './rmq/rmq.module'
import { NEW_ORDER_FROM_VTEX } from './constants/services'
import NewOrderController from './app.controller'
import NewOrderService from './app.service'

@Module({
    imports: [ ConfigModule.forRoot({
        isGlobal: true,
        load: [configuration]
    }),
        RmqModule.register({ name : NEW_ORDER_FROM_VTEX })],
    controllers: [NewOrderController],
    providers: [NewOrderService]
})

export class AppModule {}
