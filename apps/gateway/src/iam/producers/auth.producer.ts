import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import type { ClientKafkaProxy, RpcException } from '@nestjs/microservices';
import { AUTH_TOPICS } from 'common';
import { SignInRequestDto, SignUpRequestDto } from '../dtos';
import { authErrors } from 'common';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AuthProducer {
  constructor(
    @Inject('IAM_SERVICE') private readonly iamClient: ClientKafkaProxy,
  ) {}

  async onModuleInit() {
    const topics = [AUTH_TOPICS.SIGN_UP, AUTH_TOPICS.SIGN_IN];
    for (const topic of topics) {
      this.iamClient.subscribeToResponseOf(topic);
    }
    await this.iamClient.connect();
  }

  public async signUp(signUpRequestDto: SignUpRequestDto) {
    try {
      const response = await lastValueFrom(
        this.iamClient.send<{ accessToken: string }>(
          AUTH_TOPICS.SIGN_UP,
          signUpRequestDto,
        ),
      );

      return response;
    } catch (error) {
      const message = (error as RpcException).message;
      if (!message) {
        throw new Error('Unknown error occurred during sign up');
      }

      if (message === authErrors.EXISTING_USER) {
        throw new ConflictException(message);
      }

      throw new Error(message);
    }
  }

  public async signIn(signInRequestDto: SignInRequestDto) {
    try {
      const response = await lastValueFrom(
        this.iamClient.send<{ accessToken: string }>(
          AUTH_TOPICS.SIGN_IN,
          signInRequestDto,
        ),
      );

      return response;
    } catch (error) {
      const message = (error as RpcException).message;
      if (!message) {
        throw new Error('Unknown error occurred during sign up');
      }

      if (
        message === authErrors.INVALID_CREDENTIALS ||
        message === authErrors.INVALID_PASSWORD
      ) {
        throw new UnauthorizedException(message);
      }

      if (message === authErrors.USER_NOT_FOUND) {
        throw new NotFoundException(message);
      }

      throw new Error(message);
    }
  }
}
