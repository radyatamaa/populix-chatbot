import { Injectable } from '@nestjs/common';
import { Card, CurrentFormRealm, Customer, FormBuilder, FormBuilderSaveToCustomer, Options } from '../../core/entities';
import { IDataMysqlServices, ITelegramAPIServices } from '../../core/abstracts';
import { RequestWebhookDto } from '../../core/dtos';
import { CardManagerFactoryService } from './card-manager-factory.service';
import { CONTENT } from 'src/configuration';
import { where } from 'sequelize';
import { TelegramMessage } from 'src/core/entities/telegram.entity';

export const TEMPLATE = {
    text:'text',
    formbuilder: 'formbuilder',
    listmovie: 'listmovie',
    detailmovie: 'detailmovie',
    continuetoblock: 'continuetoblock',
  };

export const ATTRIBUTES = {
    customer : [
        {
            field: "customer_first_name",
            replace: "firstName"
        },
        {
            field: "customer_last_name",
            replace: "lastName"
        }
    ]
  };

  export const FIELDS = {
    customer : [
        {
            field: "customer_first_name",
            replace: "firstName"
        },
        {
            field: "customer_last_name",
            replace: "lastName"
        }
    ]
  };

@Injectable()
export class CardManagerUseCases {
    constructor(
      private dataServices: IDataMysqlServices,
      private cardManagerFactoryService: CardManagerFactoryService,
      private crmServices: ITelegramAPIServices,
    ) {}

 async send(cards: Card[],customer: Customer, options? : Options): Promise<any> {
    const templateCards = [];
    for (let i = 0; i < cards.length; i++) {
        const templateCard = await this.createTemplateCard(cards[i],customer,options);
        templateCards.push(...templateCard);
    }
    
    for (let i = 0; i < templateCards.length; i++) {
        const sendMessage = await this.crmServices.sendMessage(templateCards[i]);
    }

    return;
  }
  async getContentCards(contentId:string, filters: any): Promise<Card[]> {
    const content = await this.dataServices.contents.get(contentId);
    const cards = await this.dataServices.cards.getAll({
            order: {
                sort: "ASC"
            },
            where: filters
        })

    return cards;
  }
  async createTemplateCard(card: Card, customer: Customer,options? : Options) : Promise<TelegramMessage[]>{
    const templateType = card.cardType;
    let cardTemplate = null;
    switch(templateType) { 
        case TEMPLATE.text: { 
           cardTemplate = await this.createTemplateText(card, customer);
           break; 
        } 
        case TEMPLATE.formbuilder: { 
            cardTemplate = await this.createTemplateFormBuilder(card, customer,options);
           break; 
        } 
        case TEMPLATE.listmovie: { 
            cardTemplate = await this.createTemplateText(card, customer);
            break; 
         } 
         case TEMPLATE.detailmovie: { 
            cardTemplate = await this.createTemplateText(card, customer);
            break; 
         } 
         case TEMPLATE.continuetoblock: { 
            cardTemplate = await this.createTemplateContinueBlock(card, customer);
            break; 
         } 
        default: { 
            cardTemplate = await this.createTemplateText(card, customer);
            break
        } 
     }  

    
    return cardTemplate;
  }


  async createTemplateFormBuilder(card: Card, customer: Customer, options? : Options) : Promise<TelegramMessage[]> {

    // VALIDATE FORM BUILDER
    if (options?.answerFormBuilder){
        const currentFormRealm = JSON.parse(customer.currentFormRealm) as CurrentFormRealm;
        if (currentFormRealm.save_to_customer.field_name == 'phoneNumber') {
            let regex: RegExp = /^08\d{7,12}$/;
            const validate = regex.test(options.answerFormBuilder);
            if (!validate){
                const cardTemplate = new TelegramMessage();
                cardTemplate.chat_id = customer.telegramId;
                cardTemplate.text = await this.replaceTextCustomerAttribute(currentFormRealm.save_to_customer.error_message,customer);
                const result = [cardTemplate] as TelegramMessage[]
                return result
            }

            customer.phoneNumber = options.answerFormBuilder;
            const update = await this.dataServices.customers.update(String(customer.id),customer)

        }
        if (currentFormRealm.save_to_customer.field_name == 'email') {
            let regex: RegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
            const validate = regex.test(options.answerFormBuilder);
            if (!validate){
                const cardTemplate = new TelegramMessage();
                cardTemplate.chat_id = customer.telegramId;
                cardTemplate.text = await this.replaceTextCustomerAttribute(currentFormRealm.save_to_customer.error_message,customer);
                const result = [cardTemplate] as TelegramMessage[]
                return result
            }

            customer.email = options.answerFormBuilder;
            const update = await this.dataServices.customers.update(String(customer.id),customer)
        }
    }
    ////////////////////////

    const cardTemplate = new TelegramMessage();
    cardTemplate.chat_id = customer.telegramId;

    const formBuilder = JSON.parse(card.subtitle) as FormBuilder;
    
    const countQuestion = formBuilder.save_to_customer.length;
    let answerQuestion = 0;
    let saveToCustomer = {} as FormBuilderSaveToCustomer
    for (let i = 0; i < formBuilder.save_to_customer.length; i++) {
        if(customer[formBuilder.save_to_customer[i].field_name] != ''){
            answerQuestion++;
        }

        if(customer[formBuilder.save_to_customer[i].field_name] == ''){
            cardTemplate.text = formBuilder.save_to_customer[i].message;
            saveToCustomer = formBuilder.save_to_customer[i]
            break;
        }
    }

    const result = [cardTemplate] as TelegramMessage[]

    if (countQuestion === answerQuestion) {
        cardTemplate.text = await this.replaceTextCustomerAttribute(formBuilder.completed_message,customer);

        const content = await this.dataServices.contents.get(String(formBuilder.completed_redirect_content_id));
        const cards = await this.dataServices.cards.getAll({
            order: {
                sort: "ASC"
            },
            where: {
                contentId: content.id
            }
        })
        
        for (let i = 0; i < cards.length; i++) {
            const templateCard = await this.createTemplateCard(cards[i],customer);
            result.push(...templateCard);
        }

        customer.currentFormRealm = '';
        const update = await this.dataServices.customers.update(String(customer.id),customer)
    }
    
    
   

    if (countQuestion !== answerQuestion){
        const currentFormRealm = {
            card_id: card.id,
            completed_message: formBuilder.completed_message,
            completed_redirect_content_id: formBuilder.completed_redirect_content_id,
            save_to_customer: saveToCustomer,
        } as CurrentFormRealm
        customer.currentFormRealm = JSON.stringify(currentFormRealm);
        const update = await this.dataServices.customers.update(String(customer.id),customer)
    }

    return result;
  }

  async createTemplateContinueBlock(card: Card, customer: Customer) : Promise<TelegramMessage[]> {
    const content = await this.dataServices.contents.get(card.subtitle);
    const cards = await this.dataServices.cards.getAll({
        order: {
            sort: "ASC"
        },
        where: {
            contentId: content.id
        }
    })

    const result = [] as TelegramMessage[]

    for (let i = 0; i < cards.length; i++) {
        const templateCard = await this.createTemplateCard(cards[i],customer);
        result.push(...templateCard);
    }
    
    return result;
  }

  async createTemplateText(card: Card, customer: Customer) : Promise<TelegramMessage[]> {
    const cardTemplate = new TelegramMessage();
    cardTemplate.chat_id = customer.telegramId;
    cardTemplate.text = await this.replaceTextCustomerAttribute(card.subtitle,customer);
    
    const result = [cardTemplate] as TelegramMessage[]

    return result;
  }

  async replaceTextCustomerAttribute(text: string, customer: Customer) : Promise<string>{
    for (let i = 0; i < ATTRIBUTES.customer.length; i++) {
        text = text.replace('{{' + ATTRIBUTES.customer[i].field + '}}', customer[ATTRIBUTES.customer[i].replace]);
    }

    return text;
  }
}
