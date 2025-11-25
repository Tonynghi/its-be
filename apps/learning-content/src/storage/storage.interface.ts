export interface StorageService {
  uploadFile(
    buffer: Buffer,
    mimeType: string,
    fileName: string,
  ): Promise<{ bucket: string; fileName: string }>;
  getWriteSignedUrl(objectName: string, mimeType: string): Promise<string>;
  getReadSignedUrl(objectName: string): Promise<string>;
}
