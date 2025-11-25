import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TutorGuard } from '../iam/guards';
import { LearningContentController } from './controllers/learning-content.controller';
import {
  LearningContentProducer,
  SubjectsProducer,
  TopicsProducer,
} from './producers';
import { SubjectsController, TopicsController } from './controllers';

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
  controllers: [
    LearningContentController,
    SubjectsController,
    TopicsController,
  ],
  providers: [
    LearningContentProducer,
    TutorGuard,
    SubjectsProducer,
    TopicsProducer,
  ],
  exports: [LearningContentProducer, SubjectsProducer, TopicsProducer],
})
export class LearningContentModule {}
