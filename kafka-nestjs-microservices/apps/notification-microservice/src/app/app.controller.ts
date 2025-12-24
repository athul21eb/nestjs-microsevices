import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @MessagePattern("order-created")
  handleOrderCreated(@Payload() data: any) {
    console.log('[Notification Microservice] :Sending notification for Order created:', data);
  }

  @MessagePattern("payment-success")
  handlePaymentSuccess(@Payload() data: any) {
    console.log('[Notification Microservice] :Sending notification for Payment success:', data);
  }
}
