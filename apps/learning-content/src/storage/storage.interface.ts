export interface StorageService {
  uploadFile(
    buffer: Buffer,
    bucketName: string,
    mimeType: string,
    fileName: string,
  ): Promise<{ bucket: string; fileName: string }>;
  getSignedUrl(objectName: string, bucketName: string): Promise<string>;
}
