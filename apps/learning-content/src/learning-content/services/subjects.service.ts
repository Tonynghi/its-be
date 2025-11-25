import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SUBJECTS_COLLECTION_NAME } from '../../constants';
import { Model, Types } from 'mongoose';
import { Subject } from '../schemas';
import { CreateSubjectRequestDto } from '../dtos';

@Injectable()
export class SubjectsService {
  constructor(
    @InjectModel(SUBJECTS_COLLECTION_NAME) private subjectModel: Model<Subject>,
  ) {}

  public async createSubject(dto: CreateSubjectRequestDto) {
    const { name, description } = dto;

    return await this.subjectModel.create({
      name,
      description,
    });
  }

  public async findSubjectById(subjectId: Types.ObjectId) {
    return await this.subjectModel.findById(subjectId);
  }
}
