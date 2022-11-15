import { Body, Controller, Post, Get, Put, Delete } from '@nestjs/common'
import { CreatedTenantHttpResponse, NOTENANTSFOUND } from './constant/respuestasHttp';
import { CREATE_TENANT, DELETE_TENANT, GET_ALL_TENANTS, MODIFY_TENANT, NEW_ORDER } from './constant/uris';
import { CreateTenant } from './dto/createTenant.dto';
import { ModifyOrderStatusDTO } from './dto/modifyOrderStatus'
import { TenantEntity } from './entities/tenants.entity';
import NewOrderService from './newOrder.service'

@Controller()
export default class NewOrderController {
    constructor(private readonly newOrderService: NewOrderService ){}

    @Get(NEW_ORDER)
    async automaticCreateNewOrder(): Promise<any> {
        try {
            const order = await this.newOrderService.automaticCreateNewOrder();
            if(order == null){
                console.log("No hay tenants")
                return NOTENANTSFOUND
            }
            else{
                this.newOrderService.sendOrder(order)
                console.log(`Tenant encontrado: ${order.tenant}`)
                return order

            }
        }
        catch(e){
            console.log(e)
            return
        }

    }

    @Put()
    async modifyOrderStatus(@Body() body: ModifyOrderStatusDTO) {
        this.newOrderService.modifyOrder(body);
        return 200
    }

    @Post(CREATE_TENANT)
    async createTenant(@Body() body: CreateTenant) {
        try {
            const createdTenant = await this.newOrderService.createTenant(body.name)
            const createdTenantHttpResponse:CreatedTenantHttpResponse = new CreatedTenantHttpResponse(body.name);


            if(createdTenant == 200){
                const response = await createdTenantHttpResponse.tenantAlreadyExists()
                return response;
            }
            else{

                const response = await createdTenantHttpResponse.tenantCreated()
                return response;
            }
        } catch (e) {
            console.log(e)
            return
        }
    }
    @Get(GET_ALL_TENANTS)
    async getAllTenants(){
        return await this.newOrderService.getAllTenants()
    }

    @Put(MODIFY_TENANT)
    async modifyTenant(){

    }

    @Delete(DELETE_TENANT)
    async deleteTenant(@Body() body: CreateTenant){
        return await this.newOrderService.deleteTenant(body.name)

    }


}