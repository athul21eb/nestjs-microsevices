import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller('users')
export class UsersController {
  @MessagePattern({ cmd: 'get-user' })
  getUser(id: number) {
    return {
      message: 'user created successfully',
      user: { id, name: 'athul', age: 20, productId: 12 },
    };
  }
}
