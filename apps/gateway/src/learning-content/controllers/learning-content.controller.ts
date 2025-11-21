import { Controller, Post, UseGuards } from '@nestjs/common';
import { LearningContentProducer } from '../producers';
import { TutorGuard } from '../../iam/guards';

@Controller('content')
export class LearningContentController {
  constructor(
    private readonly learningContentProducer: LearningContentProducer,
  ) {}

  @Post('/')
  @UseGuards(TutorGuard)
  postLearningContent() {
    return this.learningContentProducer.postContent();
  }
}
