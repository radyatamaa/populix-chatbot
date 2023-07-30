export class MovieSearchResponse {
    page:number;
    results:MovieSearchResult[]
    total_pages: number;
    total_results: number;
}

export class MovieSearchResult {
    adult:boolean;
    backdrop_path:string;
    genre_ids: number[];
    id:number;
    original_language:string;
    original_title:string;
    overview:string;
    popularity:number;
    poster_path:string;
    release_date:string;
    title:string;
    video:boolean;
    vote_average:number;
    vote_count:number;
}

export class LatestMovieResponse {
    adult:boolean;
    backdrop_path:string;
    genres: Genres[];
    id:number;
    original_language:string;
    original_title:string;
    overview:string;
    popularity:number;
    poster_path:string;
    release_date:string;
    title:string;
    video:boolean;
    vote_average:number;
    vote_count:number;
}

export class Genres {
    id:number;
    name:string;
}


export class ListMovieNowPlayingResponse {
    page:number;
    results:MovieSearchResult[]
    total_pages: number;
    total_results: number;
}

export class ListMoviePopularResponse {
    page:number;
    results:MovieSearchResult[]
    total_pages: number;
    total_results: number;
}

export class ListMovieTopRatedResponse {
    page:number;
    results:MovieSearchResult[]
    total_pages: number;
    total_results: number;
}

export class ListMovieUpcomingResponse {
    page:number;
    results:MovieSearchResult[]
    total_pages: number;
    total_results: number;
}   