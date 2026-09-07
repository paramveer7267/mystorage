"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { getToken } from "@/lib/auth";
import { getMe } from "@/lib/auth-api";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      const token = getToken();

      if (!token) {
        router.replace("/login");
        return;
      }

      try {
        await getMe(token);
        setCheckingAuth(false);
      } catch {
        localStorage.removeItem("mystorage_access_token");
        router.replace("/login");
      }
    }

    checkAuth();
  }, [router]);

  if (checkingAuth) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-sm text-slate-400">Loading myStorage...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar />

      <div className="md:pl-64">
        <Header />

        <main className="p-4 md:p-6 lg:p-7">{children}</main>
      </div>
    </div>
  );
}
