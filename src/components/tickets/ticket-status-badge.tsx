import { Badge } from '@/components/ui/badge';
import type { TicketStatus } from '@/lib/types';
import { cn } from '@/lib/utils';

const statusConfig: Record<
  TicketStatus,
  {
    label: string;
    className: string;
  }
> = {
  Finalizado: {
    label: 'Finalizado',
    className: 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
  },
  'Em Análise': {
    label: 'em_analise',
    className: 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
  },
  'Solicitação Aberta': {
    label: 'Solicitação Aberta',
    className: 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
  },
};

export function TicketStatusBadge({ status }: { status: TicketStatus }) {
  const config = statusConfig[status];
  if (!config) {
    return <Badge>{status}</Badge>;
  }
  return (
    <Badge variant="outline" className={cn('font-normal', config.className)}>
      <span>{config.label === 'em_analise' ? 'em análise' : config.label}</span>
    </Badge>
  );
}
