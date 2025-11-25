import { Expose } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

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
}

export class PostContentRequestDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description: string;
}
