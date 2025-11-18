import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../schemas';
import { Model, Types } from 'mongoose';
import { CreateUserRequestDto } from '../dtos';
import { UsersCollectionName } from '../../constants';
import * as brcypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UsersCollectionName) private userModel: Model<User>,
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

  async getUserById(id: Types.ObjectId): Promise<UserDocument | null> {
    return await this.userModel.findById(id);
  }
}
