import { Module } from '@nestjs/common';
import { ApiKeyGuard } from './api-key.guard';

@Module({
  providers: [ApiKeyGuard],
  exports: [ApiKeyGuard],
})
export class ApiKeyModule {}
