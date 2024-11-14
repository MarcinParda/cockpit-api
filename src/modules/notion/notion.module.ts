import { Module, Global } from '@nestjs/common';
import { Client, LogLevel } from '@notionhq/client';

@Global()
@Module({
  providers: [
    {
      provide: 'NOTION',
      useFactory: () => {
        const logLevel = process.env.CI ? LogLevel.INFO : LogLevel.DEBUG;
        return new Client({ auth: process.env.NOTION_API_KEY, logLevel });
      },
    },
  ],
  exports: ['NOTION'],
})
export class NotionModule {}
