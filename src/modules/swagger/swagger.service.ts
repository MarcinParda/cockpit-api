import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export class SwaggerService {
  static setup(app: INestApplication): void {
    const config = new DocumentBuilder()
      .setTitle('API Documentation')
      .setDescription('The API description')
      .setVersion('1.0')
      .addApiKey(
        { type: 'apiKey', name: 'cockpit-api-key', in: 'header' },
        'api-key',
      )
      .addSecurity('api-key', {
        type: 'apiKey',
        name: 'cockpit-api-key',
        in: 'header',
      })
      .addSecurityRequirements('api-key')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);
  }
}
