import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy, MessagePattern, Payload } from '@nestjs/microservices';
import { MICROSERVICES_CLIENTS } from 'apps/payment-service/constants';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    @Inject(MICROSERVICES_CLIENTS.NOTIFICATION_SERVICE)
    private readonly notificationClient: ClientProxy,
  ) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @MessagePattern("payment-order-initiated")
  handlePaymentOrderProcessing(@Payload() order: any) {
    console.log("[Payment Service]:Order Processing",order);
    //// Simulates the payment processing
    this.notificationClient.emit("payment-success",order);

  }


}
