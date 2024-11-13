import { Test, TestingModule } from '@nestjs/testing';
import { SwaggerModule } from './swagger.module';
import { SwaggerService } from './swagger.service';

describe('SwaggerModule', () => {
  let swaggerService: SwaggerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [SwaggerModule],
    }).compile();

    swaggerService = module.get<SwaggerService>(SwaggerService);
  });

  it('should be defined', () => {
    expect(swaggerService).toBeDefined();
  });
});
