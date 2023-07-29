import { Repository,Entity } from 'typeorm';
import { IGenericMysqlRepository } from '../../../core';

export class MysqlGenericRepository<T> implements IGenericMysqlRepository<T> {
  private _repository: Repository<T>;
  private _populateOnFind: string[];

  constructor(repository: Repository<T>, populateOnFind: string[] = []) {
    this._repository = repository;
    this._populateOnFind = populateOnFind;
  }

  async getAll(filters?: any): Promise<T[]> {
    return this._repository.find(filters);
  }

  async getWithFilter(filters: any): Promise<T> {
    return this._repository.findOne(filters);
  }

  async get(id: any): Promise<T> {
    return this._repository.findOneBy({
      id: id,
  } as any);
  }

  async create(item: T): Promise<T> {
    return this._repository.save(item);
  }

  async update(id: string, item: T) {
    return this._repository.update(id, item as any);
  }
}
