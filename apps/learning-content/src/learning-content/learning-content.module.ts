import { Module } from '@nestjs/common';
import {
  LearningContentService,
  SubjectsService,
  TopicsService,
} from './services';
import {
  LearningContentController,
  SubjectsController,
  TopicsController,
} from './controllers';
import { StorageModule } from '../storage/storage.module';
import { MongooseModule } from '@nestjs/mongoose';
import {
  CONTENT_ITEMS_COLLECTION_NAME,
  SUBJECTS_COLLECTION_NAME,
  TOPICS_COLLECTION_NAME,
} from '../constants';
import { SubjectSchema, TopicSchema } from './schemas';
import { ContentItemSchema } from './schemas/content-item.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: SUBJECTS_COLLECTION_NAME,
        schema: SubjectSchema,
      },
    ]),
    MongooseModule.forFeature([
      {
        name: TOPICS_COLLECTION_NAME,
        schema: TopicSchema,
      },
    ]),
    MongooseModule.forFeature([
      {
        name: CONTENT_ITEMS_COLLECTION_NAME,
        schema: ContentItemSchema,
      },
    ]),
    StorageModule,
  ],
  controllers: [
    LearningContentController,
    SubjectsController,
    TopicsController,
  ],
  providers: [LearningContentService, SubjectsService, TopicsService],
  exports: [LearningContentService, SubjectsService, TopicsService],
})
export class LearningContentModule {}
