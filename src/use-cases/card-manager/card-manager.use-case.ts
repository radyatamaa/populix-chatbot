import { Injectable } from '@nestjs/common';
import { Card, Customer } from '../../core/entities';
import { IDataMysqlServices, ICrmAPIServices } from '../../core/abstracts';
import { RequestWebhookDto } from '../../core/dtos';
import { CardManagerFactoryService } from './card-manager-factory.service';
import { CONTENT } from 'src/configuration';
import { where } from 'sequelize';

@Injectable()
export class CardManagerUseCases {
    constructor(
      private dataServices: IDataMysqlServices,
      private cardManagerFactoryService: CardManagerFactoryService,
      private crmServices: ICrmAPIServices,
    ) {}

 async send(cards: Card[],customer: Customer): Promise<any> {
    const templateCards = [];
    for (let i = 0; i < cards.length; i++) {
        const templateCard = await this.cardManagerFactoryService.createTemplateCard(cards[i]);
        templateCard.chat_id = customer.telegramId;
        templateCards.push(templateCard);
    }

    for (let i = 0; i < templateCards.length; i++) {
        const sendMessage = await this.crmServices.sendMessage(templateCards[i]);
    }

    return;
  }
}
