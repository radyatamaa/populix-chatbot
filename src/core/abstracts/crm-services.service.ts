import { TelegramMessage } from '../entities';
import { LatestMovieResponse, ListMovieNowPlayingResponse, ListMoviePopularResponse, ListMovieTopRatedResponse, ListMovieUpcomingResponse, MovieSearchResponse } from '../entities/movie.entity';

export abstract class ITelegramAPIServices {
  abstract sendMessage(message: TelegramMessage): Promise<any>;
}

export abstract class ITheMovieDbAPIServices {
  abstract SearchMovie(movieName: string): Promise<MovieSearchResponse>;
  abstract GetLatestMovie(): Promise<LatestMovieResponse>;
  abstract ListNowPlayingMovie(): Promise<ListMovieNowPlayingResponse>;
  abstract ListPopularMovie(): Promise<ListMoviePopularResponse>;
  abstract ListTopRatedMovie(): Promise<ListMovieTopRatedResponse>;
  abstract ListUpcomingMovie(): Promise<ListMovieUpcomingResponse>;
}
