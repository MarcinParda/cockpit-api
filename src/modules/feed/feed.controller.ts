import { Controller, Get } from '@nestjs/common';
import { FeedService } from './feed.service';

@Controller('feed')
export class FeedController {
  constructor(private readonly feedService: FeedService) {}

  @Get('last-week')
  async getLastWeekFeedUrls() {
    return this.feedService.getLastWeekFeedUrls();
  }
}
