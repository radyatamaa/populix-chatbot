import { Injectable } from '@nestjs/common';
import { Book } from '../../../core/entities';
import { ICrmAPIServices } from '../../../core/abstracts';
import { TelegramMessage } from 'src/core/entities/telegram.entity';
import axios from 'axios';
import { TELEGRAM } from 'src/configuration';

@Injectable()
export class TelegrambotService implements ICrmAPIServices {
  async sendMessage(message: TelegramMessage): Promise<any> {
    const token = TELEGRAM.token;
    await axios
      .request({
        method: 'POST',
        url: 'https://api.telegram.org/bot'+ token+'/sendMessage',
        headers: {accept: 'application/json', 'content-type': 'application/json'},
        data: message
      })
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });

    return Promise.resolve(true);
  }
}
