import { Inject, Injectable, Logger } from '@nestjs/common'
import { NEW_ORDER_FROM_VTEX } from './constants/services'
import { CreateNewOrderDTO } from './dto/CreateNewOrderDTO'
import { MetodoPago, Tienda, MetodoEnvio, Cliente, Vitrina, EstatusPago } from "./constants/PedidoData"
import { ClientProxy } from '@nestjs/microservices'
@Injectable()
export default class NewOrderService {
    private readonly logger : Logger
    constructor(@Inject(NEW_ORDER_FROM_VTEX) private newOrderClient: ClientProxy){
        this.logger = new Logger(NewOrderService.name)

    }



    public sendOrder(order:CreateNewOrderDTO): void {
        
        this.newOrderClient.emit("newOrder", order)
        this.logger.log(order, "Creacion de nuevo Pedido")
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


        const order: CreateNewOrderDTO = {
            pedido: pedido,
            metodo_pago: metodoPago,
            tienda: tienda,
            metodo_envio: metodoEnvio,
            cliente: cliente,
            fecha_creacion: new Date(),
            vitrina: vitrina,
            estatus_pago: estatus_pago
        }
        return order;
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

}