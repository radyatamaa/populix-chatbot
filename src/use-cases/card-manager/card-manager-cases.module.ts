import { Module } from '@nestjs/common';
import { DataServicesModule } from '../../services/data-services/data-services.module';
import { CrmServicesModule } from '../../services/crm-services/crm-services.module';
import { CardManagerFactoryService } from './card-manager-factory.service';
import { CardManagerUseCases } from './card-manager.use-case';

@Module({
  imports: [DataServicesModule, CrmServicesModule],
  providers: [CardManagerFactoryService, CardManagerUseCases],
  exports: [CardManagerFactoryService, CardManagerUseCases],
})
export class CardManagerUseCasesModule {}
