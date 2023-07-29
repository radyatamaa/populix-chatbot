import { Book, TelegramMessage } from '../entities';

export abstract class ICrmServices {
  abstract bookAdded(book: Book): Promise<boolean>;
}

export abstract class ICrmAPIServices {
  
  abstract sendMessage(message: TelegramMessage): Promise<any>;
}
