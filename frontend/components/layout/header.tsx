"use client";

import { Search, Bell, Grid2X2, List, Settings2, Upload } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-30 h-16 border-b border-slate-200 bg-white">
      <div className="flex h-full items-center gap-3 px-4 md:px-7">
        {/* Mobile spacer */}
        <div className="w-8 md:hidden" />

        {/* Search */}
        <div className="relative max-w-md flex-1">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search files..."
            className="h-9 w-full rounded-md border border-slate-200 bg-slate-50 pl-9 pr-3 text-sm outline-none transition focus:border-sky-400 focus:bg-white"
          />
        </div>

        {/* View controls */}
        <div className="hidden items-center gap-1 sm:flex">
          <button className="rounded-md border border-slate-200 p-2 text-sky-500">
            <List size={16} />
          </button>

          <button className="rounded-md border border-transparent p-2 text-slate-400 hover:bg-slate-50">
            <Grid2X2 size={16} />
          </button>

          <button className="rounded-md border border-transparent p-2 text-slate-400 hover:bg-slate-50">
            <Settings2 size={16} />
          </button>
        </div>

        {/* Upload */}
        <button className="hidden items-center gap-2 rounded-md bg-sky-500 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-sky-600 sm:flex">
          <Upload size={15} />
          Upload Files
        </button>

        {/* Notification */}
        <button className="rounded-md p-2 text-slate-400 hover:bg-slate-50">
          <Bell size={18} />
        </button>
      </div>
    </header>
  );
}
