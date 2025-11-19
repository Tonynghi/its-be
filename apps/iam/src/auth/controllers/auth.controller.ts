import { Controller } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AUTH_TOPICS } from 'common/topics';
import { SignUpRequestDto } from '../dtos';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern(AUTH_TOPICS.SIGN_UP)
  async signUp(@Payload() message: SignUpRequestDto) {
    return await this.authService.signUp(message);
  }

  @MessagePattern(AUTH_TOPICS.SIGN_IN)
  async signIn(@Payload() message: SignUpRequestDto) {
    return await this.authService.signIn(message);
  }
}
