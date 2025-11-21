import { Controller, Get, UseGuards } from '@nestjs/common';
import { UsersProducer } from '../producers';
import { UserGuard } from '../guards';
import { CurrentUser } from '../decorators';
import type { JwtPayload } from '../schemas';

@Controller('users')
export class UsersController {
  constructor(private readonly usersProducer: UsersProducer) {}

  @Get('me')
  @UseGuards(UserGuard)
  getMyProfile(@CurrentUser() user: JwtPayload) {
    return this.usersProducer.sendGetMyProfileRequest(user.id);
  }
}
