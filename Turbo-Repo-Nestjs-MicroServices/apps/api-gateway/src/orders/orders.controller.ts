import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { MICROSERVICES_CLIENTS } from 'src/constants';

@Controller('orders')
export class OrdersController {
  constructor(
    @Inject(MICROSERVICES_CLIENTS.ORDER_SERVICE)
    private orderClient: ClientProxy,
    @Inject(MICROSERVICES_CLIENTS.USER_SERVICE)
    private userClient: ClientProxy,
    @Inject(MICROSERVICES_CLIENTS.PRODUCT_SERVICE)
    private productClient: ClientProxy,
  ) {}
  @Post()
  async createOrder(@Body('id') id: number) {
    console.log('id---------', id);
    const userResponse: {
      user?: {
        productId?: number;
        [key: string]: unknown;
      };
      [key: string]: unknown;
    } = await firstValueFrom(this.userClient.send({ cmd: 'get-user' }, id));

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
      this.productClient.send(
        { cmd: 'get-product' },
        userResponse?.user?.productId,
      ),
    );
    return this.orderClient.send('create-order', {
      orderId: crypto.randomUUID(),
      user: userResponse?.user,
      productId: productResponse?.product?.id,
    });
  }
}
