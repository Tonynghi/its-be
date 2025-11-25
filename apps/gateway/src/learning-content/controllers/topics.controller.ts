import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { TutorGuard } from '../../iam/guards';
import { TopicsProducer } from '../producers';
import { CreateTopicRequestDto } from '../dtos';

@Controller('topics')
export class TopicsController {
  constructor(private readonly topicsProducer: TopicsProducer) {}

  @Post('/')
  @UseGuards(TutorGuard)
  createTopic(@Body() createTopicRequestDto: CreateTopicRequestDto) {
    return this.topicsProducer.createTopic(createTopicRequestDto);
  }
}
