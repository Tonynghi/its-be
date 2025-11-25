import { Storage } from '@google-cloud/storage';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import path from 'path';
import { StorageService } from '../storage.interface';

@Injectable()
export class GCSService implements StorageService {
  private storage: Storage;

  constructor(@Inject() configService: ConfigService) {
    const projectId = configService.get<string>('GCP_PROJECT_ID');
    const keyFilePath = configService.get<string>('GCP_KEY_FILE_PATH');

    if (!projectId) {
      throw new Error('GCP Project ID is missing.');
    }

    if (!keyFilePath) {
      throw new Error('Path to GCP Key File is missing.');
    }

    this.storage = new Storage({
      projectId: configService.get<string>('GCP_PROJECT_ID'),
      keyFilename: path.join(__dirname, keyFilePath),
    });
  }

  async uploadFile(
    buffer: Buffer,
    bucketName: string,
    mimeType: string,
    fileName: string,
  ) {
    const bucket = this.storage.bucket(bucketName);
    const file = bucket.file(fileName);

    await file.save(buffer, {
      resumable: false,
      contentType: mimeType,
      metadata: { contentType: mimeType },
    });

    return { bucket: bucketName, fileName };
  }

  async getSignedUrl(objectName: string, bucketName: string): Promise<string> {
    const [url] = await this.storage
      .bucket(bucketName)
      .file(objectName)
      .getSignedUrl({
        action: 'read',
        expires: Date.now() + 3600 * 1000, // 1 hour
      });

    return url;
  }
}
