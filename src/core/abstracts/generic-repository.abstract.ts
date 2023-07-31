
export abstract class IGenericRepository<T> {
  abstract getAll(filters?: any): Promise<T[]>;

  abstract get(id: string): Promise<T>;

  abstract create(item: T): Promise<T>;

  abstract update(id: string, item: T);
}

export abstract class IGenericMysqlRepository<T> {
  abstract getAll(filters?: any): Promise<T[]>;

  abstract getWithFilter(filters: any): Promise<T>;

  abstract get(id: string): Promise<T>;

  abstract create(item: T): Promise<T>;

  abstract update(id: string, item: T);
}

export abstract class IGenericElasticSearchRepository<T> {
  abstract searchIndex(q: any,limit: number,offset: number): Promise<any>;

  abstract insertIndex(doc: any): Promise<any>;

  abstract updateIndex(doc: any): Promise<any>;
}
