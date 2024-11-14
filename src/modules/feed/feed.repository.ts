import { Inject, Injectable } from '@nestjs/common';
import { Client } from '@notionhq/client';

export interface IFeedRepository {
  getFeedUrlsSince(date: Date): Promise<string[]>;
}

export interface ReaderDatabaseItem {
  properties: {
    link: {
      url: string;
    };
  };
}

@Injectable()
export class FeedRepository implements IFeedRepository {
  constructor(@Inject('NOTION') private readonly notion: Client) {}

  private async queryReaderDatabase(date: Date, startCursor?: string) {
    return await this.notion.databases.query({
      database_id: process.env.NOTION_READER_DATABASE_ID,
      filter: {
        and: [
          {
            property: 'created_at',
            date: {
              on_or_after: date.toJSON(),
            },
          },
        ],
      },
      start_cursor: startCursor,
    });
  }

  private mapResponseToFeeds(response: ReaderDatabaseItem[]): string[] {
    return response.map((item) => item.properties.link.url);
  }

  public async getFeedUrlsSince(date: Date): Promise<string[]> {
    const feeds: string[] = [];
    let startCursor: string | undefined;

    do {
      try {
        const response = await this.queryReaderDatabase(date, startCursor);
        startCursor = response.next_cursor;
        const results = response.results as unknown as ReaderDatabaseItem[];
        const newFeeds = this.mapResponseToFeeds(results);
        feeds.push(...newFeeds);
      } catch (err) {
        console.error(err);
        return [];
      }
    } while (startCursor);

    return feeds;
  }
}
