import { Module } from '@nestjs/common';
import { FeedService } from './feed.service';
import { FeedController } from './feed.controller';
import { FeedRepository } from './feed.repository';

@Module({
  providers: [
    FeedService,
    {
      provide: 'IFeedsRepository',
      useClass: FeedRepository,
    },
  ],
  controllers: [FeedController],
  exports: [FeedService],
})
export class FeedModule {}
