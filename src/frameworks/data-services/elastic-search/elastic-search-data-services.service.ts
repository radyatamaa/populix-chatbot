import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IDataElasticSearchServices } from '../../../core';
import {
  ChatHistory, ChatHistoryIndex, eSindex,
} from './model';
import { ElasticSearchGenericRepository } from './elastic-search-generic-repository';
import { ElasticsearchService } from '@nestjs/elasticsearch';

@Injectable()
export class ElasticSearchDataServices
  implements IDataElasticSearchServices, OnApplicationBootstrap
{
  chatHistory: ElasticSearchGenericRepository<ChatHistory>;

  constructor(
    private readonly ElasticsearchService: ElasticsearchService,
  ) {}

  onApplicationBootstrap() {
    this.chatHistory = new ElasticSearchGenericRepository<ChatHistory>(this.ElasticsearchService,{index:"chat_history",type:"chat_historys"} as eSindex);
  }
}
