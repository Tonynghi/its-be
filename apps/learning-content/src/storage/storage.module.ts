import { Module } from '@nestjs/common';
import { GCSService } from './services';

export const STORAGE_SERVICE = 'STORAGE_SERVICE';

@Module({
  imports: [],
  providers: [
    {
      provide: STORAGE_SERVICE,
      useClass: GCSService,
    },
  ],
  controllers: [],
  exports: [STORAGE_SERVICE],
})
export class StorageModule {}
