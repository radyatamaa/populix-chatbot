import { Module } from '@nestjs/common';
import { SalesforceServicesModule } from '../../frameworks/crm-services/salesforce/salesforce-service.module';
import { TelegrambotServicesModule } from '../../frameworks/crm-services/telegrambot/telegrambot-service.module';
import { TheMovieDbAPIServicesModule } from '../../frameworks/crm-services/themoviedb/themoviedb-service.module';
@Module({
  imports: [SalesforceServicesModule,TelegrambotServicesModule, TheMovieDbAPIServicesModule],
  exports: [SalesforceServicesModule,TelegrambotServicesModule, TheMovieDbAPIServicesModule],
})
export class CrmServicesModule {}
