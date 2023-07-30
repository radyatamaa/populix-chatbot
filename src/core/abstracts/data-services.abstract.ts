import { Author, Book, Genre, Customer, Content,Card,CardType,ChatHistory } from '../entities';
import { IGenericElasticSearchRepository, IGenericMysqlRepository, IGenericRepository } from './generic-repository.abstract';

export abstract class IDataServices {
  abstract authors: IGenericRepository<Author>;

  abstract books: IGenericRepository<Book>;

  abstract genres: IGenericRepository<Genre>;
}

export abstract class IDataMysqlServices {

  abstract customers: IGenericMysqlRepository<Customer>;

  abstract contents: IGenericMysqlRepository<Content>;

  abstract cards: IGenericMysqlRepository<Card>;

  abstract cardTypes: IGenericMysqlRepository<CardType>;
}

export abstract class IDataElasticSearchServices {

  abstract chatHistory: IGenericElasticSearchRepository<ChatHistory>;

}
