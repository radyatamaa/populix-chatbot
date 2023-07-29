import { Injectable } from '@nestjs/common';
import { Card, CurrentFormRealm, Customer, FormBuilder, FormBuilderSaveToCustomer, Options } from '../../core/entities';
import { IDataMysqlServices, ITelegramAPIServices, ITheMovieDbAPIServices } from '../../core/abstracts';
import { RequestWebhookDto } from '../../core/dtos';
import { CardManagerFactoryService } from './card-manager-factory.service';
import { CONTENT, THE_MOVIE_DB } from 'src/configuration';
import { TelegramMessage } from 'src/core/entities/telegram.entity';

export const TEMPLATE = {
    text:'text',
    formbuilder: 'formbuilder',
    searchmovie: 'searchmovie',
    continuetoblock: 'continuetoblock',
    listmovielatest: 'listmovielatest',
    listmovienowplaying: 'listmovienowplaying',
    listmoviepopular: 'listmoviepopular',
    listmovietoprated: 'listmovietoprated',
    listmovieupcoming: 'listmovieupcoming',
  };
export const GENRE_THE_MOVIE = {
    28:"Action",
    12:"Adventure",
    16:"Animation",
    35:"Comedy",
    80:"Crime",
    99:"Documentary",
    18:"Drama",
    10751:"Family",
    14:"Fantasy",
    36:"History",
    27:"Horror",
    10402:"Music",
    9648:"Mystery",
    10749:"Romance",
    878:"Science Fiction",
    10770:"TV Movie",
    53:"Thriller",
    10752:"War",
    37:"Western"
}
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
      private telegramServices: ITelegramAPIServices,
      private themovieDbServices: ITheMovieDbAPIServices,
    ) {}

 async send(cards: Card[],customer: Customer, options? : Options): Promise<any> {
    const templateCards = [];
    for (let i = 0; i < cards.length; i++) {
        const templateCard = await this.createTemplateCard(cards[i],customer,options);
        templateCards.push(...templateCard);
    }
    
    for (let i = 0; i < templateCards.length; i++) {
        const sendMessage = await this.telegramServices.sendMessage(templateCards[i]);
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
        case TEMPLATE.searchmovie: { 
            cardTemplate = await this.createTemplateSearchMovie(card, customer,options);
            break; 
        } 
        case TEMPLATE.continuetoblock: { 
            cardTemplate = await this.createTemplateContinueBlock(card, customer);
            break; 
        } 
        case TEMPLATE.listmovielatest: { 
            cardTemplate = await this.createTemplateText(card, customer);
            break; 
        } 
        default: { 
            cardTemplate = await this.createTemplateText(card, customer);
            break
        } 
     }  

    
    return cardTemplate;
  }


  async createTemplateSearchMovie(card: Card, customer: Customer,options? : Options) : Promise<TelegramMessage[]> {
    const movieName = options?.textPhase.toLowerCase().replace('Check '.toLowerCase(),'');
    const searchMovie = await this.themovieDbServices.SearchMovie(movieName);

    const result = [] as TelegramMessage[]
    for (let i = 0; i < searchMovie.results.length; i++){
        let genres = [];

        for (let ig = 0; ig < searchMovie.results[i].genre_ids.length; ig++){
            genres.push(GENRE_THE_MOVIE[searchMovie.results[i].genre_ids[ig]]);
        }

        const text = `TheMovieDB\n
        Name: ${searchMovie.results[i].title}\n
        Release Date: ${searchMovie.results[i].release_date}\n
        Popularity: ${searchMovie.results[i].popularity}\n
        Genre: ${genres.join(',')}\n
        Overview: ${searchMovie.results[i].overview}\n
        Image: ${THE_MOVIE_DB.baseUrlImage}${searchMovie.results[i].backdrop_path}
        `;
        const cardTemplate = new TelegramMessage();
        cardTemplate.chat_id = customer.telegramId;
        cardTemplate.text = text;

        result.push(cardTemplate);
    }

    return result;
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
