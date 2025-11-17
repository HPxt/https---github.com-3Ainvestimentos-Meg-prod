import type { User, WorkflowDefinition, WorkflowRequest } from './types';

export const mockUsers: Record<string, User> = {
  'user-1': {
    id: 'user-1',
    name: 'Admin User',
    email: 'admin@workflowwise.com',
    avatarUrl: 'https://picsum.photos/seed/user1/100/100',
    role: 'Administrator',
  },
  'user-2': {
    id: 'user-2',
    name: 'Manager Mike',
    email: 'mike@workflowwise.com',
    avatarUrl: 'https://picsum.photos/seed/user2/100/100',
    role: 'Manager',
  },
  'user-3': {
    id: 'user-3',
    name: 'Collaborator Carla',
    email: 'carla@workflowwise.com',
    avatarUrl: 'https://picsum.photos/seed/user3/100/100',
    role: 'Collaborator',
  },
  'user-4': {
    id: 'user-4',
    name: 'Employee Eric',
    email: 'eric@workflowwise.com',
    avatarUrl: 'https://picsum.photos/seed/user4/100/100',
    role: 'Collaborator',
  },
};

export const mockWorkflowDefinitions: WorkflowDefinition[] = [
  {
    id: 'wf-1',
    name: 'Leave Request',
    description: 'Submit a request for time off, which will be routed to your manager for approval.',
    iconUrl: 'https://picsum.photos/seed/icon1/200/150',
    iconHint: 'abstract geometric',
    formFields: [
      { id: 'leaveType', label: 'Leave Type', type: 'select', required: true, options: ['Vacation', 'Sick Leave', 'Personal', 'Unpaid'] },
      { id: 'dateRange', label: 'Dates', type: 'date-range', required: true },
      { id: 'reason', label: 'Reason for Leave', type: 'textarea', required: true, placeholder: 'Please provide a brief reason for your leave...' },
      { id: 'doctorNote', label: 'Doctor\'s Note (if sick)', type: 'file', required: false },
    ],
    approvalSteps: [
      { step: 1, approverRole: 'Manager', name: 'Manager Approval' },
    ],
  },
  {
    id: 'wf-2',
    name: 'Expense Reimbursement',
    description: 'Get reimbursed for company-related expenses. Requires manager and finance approval.',
    iconUrl: 'https://picsum.photos/seed/icon2/200/150',
    iconHint: 'abstract gradient',
    formFields: [
      { id: 'expenseDate', label: 'Date of Expense', type: 'date', required: true },
      { id: 'amount', label: 'Amount (USD)', type: 'text', required: true, placeholder: 'e.g., 49.99' },
      { id: 'description', label: 'Description', type: 'textarea', required: true, placeholder: 'What was this expense for?' },
      { id: 'receipt', label: 'Upload Receipt', type: 'file', required: true },
    ],
    approvalSteps: [
      { step: 1, approverRole: 'Manager', name: 'Manager Approval' },
      { step: 2, approverRole: 'Administrator', name: 'Finance Review' },
    ],
  },
  {
    id: 'wf-3',
    name: 'IT Asset Request',
    description: 'Request new hardware or software. Subject to IT department approval.',
    iconUrl: 'https://picsum.photos/seed/icon3/200/150',
    iconHint: 'abstract pattern',
    formFields: [
      { id: 'assetType', label: 'Asset Type', type: 'select', required: true, options: ['Hardware', 'Software'] },
      { id: 'assetName', label: 'Asset Name', type: 'text', required: true, placeholder: 'e.g., MacBook Pro 16", Adobe Photoshop License' },
      { id: 'businessJustification', label: 'Business Justification', type: 'textarea', required: true, placeholder: 'How will this asset help you perform your job?' },
    ],
    approvalSteps: [
      { step: 1, approverRole: 'Manager', name: 'Manager Approval' },
      { step: 2, approverRole: 'Administrator', name: 'IT Department Approval' },
    ],
  },
];

export const mockRequests: WorkflowRequest[] = [
  {
    id: 'req-1',
    workflowDefinitionId: 'wf-1',
    workflowName: 'Leave Request',
    submittedBy: mockUsers['user-3'],
    submittedAt: '2024-07-28T10:00:00Z',
    status: 'Pending',
    currentStep: 1,
    formData: { leaveType: 'Vacation', dateRange: '2024-08-10 to 2024-08-15', reason: 'Family vacation.' },
    history: [
      { id: 'h-1-1', timestamp: '2024-07-28T10:00:00Z', user: mockUsers['user-3'], action: 'Submitted' },
    ],
  },
  {
    id: 'req-2',
    workflowDefinitionId: 'wf-2',
    workflowName: 'Expense Reimbursement',
    submittedBy: mockUsers['user-4'],
    submittedAt: '2024-07-27T14:30:00Z',
    status: 'Approved',
    currentStep: 2,
    formData: { expenseDate: '2024-07-25', amount: '75.50', description: 'Client lunch meeting' },
    history: [
      { id: 'h-2-1', timestamp: '2024-07-27T14:30:00Z', user: mockUsers['user-4'], action: 'Submitted' },
      { id: 'h-2-2', timestamp: '2024-07-28T09:00:00Z', user: mockUsers['user-2'], action: 'Approved', comment: 'Looks good.' },
      { id: 'h-2-3', timestamp: '2024-07-29T11:00:00Z', user: mockUsers['user-1'], action: 'Approved', comment: 'Payment processed.' },
    ],
  },
  {
    id: 'req-3',
    workflowDefinitionId: 'wf-1',
    workflowName: 'Leave Request',
    submittedBy: mockUsers['user-4'],
    submittedAt: '2024-07-29T11:00:00Z',
    status: 'In Progress',
    currentStep: 1,
    formData: { leaveType: 'Sick Leave', dateRange: '2024-07-29', reason: 'Feeling unwell.' },
    history: [
      { id: 'h-3-1', timestamp: '2024-07-29T11:00:00Z', user: mockUsers['user-4'], action: 'Submitted' },
      { id: 'h-3-2', timestamp: '2024-07-29T11:05:00Z', user: mockUsers['user-2'], action: 'Needs Information', comment: 'Please upload a doctor\'s note for sick leave.' },
    ],
  },
   {
    id: 'req-4',
    workflowDefinitionId: 'wf-3',
    workflowName: 'IT Asset Request',
    submittedBy: mockUsers['user-3'],
    submittedAt: '2024-07-26T16:00:00Z',
    status: 'Rejected',
    currentStep: 1,
    formData: { assetType: 'Hardware', assetName: 'New personal laptop', businessJustification: 'Mine is slow.' },
    history: [
      { id: 'h-4-1', timestamp: '2024-07-26T16:00:00Z', user: mockUsers['user-3'], action: 'Submitted' },
      { id: 'h-4-2', timestamp: '2024-07-27T10:00:00Z', user: mockUsers['user-2'], action: 'Rejected', comment: 'Insufficient justification. Please provide more details on how this impacts your work.' },
    ],
  },
];
