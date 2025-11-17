"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Bot } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/lib/auth';
import { UserRole } from '@/lib/types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const handleLogin = (role: UserRole) => {
    login(role);
    router.push('/dashboard');
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-muted/30 dark:bg-muted/10 p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center">
          
          <CardTitle className="text-2xl font-headline">Bem-vindo de Volta</CardTitle>
          <CardDescription>
            Faça login para acessar seus workflows e solicitações.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="m@example.com" required defaultValue="admin@workflowwise.com" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Senha</Label>
            <Input id="password" type="password" required defaultValue="********"/>
          </div>
          <div className="grid gap-2">
            <Label>Entrar como</Label>
            <Select onValueChange={(role) => handleLogin(role as UserRole)} defaultValue="Administrator">
              <SelectTrigger>
                <SelectValue placeholder="Selecione um papel para entrar" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Administrator">Administrador</SelectItem>
                <SelectItem value="Manager">Gerente</SelectItem>
                <SelectItem value="Collaborator">Colaborador</SelectItem>
              </SelectContent>
            </Select>
             <CardDescription className="text-xs pt-1">
              Para demonstração, selecione um papel para simular o login.
            </CardDescription>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button className="w-full font-bold" onClick={() => handleLogin('Administrator')}>Entrar</Button>
          <div className="text-center text-sm">
            <Link href="#" className="underline text-muted-foreground hover:text-primary">
              Esqueceu sua senha?
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
