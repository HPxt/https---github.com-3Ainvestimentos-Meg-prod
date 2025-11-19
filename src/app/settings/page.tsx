
import { AppShell } from '@/components/app-shell';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { WorkflowDefinitions } from './workflow-definitions';
import { ManageUsers } from './manage-users';
import { ManageRequests } from './manage-requests';

export default function SettingsPage() {
  return (
    <AppShell>
      <div className="space-y-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-headline font-bold tracking-tight">Configurações</h1>
          <p className="text-muted-foreground">
            Gerencie as configurações da sua organização.
          </p>
        </div>
        <Tabs defaultValue="workflows">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="workflows">Definições de Workflow</TabsTrigger>
            <TabsTrigger value="users">Gerenciar Usuários</TabsTrigger>
            <TabsTrigger value="requests">Gerenciar Solicitações</TabsTrigger>
          </TabsList>
          <TabsContent value="workflows">
            <WorkflowDefinitions />
          </TabsContent>
          <TabsContent value="users">
            <ManageUsers />
          </TabsContent>
          <TabsContent value="requests">
            <ManageRequests />
          </TabsContent>
        </Tabs>
      </div>
    </AppShell>
  );
}
