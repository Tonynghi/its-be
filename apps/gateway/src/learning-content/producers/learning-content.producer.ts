import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import type { ClientKafkaProxy, RpcException } from '@nestjs/microservices';
import { LEARNING_CONTENT_TOPICS, subjectsErrors, topicsErrors } from 'common';
import {
  GetUploadUrlRequestDto,
  GetUploadUrlResponseDto,
  PostContentRequestDto,
  PostContentResponseDto,
} from '../dtos';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class LearningContentProducer {
  constructor(
    @Inject('LEARNING_CONTENT_SERVICE')
    private readonly learningContentClient: ClientKafkaProxy,
  ) {}

  async onModuleInit() {
    const topics = [
      LEARNING_CONTENT_TOPICS.GET_UPLOAD_CONTENT_URL,
      LEARNING_CONTENT_TOPICS.POST_CONTENT,
    ];
    for (const topic of topics) {
      this.learningContentClient.subscribeToResponseOf(topic);
    }
    await this.learningContentClient.connect();
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
}
