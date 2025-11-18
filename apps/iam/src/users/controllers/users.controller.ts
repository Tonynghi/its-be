import { Controller } from '@nestjs/common';
import { UsersService } from '../services';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
}
