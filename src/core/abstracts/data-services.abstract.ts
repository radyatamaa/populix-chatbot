import { Author, Book, Genre, Customer, Content,Card,CardType } from '../entities';
import { IGenericRepository } from './generic-repository.abstract';

export abstract class IDataServices {
  abstract authors: IGenericRepository<Author>;

  abstract books: IGenericRepository<Book>;

  abstract genres: IGenericRepository<Genre>;
}

export abstract class IDataMysqlServices {

  abstract customers: IGenericRepository<Customer>;

  abstract contents: IGenericRepository<Content>;

  abstract cards: IGenericRepository<Card>;

  abstract cardTypes: IGenericRepository<CardType>;
}
