import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsController } from './products/products.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PRODUCTS_PACKAGE_NAME } from 'types/proto/products';
import { join } from 'path';

@Module({
  imports: [ClientsModule.register([
    {name:PRODUCTS_PACKAGE_NAME,
      transport:Transport.GRPC,
      options:{
        package:PRODUCTS_PACKAGE_NAME,
        protoPath:join(__dirname,'proto/products.proto'),
      }
    }
  ])],
  controllers: [AppController, ProductsController],
  providers: [AppService],
})
export class AppModule {}
