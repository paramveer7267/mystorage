import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { File, FileDocument } from './schemas/file.schema';
import { StorageService } from '../storage/storage.service';
import { FoldersService } from '../folders/folders.service';

@Injectable()
export class FilesService {
  constructor(
    @InjectModel(File.name)
    private readonly fileModel: Model<FileDocument>,

    private readonly storageService: StorageService,

    private readonly foldersService: FoldersService,
  ) {}

  private async validateFolder(userId: string, folderId?: string) {
    if (!folderId) {
      return;
    }

    const folder = await this.foldersService.findFolder(userId, folderId);

    if (!folder) {
      throw new NotFoundException('Folder not found');
    }
  }
  async createUpload(
    userId: string,
    fileName: string,
    mimeType: string,
    size: number,
    folderId?: string,
  ) {
    await this.validateFolder(userId, folderId);
    const safeFileName = fileName.replace(/[^a-zA-Z0-9._-]/g, '_');

    const key = `users/${userId}/files/` + `${Date.now()}-${safeFileName}`;

    const upload = await this.storageService.createUploadUrl(key, mimeType);

    return {
      uploadUrl: upload.uploadUrl,
      key,
      fileName,
      mimeType,
      size,
      folderId: folderId || null,
    };
  }
  async completeUpload(
    userId: string,
    fileName: string,
    mimeType: string,
    size: number,
    key: string,
    folderId?: string,
  ) {
    await this.validateFolder(userId, folderId);
    return this.fileModel.create({
      name: fileName,
      originalName: fileName,
      mimeType,
      size,
      r2Key: key,
      userId,
      folderId: folderId || null,
    });
  }

  async getUserFiles(userId: string, folderId?: string) {
    return this.fileModel
      .find({
        userId,
        folderId: folderId ? new Types.ObjectId(folderId) : null,
      })
      .sort({ createdAt: -1 })
      .lean();
  }

  async getFile(userId: string, fileId: string) {
    const file = await this.fileModel.findOne({
      _id: fileId,
      userId,
    });

    if (!file) {
      throw new NotFoundException('File not found');
    }

    return file;
  }
  async renameFile(userId: string, fileId: string, name: string) {
    const file = await this.fileModel.findOneAndUpdate(
      {
        _id: fileId,
        userId,
      },
      {
        $set: {
          name,
        },
      },
      {
        new: true,
      },
    );

    if (!file) {
      throw new NotFoundException('File not found');
    }

    return file;
  }
  async deleteFile(userId: string, fileId: string) {
    const file = await this.fileModel.findOne({
      _id: fileId,
      userId,
    });

    if (!file) {
      throw new NotFoundException('File not found');
    }

    await this.storageService.deleteFile(file.r2Key);

    await this.fileModel.deleteOne({
      _id: fileId,
      userId,
    });

    return {
      message: 'File deleted successfully',
    };
  }
  async getDownloadUrl(userId: string, fileId: string) {
    const file = await this.fileModel.findOne({
      _id: fileId,
      userId,
    });

    if (!file) {
      throw new NotFoundException('File not found');
    }

    const result = await this.storageService.createDownloadUrl(
      file.r2Key,
      file.originalName,
      file.mimeType,
    );

    return {
      fileId: file._id,
      fileName: file.originalName,
      mimeType: file.mimeType,
      size: file.size,
      url: result.downloadUrl,
    };
  }
}
