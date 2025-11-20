import { Controller, Get, UseGuards } from '@nestjs/common';
import { UsersProducer } from '../producers';
import { AuthGuard } from '../guards';
import { CurrentUser } from '../decorators';
import type { JwtPayload } from '../schemas';

@Controller('users')
export class UsersController {
  constructor(private readonly usersProducer: UsersProducer) {}

  @Get('me')
  @UseGuards(AuthGuard)
  getMyProfile(@CurrentUser() user: JwtPayload) {
    return this.usersProducer.sendGetMyProfileRequest(user.id);
  }
}
