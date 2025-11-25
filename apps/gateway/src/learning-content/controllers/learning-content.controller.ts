import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { LearningContentProducer } from '../producers';
import { TutorGuard } from '../../iam/guards';
import { GetUploadUrlRequestDto } from '../dtos';

@Controller('content')
export class LearningContentController {
  constructor(
    private readonly learningContentProducer: LearningContentProducer,
  ) {}

  @Post('/url')
  @UseGuards(TutorGuard)
  getUploadContentUrl(@Body() request: GetUploadUrlRequestDto) {
    return this.learningContentProducer.getUploadContentUrl(request);
  }

  @Post('/')
  @UseGuards(TutorGuard)
  postLearningContent() {
    return this.learningContentProducer.postContent();
  }
}
