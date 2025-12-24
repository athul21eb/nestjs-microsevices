import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientKafka, MessagePattern, Payload } from '@nestjs/microservices';
import { MICROSERVICES_CLIENTS } from 'apps/order-microservice/constants';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject(MICROSERVICES_CLIENTS.KAFKA_SERVICE)
    private readonly kafkaService: ClientKafka,
  ) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @MessagePattern('order-created')
  handleOrderCreated(@Payload() order: any) {
    console.log('[Order Service]: Received new Order', order);
    //// Simulate Order placing....

    this.kafkaService.emit('payment-processing', order);
  }
}
