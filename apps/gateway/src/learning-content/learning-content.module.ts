import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthGuard } from '../iam/guards';
import { LearningContentController } from './controllers/learning-content.controller';
import { LearningContentProducer } from './producers';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'LEARNING_CONTENT_SERVICE',
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
      },
    ]),
  ],
  controllers: [LearningContentController],
  providers: [LearningContentProducer, AuthGuard],
  exports: [LearningContentProducer],
})
export class LearningContentModule {}
