import { Controller, Get, Inject, OnModuleInit, Query } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import {
  PRODUCTS_PACKAGE_NAME,
  ProductsClient,
  PRODUCTS_SERVICE_NAME,
} from 'types/proto/products';

@Controller('products')
export class ProductsController implements OnModuleInit {
  private productsServiceClient: ProductsClient;

  constructor(
    @Inject(PRODUCTS_PACKAGE_NAME) private readonly grpcClient: ClientGrpc,
  ) {}

  onModuleInit() {
    this.productsServiceClient = this.grpcClient.getService<ProductsClient>(
      PRODUCTS_SERVICE_NAME,
    );
  }

  @Get()
  findOne(@Query("id") id: string){
    const productId = Number(id)?? 1;
    return this.productsServiceClient.getProducts({productId});
  }
}
