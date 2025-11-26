import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { TutorGuard, UserGuard } from '../../iam/guards';
import { TopicsProducer } from '../producers';
import { CreateTopicRequestDto } from '../dtos';
import type { TopicsFilterQueryRequest } from '../interfaces';

@Controller('topics')
export class TopicsController {
  constructor(private readonly topicsProducer: TopicsProducer) {}

  @Post('/')
  @UseGuards(TutorGuard)
  createTopic(@Body() createTopicRequestDto: CreateTopicRequestDto) {
    return this.topicsProducer.createTopic(createTopicRequestDto);
  }

  @Get('/')
  @UseGuards(UserGuard)
  getAllSubjects(@Query() query: TopicsFilterQueryRequest) {
    return this.topicsProducer.getAllTopics(query);
  }
}
