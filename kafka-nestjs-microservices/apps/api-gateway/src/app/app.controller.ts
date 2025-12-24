import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { MICROSERVICES_CLIENTS } from 'apps/api-gateway/constants';
import { ClientKafka } from '@nestjs/microservices';
import { CreateOrderDto } from './dto/create-order.dto';

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

  @Post('order')
  createOrder(@Body() createOrderDto: CreateOrderDto) {
    this.kafkaService.emit('order-created', createOrderDto);
    return {
      message: 'Order successfully sent to Kafka error 🚀',
      order: createOrderDto,
    };
  }
}
