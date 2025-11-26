import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SubjectsService } from '../services/subjects.service';
import { SUBJECTS_TOPICS } from 'common/topics/subjects.topic';
import {
  CreateSubjectRequestDto,
  CreateSubjectResponseDto,
  GetAllSubjectsRequestDto,
  GetAllSubjectsResponseDto,
} from '../dtos';
import { plainToInstance } from 'class-transformer';

@Controller()
export class SubjectsController {
  constructor(private readonly subjectsService: SubjectsService) {}

  @MessagePattern(SUBJECTS_TOPICS.GET_ALL_SUBJECTS)
  async getAllSubjects(@Payload() message: GetAllSubjectsRequestDto) {
    const request = plainToInstance(GetAllSubjectsRequestDto, message);

    const result = await this.subjectsService.getAllSubjects(request);

    const response = plainToInstance(GetAllSubjectsResponseDto, result, {
      excludeExtraneousValues: true,
    });
    return response;
  }

  @MessagePattern(SUBJECTS_TOPICS.CREATE_SUBJECT)
  async createSubject(@Payload() message: CreateSubjectRequestDto) {
    const subject = await this.subjectsService.createSubject(message);

    const response = plainToInstance(CreateSubjectResponseDto, subject, {
      excludeExtraneousValues: true,
    });
    return response;
  }
}
