import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authTcpClient: ClientProxy,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    if (!request?.headers?.authorization) {
      throw new UnauthorizedException('Token missing');
    }
    const token = request.headers.authorization?.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('Invalid token');
    }
    const user = await firstValueFrom(
      this.authTcpClient.send('auth.validate', token),
    );
    if (!user?.valid || !user?.userId || !user?.role || user?.role==="admin") {
      throw new UnauthorizedException('Invalid User');
    }
    request.user = { id: user.userId, role: user.role };

    return true;
  }
}
