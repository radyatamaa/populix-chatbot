import { Injectable } from '@nestjs/common';
import { CurrentFormRealm, Customer, Options } from '../../core/entities';
import { IDataMysqlServices } from '../../core/abstracts';
import { RequestWebhookDto } from '../../core/dtos';
import { WebhookFactoryService } from './webhook-factory.service';
import { CONTENT } from '../../configuration';
import { CardManagerUseCases } from '../card-manager/card-manager.use-case';
import * as moment from 'moment'
import {Like} from "typeorm";

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
  ) {}

 async handle(requestBody: RequestWebhookDto): Promise<any> {
    if (!requestBody.message.from.is_bot) {
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
        

        if (customer.currentFormRealm) {
            const currentFormRealm = JSON.parse(customer.currentFormRealm) as CurrentFormRealm;
            const cards = await this.dataServices.cards.get( String(currentFormRealm.card_id));
            await this.cardManagerUsecase.send([cards],customer, { answerFormBuilder: requestBody.message.text} as Options);
            return;
        }

        let content = null;
        let cards = null;
        if (customer.phoneNumber == "" || customer.email == "") {
            const welcomeContentId = CONTENT.welcomeMessageContentId;
            cards = await this.cardManagerUsecase.getContentCards(welcomeContentId,{
                contentId: welcomeContentId
            })
            await this.cardManagerUsecase.send(cards,customer);
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
            const defaultContent = CONTENT.defaultResponseContentId;
            cards = await this.cardManagerUsecase.getContentCards(defaultContent,{
                contentId: defaultContent
            })
            const send = await this.cardManagerUsecase.send(cards,customer);
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


    }

    return;
  }
}
