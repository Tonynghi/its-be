import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  public async getUserById(): Promise<string> {
    return await Promise.resolve('testkafka');
  }
}
