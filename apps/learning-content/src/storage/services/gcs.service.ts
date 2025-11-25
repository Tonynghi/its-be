import { Storage } from '@google-cloud/storage';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import path from 'path';
import { StorageService } from '../storage.interface';

@Injectable()
export class GCSService implements StorageService {
  private storage: Storage;
  private bucketName: string;

  constructor(@Inject() configService: ConfigService) {
    const projectId = configService.get<string>('GCP_PROJECT_ID');
    const keyFilePath = configService.get<string>('GCP_KEY_FILE_PATH');
    const bucketName = configService.get<string>('GCP_BUCKET_NAME');

    if (!projectId) {
      throw new Error('GCP Project ID is missing.');
    }

    if (!keyFilePath) {
      throw new Error('Path to GCP Key File is missing.');
    }

    if (!bucketName) {
      throw new Error('Bucket name is missing.');
    }

    this.bucketName = bucketName;
    this.storage = new Storage({
      projectId: projectId,
      keyFilename: path.join(process.cwd(), keyFilePath),
    });
  }

  async uploadFile(buffer: Buffer, mimeType: string, fileName: string) {
    const bucketName = this.bucketName;
    const bucket = this.storage.bucket(bucketName);
    const file = bucket.file(fileName);

    await file.save(buffer, {
      resumable: false,
      contentType: mimeType,
      metadata: { contentType: mimeType },
    });

    return { bucket: bucketName, fileName };
  }

  async getWriteSignedUrl(
    objectName: string,
    mimeType: string,
  ): Promise<string> {
    const bucketName = this.bucketName;
    const [url] = await this.storage
      .bucket(bucketName)
      .file(objectName)
      .getSignedUrl({
        action: 'write',
        expires: Date.now() + 600 * 1000,
        contentType: mimeType,
      });

    return url;
  }

  async getReadSignedUrl(objectName: string): Promise<string> {
    const bucketName = this.bucketName;
    const [url] = await this.storage
      .bucket(bucketName)
      .file(objectName)
      .getSignedUrl({
        action: 'read',
        expires: Date.now() + 3600 * 1000,
      });

    return url;
  }
}
