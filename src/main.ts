import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { APP } from './configuration';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('ChatBot Populix Test')
    .setDescription('Chat bot api')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(APP.port);
}
bootstrap();
