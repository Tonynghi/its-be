import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import type { ClientKafkaProxy, RpcException } from '@nestjs/microservices';
import { subjectsErrors, TOPICS_TOPICS } from 'common';
import { CreateTopicRequestDto, CreateTopicResponsetDto } from '../dtos';
import { lastValueFrom } from 'rxjs';
import { TopicsFilterQueryRequest } from '../interfaces';

@Injectable()
export class TopicsProducer {
  constructor(
    @Inject('LEARNING_CONTENT_SERVICE')
    private readonly learningContentClient: ClientKafkaProxy,
  ) {}

  async onModuleInit() {
    const topics = Object.values(TOPICS_TOPICS);
    for (const topic of topics) {
      this.learningContentClient.subscribeToResponseOf(topic);
    }
    await this.learningContentClient.connect();
  }

  public async createTopic(createTopicRequestDto: CreateTopicRequestDto) {
    try {
      const response = await lastValueFrom(
        this.learningContentClient.send<CreateTopicResponsetDto>(
          TOPICS_TOPICS.CREATE_TOPIC,
          createTopicRequestDto,
        ),
      );
      return response;
    } catch (error) {
      const message = (error as RpcException).message;
      if (!message) {
        throw new Error('Unknown error occurred during topic creation');
      }

      if (message === subjectsErrors.NOT_FOUND_BY_ID) {
        throw new NotFoundException(message);
      }

      throw new Error(message);
    }
  }

  public getAllTopics(query: TopicsFilterQueryRequest) {
    return this.learningContentClient.send(TOPICS_TOPICS.GET_ALL_TOPICS, query);
  }
}
