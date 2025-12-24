import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class AppService {

  constructor(private jwtService: JwtService) {}


  login(_Credentials: { username: string; password: string }) {
    // HardCoded user: Not good for Production

    if (
      _Credentials.username === 'athul' &&
      _Credentials.password === '10athul10'
    ) {
      const payload = {
        sub: '123456',
        username: _Credentials.username,
        role: 'user',
      };
      return { token: this.jwtService.sign(payload) };
    }
    throw new RpcException({
      statusCode: 401,
      message: 'Invalid Credentials',
    });
  }

  validateToken(_token: string) {
    try{
      const decoded =  this.jwtService.verify(_token)
      return {valid:true,userId:decoded.sub,role:decoded.role}
    }catch{
      return {valid:false,userId:null,role:null}
    }

  }


  getData(): any {
    return { message: 'Hello API' };
  }
}
