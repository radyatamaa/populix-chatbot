import { Module } from '@nestjs/common';
import { DataServicesModule } from '../../services/data-services/data-services.module';
import { CrmServicesModule } from '../../services/crm-services/crm-services.module';
import { CustomerFactoryService } from './customer-factory.service';
import { CustomerUseCases } from './customer.use-case';
import { CardManagerUseCasesModule } from '../card-manager/card-manager-cases.module';

@Module({
  imports: [DataServicesModule, CardManagerUseCasesModule],
  providers: [CustomerFactoryService, CustomerUseCases],
  exports: [CustomerFactoryService, CustomerUseCases],
})
export class CustomerUseCasesModule {}
