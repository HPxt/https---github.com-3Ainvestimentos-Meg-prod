"use client";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import type { FormField as FormFieldType } from '@/lib/types';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from './ui/calendar';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { DateRange } from 'react-day-picker';

type DynamicFormProps = {
  formFields: FormFieldType[];
  onSubmit: (data: any) => void;
  isLoading: boolean;
};

export function DynamicForm({ formFields, onSubmit, isLoading }: DynamicFormProps) {
  const formSchema = z.object(
    formFields.reduce((acc, field) => {
      let validator: z.ZodTypeAny = z.string();
      if (field.type === 'date' || field.type === 'date-range') {
        validator = z.any();
      }
      if (field.required) {
        validator = validator.min(1, { message: `${field.label} é obrigatório.` });
      } else {
        validator = validator.optional();
      }
      acc[field.id] = validator;
      return acc;
    }, {} as Record<string, z.ZodTypeAny>)
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: formFields.reduce((acc, field) => {
        acc[field.id] = '';
        return acc;
    }, {} as Record<string, any>),
  });

  const renderField = (field: any, formField: FormFieldType) => {
    switch (formField.type) {
      case 'text':
        return <Input placeholder={formField.placeholder} {...field} />;
      case 'textarea':
        return <Textarea placeholder={formField.placeholder} {...field} />;
      case 'select':
        return (
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={formField.placeholder || "Selecione uma opção"} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {formField.options?.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      case 'date':
        return (
            <Popover>
                <PopoverTrigger asChild>
                <FormControl>
                    <Button
                    variant={"outline"}
                    className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                    )}
                    >
                    {field.value ? (
                        format(field.value, "PPP")
                    ) : (
                        <span>Escolha uma data</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                    date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                />
                </PopoverContent>
            </Popover>
        );
      case 'date-range':
         return (
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="date"
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {field.value?.from ? (
                    field.value.to ? (
                      <>
                        {format(field.value.from, "LLL dd, y")} -{" "}
                        {format(field.value.to, "LLL dd, y")}
                      </>
                    ) : (
                      format(field.value.from, "LLL dd, y")
                    )
                  ) : (
                    <span>Escolha um intervalo de datas</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={field.value?.from}
                  selected={field.value as DateRange}
                  onSelect={field.onChange}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>
          );
      case 'file':
        return <Input type="file" {...field} />;
      default:
        return <Input {...field} />;
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid gap-6">
          {formFields.map((formField) => (
            <FormField
              key={formField.id}
              control={form.control}
              name={formField.id as any}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{formField.label}</FormLabel>
                  <FormControl>{renderField(field, formField)}</FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>
        <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
          {isLoading ? 'Enviando...' : 'Enviar Solicitação'}
        </Button>
      </form>
    </Form>
  );
}
