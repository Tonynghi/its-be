import { Expose } from 'class-transformer';
import { IsArray, IsOptional, IsString } from 'class-validator';

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
  @IsString()
  _id: string;

  @Expose()
  @IsString()
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
