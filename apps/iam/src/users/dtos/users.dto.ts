import { IsString } from 'class-validator';
import { Role } from '../schemas';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserRequestDto {
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
