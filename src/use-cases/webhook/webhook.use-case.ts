import { Injectable } from '@nestjs/common';
import { ChatHistory, ChatHistoryMessages, CurrentFormRealm, Customer, Options, PayloadCallbackData } from '../../core/entities';
import { IDataElasticSearchServices, IDataMysqlServices } from '../../core/abstracts';
import { RequestWebhookDto, RequestWebhookTextDto } from '../../core/dtos';
import { WebhookFactoryService } from './webhook-factory.service';
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
export class WebhookUseCases {
  constructor(
    private dataServices: IDataMysqlServices,
    private webhookFactoryService: WebhookFactoryService,
    private cardManagerUsecase: CardManagerUseCases,
    private esDataServices: IDataElasticSearchServices,
  ) {}

 async handle(payload: any): Promise<any> {
    const requestBody = await this.webhookFactoryService.createWebhookRequestBody(payload);


    if (!requestBody.message.from.is_bot) {
        const customer = await this.customerInit(requestBody);

        if (requestBody.data) {
            await this.handleButton(requestBody,customer);
            return;
        }
        
        await this.handleHistoryMessage(requestBody,customer);
        
        if (customer.currentFormRealm) {
            await this.handleFormBuilder(requestBody,customer);
            return; 
        }

        let content = null;
        let cards = null;
        if (customer.phoneNumber == "" || customer.email == "") {
           await this.handleGettingStarted(customer);
           return;
        }

        let textPhase = requestBody.message.text;
        if (textPhase.toLowerCase().includes('Check'.toLowerCase())) {
            textPhase = 'Check';
        }

        content = await this.dataServices.contents.getAll({
            where: {
                keywords: Like(`%${textPhase.toLowerCase()}%`)
              }
        });

        if (content.length == 0) {
            await this.handleDefaultResponse(customer);
            return;
        }

        cards = await this.dataServices.cards.getAll({
            order: {
                sort: "ASC"
            },
            where: {
                contentId: content[0].id
            }
        })

        await this.cardManagerUsecase.send(cards,customer,{
            textPhase: requestBody.message.text
        } as Options);

        return;
    }
    
    return;
 }

 private async handleHistoryMessage(requestBody: RequestWebhookDto, customer: Customer) {
    let chatHistory = {
        id: uuid(),
        dateTime: moment().format('YYYY-MM-DD HH:mm:ss'),
        isFromBot: false,
        telegramId: customer.telegramId,
        messages: JSON.stringify({text: requestBody.message.text} as ChatHistoryMessages)
    } as ChatHistory

    await this.esDataServices.chatHistory.insertIndex(chatHistory);
 }
 
 private async handleButton(requestBody: RequestWebhookDto, customer: Customer): Promise<any> {
    const buttonData = JSON.parse(requestBody.data) as PayloadCallbackData
    const cards = await this.cardManagerUsecase.getContentCards(String(buttonData.redirect_content_id),{
        contentId: String(buttonData.redirect_content_id)
    })
    await this.cardManagerUsecase.send(cards,customer, { valueButton: buttonData.value} as Options);
    return;
 }

 private async handleFormBuilder(requestBody: RequestWebhookDto, customer: Customer) : Promise<any> {
    const currentFormRealm = JSON.parse(customer.currentFormRealm) as CurrentFormRealm;
    const cards = await this.dataServices.cards.get( String(currentFormRealm.card_id));
    await this.cardManagerUsecase.send([cards],customer, { answerFormBuilder: requestBody.message.text} as Options);
    return;
 }
 
 private async handleGettingStarted(customer: Customer) : Promise<any> {
    const welcomeContentId = CONTENT.welcomeMessageContentId;
    const cards = await this.cardManagerUsecase.getContentCards(welcomeContentId,{
        contentId: welcomeContentId
    })
    await this.cardManagerUsecase.send(cards,customer);
    return;          
 }

 private async handleDefaultResponse(customer: Customer) : Promise<any> {
    const defaultContent = CONTENT.defaultResponseContentId;
    const cards = await this.cardManagerUsecase.getContentCards(defaultContent,{
        contentId: defaultContent
    })
    await this.cardManagerUsecase.send(cards,customer);
    return;      
 }


 private async customerInit (requestBody: RequestWebhookDto) : Promise<Customer> {
    const createCustomer = await this.webhookFactoryService.createCustomer(requestBody);
    let customer = await this.dataServices.customers.getWithFilter({
        where: {
            telegramId: createCustomer.telegramId
        }
    })
    if (!customer){
        createCustomer.createdAt = moment().format('YYYY-MM-DD HH:mm:ss');
        customer = await this.dataServices.customers.create(createCustomer)
    }

    customer.lastConversation = moment().format('YYYY-MM-DD HH:mm:ss');
    await this.dataServices.customers.update(String(customer.id),customer)
    
    return customer;
 }
}
