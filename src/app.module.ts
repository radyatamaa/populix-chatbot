import { Module } from '@nestjs/common';
import {
  AppController,
  BookController,
  AuthorController,
  GenreController,
  WebhookController,
} from './controllers';
import { DataServicesModule } from './services/data-services/data-services.module';
import { BookUseCasesModule } from './use-cases/book/book-use-cases.module';
import { AuthorUseCasesModule } from './use-cases/author/author-use-cases.module';
import { GenreUseCasesModule } from './use-cases/genre/genre-use-cases.module';
import { CrmServicesModule } from './services/crm-services/crm-services.module';
import { CardManagerUseCasesModule } from './use-cases/card-manager/card-manager-cases.module';
import { WebhookUseCasesModule } from './use-cases/webhook/webhook-cases.module';

@Module({
  imports: [
    DataServicesModule,
    BookUseCasesModule,
    AuthorUseCasesModule,
    GenreUseCasesModule,
    CrmServicesModule,
    CardManagerUseCasesModule,
    WebhookUseCasesModule,
  ],
  controllers: [
    AppController,
    BookController,
    AuthorController,
    GenreController,
    WebhookController,
  ],
  providers: [],
})
export class AppModule {}
