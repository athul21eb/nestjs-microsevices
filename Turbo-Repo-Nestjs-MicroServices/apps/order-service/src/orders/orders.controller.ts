import { Controller, Inject } from '@nestjs/common';
import { ClientProxy, MessagePattern } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { MICROSERVICES_CLIENTS } from 'src/constants';

@Controller('orders')
export class OrdersController {
  constructor(
    @Inject(MICROSERVICES_CLIENTS.REDIS_PRODUCT_SERVICE)
    private productRedisClient: ClientProxy,
  ) {}

  @MessagePattern('create-order')
  async createOrder(order: {
    orderId?: number;
    productId?: number;
    [key: string]: unknown;
  }) {
    this.productRedisClient.emit('order.created', order);

    console.log({ message: 'order created successfully logged', order });
    const productResponse: {
      message?: string;
      product?: {
        id?: number;
        name?: string;
        price?: number;
        [key: string]: unknown;
      };
      [key: string]: unknown;
    } = await firstValueFrom(
      this.productRedisClient.send({ cmd: 'get-product' }, order.productId),
    );
    return {
      message: 'order created successfully',
      order,
      product: productResponse,
    };
  }
}
