import {
  //  Inject,
  Injectable,
} from '@nestjs/common';
// import { STORAGE_SERVICE } from '../../storage/storage.module';
// import type { StorageService } from '../../storage/storage.interface';

@Injectable()
export class LearningContentService {
  constructor() {} // @Inject(STORAGE_SERVICE) storageService: StorageService

  public postContent() {
    return { message: 'Learning content posted successfully' };
  }
}
