import { IsString } from 'class-validator';
import { Role } from '../schemas';
import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';

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

export class GetUserByIdRequestDto {
  id: Types.ObjectId;
}
