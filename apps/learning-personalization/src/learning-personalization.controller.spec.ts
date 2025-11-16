import { Test, TestingModule } from '@nestjs/testing';
import { LearningPersonalizationController } from './learning-personalization.controller';
import { LearningPersonalizationService } from './learning-personalization.service';

describe('LearningPersonalizationController', () => {
  let learningPersonalizationController: LearningPersonalizationController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [LearningPersonalizationController],
      providers: [LearningPersonalizationService],
    }).compile();

    learningPersonalizationController = app.get<LearningPersonalizationController>(LearningPersonalizationController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(learningPersonalizationController.getHello()).toBe('Hello World!');
    });
  });
});
