import { Module } from '@nestjs/common';
import { DataServicesModule } from '../../services/data-services/data-services.module';
import { CrmServicesModule } from '../../services/crm-services/crm-services.module';
import { WebhookFactoryService } from './webhook-factory.service';
import { WebhookUseCases } from './webhook.use-case';
import { CardManagerUseCasesModule } from '../card-manager/card-manager-cases.module';

@Module({
  imports: [DataServicesModule, CardManagerUseCasesModule],
  providers: [WebhookFactoryService, WebhookUseCases],
  exports: [WebhookFactoryService, WebhookUseCases],
})
export class WebhookUseCasesModule {}
