import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ProductsGrpcController } from './products/products.controller';

@Module({
  imports: [],
  controllers: [AppController, ProductsGrpcController],
  providers: [AppService],
})
export class AppModule {}
