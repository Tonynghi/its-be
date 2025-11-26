import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SUBJECTS_COLLECTION_NAME } from '../../constants';
import { FilterQuery, Model, Types } from 'mongoose';
import { Subject, SubjectDocument } from '../schemas';
import { CreateSubjectRequestDto } from '../dtos';
import { SubjectFilterQueryRequest } from '../interfaces';

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

  public async getAllSubjects(query: SubjectFilterQueryRequest) {
    const { search, pageNumber, pageSize } = query;

    const filter: FilterQuery<SubjectDocument> = {
      $and: [
        search
          ? {
              $or: [{ name: { $regex: search, $options: 'i' } }],
            }
          : {},
      ],
    };

    const totalItems = await this.subjectModel.countDocuments(filter);
    const totalPages = Math.ceil(totalItems / pageSize);
    const skip = (pageNumber - 1) * pageSize;

    const results = await this.subjectModel
      .aggregate<SubjectDocument[]>([
        { $match: filter },
        { $skip: skip },
        { $limit: pageSize },
        {
          $project: {
            _id: 1,
            name: 1,
            description: 1,
          },
        },
      ])
      .exec();

    return {
      totalPages,
      pageSize,
      currentPage: pageNumber,
      totalItems,
      results,
    };
  }

  public async findSubjectById(subjectId: Types.ObjectId) {
    return await this.subjectModel.findById(subjectId);
  }
}
