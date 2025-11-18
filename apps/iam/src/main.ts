import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: 'iam-service',
          brokers: ['localhost:9092'],
        },
        consumer: {
          groupId: 'iam-consumer',
        },
      },
    },
  );
  await app.listen();
}
bootstrap();
