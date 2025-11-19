'use client';
import { RequestsTable } from '@/components/requests/requests-table';
import {
  Card,
  CardContent,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockRequests } from '@/lib/data';

export function ManageRequests() {
  const pendingRequests = mockRequests.filter(req => req.status === 'Pendente' || req.status === 'Em Progresso');
  const resolvedRequests = mockRequests.filter(req => req.status === 'Aprovado' || req.status === 'Rejeitado');

  return (
    <div className="space-y-4 mt-4">
      <div className="space-y-1">
        <h2 className="text-2xl font-headline font-bold tracking-tight">Histórico Geral de Solicitações</h2>
        <p className="text-muted-foreground">Revise, aprove ou rejeite solicitações de workflow enviadas por sua equipe.</p>
      </div>
      <Tabs defaultValue="pending">
        <TabsList>
          <TabsTrigger value="pending">Ação Pendente</TabsTrigger>
          <TabsTrigger value="all">Todas as Solicitações</TabsTrigger>
          <TabsTrigger value="resolved">Resolvidas</TabsTrigger>
        </TabsList>
        <Card>
          <TabsContent value="pending" className="m-0">
            <CardContent className="p-0">
              <RequestsTable requests={pendingRequests} showSubmittedBy />
            </CardContent>
          </TabsContent>
          <TabsContent value="all" className="m-0">
            <CardContent className="p-0">
              <RequestsTable requests={mockRequests} showSubmittedBy />
            </CardContent>
          </TabsContent>
          <TabsContent value="resolved" className="m-0">
            <CardContent className="p-0">
              <RequestsTable requests={resolvedRequests} showSubmittedBy />
            </CardContent>
          </TabsContent>
        </Card>
      </Tabs>
    </div>
  );
}
