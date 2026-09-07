"use client";

import {
  Folder,
  MoreHorizontal,
  Plus,
  Search,
  FileText,
  FileImage,
  FileSpreadsheet,
  Star,
  Upload,
  ChevronDown,
} from "lucide-react";

const folders = [
  { name: "All Files", count: 24 },
  { name: "Documents", count: 8 },
  { name: "Projects", count: 5 },
  { name: "Photos", count: 32 },
  { name: "Starred", count: 4 },
  { name: "Deleted", count: 3 },
];

const files = [
  {
    name: "Project Report.pdf",
    size: "2.4 MB",
    date: "Today",
    type: "pdf",
    starred: true,
  },
  {
    name: "Vacation.jpg",
    size: "852 KB",
    date: "Yesterday",
    type: "image",
    starred: false,
  },
  {
    name: "Structure Building.jpg",
    size: "1.2 MB",
    date: "Aug 29, 2026",
    type: "image",
    starred: true,
  },
  {
    name: "Finance Report.pdf",
    size: "322 KB",
    date: "Aug 27, 2026",
    type: "pdf",
    starred: true,
  },
  {
    name: "Schedule June.xlsx",
    size: "195 KB",
    date: "Aug 25, 2026",
    type: "sheet",
    starred: false,
  },
  {
    name: "Strategy Plan.docx",
    size: "2.5 MB",
    date: "Aug 25, 2026",
    type: "doc",
    starred: false,
  },
  {
    name: "Results.docx",
    size: "199 KB",
    date: "Aug 24, 2026",
    type: "doc",
    starred: false,
  },
  {
    name: "Everyday Notes.pdf",
    size: "5.5 MB",
    date: "Aug 23, 2026",
    type: "pdf",
    starred: false,
  },
];

function FileIcon({ type }: { type: string }) {
  if (type === "image") {
    return (
      <div className="flex h-9 w-9 items-center justify-center rounded-md bg-slate-100">
        <FileImage className="text-slate-500" size={21} />
      </div>
    );
  }

  if (type === "sheet") {
    return (
      <div className="flex h-9 w-9 items-center justify-center rounded-md bg-slate-100">
        <FileSpreadsheet className="text-emerald-500" size={21} />
      </div>
    );
  }

  return (
    <div className="flex h-9 w-9 items-center justify-center rounded-md bg-slate-100">
      <FileText className="text-sky-500" size={21} />
    </div>
  );
}

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-[1500px]">
      {/* Storage */}
      <section className="mb-5">
        <div className="mb-2 flex items-center justify-between">
          <p className="text-sm font-semibold text-slate-700">
            Storage{" "}
            <span className="font-normal text-slate-400">
              2.6 GB of 5 GB used
            </span>
          </p>

          <button className="rounded-md border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-500 hover:bg-slate-50">
            Upgrade
          </button>
        </div>

        <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
          <div className="h-full w-[52%] rounded-full bg-sky-500" />
        </div>
      </section>

      {/* Content */}
      <div className="grid gap-5 lg:grid-cols-[280px_minmax(0,1fr)]">
        {/* Folders */}
        <section className="rounded-lg border border-slate-200 bg-white">
          <div className="flex items-center justify-between border-b px-4 py-3">
            <h2 className="text-sm font-semibold">My Folder</h2>

            <button className="rounded-md p-1 text-slate-400 hover:bg-slate-50">
              <Plus size={17} />
            </button>
          </div>

          <div className="space-y-2 p-3">
            {folders.map((folder, index) => (
              <button
                key={folder.name}
                className={`
                  flex w-full items-center gap-3 rounded-md border px-3 py-3 text-left
                  transition
                  ${
                    index === 0
                      ? "border-sky-400 bg-sky-50"
                      : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                  }
                `}
              >
                <Folder
                  size={22}
                  className={index === 0 ? "text-sky-500" : "text-slate-400"}
                />

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-slate-700">
                    {folder.name}
                  </p>

                  <p className="text-xs text-slate-400">{folder.count} items</p>
                </div>

                <MoreHorizontal size={16} className="text-slate-400" />
              </button>
            ))}
          </div>
        </section>

        {/* Files */}
        <section className="min-w-0 rounded-lg border border-slate-200 bg-white">
          {/* Files header */}
          <div className="flex flex-col gap-3 border-b px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-sm font-semibold">All Files</h2>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Sort by:</span>

              <button className="flex items-center gap-2 rounded-md border border-slate-200 px-3 py-1.5 text-xs text-slate-600">
                Recently Added
                <ChevronDown size={13} />
              </button>
            </div>
          </div>

          {/* Search */}
          <div className="p-3">
            <div className="relative">
              <Search
                size={15}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                placeholder="Type to search..."
                className="h-9 w-full rounded-md border border-slate-200 bg-white pl-9 pr-3 text-xs outline-none focus:border-sky-400"
              />
            </div>
          </div>

          {/* Files */}
          <div className="px-3 pb-3">
            <div className="space-y-1">
              {files.map((file) => (
                <div
                  key={file.name}
                  className="group flex items-center gap-3 rounded-md border border-transparent px-2 py-2.5 transition hover:border-slate-200 hover:bg-slate-50"
                >
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-slate-300"
                  />

                  <FileIcon type={file.type} />

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-medium text-slate-700">
                      {file.name}
                    </p>

                    <p className="text-[11px] text-slate-400">
                      {file.date} · {file.size}
                    </p>
                  </div>

                  <button className="hidden rounded p-1.5 text-slate-300 hover:bg-white hover:text-slate-600 sm:block">
                    <Star
                      size={15}
                      fill={file.starred ? "currentColor" : "none"}
                    />
                  </button>

                  <button className="rounded p-1.5 text-slate-300 hover:bg-white hover:text-slate-600">
                    <MoreHorizontal size={17} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Upload */}
          <div className="border-t p-3">
            <button className="flex w-full items-center justify-center gap-2 rounded-md border border-dashed border-slate-300 py-3 text-xs font-medium text-slate-500 transition hover:border-sky-400 hover:bg-sky-50 hover:text-sky-600">
              <Upload size={15} />
              Drop files here or click to upload
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
