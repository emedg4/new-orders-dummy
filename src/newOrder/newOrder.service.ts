import { Inject, Injectable, Logger } from '@nestjs/common'
import { MODIFY_ORDERS, NEW_ORDER_FROM_VTEX } from './constant/services'
import { CreateNewOrderDTO } from './dto/CreateNewOrderDTO'
import { MetodoPago, Tienda, MetodoEnvio, Cliente, Vitrina, EstatusPago } from "./constant/PedidoData"
import { ClientProxy } from '@nestjs/microservices'
import { ModifyOrderStatusDTO } from './dto/modifyOrderStatus'
import { NewOrderModel } from './newOrder.model'
@Injectable()
export default class NewOrderService {
    private readonly logger : Logger
    constructor(
        private newOrderModel: NewOrderModel,
        @Inject(MODIFY_ORDERS) private modifyOrderClient: ClientProxy,
        @Inject(NEW_ORDER_FROM_VTEX) private newOrderClient: ClientProxy){
        this.logger = new Logger(NewOrderService.name)

    }



    public sendOrder(order:CreateNewOrderDTO): void {
        
        this.newOrderClient.emit("newOrder", order)
        this.logger.log(order, "Creacion de nuevo Pedido")
        return
    }

    public modifyOrder(data: ModifyOrderStatusDTO){
        this.modifyOrderClient.emit("modifyOrder", data)
        this.logger.log(`Modified order ${data.pedido} status from ${data.status_previo} to ${data.status_nuevo} `)

        return

    }


    public async automaticCreateNewOrder(): Promise<CreateNewOrderDTO> {

        const pedido: string = await this.orderNumberGenerator()

        let n = this.randomNumberGenerator(MetodoPago.length);
        const metodoPago: string =  MetodoPago[n];

        n = this.randomNumberGenerator(Tienda.length);
        const tienda: string = Tienda[n];

        n = this.randomNumberGenerator(MetodoEnvio.length);
        const metodoEnvio: string = MetodoEnvio[n];

        n = this.randomNumberGenerator(Cliente.length);
        const cliente: string = Cliente[n]

        n = this.randomNumberGenerator(Vitrina.length)
        const vitrina: string = Vitrina[n]

        n = this.randomNumberGenerator(EstatusPago.length);
        const estatus_pago: string = EstatusPago[n];

        const tenant: any = await this.getTenant()

        if(tenant === null){
            return null;
        }else{

            const order: CreateNewOrderDTO = {
                pedido: pedido,
                metodo_pago: metodoPago,
                tienda: tienda,
                metodo_envio: metodoEnvio,
                cliente: cliente,
                fecha_creacion: new Date(),
                vitrina: vitrina,
                estatus_pago: estatus_pago,
                tenant: tenant
            }
            return order;
        }
    }

    private async orderNumberGenerator(): Promise<string> {
        let string = `P`;
        for (let index = 0; index < 15; index++) {
            let n = Math.floor(Math.random() * 10);
            string = string + n.toString()
        }
        return string;
    }

    private randomNumberGenerator( n: number){

        const num: number = Math.floor(Math.random() * n);
        
        return num

    }

    private async getTenant(){
        const tenants: Array<any> = await this.newOrderModel.getAll()
        const n = this.randomNumberGenerator(tenants.length);
        const tenant: any = tenants[n];

        if(tenant == undefined){
            return null
        }
        else{
            return tenant
        }
    }

    public async createTenant( name: string ){
        const exists = await this.newOrderModel.findByName(name);

        if(exists[0] == undefined){

            const createdTenant = await this.newOrderModel.create(name);
            this.logger.log(`Tenant created: ${createdTenant}`);
    
            return createdTenant;
        }
        else{
            return 200
        }

    }

    public async deleteTenant(){

    }

    public async modifyTenant(){

    }

    public async getAllTenants(){
        return await this.newOrderModel.getAll();
    }



}