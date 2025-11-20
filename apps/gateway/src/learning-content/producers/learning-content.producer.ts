import { Inject, Injectable } from '@nestjs/common';
import type { ClientKafkaProxy } from '@nestjs/microservices';
import { LEARNING_CONTENT_TOPICS } from 'common';

@Injectable()
export class LearningContentProducer {
  constructor(
    @Inject('LEARNING_CONTENT_SERVICE')
    private readonly learningContentClient: ClientKafkaProxy,
  ) {}

  async onModuleInit() {
    const topics = [LEARNING_CONTENT_TOPICS.POST_CONTENT];
    for (const topic of topics) {
      this.learningContentClient.subscribeToResponseOf(topic);
    }
    await this.learningContentClient.connect();
  }

  public postContent() {
    return this.learningContentClient.send<{ accessToken: string }>(
      LEARNING_CONTENT_TOPICS.POST_CONTENT,
      {},
    );
  }
}
