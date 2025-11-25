import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../schemas';
import { Model, Types } from 'mongoose';
import { CreateUserRequestDto } from '../dtos';
import { USERS_COLLECTION_NAME } from '../../constants';
import * as brcypt from 'bcrypt';
import { RpcException } from '@nestjs/microservices';
import { authErrors } from 'common';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(USERS_COLLECTION_NAME) private userModel: Model<User>,
  ) {}

  async createUser(dto: CreateUserRequestDto): Promise<UserDocument> {
    const { name, email, password, role } = dto;

    const salt = await brcypt.genSalt();
    const hashedPassword = await brcypt.hash(password, salt);

    return await this.userModel.create({
      name,
      email,
      password: hashedPassword,
      role,
    });
  }

  async validateUser(email: string, password: string): Promise<UserDocument> {
    const user = await this.getUserByEmail(email);
    if (!user) {
      throw new RpcException(authErrors.USER_NOT_FOUND);
    }

    const isPasswordValid = await brcypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new RpcException(authErrors.INVALID_PASSWORD);
    }

    return user;
  }

  async getUserByEmail(email: string): Promise<UserDocument | null> {
    return await this.userModel.findOne({ email });
  }

  async getUserById(id: Types.ObjectId): Promise<UserDocument | null> {
    const user = await this.userModel.findById(id);

    return user;
  }
}
