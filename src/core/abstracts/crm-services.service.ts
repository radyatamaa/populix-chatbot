import { Book, TelegramMessage } from '../entities';
import { MovieSearchResponse } from '../entities/movie.entity';

export abstract class ICrmServices {
  abstract bookAdded(book: Book): Promise<boolean>;
}

export abstract class ITelegramAPIServices {
  abstract sendMessage(message: TelegramMessage): Promise<any>;
}

export abstract class ITheMovieDbAPIServices {
  abstract SearchMovie(movieName: string): Promise<MovieSearchResponse>;
}
