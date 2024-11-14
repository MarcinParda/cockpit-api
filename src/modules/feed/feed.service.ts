import { Inject, Injectable } from '@nestjs/common';
import { IFeedRepository } from './feed.repository';

@Injectable()
export class FeedService {
  constructor(
    @Inject('IFeedsRepository')
    private readonly feedsRepository: IFeedRepository,
  ) {}

  public async getLastWeekFeedUrls(): Promise<string[]> {
    const lastWeek = new Date();
    lastWeek.setDate(lastWeek.getDate() - 7);
    return this.feedsRepository.getFeedUrlsSince(lastWeek);
  }
}
