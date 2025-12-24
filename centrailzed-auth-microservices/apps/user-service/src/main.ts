/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { readFileSync } from 'fs';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        host: 'localhost',
        port: 8888,
        tlsOptions: {
          key: readFileSync('./certs/server.key'),
          cert: readFileSync('./certs/server.crt'),
          ca: readFileSync('./certs/ca.crt'),
          requestCert: true,
          rejectUnauthorized: true,
        },
      },
    },
  );
  await app.listen();
  Logger.log(`🚀 User Service is running on TCP at port : 8888`);
}

bootstrap();
