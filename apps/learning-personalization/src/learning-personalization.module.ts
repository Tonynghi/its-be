import { Module } from '@nestjs/common';
import { LearningPersonalizationController } from './learning-personalization.controller';
import { LearningPersonalizationService } from './learning-personalization.service';

@Module({
  imports: [],
  controllers: [LearningPersonalizationController],
  providers: [LearningPersonalizationService],
})
export class LearningPersonalizationModule {}
