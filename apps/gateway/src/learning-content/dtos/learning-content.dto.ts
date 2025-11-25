import { Expose } from 'class-transformer';
import { IsArray, IsOptional, IsString } from 'class-validator';

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
  @IsString()
  _id: string;

  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  bucket: string;

  @IsString()
  objectName: string;
}
