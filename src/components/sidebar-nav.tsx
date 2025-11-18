"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  FileText,
  GitFork,
  Users,
  Settings,
  FolderKanban,
  LogOut,
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
import { useAuth } from '@/lib/auth';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';

const menuItems = {
  main: [
    { href: '/dashboard', label: 'Painel', icon: LayoutDashboard },
    { href: '/workflows', label: 'Iniciar um Workflow', icon: GitFork },
    { href: '/requests', label: 'Minhas Solicitações', icon: FileText },
  ],
  management: [{ href: '/manage/requests', label: 'Gerenciar Solicitações', icon: FolderKanban }],
  admin: [
    { href: '/admin/workflows', label: 'Definições de Workflow', icon: Settings },
    { href: '/admin/users', label: 'Gerenciar Usuários', icon: Users },
  ],
};

export function SidebarNav() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const isActive = (href: string) => {
    return pathname === href || (href !== '/dashboard' && pathname.startsWith(href));
  };

  if (!user) return null;

  return (
    <>
      <SidebarHeader></SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.main.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton asChild isActive={isActive(item.href)} tooltip={item.label}>
                <Link href={item.href}>
                  <item.icon />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>

        {(user.role === 'Manager' || user.role === 'Administrator') && (
          <SidebarGroup>
            <SidebarGroupLabel>Gerenciamento</SidebarGroupLabel>
            <SidebarMenu>
              {menuItems.management.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton asChild isActive={isActive(item.href)} tooltip={item.label}>
                    <Link href={item.href}>
                      <item.icon />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        )}

        {user.role === 'Administrator' && (
          <SidebarGroup>
            <SidebarGroupLabel>Administração</SidebarGroupLabel>
            <SidebarMenu>
              {menuItems.admin.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton asChild isActive={isActive(item.href)} tooltip={item.label}>
                    <Link href={item.href}>
                      <item.icon />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        )}
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
           <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Configurações">
                <Link href="#">
                  <Settings />
                  <span>Configurações</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={handleLogout} tooltip="Sair">
              <LogOut />
              <span>Sair</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </>
  );
}
