import { Module } from '@nestjs/common';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { CONFIG_ELASTIC_SEARCH } from 'src/configuration';
import { IDataElasticSearchServices } from '../../../core';

import { ElasticSearchDataServices } from './elastic-search-data-services.service';

@Module({
  imports: [
    ElasticsearchModule.register({
      node: CONFIG_ELASTIC_SEARCH.searchConfig.node,
      headers : {
        // 'content-type':'application/x-ndjson',
        'content-type':'application/json',
      }
    })
  ],
  providers: [
    {
      provide: IDataElasticSearchServices,
      useClass: ElasticSearchDataServices,
    },
  ],
  exports: [IDataElasticSearchServices],
})
export class ElasticSearchDataServicesModule {}
