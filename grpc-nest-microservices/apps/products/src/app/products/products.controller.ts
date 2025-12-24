import { Controller } from '@nestjs/common';
import { Observable } from 'rxjs';
import {
  GetProductsRequest,
  GetProductsResponse,
  ProductsController,
  ProductsControllerMethods,
} from 'types/proto/products';

@Controller('products')
@ProductsControllerMethods()
export class ProductsGrpcController implements ProductsController {
  getProducts(request: GetProductsRequest): Promise<GetProductsResponse> | Observable<GetProductsResponse> | GetProductsResponse {
    return {
      productId: request.productId,
      name: 'Laptop',
      price: 100000,
    };
  }
}
