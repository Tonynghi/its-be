import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TOPICS_COLLECTION_NAME } from '../../constants';
import { Model, Types } from 'mongoose';
import { Topic } from '../schemas';
import { CreateTopicRequestDto } from '../dtos';
import { SubjectsService } from './subjects.service';
import { RpcException } from '@nestjs/microservices';
import { subjectsErrors } from 'common';

@Injectable()
export class TopicsService {
  constructor(
    @InjectModel(TOPICS_COLLECTION_NAME) private topicModel: Model<Topic>,
    private readonly subjectsService: SubjectsService,
  ) {}

  public async createTopic(dto: CreateTopicRequestDto) {
    const { subjectId, name, description, tags } = dto;

    const subject = await this.subjectsService.findSubjectById(
      new Types.ObjectId(subjectId),
    );

    if (!subject) {
      throw new RpcException(subjectsErrors.NOT_FOUND_BY_ID);
    }

    return await this.topicModel.create({
      subject: subjectId,
      name,
      description,
      tags,
    });
  }
}
