import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../interfaces';

export class SignUpRequestDto {
  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsString()
  @ApiProperty({ enum: Role, default: Role.STUDENT })
  role: Role;
}
