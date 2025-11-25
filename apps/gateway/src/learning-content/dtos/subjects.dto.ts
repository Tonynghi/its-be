import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

export class CreateSubjectRequestDto {
  @IsString()
  name: string;

  @IsString()
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
  description: string;
}
