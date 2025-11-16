import { Injectable } from '@nestjs/common';

@Injectable()
export class LearningPersonalizationService {
  getHello(): string {
    return 'Hello World!';
  }
}
