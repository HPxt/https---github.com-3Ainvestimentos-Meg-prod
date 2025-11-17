import { AppShell } from '@/components/app-shell';
import { RequestsTable } from '@/components/requests/requests-table';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockRequests } from '@/lib/data';

const breadcrumbs = [{ label: 'Gerenciar', href: '/manage/requests' }, { label: 'Solicitações', href: '/manage/requests' }];

export default function ManageRequestsPage() {
  const pendingRequests = mockRequests.filter(req => req.status === 'Pendente' || req.status === 'Em Progresso');
  const resolvedRequests = mockRequests.filter(req => req.status === 'Aprovado' || req.status === 'Rejeitado');

  return (
    <AppShell breadcrumbs={breadcrumbs}>
      <div className="space-y-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-headline font-bold tracking-tight">Gerenciar Solicitações</h1>
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
    </AppShell>
  );
}
