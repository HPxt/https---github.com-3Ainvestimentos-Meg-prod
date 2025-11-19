import { MoreHorizontal, Trash2, Eye, Filter } from 'lucide-react';
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
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { StatusBadge } from './status-badge';
import type { WorkflowRequest } from '@/lib/types';
import { format } from 'date-fns';
import { Badge } from '../ui/badge';

type RequestsTableProps = {
  requests: WorkflowRequest[];
  showSubmittedBy?: boolean;
};

export function RequestsTable({ requests, showSubmittedBy = false }: RequestsTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[80px]">#</TableHead>
          <TableHead>Tipo</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Solicitante</TableHead>
          <TableHead>Responsável</TableHead>
          <TableHead>Proprietário</TableHead>
          <TableHead>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Data
            </div>
          </TableHead>
          <TableHead className="text-right">Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {requests.map((request) => (
          <TableRow key={request.id}>
            <TableCell className="font-mono text-muted-foreground">{request.id.replace('req-', '')}</TableCell>
            <TableCell className="font-medium">{request.workflowName}</TableCell>
            <TableCell>
              <StatusBadge status={request.status} />
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarFallback>{request.submittedBy.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="text-muted-foreground">{request.submittedBy.name}</span>
              </div>
            </TableCell>
            <TableCell>
                {request.responsible ? (
                    <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                        <AvatarFallback>{request.responsible.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="text-muted-foreground">{request.responsible.name}</span>
                    </div>
                ) : (
                    <span className="text-red-500">Não atribuído</span>
                )}
            </TableCell>
             <TableCell>
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarFallback>{request.owner.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="text-muted-foreground">{request.owner.name}</span>
              </div>
            </TableCell>
            <TableCell className="text-muted-foreground">
              {format(new Date(request.submittedAt), "dd/MM/yyyy HH:mm")}
            </TableCell>
            <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                    </Button>
                     <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                        <Eye className="h-4 w-4" />
                    </Button>
                </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
