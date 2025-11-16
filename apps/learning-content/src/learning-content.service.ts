import { Injectable } from '@nestjs/common';

@Injectable()
export class LearningContentService {
  getHello(): string {
    return 'Hello World!';
  }
}
