import { Inject, Injectable } from '@nestjs/common';
import { STORAGE_SERVICE } from '../../storage/storage.module';
import type { StorageService } from '../../storage/storage.interface';
import { GetUploadUrlRequestDto, PostContentRequestDto } from '../dtos';
import { SubjectsService } from './subjects.service';
import { Model, Types } from 'mongoose';
import { RpcException } from '@nestjs/microservices';
import { subjectsErrors } from 'common';
import { TopicsService } from './topics.service';
import { InjectModel } from '@nestjs/mongoose';
import { CONTENT_ITEMS_COLLECTION_NAME } from '../../constants';
import { ContentItem } from '../schemas';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class LearningContentService {
  constructor(
    @Inject() private readonly configService: ConfigService,
    @Inject(STORAGE_SERVICE) private readonly storageService: StorageService,
    @InjectModel(CONTENT_ITEMS_COLLECTION_NAME)
    private contentItemsModel: Model<ContentItem>,
    private readonly subjectsService: SubjectsService,
    private readonly topicsService: TopicsService,
  ) {}

  private constructContentUrl({
    fileName,
    subjectId,
  }: {
    fileName: string;
    subjectId: string;
  }) {
    return `learning-content/${subjectId}/${fileName}`;
  }

  public async getContentUploadUrl(dto: GetUploadUrlRequestDto) {
    const { fileName, mimeType, subjectId } = dto;

    const subject = await this.subjectsService.findSubjectById(
      new Types.ObjectId(subjectId),
    );

    if (!subject) {
      throw new RpcException(subjectsErrors.NOT_FOUND_BY_ID);
    }

    const objectName = this.constructContentUrl({ fileName, subjectId });
    const presignedUrl = await this.storageService.getWriteSignedUrl(
      objectName,
      mimeType,
    );
    const bucket = this.configService.get<string>('GCP_BUCKET_NAME');

    return { presignedUrl, bucket: bucket, objectName };
  }

  public async postContent(dto: PostContentRequestDto) {
    const {
      name,
      description,
      bucket,
      objectName,
      subjectId,
      topicIds,
      userId,
    } = dto;

    const subject = await this.subjectsService.findSubjectById(
      new Types.ObjectId(subjectId),
    );

    if (!subject) {
      throw new RpcException(subjectsErrors.NOT_FOUND_BY_ID);
    }

    await this.topicsService.validateTopics(topicIds);

    return await this.contentItemsModel.create({
      name,
      description,
      bucket,
      objectName,
      subject: new Types.ObjectId(subjectId),
      topics: topicIds.map((id) => new Types.ObjectId(id)),
      updatedBy: new Types.ObjectId(userId),
    });
  }
}
