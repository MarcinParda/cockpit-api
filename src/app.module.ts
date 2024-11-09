import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { SwaggerModule } from './swagger/swagger.module';
import { ApiKeyModule } from './api-key/api-key.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SwaggerModule,
    ApiKeyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
