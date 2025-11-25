import { Inject, Injectable } from '@nestjs/common';
import { STORAGE_SERVICE } from '../../storage/storage.module';
import type { StorageService } from '../../storage/storage.interface';
import { GetUploadUrlRequestDto } from '../dtos';
import { SubjectsService } from './subjects.service';
import { Types } from 'mongoose';
import { RpcException } from '@nestjs/microservices';
import { subjectsErrors } from 'common';

@Injectable()
export class LearningContentService {
  constructor(
    @Inject(STORAGE_SERVICE) private readonly storageService: StorageService,
    private readonly subjectsService: SubjectsService,
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
    return await this.storageService.getWriteSignedUrl(objectName, mimeType);
  }

  public postContent() {
    return { message: 'Learning content posted successfully' };
  }
}
