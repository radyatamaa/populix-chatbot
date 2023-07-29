import { Module } from '@nestjs/common';
import { ICrmAPIServices } from '../../../core';

import { TelegrambotService } from './telegrambot-service.service';

@Module({
  providers: [
    {
      provide: ICrmAPIServices,
      useClass: TelegrambotService,
    },
  ],
  exports: [ICrmAPIServices],
})
export class TelegrambotServicesModule {}
