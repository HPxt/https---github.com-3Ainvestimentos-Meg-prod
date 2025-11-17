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
          <div className="flex justify-center items-center gap-2 mb-4">
            <Bot size={32} className="text-primary" />
            <h1 className="text-3xl font-headline font-bold">Workflow Wise</h1>
          </div>
          <CardTitle className="text-2xl font-headline">Welcome Back</CardTitle>
          <CardDescription>
            Sign in to access your workflows and requests.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="m@example.com" required defaultValue="admin@workflowwise.com" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" required defaultValue="********"/>
          </div>
          <div className="grid gap-2">
            <Label>Sign in as</Label>
            <Select onValueChange={(role) => handleLogin(role as UserRole)} defaultValue="Administrator">
              <SelectTrigger>
                <SelectValue placeholder="Select a role to sign in" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Administrator">Administrator</SelectItem>
                <SelectItem value="Manager">Manager</SelectItem>
                <SelectItem value="Collaborator">Collaborator</SelectItem>
              </SelectContent>
            </Select>
             <CardDescription className="text-xs pt-1">
              For demonstration, select a role to simulate login.
            </CardDescription>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button className="w-full font-bold" onClick={() => handleLogin('Administrator')}>Sign In</Button>
          <div className="text-center text-sm">
            <Link href="#" className="underline text-muted-foreground hover:text-primary">
              Forgot your password?
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
