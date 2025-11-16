import { Controller, Get } from '@nestjs/common';
import { LearningContentService } from './learning-content.service';

@Controller()
export class LearningContentController {
  constructor(private readonly learningContentService: LearningContentService) {}

  @Get()
  getHello(): string {
    return this.learningContentService.getHello();
  }
}
