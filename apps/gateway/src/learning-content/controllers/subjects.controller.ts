import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { TutorGuard, UserGuard } from '../../iam/guards';
import { SubjectsProducer } from '../producers';
import { CreateSubjectRequestDto } from '../dtos';
import { GetAllSubjectsRequestDto } from 'apps/learning-content/src/learning-content/dtos';

@Controller('subjects')
export class SubjectsController {
  constructor(private readonly subjectsProducer: SubjectsProducer) {}

  @Get('/')
  @UseGuards(UserGuard)
  getAllSubjects(@Query() query: GetAllSubjectsRequestDto) {
    return this.subjectsProducer.getAllSubjects(query);
  }

  @Post('/')
  @UseGuards(TutorGuard)
  createSubject(@Body() createSubjectRequest: CreateSubjectRequestDto) {
    return this.subjectsProducer.createSubject(createSubjectRequest);
  }
}
