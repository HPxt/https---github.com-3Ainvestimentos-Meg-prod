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

const breadcrumbs = [{ label: 'Manage', href: '/manage/requests' }, { label: 'Requests', href: '/manage/requests' }];

export default function ManageRequestsPage() {
  const pendingRequests = mockRequests.filter(req => req.status === 'Pending' || req.status === 'In Progress');
  const resolvedRequests = mockRequests.filter(req => req.status === 'Approved' || req.status === 'Rejected');

  return (
    <AppShell breadcrumbs={breadcrumbs}>
      <div className="space-y-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-headline font-bold tracking-tight">Manage Requests</h1>
          <p className="text-muted-foreground">Review, approve, or reject workflow requests submitted by your team.</p>
        </div>
        <Tabs defaultValue="pending">
          <TabsList>
            <TabsTrigger value="pending">Pending Action</TabsTrigger>
            <TabsTrigger value="all">All Requests</TabsTrigger>
            <TabsTrigger value="resolved">Resolved</TabsTrigger>
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
