import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import type { ClientKafkaProxy, RpcException } from '@nestjs/microservices';
import {
  LEARNING_CONTENT_TOPICS,
  learningContentErrors,
  subjectsErrors,
  topicsErrors,
} from 'common';
import {
  GetDownloadUrlRequestDto,
  GetDownloadUrlResponseDto,
  GetUploadUrlRequestDto,
  GetUploadUrlResponseDto,
  PostContentRequestDto,
  PostContentResponseDto,
} from '../dtos';
import { lastValueFrom } from 'rxjs';
import { LearningContentsFilterQueryRequest } from '../interfaces';

@Injectable()
export class LearningContentProducer {
  constructor(
    @Inject('LEARNING_CONTENT_SERVICE')
    private readonly learningContentClient: ClientKafkaProxy,
  ) {}

  async onModuleInit() {
    const topics = Object.values(LEARNING_CONTENT_TOPICS);
    for (const topic of topics) {
      this.learningContentClient.subscribeToResponseOf(topic);
    }
    await this.learningContentClient.connect();
  }

  public async getDownloadContentUrl(dto: GetDownloadUrlRequestDto) {
    try {
      const response = await lastValueFrom<GetDownloadUrlResponseDto>(
        this.learningContentClient.send(
          LEARNING_CONTENT_TOPICS.GET_DOWNLOAD_CONTENT_URL,
          dto,
        ),
      );
      return response;
    } catch (error) {
      const message = (error as RpcException).message;
      if (!message) {
        throw new Error('Unknown error occurred during topic creation');
      }

      if (message === learningContentErrors.NOT_FOUND_BY_ID) {
        throw new NotFoundException(message);
      }

      throw new Error(message);
    }
  }

  public async getUploadContentUrl(
    getUploadUrlRequestDto: GetUploadUrlRequestDto,
  ) {
    try {
      const response = await lastValueFrom(
        this.learningContentClient.send<GetUploadUrlResponseDto>(
          LEARNING_CONTENT_TOPICS.GET_UPLOAD_CONTENT_URL,
          getUploadUrlRequestDto,
        ),
      );
      return response;
    } catch (error) {
      const message = (error as RpcException).message;
      if (!message) {
        throw new Error('Unknown error occurred during topic creation');
      }

      if (message === subjectsErrors.NOT_FOUND_BY_ID) {
        throw new NotFoundException(message);
      }

      throw new Error(message);
    }
  }

  public async postContent(data: PostContentRequestDto) {
    try {
      const response = await lastValueFrom(
        this.learningContentClient.send<PostContentResponseDto>(
          LEARNING_CONTENT_TOPICS.POST_CONTENT,
          data,
        ),
      );

      return response;
    } catch (error) {
      const message = (error as RpcException).message;
      if (!message) {
        throw new Error('Unknown error occurred during topic creation');
      }

      if (
        message === subjectsErrors.NOT_FOUND_BY_ID ||
        message.includes(topicsErrors.MULTIPLE_NOT_FOUND_BY_ID)
      ) {
        throw new NotFoundException(message);
      }

      throw new Error(message);
    }
  }

  public getAllLearningContents(query: LearningContentsFilterQueryRequest) {
    return this.learningContentClient.send(
      LEARNING_CONTENT_TOPICS.GET_LEARNING_CONTENTS,
      query,
    );
  }
}
