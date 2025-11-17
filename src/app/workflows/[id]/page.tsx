"use client";

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { AppShell } from '@/components/app-shell';
import { DynamicForm } from '@/components/dynamic-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { mockWorkflowDefinitions } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';
import { ApprovalStep } from '@/lib/types';


export default function SingleWorkflowPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const workflowId = params.id as string;
  const workflow = mockWorkflowDefinitions.find((w) => w.id === workflowId);

  if (!workflow) {
    return (
      <AppShell breadcrumbs={[{ label: 'Workflows', href: '/workflows' }, { label: 'Not Found', href: '#' }]}>
        <div className="text-center">
            <h1 className="text-2xl font-bold">Workflow not found</h1>
            <p className="text-muted-foreground">The requested workflow could not be found.</p>
        </div>
      </AppShell>
    );
  }

  const breadcrumbs = [
    { label: 'Workflows', href: '/workflows' },
    { label: workflow.name, href: `/workflows/${workflow.id}` },
  ];

  const handleSubmit = (data: any) => {
    setIsLoading(true);
    console.log('Form submitted:', data);
    
    // Simulate API call
    setTimeout(() => {
        setIsLoading(false);
        toast({
            title: "Request Submitted!",
            description: `Your "${workflow.name}" request has been submitted for approval.`,
        });
        router.push('/requests');
    }, 1500);
  };
  
  const ApprovalFlow = ({ steps }: { steps: ApprovalStep[] }) => (
    <Alert>
      <Terminal className="h-4 w-4" />
      <AlertTitle>Approval Flow</AlertTitle>
      <AlertDescription>
        <ol className="relative mt-2 border-l border-gray-200 dark:border-gray-700">                  
          {steps.map((step, index) => (
            <li key={step.step} className="mb-4 ml-4">
                <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                <time className="mb-1 text-sm font-normal leading-none text-muted-foreground">Step {step.step}</time>
                <h3 className="text-md font-semibold text-foreground">{step.name}</h3>
                <p className="text-sm font-normal text-muted-foreground">Requires approval from a user with the '{step.approverRole}' role.</p>
            </li>
          ))}
            <li className="ml-4">
                <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                <time className="mb-1 text-sm font-normal leading-none text-muted-foreground">Final Step</time>
                <h3 className="text-md font-semibold text-foreground">Completed</h3>
            </li>
        </ol>
      </AlertDescription>
    </Alert>
  );

  return (
    <AppShell breadcrumbs={breadcrumbs}>
      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
            <Card>
                <CardHeader>
                <CardTitle className="font-headline text-3xl">{workflow.name}</CardTitle>
                <CardDescription>{workflow.description}</CardDescription>
                </CardHeader>
                <CardContent>
                <DynamicForm formFields={workflow.formFields} onSubmit={handleSubmit} isLoading={isLoading}/>
                </CardContent>
            </Card>
        </div>
        <div className="space-y-6">
            <ApprovalFlow steps={workflow.approvalSteps} />
        </div>
      </div>
    </AppShell>
  );
}
