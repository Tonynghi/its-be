import { Expose } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

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
