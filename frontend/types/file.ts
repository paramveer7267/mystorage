export interface StorageFile {
  _id: string;
  fileName: string;
  mimeType: string;
  size: number;
  key: string;
  folderId?: string | null;
  userId?: string;
  createdAt?: string;
  updatedAt?: string;
}
