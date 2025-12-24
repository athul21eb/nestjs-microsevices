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

  @MessagePattern('payment-success')
  handlePaymentSuccess(@Payload() order: any) {
    console.log('[Notification Service]:Payment Success Email Sended ', order);
  }

  @MessagePattern('order-created')
  handleOrderCreated(@Payload() order: any) {
    console.log('[Notification Service]:Order Created Email Sended ', order);
  }
}
