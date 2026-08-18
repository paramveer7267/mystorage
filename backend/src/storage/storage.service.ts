import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  S3Client,
  ListObjectsV2Command,
  PutObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
} from '@aws-sdk/client-s3';

import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

@Injectable()
export class StorageService {
  private readonly s3: S3Client;
  private readonly bucketName: string;

  constructor(private readonly configService: ConfigService) {
    const accountId = this.configService.get<string>('R2_ACCOUNT_ID');

    const accessKeyId = this.configService.get<string>('R2_ACCESS_KEY_ID');

    const secretAccessKey = this.configService.get<string>(
      'R2_SECRET_ACCESS_KEY',
    );

    this.bucketName = this.configService.get<string>('R2_BUCKET_NAME')!;

    this.s3 = new S3Client({
      region: 'auto',

      endpoint: `https://${accountId}.r2.cloudflarestorage.com`,

      credentials: {
        accessKeyId: accessKeyId!,
        secretAccessKey: secretAccessKey!,
      },
    });
  }
  async createUploadUrl(key: string, contentType: string) {
    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: key,
      ContentType: contentType,
    });

    const uploadUrl = await getSignedUrl(this.s3, command, {
      expiresIn: 300,
    });

    return {
      uploadUrl,
      key,
    };
  }
  async testConnection() {
    const command = new ListObjectsV2Command({
      Bucket: this.bucketName,
      MaxKeys: 10,
    });

    const result = await this.s3.send(command);

    return {
      connected: true,
      bucket: this.bucketName,
      files:
        result.Contents?.map((file) => ({
          key: file.Key,
          size: file.Size,
        })) ?? [],
    };
  }
  async deleteFile(key: string) {
    const command = new DeleteObjectCommand({
      Bucket: this.bucketName,
      Key: key,
    });

    await this.s3.send(command);

    return {
      deleted: true,
      key,
    };
  }
  async createDownloadUrl(key: string, fileName: string, mimeType: string) {
    const command = new GetObjectCommand({
      Bucket: this.bucketName,
      Key: key,

      ResponseContentType: mimeType,

      ResponseContentDisposition: `inline; filename="${fileName}"`,
    });

    const downloadUrl = await getSignedUrl(this.s3, command, {
      expiresIn: 300,
    });

    return {
      downloadUrl,
    };
  }
  async createForcedDownloadUrl(
    key: string,
    fileName: string,
    mimeType: string,
  ) {
    const command = new GetObjectCommand({
      Bucket: this.bucketName,
      Key: key,

      ResponseContentType: mimeType,

      ResponseContentDisposition: `attachment; filename="${fileName}"`,
    });

    const downloadUrl = await getSignedUrl(this.s3, command, {
      expiresIn: 300,
    });

    return {
      downloadUrl,
    };
  }
}
