import { Module } from '@nestjs/common';
import { TelegrambotServicesModule } from '../../frameworks/crm-services/telegrambot/telegrambot-service.module';
import { TheMovieDbAPIServicesModule } from '../../frameworks/crm-services/themoviedb/themoviedb-service.module';
@Module({
  imports: [TelegrambotServicesModule, TheMovieDbAPIServicesModule],
  exports: [TelegrambotServicesModule, TheMovieDbAPIServicesModule],
})
export class CrmServicesModule {}
