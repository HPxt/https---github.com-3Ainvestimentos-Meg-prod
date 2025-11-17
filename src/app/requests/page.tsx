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
import { mockRequests, mockUsers } from '@/lib/data';

const breadcrumbs = [{ label: 'My Requests', href: '/requests' }];

export default function MyRequestsPage() {
  // In a real app, you would fetch requests for the logged-in user.
  const myRequests = mockRequests.filter(req => req.submittedBy.id === mockUsers['user-1'].id || req.submittedBy.id === mockUsers['user-3'].id);
  const pendingRequests = myRequests.filter(req => req.status === 'Pending' || req.status === 'In Progress' || req.status === 'Needs Information');
  const completedRequests = myRequests.filter(req => req.status === 'Approved' || req.status === 'Rejected');

  return (
    <AppShell breadcrumbs={breadcrumbs}>
      <div className="space-y-4">
         <div className="space-y-1">
          <h1 className="text-3xl font-headline font-bold tracking-tight">My Requests</h1>
          <p className="text-muted-foreground">Track the status and history of all your submitted workflows.</p>
        </div>
        <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>
          <Card>
            <TabsContent value="all" className="m-0">
               <CardContent className="p-0">
                <RequestsTable requests={myRequests} />
              </CardContent>
            </TabsContent>
            <TabsContent value="pending" className="m-0">
               <CardContent className="p-0">
                <RequestsTable requests={pendingRequests} />
              </CardContent>
            </TabsContent>
            <TabsContent value="completed" className="m-0">
               <CardContent className="p-0">
                <RequestsTable requests={completedRequests} />
              </CardContent>
            </TabsContent>
          </Card>
        </Tabs>
      </div>
    </AppShell>
  );
}
