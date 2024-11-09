import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiKeyGuard } from './api-key/api-key.guard';

describe('AppController', () => {
  let app: INestApplication;
  const appService = { getHello: () => 'Hello World!' };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: AppService,
          useValue: appService,
        },
      ],
    })
      .overrideGuard(ApiKeyGuard)
      .useValue({ canActivate: () => true })
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/protected (GET)', () => {
    return request(app.getHttpServer())
      .get('/protected')
      .expect(200)
      .expect('Hello World!');
  });

  it('/health (GET)', () => {
    return request(app.getHttpServer()).get('/health').expect(200).expect('OK');
  });

  afterAll(async () => {
    await app.close();
  });
});
