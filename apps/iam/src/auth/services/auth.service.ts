import { Injectable } from '@nestjs/common';
import { SignInRequestDto, SignUpRequestDto } from '../dtos';
import { plainToInstance } from 'class-transformer';
import { CreateUserRequestDto } from '../../users/dtos';
import { UsersService } from '../../users/services';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../schemas';
import { RpcException } from '@nestjs/microservices';
import { authErrors } from 'common';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signUp(dto: SignUpRequestDto): Promise<{ accessToken: string }> {
    const { name, email, role, password } = dto;
    const createUserRequestData = {
      name,
      email,
      role,
      password,
    };

    const existingUser = await this.usersService.getUserByEmail(email);
    if (existingUser) {
      throw new RpcException(authErrors.EXISTING_USER);
    }

    const createUserRequestDto = plainToInstance(
      CreateUserRequestDto,
      createUserRequestData,
    );

    const user = await this.usersService.createUser(createUserRequestDto);
    const jwtPayload: JwtPayload = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    const accessToken = await this.jwtService.signAsync(jwtPayload);

    return { accessToken };
  }

  async signIn(dto: SignInRequestDto): Promise<{ accessToken: string }> {
    const { email, password } = dto;
    const user = await this.usersService.validateUser(email, password);

    const jwtPayload = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    const accessToken = await this.jwtService.signAsync(jwtPayload);

    return { accessToken };
  }
}
