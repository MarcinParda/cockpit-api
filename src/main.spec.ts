import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from './app.module';
import { bootstrap } from './main';
import { ConfigService } from '@nestjs/config';
import { SwaggerService } from './swagger/swagger.service';

describe('Bootstrap', () => {
  let app;
  let configService: ConfigService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    configService = app.get(ConfigService);
    await app.init();
  });

  it('should set global prefix to "api"', async () => {
    await bootstrap();
    expect(
      app
        .getHttpAdapter()
        .getInstance()
        ._router.stack.some((layer) => layer.regexp.test('/api')),
    ).toBe(true);
  });

  it('should use the port from ConfigService or default to 3000', async () => {
    const port = configService.get<number>('PORT') || 3000;
    await bootstrap();
    expect(app.getHttpServer().address().port).toBe(port);
  });

  it('should setup Swagger', async () => {
    const setupSpy = jest.spyOn(SwaggerService, 'setup');
    await bootstrap();
    expect(setupSpy).toHaveBeenCalled();
  });

  afterAll(async () => {
    await app.close();
  });
});
