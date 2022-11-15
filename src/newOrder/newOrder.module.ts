import { Module } from '@nestjs/common'
import { ConfigModule } from "@nestjs/config"
import { MODIFY_ORDERS, NEW_ORDER_FROM_VTEX } from './constant/services'
import NewOrderController from './newOrder.controller'
import NewOrderService from './newOrder.service'
import configuration from 'src/configuration/configuration'
import { RmqModule } from 'src/rmq/rmq.module'
import { ModifyOrderMicroserviceModule } from 'src/rmq/modifyOrderMicroservice/modifyOrderMicroservice.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TenantEntity } from './entities/tenants.entity'
import { NewOrderModel } from './newOrder.model'

@Module({
    imports: [ ConfigModule.forRoot({
        isGlobal: true,
        load: [configuration]
    }),
        RmqModule.register({ 
            name : NEW_ORDER_FROM_VTEX
         }),

        ModifyOrderMicroserviceModule.register({ 
            name: MODIFY_ORDERS
         }),

         TypeOrmModule.forFeature([TenantEntity])
    ],
    controllers: [NewOrderController],
    providers: [NewOrderService, NewOrderModel]
})

export class NewOrderModule {}
