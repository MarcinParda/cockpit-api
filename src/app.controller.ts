import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiKeyGuard } from './api-key.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/protected')
  @UseGuards(ApiKeyGuard)
  getProtected(): string {
    return this.appService.getHello();
  }

  @Get('/health')
  getHealth(): string {
    return 'OK';
  }
}
