import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UsersController } from './controllers';
import { UsersProducer } from './producers';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'IAM_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'iam-service',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'api-gateway-iam-consumer',
          },
        },
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersProducer],
  exports: [UsersProducer],
})
export class IamModule {}
