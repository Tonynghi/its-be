import {
  Controller,
  Post,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { LearningContentProducer } from '../producers';
import { CurrentUser } from '../../iam/decorators';
import { Role, type JwtPayload } from '../../iam/schemas';
import { learningContentErrors } from 'common';
import { AuthGuard } from '../../iam/guards';

@Controller('content')
export class LearningContentController {
  constructor(
    private readonly learningContentProducer: LearningContentProducer,
  ) {}

  @Post('/')
  @UseGuards(AuthGuard)
  postLearningContent(@CurrentUser() user: JwtPayload) {
    if (user.role !== Role.TUTOR) {
      throw new UnauthorizedException(
        learningContentErrors.NOT_AUTHORIZED_TO_POST_CONTENT,
      );
    }
    return this.learningContentProducer.postContent();
  }
}
