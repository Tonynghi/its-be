import { Body, Controller, Post } from '@nestjs/common';
import { AuthProducer } from '../producers';
import { SignUpRequestDto } from '../dtos';

@Controller('auth')
export class AuthController {
  constructor(private readonly authProducer: AuthProducer) {}

  @Post('sign-up')
  signUp(@Body() signUpRequestDto: SignUpRequestDto) {
    return this.authProducer.signUp(signUpRequestDto);
  }
}
