import { Controller } from '@nestjs/common';
import { UsersService } from '../services';
import { MessagePattern } from '@nestjs/microservices';
import { USER_TOPICS } from 'common';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern(USER_TOPICS.GET_MY_PROFILE)
  async getMyProfile(): Promise<string> {
    return this.usersService.getUserById();
  }
}
