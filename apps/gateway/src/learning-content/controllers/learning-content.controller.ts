import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { LearningContentProducer } from '../producers';
import { TutorGuard } from '../../iam/guards';
import { GetUploadUrlRequestDto, PostContentRequestDto } from '../dtos';

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
}
