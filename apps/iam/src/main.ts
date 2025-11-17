import { NestFactory } from '@nestjs/core';
import { IamModule } from './iam.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    IamModule,
    { transport: Transport.TCP, options: { port: 8001 } },
  );
  await app.listen();
}
bootstrap();
