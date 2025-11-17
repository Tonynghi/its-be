import { Inject, Injectable } from '@nestjs/common';
import type { ClientKafkaProxy } from '@nestjs/microservices';
import { USER_TOPICS } from 'common';

@Injectable()
export class UsersProducer {
  constructor(
    @Inject('IAM_SERVICE') private readonly iamClient: ClientKafkaProxy,
  ) {}

  async onModuleInit() {
    this.iamClient.subscribeToResponseOf(USER_TOPICS.GET_MY_PROFILE);
    await this.iamClient.connect();
  }

  public sendGetMyProfileRequest() {
    return this.iamClient.send(USER_TOPICS.GET_MY_PROFILE, {});
  }
}
