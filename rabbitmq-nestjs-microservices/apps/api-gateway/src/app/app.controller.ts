import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { MiCROSERVICES_CLIENTS } from '../../constants';
import { Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject(MiCROSERVICES_CLIENTS.RABBITMQ_SERVICE)
    private readonly rabbitmqClient: ClientProxy,
  ) {}

  @Get()
  getData() {
    return this.appService.getData();
  }
  @Post('order')
  createOrder(@Body() order: any) {
    this.rabbitmqClient.emit('order-created', order);
    return { message: 'order sended to rabbitmq', order };
  }
}
