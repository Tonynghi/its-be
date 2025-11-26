import { Expose, Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
  PAGE_SIZE_MIN,
  PAGE_SIZE_MAX,
} from '../../constants';
import { stringToNumber } from '../../utils';
import { TopicDto } from './topics.dto';
import { SubjectDto } from './subjects.dto';
import { Types } from 'mongoose';

export class ContentItemDto {
  @IsString()
  @Transform(({ obj }) => (obj as Types.ObjectId)._id.toString())
  _id: string;

  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @Expose()
  @Type(() => SubjectDto)
  subject: SubjectDto;

  @Expose()
  @IsArray()
  @Type(() => TopicDto)
  topics: TopicDto[];

  @IsString()
  bucket: string;

  @IsString()
  objectName: string;
}
export class GetUploadUrlRequestDto {
  @IsString()
  fileName: string;

  @IsString()
  mimeType: string;

  @IsString()
  subjectId: string;
}

export class GetUploadUrlResponseDto {
  @Expose()
  @IsString()
  presignedUrl: string;

  @Expose()
  @IsString()
  bucket: string;

  @Expose()
  @IsString()
  objectName: string;
}

export class PostContentRequestDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  bucket: string;

  @IsString()
  objectName: string;

  @IsString()
  subjectId: string;

  @IsString()
  @IsArray()
  @IsString({ each: true })
  topicIds: Array<string>;

  @IsString()
  userId: string;
}

export class PostContentResponseDto {
  @Expose()
  @Transform(({ obj }) => (obj as Types.ObjectId)._id.toString())
  _id: string;

  @Expose()
  @IsString()
  name: string;

  @Expose()
  @IsString()
  @IsOptional()
  description: string;

  @Expose()
  @IsString()
  bucket: string;

  @Expose()
  @IsString()
  objectName: string;
}

export class GetAllLearningContentsRequestDto {
  @IsOptional()
  @Transform(({ value }) =>
    stringToNumber(<string>value, { default: DEFAULT_PAGE, min: DEFAULT_PAGE }),
  )
  @IsNumber()
  @IsPositive()
  public currentPage: number;

  @IsOptional()
  @Transform(({ value }) =>
    stringToNumber(<string>value, {
      default: DEFAULT_PAGE_SIZE,
      min: PAGE_SIZE_MIN,
      max: PAGE_SIZE_MAX,
    }),
  )
  @IsNumber()
  @IsPositive()
  public pageSize: number;

  @IsOptional()
  @IsString()
  public search?: string;

  @IsOptional()
  @IsString()
  public subjectId?: string;
}

export class GetAllLearningContentsResponseDto {
  @Expose()
  totalPages: number;

  @Expose()
  pageSize: number;

  @Expose()
  currentPage: number;

  @Expose()
  totalItems: number;

  @Expose()
  @Type(() => TopicDto)
  results: TopicDto[];
}
