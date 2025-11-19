import type { User, WorkflowDefinition, WorkflowRequest, Ticket } from './types';

export const mockUsers: Record<string, User> = {
  'user-1': {
    id: 'user-1',
    name: 'Usuário Admin',
    email: 'admin@workflowwise.com',
    avatarUrl: 'https://picsum.photos/seed/user1/100/100',
    role: 'Administrator',
  },
  'user-2': {
    id: 'user-2',
    name: 'Gerente Marcos',
    email: 'marcos@workflowwise.com',
    avatarUrl: 'https://picsum.photos/seed/user2/100/100',
    role: 'Manager',
  },
  'user-3': {
    id: 'user-3',
    name: 'Colaboradora Carla',
    email: 'carla@workflowwise.com',
    avatarUrl: 'https://picsum.photos/seed/user3/100/100',
    role: 'Collaborator',
  },
  'user-4': {
    id: 'user-4',
    name: 'Funcionário Eric',
    email: 'eric@workflowwise.com',
    avatarUrl: 'https://picsum.photos/seed/user4/100/100',
    role: 'Collaborator',
  },
};

export const mockWorkflowDefinitions: WorkflowDefinition[] = [
  {
    id: 'wf-1',
    name: 'Solicitação de Férias',
    description: 'Envie um pedido de folga, que será encaminhado ao seu gerente para aprovação.',
    iconUrl: 'https://picsum.photos/seed/icon1/200/150',
    iconHint: 'abstract geometric',
    formFields: [
      { id: 'leaveType', label: 'Tipo de Licença', type: 'select', required: true, options: ['Férias', 'Licença Médica', 'Pessoal', 'Não Remunerada'] },
      { id: 'dateRange', label: 'Datas', type: 'date-range', required: true },
      { id: 'reason', label: 'Motivo da Licença', type: 'textarea', required: true, placeholder: 'Forneça um breve motivo para sua licença...' },
      { id: 'doctorNote', label: 'Atestado Médico (se aplicável)', type: 'file', required: false },
    ],
    approvalSteps: [
      { step: 1, approverRole: 'Manager', name: 'Aprovação do Gerente' },
    ],
  },
  {
    id: 'wf-2',
    name: 'Reembolso de Despesas',
    description: 'Seja reembolsado por despesas relacionadas à empresa. Requer aprovação do gerente e do financeiro.',
    iconUrl: 'https://picsum.photos/seed/icon2/200/150',
    iconHint: 'abstract gradient',
    formFields: [
      { id: 'expenseDate', label: 'Data da Despesa', type: 'date', required: true },
      { id: 'amount', label: 'Valor (BRL)', type: 'text', required: true, placeholder: 'ex: 49,99' },
      { id: 'description', label: 'Descrição', type: 'textarea', required: true, placeholder: 'Qual foi o motivo desta despesa?' },
      { id: 'receipt', label: 'Anexar Recibo', type: 'file', required: true },
    ],
    approvalSteps: [
      { step: 1, approverRole: 'Manager', name: 'Aprovação do Gerente' },
      { step: 2, approverRole: 'Administrator', name: 'Revisão Financeira' },
    ],
  },
  {
    id: 'wf-3',
    name: 'Solicitação de Ativo de TI',
    description: 'Solicite novo hardware ou software. Sujeito à aprovação do departamento de TI.',
    iconUrl: 'https://picsum.photos/seed/icon3/200/150',
    iconHint: 'abstract pattern',
    formFields: [
      { id: 'assetType', label: 'Tipo de Ativo', type: 'select', required: true, options: ['Hardware', 'Software'] },
      { id: 'assetName', label: 'Nome do Ativo', type: 'text', required: true, placeholder: 'ex: MacBook Pro 16", Licença Adobe Photoshop' },
      { id: 'businessJustification', label: 'Justificativa de Negócio', type: 'textarea', required: true, placeholder: 'Como este ativo ajudará você a desempenhar seu trabalho?' },
    ],
    approvalSteps: [
      { step: 1, approverRole: 'Manager', name: 'Aprovação do Gerente' },
      { step: 2, approverRole: 'Administrator', name: 'Aprovação do Depto. de TI' },
    ],
  },
];

export const mockRequests: WorkflowRequest[] = [
  {
    id: 'req-1',
    workflowDefinitionId: 'wf-1',
    workflowName: 'Solicitação de Férias',
    submittedBy: mockUsers['user-3'],
    submittedAt: '2024-07-28T10:00:00Z',
    status: 'Pendente',
    currentStep: 1,
    formData: { leaveType: 'Férias', dateRange: '2024-08-10 a 2024-08-15', reason: 'Férias em família.' },
    history: [
      { id: 'h-1-1', timestamp: '2024-07-28T10:00:00Z', user: mockUsers['user-3'], action: 'Enviado' },
    ],
  },
  {
    id: 'req-2',
    workflowDefinitionId: 'wf-2',
    workflowName: 'Reembolso de Despesas',
    submittedBy: mockUsers['user-4'],
    submittedAt: '2024-07-27T14:30:00Z',
    status: 'Aprovado',
    currentStep: 2,
    formData: { expenseDate: '2024-07-25', amount: '75.50', description: 'Almoço com cliente' },
    history: [
      { id: 'h-2-1', timestamp: '2024-07-27T14:30:00Z', user: mockUsers['user-4'], action: 'Enviado' },
      { id: 'h-2-2', timestamp: '2024-07-28T09:00:00Z', user: mockUsers['user-2'], action: 'Aprovado', comment: 'Parece bom.' },
      { id: 'h-2-3', timestamp: '2024-07-29T11:00:00Z', user: mockUsers['user-1'], action: 'Aprovado', comment: 'Pagamento processado.' },
    ],
  },
  {
    id: 'req-3',
    workflowDefinitionId: 'wf-1',
    workflowName: 'Solicitação de Férias',
    submittedBy: mockUsers['user-4'],
    submittedAt: '2024-07-29T11:00:00Z',
    status: 'Em Progresso',
    currentStep: 1,
    formData: { leaveType: 'Licença Médica', dateRange: '2024-07-29', reason: 'Não me sentindo bem.' },
    history: [
      { id: 'h-3-1', timestamp: '2024-07-29T11:00:00Z', user: mockUsers['user-4'], action: 'Enviado' },
      { id: 'h-3-2', timestamp: '2024-07-29T11:05:00Z', user: mockUsers['user-2'], action: 'Necessita Informação', comment: 'Por favor, anexe um atestado médico para licença médica.' },
    ],
  },
   {
    id: 'req-4',
    workflowDefinitionId: 'wf-3',
    workflowName: 'Solicitação de Ativo de TI',
    submittedBy: mockUsers['user-3'],
    submittedAt: '2024-07-26T16:00:00Z',
    status: 'Rejeitado',
    currentStep: 1,
    formData: { assetType: 'Hardware', assetName: 'Novo laptop pessoal', businessJustification: 'O meu está lento.' },
    history: [
      { id: 'h-4-1', timestamp: '2024-07-26T16:00:00Z', user: mockUsers['user-3'], action: 'Enviado' },
      { id: 'h-4-2', timestamp: '2024-07-27T10:00:00Z', user: mockUsers['user-2'], action: 'Rejeitado', comment: 'Justificativa insuficiente. Forneça mais detalhes sobre como isso afeta seu trabalho.' },
    ],
  },
];

export const mockTickets: Ticket[] = [
  {
    id: '0123',
    type: 'Sugestões 3A RIVA Connect',
    status: 'Finalizado',
    completionDate: '2025-09-19',
  },
  {
    id: '0122',
    type: 'Problemas de Rede',
    status: 'Finalizado',
    completionDate: '2025-09-22',
  },
  {
    id: '8111',
    type: 'Transferência de Cliente - Caso Único',
    status: 'Em Análise',
    completionDate: '2025-09-12',
  },
  {
    id: '0055',
    type: 'Solicitação de Suprimentos',
    status: 'Solicitação Aberta',
    completionDate: '2025-09-02',
  },
];
