import { Injectable } from '@nestjs/common';
import { Customer } from '../../core/entities';
import { IDataMysqlServices } from '../../core/abstracts';
import { RequestWebhookDto } from '../../core/dtos';
import { WebhookFactoryService } from './webhook-factory.service';
import { CONTENT } from '../../configuration';
import { CardManagerUseCases } from '../card-manager/card-manager.use-case';
import * as moment from 'moment'

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

        let content = null;
        let cards = null;
        if (customer.phoneNumber == "" || customer.email == "") {
            const welcomeContentId = CONTENT.welcomeMessageContentId;
            content = await this.dataServices.contents.get(welcomeContentId);
            cards = await this.dataServices.cards.getAll({
                order: {
                    sort: "ASC"
                },
                where: {
                    contentId: content.id
                }
            })

            const send = await this.cardManagerUsecase.send(cards,customer);
        }
    }

    return;
  }
}
