import { Module } from '@nestjs/common';
import { ITelegramAPIServices } from '../../../core';

import { TelegrambotService } from './telegrambot-service.service';

@Module({
  providers: [
    {
      provide: ITelegramAPIServices,
      useClass: TelegrambotService,
    },
  ],
  exports: [ITelegramAPIServices],
})
export class TelegrambotServicesModule {}
