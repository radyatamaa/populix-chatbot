import { Repository,Entity } from 'typeorm';
import { IGenericElasticSearchRepository } from '../../../core';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { ElasticSearchBody } from './model/generic.model';
import { eSindex } from './model';
import { CONFIG_ELASTIC_SEARCH } from '../../../configuration';

export class ElasticSearchGenericRepository<T> implements IGenericElasticSearchRepository<T> {

  private _esindex : eSindex;
  private _esService: ElasticsearchService
  constructor(esService: ElasticsearchService,esindex : eSindex){
    this._esindex = esindex;
    this._esService = esService
  }

  async searchIndex(q: any,limit: number,offset: number): Promise<any> {
    const data = await this.searchObject(q,limit,offset);
    return this._esService.search(data);
  }

  async insertIndex(doc: any): Promise<any> {
    const data = await this.document(doc)
    return await this._esService.bulk(data)
    .then(res => res)
    .catch(err => {
      console.log(err);
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    });
  }

  async updateIndex(doc: any): Promise<any> {
    const data = await this.document(doc);
    await this.deleteDocument(data.id)
    return await this._esService.bulk(data)
    .then(res => res)
    .catch(err => {
      console.log(err);
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    });
  }


  private async searchObject(q: any,limit: number,offset: number) {
    const body = await this.elasticSearchBody(q,limit,offset);
    return { index: this._esindex.index, body, q };
  }

  private async elasticSearchBody(q: any,limit: number,offset: number): Promise<ElasticSearchBody> {
    const query = {
      match: {
        url: q
      }
    };
    return new ElasticSearchBody(
      limit,
      offset,
      query
    );
  }

  private async deleteDocument(id: string): Promise<any> {
    const data = {
      index: this._esindex.index,
      type: this._esindex.type,
      id: id.toString(),
    };
    return await this.deleteDoc(data);
  }

  private async deleteDoc(indexData: any): Promise<any> {
    return await this._esService.delete(indexData).then(res => res)
      .catch(err => {
        throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
      });
  }
  
  private async bulkIndex(id: string): Promise<any> {
    return {
      _index: this._esindex.index,
      _type: this._esindex.type,
      _id: id,
    };
  }

  private async document(doc: any): Promise<any> {
    const bulk = [];
    bulk.push({
      index: await this.bulkIndex(doc.id),
    });
    bulk.push(doc);
    return {
      body: bulk,
      index: this._esindex.index,
      type: this._esindex.type,
    };
  }

}
