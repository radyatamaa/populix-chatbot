import { Injectable } from '@nestjs/common';
import { Book } from '../../../core/entities';
import { ITelegramAPIServices, ITheMovieDbAPIServices } from '../../../core/abstracts';
import { TelegramMessage } from 'src/core/entities/telegram.entity';
import axios from 'axios';
import { THE_MOVIE_DB } from 'src/configuration';
import { LatestMovieResponse, ListMovieNowPlayingResponse, ListMoviePopularResponse, ListMovieTopRatedResponse, ListMovieUpcomingResponse, MovieSearchResponse } from 'src/core/entities/movie.entity';

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

  async GetLatestMovie(): Promise<LatestMovieResponse> {
    let result = {} as LatestMovieResponse
    const token = THE_MOVIE_DB.token;
    await axios
      .request({
        method: 'GET',
        url: 'https://api.themoviedb.org/3/movie/latest',
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

  async ListNowPlayingMovie(): Promise<ListMovieNowPlayingResponse> {
    let result = {} as ListMovieNowPlayingResponse
    const token = THE_MOVIE_DB.token;
    await axios
      .request({
        method: 'GET',
        url: 'https://api.themoviedb.org/3/movie/now_playing',
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

  async ListPopularMovie(): Promise<ListMoviePopularResponse> {
    let result = {} as ListMoviePopularResponse
    const token = THE_MOVIE_DB.token;
    await axios
      .request({
        method: 'GET',
        url: 'https://api.themoviedb.org/3/movie/popular',
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

  async ListTopRatedMovie(): Promise<ListMovieTopRatedResponse> {
    let result = {} as ListMovieTopRatedResponse
    const token = THE_MOVIE_DB.token;
    await axios
      .request({
        method: 'GET',
        url: 'https://api.themoviedb.org/3/movie/top_rated',
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

  async ListUpcomingMovie(): Promise<ListMovieUpcomingResponse> {
    let result = {} as ListMovieUpcomingResponse
    const token = THE_MOVIE_DB.token;
    await axios
      .request({
        method: 'GET',
        url: 'https://api.themoviedb.org/3/movie/upcoming',
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
