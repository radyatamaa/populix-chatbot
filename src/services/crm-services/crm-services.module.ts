import { Module } from '@nestjs/common';
import { SalesforceServicesModule } from '../../frameworks/crm-services/salesforce/salesforce-service.module';
import { TelegrambotServicesModule } from '../../frameworks/crm-services/telegrambot/telegrambot-service.module';
@Module({
  imports: [SalesforceServicesModule,TelegrambotServicesModule],
  exports: [SalesforceServicesModule,TelegrambotServicesModule],
})
export class CrmServicesModule {}
