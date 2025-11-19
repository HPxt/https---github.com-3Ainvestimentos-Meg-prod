
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Settings,
  LogOut,
} from 'lucide-react';
import {
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { useAuth } from '@/lib/auth';
import { useRouter } from 'next/navigation';

const menuItems = {
  main: [
    { href: '/dashboard', label: 'Painel', icon: LayoutDashboard },
  ],
  admin: [
    { href: '/settings', label: 'Configurações', icon: Settings },
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
      <SidebarContent>
        <SidebarMenu>
          {menuItems.main.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton asChild isActive={isActive(item.href)} tooltip={item.label} className="justify-center">
                <Link href={item.href}>
                  <item.icon />
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
          
          {user.role === 'Administrator' && (
             menuItems.admin.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton asChild isActive={isActive(item.href)} tooltip={item.label} className="justify-center">
                  <Link href={item.href}>
                    <item.icon />
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))
          )}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={handleLogout} tooltip="Sair" className="justify-center">
                <LogOut />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </>
  );
}
