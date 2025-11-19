import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UsersController } from './controllers';
import { AuthProducer, UsersProducer } from './producers';
import { AuthController } from './controllers/auth.controller';
import { AuthGuard } from './guards';

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
            groupId: 'iam-consumer',
          },
        },
      },
    ]),
  ],
  controllers: [UsersController, AuthController],
  providers: [UsersProducer, AuthProducer, AuthGuard],
  exports: [UsersProducer, AuthProducer, AuthGuard],
})
export class IamModule {}
