export class ElasticSearchBody {
    size: number;
    from: number;
    query: any;
  
    constructor(
      size: number,
      from: number,
      query: any
    ) {
      this.size = size;
      this.from = from;
      this.query = query;
    }
}

export class eSindex {
  index: string;
  type: string;
};