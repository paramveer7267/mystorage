"use client";

import Link from "next/link";
import {
  HardDrive,
  Home,
  Newspaper,
  Film,
  Music,
  Plane,
  User,
  Settings,
  HelpCircle,
  LogOut,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";

const mainItems = [
  { label: "Storage", icon: HardDrive, href: "/" },
  { label: "News", icon: Newspaper, href: "#" },
  { label: "Movies", icon: Film, href: "#" },
  { label: "Music", icon: Music, href: "#" },
  { label: "Travel", icon: Plane, href: "#" },
];

export function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed left-4 top-4 z-50 rounded-lg border bg-white p-2 shadow-sm md:hidden"
      >
        <Menu size={20} />
      </button>

      {/* Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-64 border-r border-slate-200 bg-white
          transition-transform duration-200
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        {/* Logo */}
        <div className="flex h-16 items-center justify-between border-b px-5">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-800 text-white">
              <HardDrive size={17} />
            </div>

            <span className="text-lg font-semibold tracking-tight">
              myStorage
            </span>
          </Link>

          <button
            onClick={() => setMobileOpen(false)}
            className="rounded-md p-1 text-slate-400 hover:bg-slate-100 md:hidden"
          >
            <X size={19} />
          </button>
        </div>

        {/* User */}
        <div className="border-b px-5 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-200 text-sm font-semibold">
              U
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">Your Account</p>

              <p className="text-xs text-slate-400">Premium Plan</p>
            </div>

            <ChevronDown size={15} className="text-slate-400" />
          </div>
        </div>

        {/* Main navigation */}
        <nav className="px-3 py-4">
          {mainItems.map((item, index) => {
            const Icon = item.icon;
            const active = index === 0;

            return (
              <Link
                key={item.label}
                href={item.href}
                className={`
                  relative mb-1 flex items-center gap-3 rounded-md px-3 py-2.5 text-sm
                  transition
                  ${
                    active
                      ? "bg-sky-50 font-medium text-sky-600"
                      : "text-slate-600 hover:bg-slate-50"
                  }
                `}
              >
                {active && (
                  <span className="absolute -left-3 top-0 h-full w-0.5 rounded-r bg-sky-500" />
                )}

                <Icon size={17} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="mx-5 border-t border-slate-100" />

        {/* Bottom navigation */}
        <nav className="px-3 py-4">
          <Link
            href="/account"
            className="mb-1 flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-slate-600 hover:bg-slate-50"
          >
            <User size={17} />
            Account
          </Link>

          <Link
            href="/settings"
            className="mb-1 flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-slate-600 hover:bg-slate-50"
          >
            <Settings size={17} />
            Settings
          </Link>

          <Link
            href="/help"
            className="mb-1 flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-slate-600 hover:bg-slate-50"
          >
            <HelpCircle size={17} />
            Help & Support
          </Link>

          <button className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm text-slate-600 hover:bg-slate-50">
            <LogOut size={17} />
            Log Out
          </button>
        </nav>

        {/* Language */}
        <div className="absolute bottom-5 left-5 right-5">
          <button className="flex w-full items-center justify-between rounded-md border border-slate-200 px-3 py-2 text-xs text-slate-500">
            <span>🇺🇸 English (US)</span>
            <ChevronDown size={14} />
          </button>
        </div>
      </aside>
    </>
  );
}
