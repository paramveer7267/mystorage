import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';

export class CompleteUploadDto {
  @IsString()
  @IsNotEmpty()
  fileName: string;

  @IsString()
  @IsNotEmpty()
  mimeType: string;

  @IsInt()
  @Min(1)
  size: number;

  @IsString()
  @IsNotEmpty()
  key: string;

  @IsOptional()
  @IsString()
  folderId?: string;
}
