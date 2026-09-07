import { api } from "./api";
import { Folder } from "@/types/folder";
import { StorageFile } from "@/types/file";

export async function getFolders(
  token: string,
  parentFolderId?: string | null,
) {
  const query = parentFolderId
    ? `?parentFolderId=${encodeURIComponent(parentFolderId)}`
    : "";

  return api<Folder[]>(`/folders${query}`, {
    token,
  });
}

export async function createFolder(
  token: string,
  name: string,
  parentFolderId?: string | null,
) {
  return api<Folder>("/folders", {
    method: "POST",
    token,
    body: JSON.stringify({
      name,
      parentFolderId: parentFolderId || undefined,
    }),
  });
}

export async function renameFolder(token: string, id: string, name: string) {
  return api<Folder>(`/folders/${id}`, {
    method: "PATCH",
    token,
    body: JSON.stringify({ name }),
  });
}

export async function deleteFolder(token: string, id: string) {
  return api(`/folders/${id}`, {
    method: "DELETE",
    token,
  });
}

export async function getFiles(token: string, folderId?: string | null) {
  const query = folderId ? `?folderId=${encodeURIComponent(folderId)}` : "";

  return api<StorageFile[]>(`/files${query}`, {
    token,
  });
}

export async function renameFile(token: string, id: string, name: string) {
  return api<StorageFile>(`/files/${id}`, {
    method: "PATCH",
    token,
    body: JSON.stringify({ name }),
  });
}

export async function deleteFile(token: string, id: string) {
  return api(`/files/${id}`, {
    method: "DELETE",
    token,
  });
}

export async function getDownloadUrl(token: string, id: string) {
  return api<{ url: string }>(`/files/${id}/download`, {
    token,
  });
}
