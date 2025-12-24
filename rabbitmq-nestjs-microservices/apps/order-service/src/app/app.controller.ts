import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy, MessagePattern, Payload } from '@nestjs/microservices';
import { MICROSERVICES_CLIENTS } from 'apps/order-service/constants';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    @Inject(MICROSERVICES_CLIENTS.PAYMENT_SERVICE)
    private readonly paymentClient: ClientProxy,
    @Inject(MICROSERVICES_CLIENTS.NOTIFICATION_SERVICE)
    private readonly notificationClient: ClientProxy,
  ) {}

  @Get()
  getData() {
    
    return this.appService.getData();
  }

  @MessagePattern("order-created")
  handleCreateOrder(@Payload()order:any){

    ////Simulate Order Processing

console.log("[Order Service]:Order Created",order);

this.paymentClient.emit("payment-order-initiated",order);
this.notificationClient.emit("order-created",order);
  }
}
