import { Injectable } from '@nestjs/common';
import { SignUpRequestDto } from '../dtos';
import { plainToInstance } from 'class-transformer';
import { CreateUserRequestDto } from '../../users/dtos';
import { UsersService } from '../../users/services';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signUp(dto: SignUpRequestDto): Promise<string> {
    const { name, email, role, password } = dto;
    const createUserRequestData = {
      name,
      email,
      role,
      password,
    };

    const createUserRequestDto = plainToInstance(
      CreateUserRequestDto,
      createUserRequestData,
    );

    const user = await this.usersService.createUser(createUserRequestDto);
    const jwtPayload = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    return await this.jwtService.signAsync(jwtPayload);
  }
}
