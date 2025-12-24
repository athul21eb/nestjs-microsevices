import { Controller, Inject, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../guards/auth/auth.guard';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Controller('user')
export class UserController {
  constructor(
    @Inject('USER_SERVICE') private readonly userTcpClient: ClientProxy,
  ) {}

  @UseGuards(AuthGuard)
  @Post('profile')
  async profile(@Request() req) {
    const user$ =  this.userTcpClient.send('user.profile', req.user.id);
    return await firstValueFrom(user$)
  }
}
