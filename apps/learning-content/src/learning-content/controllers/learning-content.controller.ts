import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { LEARNING_CONTENT_TOPICS } from 'common/topics';
import { LearningContentService } from '../services';
import {
  GetAllLearningContentsRequestDto,
  GetAllLearningContentsResponseDto,
  GetDownloadUrlRequestDto,
  GetDownloadUrlResponseDto,
  GetUploadUrlRequestDto,
  GetUploadUrlResponseDto,
  PostContentRequestDto,
  PostContentResponseDto,
} from '../dtos';
import { plainToInstance } from 'class-transformer';

@Controller()
export class LearningContentController {
  constructor(
    private readonly learningContentService: LearningContentService,
  ) {}

  @MessagePattern(LEARNING_CONTENT_TOPICS.GET_DOWNLOAD_CONTENT_URL)
  async getDownloadContentUrl(@Payload() message: GetDownloadUrlRequestDto) {
    const dto = plainToInstance(GetDownloadUrlRequestDto, message);

    const { url } =
      await this.learningContentService.getContentDownloadUrl(dto);

    const response = plainToInstance(
      GetDownloadUrlResponseDto,
      { url },
      { excludeExtraneousValues: true },
    );

    return response;
  }

  @MessagePattern(LEARNING_CONTENT_TOPICS.GET_UPLOAD_CONTENT_URL)
  async getUploadContentUrl(@Payload() message: GetUploadUrlRequestDto) {
    const { presignedUrl, objectName, bucket } =
      await this.learningContentService.getContentUploadUrl(message);

    const response = plainToInstance(
      GetUploadUrlResponseDto,
      { presignedUrl, objectName, bucket },
      { excludeExtraneousValues: true },
    );

    return response;
  }

  @MessagePattern(LEARNING_CONTENT_TOPICS.POST_CONTENT)
  async postContent(@Payload() message: PostContentRequestDto) {
    const { _id, name, description, bucket, objectName } =
      await this.learningContentService.postContent(message);
    const response = plainToInstance(
      PostContentResponseDto,
      { _id, name, description, bucket, objectName },
      {
        excludeExtraneousValues: true,
      },
    );

    return response;
  }

  @MessagePattern(LEARNING_CONTENT_TOPICS.GET_LEARNING_CONTENTS)
  async getAllTopics(@Payload() message: GetAllLearningContentsRequestDto) {
    const request = plainToInstance(GetAllLearningContentsRequestDto, message);

    const result =
      await this.learningContentService.getAllLearningContents(request);

    const response = plainToInstance(
      GetAllLearningContentsResponseDto,
      result,
      {
        excludeExtraneousValues: true,
      },
    );
    return response;
  }
}
