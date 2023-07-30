import { Module } from '@nestjs/common';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { IDataElasticSearchServices } from '../../../core';

import { ElasticSearchDataServices } from './elastic-search-data-services.service';

@Module({
  imports: [
    ElasticsearchModule.register({
      node: 'http://127.0.0.1:9200',
      headers : {
        'content-type':'application/x-ndjson',
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
