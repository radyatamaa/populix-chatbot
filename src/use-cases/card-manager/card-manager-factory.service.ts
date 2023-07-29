import { Injectable } from '@nestjs/common';
import { Card, Customer } from '../../core/entities';
import { TelegramMessage } from 'src/core/entities/telegram.entity';

export const TEMPLATE = {
    text:'text',
    formbuilder: 'formbuilder',
    listmovie: 'listmovie',
    detailmovie: 'detailmovie',
    continuetoblock: 'continuetoblock',
  };

@Injectable()
export class CardManagerFactoryService {
    async createTemplateCard(card: Card) : Promise<TelegramMessage>{
        const templateType = card.cardType;
        let cardTemplate = null;
        switch(templateType) { 
            case TEMPLATE.text: { 
               cardTemplate = await this.createTemplateText(card);
               break; 
            } 
            case TEMPLATE.formbuilder: { 
                cardTemplate = await this.createTemplateText(card);
               break; 
            } 
            case TEMPLATE.listmovie: { 
                cardTemplate = await this.createTemplateText(card);
                break; 
             } 
             case TEMPLATE.detailmovie: { 
                cardTemplate = await this.createTemplateText(card);
                break; 
             } 
             case TEMPLATE.continuetoblock: { 
                cardTemplate = await this.createTemplateText(card);
                break; 
             } 
            default: { 
                cardTemplate = await this.createTemplateText(card);
                break
            } 
         }  

        
        return cardTemplate;
      }


     async createTemplateText(card: Card) : Promise<TelegramMessage> {
        const cardTemplate = new TelegramMessage();
        cardTemplate.text = card.subtitle;
        return cardTemplate;
      }
}
