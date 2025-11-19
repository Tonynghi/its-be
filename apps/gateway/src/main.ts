import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new Logger('API Gateway'),
  });
  app.setGlobalPrefix('api/v1/');
  await app.listen(process.env.PORT ?? 8000);
}
bootstrap();
