import { NestFactory } from '@nestjs/core';
import { LearningContentModule } from './learning-content.module';

async function bootstrap() {
  const app = await NestFactory.create(LearningContentModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
