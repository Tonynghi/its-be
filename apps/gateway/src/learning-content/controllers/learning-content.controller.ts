import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { LearningContentProducer } from '../producers';
import { TutorGuard, UserGuard } from '../../iam/guards';
import {
  GetDownloadUrlRequestDto,
  GetUploadUrlRequestDto,
  PostContentRequestDto,
} from '../dtos';
import type { LearningContentsFilterQueryRequest } from '../interfaces';
import { plainToInstance } from 'class-transformer';

@Controller('content')
export class LearningContentController {
  constructor(
    private readonly learningContentProducer: LearningContentProducer,
  ) {}

  @Get(':id/download')
  @UseGuards(UserGuard)
  async getDownloadContentUrl(@Param('id') id: string) {
    const request = plainToInstance(GetDownloadUrlRequestDto, { id });
    return await this.learningContentProducer.getDownloadContentUrl(request);
  }

  @Post('/url')
  @UseGuards(TutorGuard)
  async getUploadContentUrl(@Body() request: GetUploadUrlRequestDto) {
    return await this.learningContentProducer.getUploadContentUrl(request);
  }

  @Post('/')
  @UseGuards(TutorGuard)
  async postLearningContent(@Body() request: PostContentRequestDto) {
    return await this.learningContentProducer.postContent(request);
  }

  @Get('/')
  @UseGuards(UserGuard)
  getAllLearningContents(@Query() query: LearningContentsFilterQueryRequest) {
    return this.learningContentProducer.getAllLearningContents(query);
  }
}
