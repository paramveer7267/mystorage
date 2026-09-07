import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';

import { FoldersService } from './folders.service';

import { CreateFolderDto } from './dto/create-folder.dto';
import { RenameFolderDto } from './dto/rename-folder.dto';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('folders')
@UseGuards(JwtAuthGuard)
export class FoldersController {
  constructor(private readonly foldersService: FoldersService) {}

  @Post()
  createFolder(@Body() dto: CreateFolderDto, @Req() request: any) {
    return this.foldersService.createFolder(
      request.user.userId,
      dto.name,
      dto.parentFolderId,
    );
  }

  @Get()
  getFolders(
    @Query('parentFolderId')
    parentFolderId: string | undefined,

    @Req() request: any,
  ) {
    return this.foldersService.getFolders(request.user.userId, parentFolderId);
  }

  @Patch(':id')
  renameFolder(
    @Param('id') id: string,
    @Body() dto: RenameFolderDto,
    @Req() request: any,
  ) {
    return this.foldersService.renameFolder(request.user.userId, id, dto.name);
  }

  @Delete(':id')
  deleteFolder(@Param('id') id: string, @Req() request: any) {
    return this.foldersService.deleteFolder(request.user.userId, id);
  }
}
