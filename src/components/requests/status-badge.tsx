import { Badge } from '@/components/ui/badge';
import type { WorkflowRequestStatus, TicketStatus } from '@/lib/types';
import { cn } from '@/lib/utils';
import { CheckCircle, Clock, FileWarning, Info, XCircle, CircleAlert, Check } from 'lucide-react';

const statusConfig: Record<
  WorkflowRequestStatus | TicketStatus,
  {
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    className: string;
  }
> = {
  Pendente: {
    label: 'Pendente',
    icon: Clock,
    className: 'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-400 border-amber-300/80 dark:border-amber-700/80',
  },
  'Em Progresso': {
    label: 'Em Progresso',
    icon: Info,
    className: 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-400 border-blue-300/80 dark:border-blue-700/80',
  },
  Aprovado: {
    label: 'Aprovado',
    icon: CheckCircle,
    className: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-400 border-green-300/80 dark:border-green-700/80',
  },
  Rejeitado: {
    label: 'Rejeitado',
    icon: XCircle,
    className: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-400 border-red-300/80 dark:border-red-700/80',
  },
  'Necessita Informação': {
    label: 'Mais Informações',
    icon: FileWarning,
    className: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-400 border-yellow-300/80 dark:border-yellow-700/80',
  },
  'Solicitação Aberta': {
    label: 'Solicitação Aberta',
    icon: CircleAlert,
    className: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-400 border-red-300/80 dark:border-red-700/80',
  },
  'Em aprovação': {
    label: 'Em aprovação',
    icon: Check,
    className: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-400 border-yellow-300/80 dark:border-yellow-700/80',
  },
  Finalizado: {
    label: 'Finalizado',
    icon: CheckCircle,
    className: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-400 border-green-300/80 dark:border-green-700/80',
  },
  'Em Análise': {
    label: 'Em Análise',
    icon: Info,
    className: 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-400 border-blue-300/80 dark:border-blue-700/80',
  }
};

export function StatusBadge({ status }: { status: WorkflowRequestStatus | TicketStatus }) {
  const config = statusConfig[status];
  if (!config) {
    return <Badge>{status}</Badge>;
  }
  return (
    <Badge variant="outline" className={cn('gap-1.5 font-medium', config.className)}>
      <config.icon className="h-3.5 w-3.5" />
      <span>{config.label}</span>
    </Badge>
  );
}
