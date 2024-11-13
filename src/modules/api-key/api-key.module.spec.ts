import { Test, TestingModule } from '@nestjs/testing';
import { ApiKeyGuard } from './api-key.guard';
import { ApiKeyModule } from './api-key.module';

describe('ApiKeyModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [ApiKeyModule],
    }).compile();
  });

  it('should be defined', () => {
    const apiKeyModule = module.get<ApiKeyModule>(ApiKeyModule);
    expect(apiKeyModule).toBeDefined();
  });

  it('should export ApiKeyGuard', () => {
    const apiKeyGuard = module.get<ApiKeyGuard>(ApiKeyGuard);
    expect(apiKeyGuard).toBeDefined();
  });
});
