import { AppShell } from '@/components/app-shell';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { mockWorkflowDefinitions } from '@/lib/data';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, PlusCircle } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const breadcrumbs = [
  { label: 'Admin', href: '/admin/workflows' },
  { label: 'Workflows', href: '/admin/workflows' },
];

export default function AdminWorkflowsPage() {
  return (
    <AppShell breadcrumbs={breadcrumbs}>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-headline font-bold tracking-tight">
              Workflow Definitions
            </h1>
            <p className="text-muted-foreground">
              Create and manage the workflow templates for your organization.
            </p>
          </div>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            New Workflow
          </Button>
        </div>
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Fields</TableHead>
                  <TableHead>Approval Steps</TableHead>
                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockWorkflowDefinitions.map((def) => (
                  <TableRow key={def.id}>
                    <TableCell className="font-medium">{def.name}</TableCell>
                    <TableCell>{def.formFields.length}</TableCell>
                    <TableCell>{def.approvalSteps.length}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button aria-haspopup="true" size="icon" variant="ghost">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>Duplicate</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
