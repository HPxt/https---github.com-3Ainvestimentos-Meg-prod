'use client';

import {
  BarChart,
  Building,
  CreditCard,
  Gift,
  Monitor,
  Smartphone,
  Users,
  X,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RequestsTable } from '@/components/requests/requests-table';
import { mockRequests } from '@/lib/data';
import { WorkflowRequest } from '@/lib/types';
import { useState } from 'react';

const departments = [
  {
    name: 'Business Intelligence',
    icon: BarChart,
  },
  {
    name: 'Facilities e Suprimentos',
    icon: Smartphone,
  },
  {
    name: 'Financeiro',
    icon: CreditCard,
  },
  {
    name: 'Gente e Comunicação',
    icon: Users,
  },
  {
    name: 'Marketing',
    icon: Gift,
  },
  {
    name: 'TI',
    icon: Monitor,
  },
];

export default function DashboardPage() {
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);

  const pendingRequests = mockRequests.filter(
    (req) => req.status === 'Pendente' || req.status === 'Em Progresso'
  );
  
  const getRequestsForDepartment = (department: string): WorkflowRequest[] => {
    // This is a mock function. In a real application, you would filter
    // requests based on the department.
    return pendingRequests.slice(0, Math.floor(Math.random() * pendingRequests.length) + 1);
  }

  return (
    <AppShell>
      <div className="flex-1 space-y-8">
        <div>
          <div className="space-y-1 mb-4">
            <h2 className="text-2xl font-bold tracking-tight">
              Solicitações
            </h2>
            <p className="text-muted-foreground">
              Inicie processos e acesse as ferramentas da empresa.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
            {departments.map((dept) => (
              <Dialog key={dept.name} onOpenChange={(isOpen) => !isOpen && setSelectedDepartment(null)}>
                <DialogTrigger asChild>
                    <Card 
                        className="h-32 flex items-center justify-center cursor-pointer hover:bg-muted/50 transition-colors"
                        onClick={() => setSelectedDepartment(dept.name)}
                    >
                        <CardContent className="p-4 flex flex-col items-center justify-center gap-2 text-center">
                        <dept.icon className="h-8 w-8 text-muted-foreground" />
                        <span className="text-sm font-medium">{dept.name}</span>
                        </CardContent>
                    </Card>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[625px]">
                  <DialogHeader>
                    <DialogTitle>Chamados - {selectedDepartment}</DialogTitle>
                  </DialogHeader>
                  <div>
                    <RequestsTable requests={getRequestsForDepartment(dept.name)} />
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="grid gap-2">
                <CardTitle>Minhas Solicitações</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Um resumo das suas submissões de workflow.
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
             <RequestsTable requests={pendingRequests} />
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
