import { Body, Controller, Post, Get } from '@nestjs/common'
import { ConfigModule } from "@nestjs/config"
import configuration from './configuration/configuration'
import { RmqModule } from './rmq/rmq.module'
import { NEW_ORDER_FROM_VTEX } from './constants/services'
import NewOrderService from './app.service'
import { CreateNewOrderDTO } from './dto/CreateNewOrderDTO'

@Controller("newOrder")
export default class NewOrderController {
    constructor(private readonly newOrderService: NewOrderService ){}

    @Post()
    async createNewOrder(@Body()createNewOrder: CreateNewOrderDTO): Promise<any> {
        //TODO: Crear Endpoint para crear ordenes por medio de POST
    }

    @Get()
    async automaticCreateNewOrder(): Promise<any> {
        try {
            console.log("inicia")
            const order = await this.newOrderService.automaticCreateNewOrder();
            this.newOrderService.sendOrder(order)
            return order
        }
        catch(e){
            
        }
        return 200

    }


}