import { Module } from '@nestjs/common';
import { LearningContentService } from './services';
import { LearningContentController } from './controllers';

@Module({
  imports: [],
  controllers: [LearningContentController],
  providers: [LearningContentService],
  exports: [LearningContentService],
})
export class LearningContentModule {}
