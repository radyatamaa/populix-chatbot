import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository,Entity } from 'typeorm';
import { IDataMysqlServices } from '../../../core';
import { MysqlGenericRepository } from './mysql-generic-repository';
import {
  Customer,
  Content,
  Card,
  CardType,
} from './model';

@Injectable()
export class MysqlDataServices
  implements IDataMysqlServices, OnApplicationBootstrap
{
  customers: MysqlGenericRepository<Customer>;
  contents: MysqlGenericRepository<Content>;
  cards: MysqlGenericRepository<Card>;
  cardTypes: MysqlGenericRepository<CardType>;

  constructor(
    @InjectRepository(Customer)
    private CustomerRepository: Repository<Customer>,
    @InjectRepository(Content)
    private ContentRepository: Repository<Content>,
    @InjectRepository(Card)
    private CardRepository: Repository<Card>,
    @InjectRepository(CardType)
    private CardTypeRepository: Repository<CardType>,
  ) {}

  onApplicationBootstrap() {
    this.customers = new MysqlGenericRepository<Customer>(this.CustomerRepository);
    this.contents = new MysqlGenericRepository<Content>(this.ContentRepository);
    this.cards = new MysqlGenericRepository<Card>(this.CardRepository);
    this.cardTypes = new MysqlGenericRepository<CardType>(this.CardTypeRepository);
  }
}
