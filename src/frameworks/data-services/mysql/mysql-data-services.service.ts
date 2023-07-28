import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
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
    @InjectModel(Customer)
    private CustomerRepository: Repository<Customer>,
    @InjectModel(Content)
    private ContentRepository: Repository<Content>,
    @InjectModel(Card)
    private CardRepository: Repository<Card>,
    @InjectModel(CardType)
    private CardTypeRepository: Repository<CardType>,
  ) {}

  onApplicationBootstrap() {
    this.customers = new MysqlGenericRepository<Customer>(this.CustomerRepository);
    this.contents = new MysqlGenericRepository<Content>(this.ContentRepository);
    this.cards = new MysqlGenericRepository<Card>(this.CardRepository);
    this.cardTypes = new MysqlGenericRepository<CardType>(this.CardTypeRepository);
  }
}
