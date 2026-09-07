import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { FoldersController } from './folders.controller';
import { FoldersService } from './folders.service';

import { Folder, FolderSchema } from './schemas/folder.schema';
import { File, FileSchema } from '../files/schemas/file.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Folder.name,
        schema: FolderSchema,
      },
      {
        name: File.name,
        schema: FileSchema,
      },
    ]),
  ],

  controllers: [FoldersController],

  providers: [FoldersService],

  exports: [FoldersService],
})
export class FoldersModule {}
