import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { LEARNING_CONTENT_TOPICS } from 'common/topics';
import { LearningContentService } from '../services';

@Controller()
export class LearningContentController {
  constructor(
    private readonly learningContentService: LearningContentService,
  ) {}

  @MessagePattern(LEARNING_CONTENT_TOPICS.POST_CONTENT)
  postContent() {
    return this.learningContentService.postContent();
  }
}
