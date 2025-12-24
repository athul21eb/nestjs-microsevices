import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MiCROSERVICES_CLIENTS } from '../../constants';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: MiCROSERVICES_CLIENTS.RABBITMQ_SERVICE,
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://athul:vimal@localhost:5672'],
          queue: 'order_queue',
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
