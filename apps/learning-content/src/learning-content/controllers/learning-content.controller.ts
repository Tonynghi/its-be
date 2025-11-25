import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { LEARNING_CONTENT_TOPICS } from 'common/topics';
import { LearningContentService } from '../services';
import { GetUploadUrlRequestDto, GetUploadUrlResponseDto } from '../dtos';
import { plainToInstance } from 'class-transformer';

@Controller()
export class LearningContentController {
  constructor(
    private readonly learningContentService: LearningContentService,
  ) {}

  @MessagePattern(LEARNING_CONTENT_TOPICS.GET_UPLOAD_CONTENT_URL)
  async getUploadContentUrl(@Payload() message: GetUploadUrlRequestDto) {
    const url = await this.learningContentService.getContentUploadUrl(message);

    const response = plainToInstance(
      GetUploadUrlResponseDto,
      { presignedUrl: url },
      { excludeExtraneousValues: true },
    );

    return response;
  }

  @MessagePattern(LEARNING_CONTENT_TOPICS.POST_CONTENT)
  postContent() {
    return this.learningContentService.postContent();
  }
}
