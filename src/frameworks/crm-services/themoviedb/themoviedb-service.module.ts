import { Module } from '@nestjs/common';
import { ITheMovieDbAPIServices } from '../../../core';

import { TheMovieDbAPIService } from './themoviedb-service.service';

@Module({
  providers: [
    {
      provide: ITheMovieDbAPIServices,
      useClass: TheMovieDbAPIService,
    },
  ],
  exports: [ITheMovieDbAPIServices],
})
export class TelegrambotServicesModule {}
