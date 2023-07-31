import { Injectable } from '@nestjs/common';
import { ChatHistory, ChatHistoryMessages, CurrentFormRealm, Customer, Options, PayloadCallbackData } from '../../core/entities';
import { IDataElasticSearchServices, IDataMysqlServices } from '../../core/abstracts';
import { RequestWebhookDto, RequestWebhookTextDto } from '../../core/dtos';
import { CustomerFactoryService } from './customer-factory.service';
import { CONTENT } from '../../configuration';
import { CardManagerUseCases } from '../card-manager/card-manager.use-case';
import * as moment from 'moment'
import {Like} from "typeorm";
import { v4 as uuid } from 'uuid';

const {
    col: sequelizeCol,
    fn: sequelizeFn,
    literal: sequelizeLiteral,
    Op
  } = require('sequelize')

@Injectable()
export class CustomerUseCases {
  constructor(
    private dataServices: IDataMysqlServices,
    private customerFactoryService: CustomerFactoryService,
    private cardManagerUsecase: CardManagerUseCases,
    private esDataServices: IDataElasticSearchServices,
  ) {}

 async GetAllCustomers(): Promise<Customer[]> {
    return this.dataServices.customers.getAll();
 }

 async GetConversationCustomer(customerId: number,limit: number,offset: number): Promise<any> {
    const query = await this.esDataServices.chatHistory.searchIndex(customerId,limit,offset);
    const result = [];
    
    for (let i = 0; i < query.body.hits.hits.length; i++) {
        const ch = this.customerFactoryService.toChatHistory(query.body.hits.hits[i]._source);
        result.push(ch);
    }

    return result;
 }

}
