'use client';

import {
  BarChart,
  Briefcase,
  Building,
  CreditCard,
  FileText,
  Gift,
  Layers,
  Monitor,
  Smartphone,
  Users,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { AppShell } from '@/components/app-shell';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockRequests, mockTickets } from '@/lib/data';
import { useState } from 'react';
import { TicketsTable } from '@/components/tickets/tickets-table';

const departments = [
  {
    name: 'Business Intelligence',
    icon: BarChart,
    processes: [
      { name: 'Espelhamento - Caso Único', icon: FileText },
      { name: 'Espelhamento - Em lote', icon: Layers },
      { name: 'Transferência de Cliente - Caso Único', icon: FileText },
      { name: 'Transferência de Cliente - Em lote', icon: Layers },
    ],
  },
  {
    name: 'Facilities e Suprimentos',
    icon: Smartphone,
    processes: [
        { name: 'Solicitação de Material de Escritório', icon: FileText },
        { name: 'Manutenção de Equipamento', icon: FileText },
    ],
  },
  {
    name: 'Financeiro',
    icon: CreditCard,
    processes: [
        { name: 'Reembolso de Despesas', icon: FileText },
        { name: 'Adiantamento de Viagem', icon: FileText },
    ],
  },
  {
    name: 'Gente e Comunicação',
    icon: Users,
    processes: [
        { name: 'Solicitação de Férias', icon: FileText },
        { name: 'Alteração de Benefícios', icon: FileText },
    ],
  },
  {
    name: 'Jurídico',
    icon: Briefcase,
    processes: [
      { name: 'Análise de Contrato', icon: FileText },
      { name: 'Consulta Jurídica', icon: FileText },
    ],
  },
  {
    name: 'Marketing',
    icon: Gift,
    processes: [
        { name: 'Solicitação de Material Promocional', icon: FileText },
        { name: 'Aprovação de Campanha', icon: FileText },
    ],
  },
  {
    name: 'TI',
    icon: Monitor,
    processes: [
        { name: 'Solicitação de Acesso', icon: FileText },
        { name: 'Suporte Técnico', icon: FileText },
    ],
  },
];
//teste//
export default function DashboardPage() {
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);

  const pendingRequests = mockRequests.filter(
    (req) => req.status === 'Pendente' || req.status === 'Em Progresso'
  );
  
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

          <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-7">
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
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>{selectedDepartment}</DialogTitle>
                    <DialogDescription>
                        Selecione um dos processos abaixo para iniciar uma nova solicitação.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    {dept.processes.map((process) => (
                        <div key={process.name} className="flex items-center gap-4 p-4 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                            <process.icon className="h-6 w-6 text-muted-foreground" />
                            <span className="font-medium">{process.name}</span>
                        </div>
                    ))}
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
             <TicketsTable tickets={mockTickets} />
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
