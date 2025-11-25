import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { LearningPersonalizationModule } from './../src/learning-personalization.module';

describe('LearningPersonalizationController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [LearningPersonalizationModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });
});
