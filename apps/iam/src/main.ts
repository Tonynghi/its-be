import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';
import { CustomRpcExceptionFilter } from './rpc.filter';

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
      logger: new Logger('IAM Microservice'),
    },
  );

  app.useGlobalFilters(new CustomRpcExceptionFilter());

  await app.listen();
}
bootstrap();
