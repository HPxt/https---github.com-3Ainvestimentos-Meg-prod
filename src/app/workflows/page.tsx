import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { AppShell } from '@/components/app-shell';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { mockWorkflowDefinitions } from '@/lib/data';
import { Button } from '@/components/ui/button';

const breadcrumbs = [{ label: 'Workflows', href: '/workflows' }];

export default function WorkflowsPage() {
  return (
    <AppShell breadcrumbs={breadcrumbs}>
      <div className="space-y-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-headline font-bold tracking-tight">Start a New Workflow</h1>
          <p className="text-muted-foreground">Choose from the available templates to initiate a new request.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {mockWorkflowDefinitions.map((workflow) => (
            <Card key={workflow.id} className="flex flex-col overflow-hidden transition-transform transform hover:-translate-y-1 hover:shadow-xl">
              <CardHeader className="p-0">
                <div className="relative h-40 w-full">
                  <Image
                    src={workflow.iconUrl}
                    alt={workflow.name}
                    fill
                    className="object-cover"
                    data-ai-hint={workflow.iconHint}
                  />
                </div>
                <div className="p-6 pb-2">
                  <CardTitle className="font-headline text-xl">{workflow.name}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription>{workflow.description}</CardDescription>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href={`/workflows/${workflow.id}`}>
                    Start Request <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
