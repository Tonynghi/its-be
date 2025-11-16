import { NestFactory } from '@nestjs/core';
import { LearningPersonalizationModule } from './learning-personalization.module';

async function bootstrap() {
  const app = await NestFactory.create(LearningPersonalizationModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
