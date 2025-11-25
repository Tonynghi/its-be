import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateTopicRequestDto, CreateTopicResponsetDto } from '../dtos';
import { plainToInstance } from 'class-transformer';
import { TopicsService } from '../services';
import { TOPICS_TOPICS } from 'common';

@Controller()
export class TopicsController {
  constructor(private readonly topicsService: TopicsService) {}

  @MessagePattern(TOPICS_TOPICS.CREATE_TOPIC)
  async createTopic(@Payload() message: CreateTopicRequestDto) {
    const topic = await this.topicsService.createTopic(message);

    const response = plainToInstance(CreateTopicResponsetDto, topic, {
      excludeExtraneousValues: true,
    });
    return response;
  }
}
