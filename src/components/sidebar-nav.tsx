"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Bot,
  LayoutDashboard,
  FileText,
  GitFork,
  Users,
  Settings,
  FolderKanban,
} from 'lucide-react';
import {
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
} from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/lib/auth';
import { Badge } from './ui/badge';

const menuItems = {
  main: [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/workflows', label: 'Start a Workflow', icon: GitFork },
    { href: '/requests', label: 'My Requests', icon: FileText },
  ],
  management: [{ href: '/manage/requests', label: 'Manage Requests', icon: FolderKanban }],
  admin: [
    { href: '/admin/workflows', label: 'Workflow Definitions', icon: Settings },
    { href: '/admin/users', label: 'User Management', icon: Users },
  ],
};

export function SidebarNav() {
  const pathname = usePathname();
  const { user } = useAuth();

  const isActive = (href: string) => {
    return pathname === href || (href !== '/dashboard' && pathname.startsWith(href));
  };
  
  if (!user) return null;

  return (
    <>
      <SidebarHeader>
        <div className="flex items-center gap-2 p-2">
          <Bot className="text-primary size-8" />
          <span className="text-lg font-headline font-semibold">Workflow Wise</span>
        </div>
      </SidebarHeader>
      <Separator />
      <SidebarContent>
        <SidebarMenu>
          {menuItems.main.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href} legacyBehavior passHref>
                <SidebarMenuButton asChild isActive={isActive(item.href)} tooltip={item.label}>
                  <a>
                    <item.icon />
                    <span>{item.label}</span>
                  </a>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>

        {(user.role === 'Manager' || user.role === 'Administrator') && (
          <SidebarGroup>
            <SidebarGroupLabel>Management</SidebarGroupLabel>
            <SidebarMenu>
              {menuItems.management.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <Link href={item.href} legacyBehavior passHref>
                    <SidebarMenuButton asChild isActive={isActive(item.href)} tooltip={item.label}>
                       <a>
                        <item.icon />
                        <span>{item.label}</span>
                      </a>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        )}

        {user.role === 'Administrator' && (
          <SidebarGroup>
            <SidebarGroupLabel>Administration</SidebarGroupLabel>
            <SidebarMenu>
              {menuItems.admin.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <Link href={item.href} legacyBehavior passHref>
                    <SidebarMenuButton asChild isActive={isActive(item.href)} tooltip={item.label}>
                       <a>
                        <item.icon />
                        <span>{item.label}</span>
                      </a>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        )}
      </SidebarContent>
      <Separator />
      <SidebarFooter>
        <div className='p-2 space-y-2'>
            <div className='p-2 rounded-lg bg-accent/50 text-center'>
                <p className='text-xs font-semibold text-accent-foreground'>App Version</p>
                <p className='text-xs text-muted-foreground'>1.0.0</p>
            </div>
        </div>
      </SidebarFooter>
    </>
  );
}
