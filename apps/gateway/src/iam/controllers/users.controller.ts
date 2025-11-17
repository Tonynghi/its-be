import { Controller, Get } from '@nestjs/common';
import { UsersProducer } from '../producers';

@Controller('users')
export class UsersController {
  constructor(private readonly usersProducer: UsersProducer) {}

  @Get('me')
  getMyProfile() {
    return this.usersProducer.sendGetMyProfileRequest();
  }
}
