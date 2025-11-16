import { Test, TestingModule } from '@nestjs/testing';
import { LearningContentController } from './learning-content.controller';
import { LearningContentService } from './learning-content.service';

describe('LearningContentController', () => {
  let learningContentController: LearningContentController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [LearningContentController],
      providers: [LearningContentService],
    }).compile();

    learningContentController = app.get<LearningContentController>(LearningContentController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(learningContentController.getHello()).toBe('Hello World!');
    });
  });
});
