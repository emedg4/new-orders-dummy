import { Body, Controller, Post, Get, Put } from '@nestjs/common'
import { ConfigModule } from "@nestjs/config"
import configuration from './configuration/configuration'
import { RmqModule } from './rmq/rmq.module'
import { NEW_ORDER_FROM_VTEX } from './constants/services'
import NewOrderService from './app.service'
import { CreateNewOrderDTO } from './dto/CreateNewOrderDTO'
import { ModifyOrderStatusDTO } from './dto/modifyOrderStatus'

@Controller()
export default class NewOrderController {
    constructor(private readonly newOrderService: NewOrderService ){}

    @Post()
    async createNewOrder(@Body()createNewOrder: CreateNewOrderDTO): Promise<any> {
        //TODO: Crear Endpoint para crear ordenes por medio de POST
    }

    @Get("newOrder")
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

    @Put()
    async modifyOrderStatus(@Body() body: ModifyOrderStatusDTO) {
        this.newOrderService.modifyOrder(body);
        return 200
    }


}