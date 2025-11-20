import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: 'learning-content-service',
          brokers: ['localhost:9092'],
        },
        consumer: {
          groupId: 'learning-content-consumer',
        },
      },
      logger: new Logger('Learning Content Microservice'),
    },
  );
  await app.listen();
}
bootstrap();
