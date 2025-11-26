import { Expose, Transform, Type } from 'class-transformer';
import { IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';
import { stringToNumber } from '../../utils';
import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
  PAGE_SIZE_MIN,
  PAGE_SIZE_MAX,
} from '../../constants';

export class SubjectDto {
  @Expose()
  @IsString()
  _id: string;

  @Expose()
  @IsString()
  name: string;

  @Expose()
  @IsString()
  @IsOptional()
  description: string;
}
export class CreateSubjectRequestDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description: string;
}

export class CreateSubjectResponseDto {
  @Expose()
  @IsString()
  _id: string;

  @Expose()
  @IsString()
  name: string;

  @Expose()
  @IsString()
  @IsOptional()
  description: string;
}

export class GetAllSubjectsRequestDto {
  @IsOptional()
  @Transform(({ value }) =>
    stringToNumber(<string>value, { default: DEFAULT_PAGE, min: DEFAULT_PAGE }),
  )
  @IsNumber()
  @IsPositive()
  public pageNumber: number;

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
}

export class GetAllSubjectsResponseDto {
  @Expose()
  totalPages: number;

  @Expose()
  pageSize: number;

  @Expose()
  currentPage: number;

  @Expose()
  totalItems: number;

  @Expose()
  @Type(() => SubjectDto)
  results: SubjectDto[];
}
