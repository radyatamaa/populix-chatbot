import { Repository,Entity } from 'typeorm';
import { IGenericRepository } from '../../../core';

export class MysqlGenericRepository<T> implements IGenericRepository<T> {
  private _repository: Repository<T>;
  private _populateOnFind: string[];

  constructor(repository: Repository<T>, populateOnFind: string[] = []) {
    this._repository = repository;
    this._populateOnFind = populateOnFind;
  }

  async getAll(): Promise<T[]> {
    return this._repository.find();
  }

  async get(id: any): Promise<T> {
    return this._repository.findOneBy(id);
  }

  async create(item: T): Promise<T> {
    return this._repository.create(item);
  }

  async update(id: string, item: T) {
    return this._repository.update(id, item as any);
  }
}
