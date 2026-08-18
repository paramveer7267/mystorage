import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';

import { FilesService } from './files.service';
import { CreateUploadDto } from './dto/create-upload.dto';
import { CompleteUploadDto } from './dto/complete-upload.dto';
import { RenameFileDto } from './dto/rename-file.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @UseGuards(JwtAuthGuard)
  @Post('upload')
  createUpload(@Body() dto: CreateUploadDto, @Req() request: any) {
    return this.filesService.createUpload(
      request.user.userId,
      dto.fileName,
      dto.mimeType,
      dto.size,
      dto.folderId,
    );
  }
  @UseGuards(JwtAuthGuard)
  @Post('upload/complete')
  completeUpload(@Body() dto: CompleteUploadDto, @Req() request: any) {
    return this.filesService.completeUpload(
      request.user.userId,
      dto.fileName,
      dto.mimeType,
      dto.size,
      dto.key,
      dto.folderId,
    );
  }
  @Get()
  @UseGuards(JwtAuthGuard)
  getUserFiles(@Req() request: any) {
    return this.filesService.getUserFiles(request.user.userId);
  }
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  getFile(@Param('id') id: string, @Req() request: any) {
    return this.filesService.getFile(request.user.userId, id);
  }
  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  renameFile(
    @Param('id') id: string,
    @Body() dto: RenameFileDto,
    @Req() request: any,
  ) {
    return this.filesService.renameFile(request.user.userId, id, dto.name);
  }
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  deleteFile(@Param('id') id: string, @Req() request: any) {
    return this.filesService.deleteFile(request.user.userId, id);
  }
  @Get(':id/download')
  @UseGuards(JwtAuthGuard)
  getDownloadUrl(@Param('id') id: string, @Req() request: any) {
    return this.filesService.getDownloadUrl(request.user.userId, id);
  }
}
