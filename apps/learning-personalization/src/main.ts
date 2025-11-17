import { NestFactory } from '@nestjs/core';
import { LearningPersonalizationModule } from './learning-personalization.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    LearningPersonalizationModule,
    {
      transport: Transport.TCP,
      options: { port: 8003 },
    },
  );
  await app.listen();
}
bootstrap();
