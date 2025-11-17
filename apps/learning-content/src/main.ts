import { NestFactory } from '@nestjs/core';
import { LearningContentModule } from './learning-content.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    LearningContentModule,
    { transport: Transport.TCP, options: { port: 8002 } },
  );
  await app.listen();
}
bootstrap();
