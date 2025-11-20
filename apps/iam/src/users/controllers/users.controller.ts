import { Controller } from '@nestjs/common';
import { UsersService } from '../services';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { USER_TOPICS } from 'common';
import { GetUserByIdRequestDto } from '../dtos';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern(USER_TOPICS.GET_USER_BY_ID)
  async getUserById(@Payload() message: GetUserByIdRequestDto) {
    const user = await this.usersService.getUserById(message.id);

    if (!user) {
      return null;
    }

    const response = {
      _id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
    };
    return response;
  }
}
