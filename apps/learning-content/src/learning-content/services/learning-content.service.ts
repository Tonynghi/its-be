import { Injectable } from '@nestjs/common';

@Injectable()
export class LearningContentService {
  public postContent() {
    return { message: 'Learning content posted successfully' };
  }
}
