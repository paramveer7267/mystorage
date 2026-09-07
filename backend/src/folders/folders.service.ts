import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { File, FileDocument } from '../files/schemas/file.schema';
import { Folder, FolderDocument } from './schemas/folder.schema';

@Injectable()
export class FoldersService {
  constructor(
    @InjectModel(Folder.name)
    private readonly folderModel: Model<FolderDocument>,

    @InjectModel(File.name)
    private readonly fileModel: Model<FileDocument>,
  ) {}

  async createFolder(userId: string, name: string, parentFolderId?: string) {
    if (parentFolderId) {
      const parent = await this.folderModel.findOne({
        _id: parentFolderId,
        userId,
      });

      if (!parent) {
        throw new NotFoundException('Parent folder not found');
      }
    }

    return this.folderModel.create({
      name,
      userId,
      parentFolderId: parentFolderId || null,
    });
  }

  async getFolders(userId: string, parentFolderId?: string) {
    return this.folderModel
      .find({
        userId,
        parentFolderId: parentFolderId
          ? new Types.ObjectId(parentFolderId)
          : null,
      })
      .sort({ name: 1 })
      .lean();
  }

  async renameFolder(userId: string, folderId: string, name: string) {
    const folder = await this.folderModel.findOneAndUpdate(
      {
        _id: folderId,
        userId,
      },
      {
        $set: { name },
      },
      {
        new: true,
      },
    );

    if (!folder) {
      throw new NotFoundException('Folder not found');
    }

    return folder;
  }

  async deleteFolder(userId: string, folderId: string) {
    const folder = await this.folderModel.findOne({
      _id: folderId,
      userId,
    });

    if (!folder) {
      throw new NotFoundException('Folder not found');
    }
    const hasFiles = await this.fileModel.exists({
      folderId: folder._id,
      userId,
    });
    if (hasFiles) {
      throw new BadRequestException('Folder is not empty');
    }
    const hasChildren = await this.folderModel.exists({
      parentFolderId: folder._id,
      userId,
    });

    if (hasChildren) {
      throw new BadRequestException('Folder is not empty');
    }

    await this.folderModel.deleteOne({
      _id: folderId,
      userId,
    });

    return {
      message: 'Folder deleted successfully',
    };
  }
  async findFolder(userId: string, folderId: string) {
    return this.folderModel.findOne({
      _id: folderId,
      userId,
    });
  }
}
