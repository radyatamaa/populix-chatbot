import { Module } from '@nestjs/common';
import {
  AppController,
  CustomerController,
  WebhookController,
} from './controllers';
import { DataServicesModule } from './services/data-services/data-services.module';
import { CrmServicesModule } from './services/crm-services/crm-services.module';
import { CardManagerUseCasesModule } from './use-cases/card-manager/card-manager-cases.module';
import { WebhookUseCasesModule } from './use-cases/webhook/webhook-cases.module';
import { CustomerUseCasesModule } from './use-cases/customer/customer-cases.module';

@Module({
  imports: [
    DataServicesModule,
    CrmServicesModule,
    CardManagerUseCasesModule,
    WebhookUseCasesModule,
    CustomerUseCasesModule
  ],
  controllers: [
    AppController,
    WebhookController,
    CustomerController
  ],
  providers: [],
})
export class AppModule {}
