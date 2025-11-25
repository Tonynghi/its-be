import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { TutorGuard } from '../../iam/guards';
import { SubjectsProducer } from '../producers';
import { CreateSubjectRequestDto } from '../dtos';

@Controller('subjects')
export class SubjectsController {
  constructor(private readonly subjectsProducer: SubjectsProducer) {}

  @Post('/')
  @UseGuards(TutorGuard)
  createSubject(@Body() createSubjectRequest: CreateSubjectRequestDto) {
    return this.subjectsProducer.createSubject(createSubjectRequest);
  }
}
