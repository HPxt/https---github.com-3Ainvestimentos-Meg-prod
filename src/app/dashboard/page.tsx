import Link from 'next/link';
import {
  ArrowUpRight,
  CheckCircle,
  Clock,
  FileText,
  XCircle,
  Building,
  Users,
  Briefcase,
  Megaphone,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { mockRequests } from '@/lib/data';
import { RequestsTable } from '@/components/requests/requests-table';
import { AppShell } from '@/components/app-shell';

const departments = [
  {
    name: 'Financeiro',
    pending: 5,
    icon: Building,
  },
  {
    name: 'RH',
    pending: 3,
    icon: Users,
  },
  {
    name: 'TI',
    pending: 2,
    icon: Briefcase,
  },
  {
    name: 'Marketing',
    pending: 2,
    icon: Megaphone,
  },
];

export default function DashboardPage() {
  const recentRequests = mockRequests.slice(0, 5);

  return (
    <AppShell>
      <div className="flex-1 space-y-8">
        {/* Seção Superior: Cards por Área */}
        <div>
           <div className="space-y-1 mb-4">
            <h2 className="text-2xl font-headline font-bold tracking-tight">Solicitações</h2>
            <p className="text-muted-foreground">Inicie processos e acesse as ferramentas da empresa.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {departments.map((dept) => (
              <Card key={dept.name}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{dept.name}</CardTitle>
                  <dept.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{dept.pending}</div>
                  <p className="text-xs text-muted-foreground">solicitações pendentes</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Seção Inferior: Resumo e Solicitações Recentes */}
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
               <div className="grid gap-2">
                <CardTitle>Visão Geral das Solicitações</CardTitle>
                <CardDescription>
                  Um resumo das suas submissões de workflow.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card className="bg-muted/30">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pendentes</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-xs text-muted-foreground">+2 da última semana</p>
                </CardContent>
              </Card>
              <Card className="bg-muted/30">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Aprovadas</CardTitle>
                  <CheckCircle className="h-4 w-4 text-green-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">34</div>
                  <p className="text-xs text-muted-foreground">+18.7% do último mês</p>
                </CardContent>
              </Card>
              <Card className="bg-muted/30">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Rejeitadas</CardTitle>
                  <XCircle className="h-4 w-4 text-red-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">5</div>
                  <p className="text-xs text-muted-foreground">-1 desde ontem</p>
                </CardContent>
              </Card>
              <Card className="bg-muted/30">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">152</div>
                  <p className="text-xs text-muted-foreground">+20.1% do último mês</p>
                </CardContent>
              </Card>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Solicitações Recentes</h3>
              <RequestsTable requests={recentRequests} />
            </div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
