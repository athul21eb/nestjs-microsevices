import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule } from '@nestjs/microservices';
import { Transport } from '@nestjs/microservices';
import { MICROSERVICES_CLIENTS } from '../../constants';
@Module({
  imports: [
    ClientsModule.register([
      {
        name: MICROSERVICES_CLIENTS.NOTIFICATION_SERVICE,
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://athul:vimal@localhost:5672'],
          queue: 'notification_queue',
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
