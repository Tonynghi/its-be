import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SubjectsService } from '../services/subjects.service';
import { SUBJECTS_TOPICS } from 'common/topics/subjects.topic';
import { CreateSubjectRequestDto, CreateSubjectResponseDto } from '../dtos';
import { plainToInstance } from 'class-transformer';

@Controller()
export class SubjectsController {
  constructor(private readonly subjectsService: SubjectsService) {}

  @MessagePattern(SUBJECTS_TOPICS.CREATE_SUBJECT)
  async postContent(@Payload() message: CreateSubjectRequestDto) {
    const subject = await this.subjectsService.createSubject(message);

    const response = plainToInstance(CreateSubjectResponseDto, subject, {
      excludeExtraneousValues: true,
    });
    return response;
  }
}
