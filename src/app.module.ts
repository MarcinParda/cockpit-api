import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { SwaggerModule } from './modules/swagger/swagger.module';
import { ApiKeyModule } from './modules/api-key/api-key.module';
import { NotionModule } from './modules/notion/notion.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SwaggerModule,
    ApiKeyModule,
    NotionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
