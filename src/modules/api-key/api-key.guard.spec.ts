import { Test, TestingModule } from '@nestjs/testing';
import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { ApiKeyGuard } from './api-key.guard';

describe('ApiKeyGuard', () => {
  let guard: ApiKeyGuard;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApiKeyGuard],
    }).compile();

    guard = module.get<ApiKeyGuard>(ApiKeyGuard);
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });

  it('should return true if API key is valid', () => {
    const mockContext = {
      switchToHttp: jest.fn().mockReturnThis(),
      getRequest: jest.fn().mockReturnValue({
        headers: {
          'cockpit-api-key': 'valid-api-key',
        },
      }),
    } as unknown as ExecutionContext;

    process.env.API_KEY = 'valid-api-key';

    expect(guard.canActivate(mockContext)).toBe(true);
  });

  it('should throw UnauthorizedException if API key is invalid', () => {
    const mockContext = {
      switchToHttp: jest.fn().mockReturnThis(),
      getRequest: jest.fn().mockReturnValue({
        headers: {
          'cockpit-api-key': 'invalid-api-key',
        },
      }),
    } as unknown as ExecutionContext;

    process.env.API_KEY = 'valid-api-key';

    expect(() => guard.canActivate(mockContext)).toThrow(UnauthorizedException);
  });

  it('should throw UnauthorizedException if API key is missing', () => {
    const mockContext = {
      switchToHttp: jest.fn().mockReturnThis(),
      getRequest: jest.fn().mockReturnValue({
        headers: {},
      }),
    } as unknown as ExecutionContext;

    process.env.API_KEY = 'valid-api-key';

    expect(() => guard.canActivate(mockContext)).toThrow(UnauthorizedException);
  });
});
