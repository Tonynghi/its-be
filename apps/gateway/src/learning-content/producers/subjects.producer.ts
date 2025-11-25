import { Inject, Injectable } from '@nestjs/common';
import type { ClientKafkaProxy } from '@nestjs/microservices';
import { SUBJECTS_TOPICS } from 'common';
import { CreateSubjectRequestDto } from '../dtos';

@Injectable()
export class SubjectsProducer {
  constructor(
    @Inject('LEARNING_CONTENT_SERVICE')
    private readonly learningContentClient: ClientKafkaProxy,
  ) {}

  async onModuleInit() {
    const topics = [SUBJECTS_TOPICS.CREATE_SUBJECT];
    for (const topic of topics) {
      this.learningContentClient.subscribeToResponseOf(topic);
    }
    await this.learningContentClient.connect();
  }

  public createSubject(createSubjectRequest: CreateSubjectRequestDto) {
    return this.learningContentClient.send(
      SUBJECTS_TOPICS.CREATE_SUBJECT,
      createSubjectRequest,
    );
  }
}
