export interface Folder {
  _id: string;
  name: string;
  parentFolderId?: string | null;
  userId?: string;
  createdAt?: string;
  updatedAt?: string;
}