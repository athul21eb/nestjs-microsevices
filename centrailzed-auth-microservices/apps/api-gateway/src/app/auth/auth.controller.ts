import { Body, Controller, HttpException, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authTcpClient: ClientProxy,
  ) {}
  @Post()
  async Login(@Body() LoginData: { username: string; password: string }) {
    try {
      return await firstValueFrom(
        this.authTcpClient.send('auth.login', LoginData),
      );
    } catch (error) {
      // Handle RpcException from microservice
      if (error.error && error.error.statusCode) {
        throw new HttpException(
          error.error.message || 'An error occurred',
          error.error.statusCode,
        );
      }
      // Re-throw if it's a different error
      throw error;
    }
  }
}
