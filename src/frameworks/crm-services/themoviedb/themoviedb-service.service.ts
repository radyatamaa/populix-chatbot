import { Injectable } from '@nestjs/common';
import { Book } from '../../../core/entities';
import { ITelegramAPIServices, ITheMovieDbAPIServices } from '../../../core/abstracts';
import { TelegramMessage } from 'src/core/entities/telegram.entity';
import axios from 'axios';
import { THE_MOVIE_DB } from 'src/configuration';
import { MovieSearchResponse } from 'src/core/entities/movie.entity';

@Injectable()
export class TheMovieDbAPIService implements ITheMovieDbAPIServices {
  async SearchMovie(movieName: string): Promise<MovieSearchResponse> {
    let result = {} as MovieSearchResponse
    const token = THE_MOVIE_DB.token;
    await axios
      .request({
        method: 'GET',
        url: 'https://api.themoviedb.org/3/search/movie?query='+ movieName,
        headers: {
          accept: 'application/json', 
          'content-type': 'application/json',
          Authorization: `Bearer ${token}`
        },
      })
      .then(function (response) {
        result = response.data
      })
      .catch(function (error) {
        console.error(error);
      });

    return result;
  }
}
