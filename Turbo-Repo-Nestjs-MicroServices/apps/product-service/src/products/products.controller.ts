import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';

@Controller('products')
export class ProductsController {
  @MessagePattern({ cmd: 'get-product' })
  getProduct(id: number) {
    return {
      message: 'product created successfully',
      product: { id, name: 'laptop', price: 1000 },
    };
  }

  @EventPattern('order.created')
  checkProductStock(order: { Id: number; productId: number }) {
    console.log('checking the product is available', order.productId);
    console.log('stock updated');
  }
}
