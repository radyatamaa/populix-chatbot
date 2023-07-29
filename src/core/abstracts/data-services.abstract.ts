import { Author, Book, Genre, Customer, Content,Card,CardType } from '../entities';
import { IGenericMysqlRepository, IGenericRepository } from './generic-repository.abstract';

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
