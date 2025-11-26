import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { LearningContentProducer } from '../producers';
import { TutorGuard, UserGuard } from '../../iam/guards';
import { GetUploadUrlRequestDto, PostContentRequestDto } from '../dtos';
import type { LearningContentsFilterQueryRequest } from '../interfaces';

@Controller('content')
export class LearningContentController {
  constructor(
    private readonly learningContentProducer: LearningContentProducer,
  ) {}

  @Post('/url')
  @UseGuards(TutorGuard)
  async getUploadContentUrl(@Body() request: GetUploadUrlRequestDto) {
    return await this.learningContentProducer.getUploadContentUrl(request);
  }

  @Post('/')
  @UseGuards(TutorGuard)
  async postLearningContent(@Body() request: PostContentRequestDto) {
    return await this.learningContentProducer.postContent(request);
  }

  @Get('/')
  @UseGuards(UserGuard)
  getAllLearningContents(@Query() query: LearningContentsFilterQueryRequest) {
    return this.learningContentProducer.getAllLearningContents(query);
  }
}
