import { Controller, Get } from '@nestjs/common';
import { LearningPersonalizationService } from './learning-personalization.service';

@Controller()
export class LearningPersonalizationController {
  constructor(private readonly learningPersonalizationService: LearningPersonalizationService) {}

  @Get()
  getHello(): string {
    return this.learningPersonalizationService.getHello();
  }
}
