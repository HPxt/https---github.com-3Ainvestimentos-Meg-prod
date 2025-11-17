import Link from 'next/link';
import { MoreHorizontal } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { StatusBadge } from './status-badge';
import type { WorkflowRequest } from '@/lib/types';
import { format } from 'date-fns';

type RequestsTableProps = {
  requests: WorkflowRequest[];
  showSubmittedBy?: boolean;
};

export function RequestsTable({ requests, showSubmittedBy = false }: RequestsTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Workflow</TableHead>
          {showSubmittedBy && <TableHead>Enviado Por</TableHead>}
          <TableHead className="hidden md:table-cell">Enviado Em</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>
            <span className="sr-only">Ações</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {requests.map((request) => (
          <TableRow key={request.id}>
            <TableCell>
              <div className="font-medium">{request.workflowName}</div>
              <div className="hidden text-sm text-muted-foreground md:inline">
                ID: {request.id}
              </div>
            </TableCell>
            {showSubmittedBy && (
              <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={request.submittedBy.avatarUrl} alt={request.submittedBy.name} />
                    <AvatarFallback>{request.submittedBy.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="font-medium">{request.submittedBy.name}</span>
                </div>
              </TableCell>
            )}
            <TableCell className="hidden md:table-cell">
              {format(new Date(request.submittedAt), 'PPP')}
            </TableCell>
            <TableCell>
              <StatusBadge status={request.status} />
            </TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button aria-haspopup="true" size="icon" variant="ghost">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Alternar menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Ações</DropdownMenuLabel>
                  <DropdownMenuItem asChild>
                    <Link href={`/requests/${request.id}`}>Ver Detalhes</Link>
                  </DropdownMenuItem>
                  {showSubmittedBy && (
                    <>
                      <DropdownMenuItem>Aprovar</DropdownMenuItem>
                      <DropdownMenuItem>Rejeitar</DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
