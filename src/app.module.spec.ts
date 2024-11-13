import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from './app.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { SwaggerModule } from './modules/swagger/swagger.module';
import { ApiKeyModule } from './modules/api-key/api-key.module';

describe('AppModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
  });

  it('should be defined', () => {
    const appModule = module.get<AppModule>(AppModule);
    expect(appModule).toBeDefined();
  });

  it('should import ConfigModule', () => {
    const configModule = module.get<ConfigModule>(ConfigModule);
    expect(configModule).toBeDefined();
  });

  it('should import SwaggerModule', () => {
    const swaggerModule = module.get<SwaggerModule>(SwaggerModule);
    expect(swaggerModule).toBeDefined();
  });

  it('should import ApiKeyModule', () => {
    const apiKeyModule = module.get<ApiKeyModule>(ApiKeyModule);
    expect(apiKeyModule).toBeDefined();
  });

  it('should provide AppController', () => {
    const appController = module.get<AppController>(AppController);
    expect(appController).toBeDefined();
  });

  it('should provide AppService', () => {
    const appService = module.get<AppService>(AppService);
    expect(appService).toBeDefined();
  });
});
