import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientKafka, MessagePattern, Payload } from '@nestjs/microservices';
import { MICROSERVICES_CLIENTS } from 'apps/payments-microservice/constants';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject(MICROSERVICES_CLIENTS.KAFKA_SERVICE)
    private readonly kafkaClient: ClientKafka,
  ) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @MessagePattern('payment-processing')
  handlePaymentProcessing(@Payload() data: any) {
    console.log('[Payments Microservice]: Payment processing:', data);
    // simulates payment processing
    this.kafkaClient.emit('payment-success', data);
  }
}
