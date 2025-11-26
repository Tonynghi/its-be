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
import { SubjectDto } from './subjects.dto';
import { Types } from 'mongoose';

export class TopicDto {
  @Expose()
  @Transform(({ obj }) => (obj as Types.ObjectId)._id.toString())
  _id: string;

  @Expose()
  @Type(() => SubjectDto)
  subject: SubjectDto;

  @Expose()
  @IsString()
  name: string;

  @Expose()
  @IsOptional()
  @IsString()
  description: string;

  @Expose()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags: Array<string>;
}

export class CreateTopicRequestDto {
  @IsString()
  subjectId: string;

  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags: Array<string>;
}

export class CreateTopicResponsetDto {
  @Expose()
  @Transform(({ obj }) => (obj as Types.ObjectId)._id.toString())
  _id: string;

  @Expose()
  @Transform(({ obj }) => (obj as Types.ObjectId)._id.toString())
  subjectId: string;

  @Expose()
  @IsString()
  name: string;

  @Expose()
  @IsOptional()
  @IsString()
  description: string;

  @Expose()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags: Array<string>;
}

export class GetAllTopicsRequestDto {
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

export class GetAllTopicsResponseDto {
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
