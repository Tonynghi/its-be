import { Inject, Injectable } from '@nestjs/common';
import type { ClientKafkaProxy } from '@nestjs/microservices';
import { AUTH_TOPICS } from 'common';
import { SignUpRequestDto } from '../dtos';

@Injectable()
export class AuthProducer {
  constructor(
    @Inject('IAM_SERVICE') private readonly iamClient: ClientKafkaProxy,
  ) {}

  async onModuleInit() {
    const topics = [AUTH_TOPICS.SIGN_UP];
    for (const topic of topics) {
      this.iamClient.subscribeToResponseOf(topic);
    }
    await this.iamClient.connect();
  }

  public signUp(signUpRequestDto: SignUpRequestDto) {
    return this.iamClient.send<string>(AUTH_TOPICS.SIGN_UP, signUpRequestDto);
  }
}
