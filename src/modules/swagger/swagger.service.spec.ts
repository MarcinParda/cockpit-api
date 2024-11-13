import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SwaggerService } from './swagger.service';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

describe('SwaggerService', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      providers: [SwaggerService],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should set up Swagger documentation', () => {
    const setupSpy = jest.spyOn(SwaggerModule, 'setup');
    const createDocumentSpy = jest.spyOn(SwaggerModule, 'createDocument');

    SwaggerService.setup(app);

    expect(createDocumentSpy).toHaveBeenCalledTimes(1);
    expect(setupSpy).toHaveBeenCalledWith('api/docs', app, expect.any(Object));
  });

  it('should create a document with correct configuration', () => {
    const createDocumentSpy = jest.spyOn(SwaggerModule, 'createDocument');

    SwaggerService.setup(app);

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

    expect(createDocumentSpy).toHaveBeenCalledWith(app, config);
  });
});
