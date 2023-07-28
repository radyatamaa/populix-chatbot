import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { APP } from './configuration';

async function bootstrap() {
  console.log('port' , process.env.APP_PORT)
  const app = await NestFactory.create(AppModule);

  await app.listen(APP.port);
}
bootstrap();
