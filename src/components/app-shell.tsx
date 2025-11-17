"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { SidebarProvider, Sidebar, SidebarInset, SidebarRail } from '@/components/ui/sidebar';
import { SidebarNav } from '@/components/sidebar-nav';
import { Header } from '@/components/header';
import { useAuth } from '@/lib/auth';

type AppShellProps = {
  children: React.ReactNode;
  breadcrumbs: { label: string; href: string }[];
};

export function AppShell({ children, breadcrumbs }: AppShellProps) {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user === null) {
      router.push('/login');
    }
  }, [user, router]);
  
  if (!user) {
    return (
        <div className="flex h-screen w-full items-center justify-center">
            <div className="animate-pulse">Carregando...</div>
        </div>
    );
  }

  return (
    <SidebarProvider>
      <Sidebar side="left" variant="sidebar" collapsible="icon">
        <SidebarNav />
      </Sidebar>
      <SidebarRail />
      <SidebarInset className="bg-muted/30 dark:bg-muted/10">
        <Header breadcrumbs={breadcrumbs} />
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-auto">
            {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
