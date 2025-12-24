import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData(): any {
    return this.appService.getData();
  }

  @MessagePattern("auth.login")
  login(@Payload() _Credentials:{username:string,password:string}){
    return this.appService.login(_Credentials)
  }

  @MessagePattern("auth.validate")
  validate(@Payload() _token:string){
    return this.appService.validateToken(_token)
  }
}
