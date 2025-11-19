'use client';

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
import { MoreHorizontal, PlusCircle, List, FilePenLine, Trash2, BarChart, Smartphone, CreditCard, Users, FileText, Gift, Monitor, Briefcase } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const areas = [
    { name: 'Business Intelligence', icon: BarChart },
    { name: 'Facilities e Suprimentos', icon: Smartphone },
    { name: 'Financeiro', icon: CreditCard },
    { name: 'Gente e Comunicação', icon: Users },
    { name: 'Jurídico', icon: Briefcase },
    { name: 'Marketing', icon: Gift },
    { name: 'TI', icon: Monitor },
];


export function WorkflowDefinitions() {
  return (
    <div className="space-y-6 mt-4">
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                <h2 className="text-2xl font-headline font-bold tracking-tight">
                    Áreas de Workflow
                </h2>
                <p className="text-muted-foreground">
                    Gerencie as áreas de negócio que contêm workflows.
                </p>
                </div>
                <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Nova Área
                </Button>
            </div>
            <Card>
                <CardContent className="p-0">
                <Table>
                    <TableHeader>
                    <TableRow>
                        <TableHead className="w-16">Ícone</TableHead>
                        <TableHead>Nome da Área</TableHead>
                        <TableHead>Caminho no Storage</TableHead>
                        <TableHead className="w-32 text-right">Ações</TableHead>
                    </TableRow>
                    </TableHeader>
                    <TableBody>
                    {areas.map((area) => (
                        <TableRow key={area.name}>
                        <TableCell>
                            <div className="flex items-center justify-center h-8 w-8 rounded-md bg-muted text-muted-foreground">
                                <area.icon className="h-5 w-5" />
                            </div>
                        </TableCell>
                        <TableCell className="font-medium">{area.name}</TableCell>
                        <TableCell className="text-muted-foreground font-mono text-xs">
                            {`gs://a-riva-hub.firebasestorage.app/workflows/${area.name.replace(/ /g, '%20')}`}
                        </TableCell>
                        <TableCell className="text-right">
                           <div className="flex items-center justify-end gap-2">
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <List className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <FilePenLine className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive">
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </CardContent>
            </Card>
        </div>

        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                <h2 className="text-2xl font-headline font-bold tracking-tight">
                    Definições de Workflow
                </h2>
                <p className="text-muted-foreground">
                    Crie e gerencie os modelos de workflow para sua organização.
                </p>
                </div>
                <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Novo Workflow
                </Button>
            </div>
            <Card>
                <CardContent className="p-0">
                <Table>
                    <TableHeader>
                    <TableRow>
                        <TableHead>Nome</TableHead>
                        <TableHead>Campos</TableHead>
                        <TableHead>Etapas de Aprovação</TableHead>
                        <TableHead>
                        <span className="sr-only">Ações</span>
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
                                <span className="sr-only">Alternar menu</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Ações</DropdownMenuLabel>
                                <DropdownMenuItem>Editar</DropdownMenuItem>
                                <DropdownMenuItem>Duplicar</DropdownMenuItem>
                                <DropdownMenuItem className="text-destructive">Excluir</DropdownMenuItem>
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
    </div>
  );
}
