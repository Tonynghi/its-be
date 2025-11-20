import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import type { ClientKafkaProxy } from '@nestjs/microservices';
import { USER_TOPICS, usersErrors } from 'common';
import { Types } from 'mongoose';
import { User } from '../interfaces';

@Injectable()
export class UsersProducer {
  constructor(
    @Inject('IAM_SERVICE') private readonly iamClient: ClientKafkaProxy,
  ) {}

  async onModuleInit() {
    const topics = Object.values(USER_TOPICS);

    for (const topic of topics) {
      this.iamClient.subscribeToResponseOf(topic);
    }

    await this.iamClient.connect();
  }

  public sendGetMyProfileRequest(id: Types.ObjectId) {
    const user = this.iamClient.send<User | null>(USER_TOPICS.GET_USER_BY_ID, {
      id,
    });

    if (!user) {
      throw new NotFoundException(usersErrors.USER_NOT_FOUND);
    }

    return user;
  }
}
