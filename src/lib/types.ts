export type UserRole = 'Collaborator' | 'Manager' | 'Administrator';

export type User = {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  role: UserRole;
};

export type FormField = {
  id: string;
  label: string;
  type: 'text' | 'textarea' | 'select' | 'date' | 'date-range' | 'file';
  required: boolean;
  placeholder?: string;
  options?: string[];
};

export type ApprovalStep = {
  step: number;
  approverRole: UserRole;
  name: string;
};

export type WorkflowDefinition = {
  id: string;
  name: string;
  description: string;
  iconUrl: string;
  iconHint: string;
  formFields: FormField[];
  approvalSteps: ApprovalStep[];
};

export type WorkflowRequestStatus = 'Pendente' | 'Em Progresso' | 'Aprovado' | 'Rejeitado' | 'Necessita Informação' | 'Solicitação Aberta' | 'Em aprovação';

export type WorkflowRequest = {
  id: string;
  workflowDefinitionId: string;
  workflowName: string;
  submittedBy: User;
  submittedAt: string;
  status: WorkflowRequestStatus;
  currentStep: number;
  formData: Record<string, any>;
  history: AuditLogEntry[];
  responsible?: User;
  owner: User;
};

export type AuditLogEntry = {
  id: string;
  timestamp: string;
  user: User;
  action: string;
  comment?: string;
};

export type TicketStatus = 'Finalizado' | 'Em Análise' | 'Solicitação Aberta';

export type Ticket = {
  id: string;
  type: string;
  status: TicketStatus;
  completionDate: string;
};
