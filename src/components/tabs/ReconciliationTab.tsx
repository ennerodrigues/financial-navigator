"use client";

import React, { useState } from 'react';
import type { ReconciliationEntry, Category, ReconciliationType } from '@/lib/types';
import { categories } from '@/lib/types';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Trash2, PlusCircle } from 'lucide-react';
import { formatCurrency, cn } from '@/lib/utils';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';

interface ReconciliationTabProps {
  data: ReconciliationEntry[];
  onUpdate: (data: ReconciliationEntry[]) => void;
}

const formSchema = z.object({
  date: z.string().min(1, 'Data é obrigatória'),
  bank: z.string().min(1, 'Banco é obrigatório'),
  description: z.string().min(1, 'Descrição é obrigatória'),
  value: z.coerce.number().positive('Valor deve ser positivo'),
  type: z.enum(['income', 'expense']),
  category: z.enum(categories),
});

type ReconciliationFormValues = z.infer<typeof formSchema>;

const ReconciliationTab: React.FC<ReconciliationTabProps> = ({
  data,
  onUpdate,
}) => {
  const [showForm, setShowForm] = useState(false);
  const form = useForm<ReconciliationFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: new Date().toISOString().split('T')[0],
      bank: '',
      description: '',
      value: 0,
      type: 'expense',
      category: 'OUTROS',
    },
  });

  const onSubmit = (values: ReconciliationFormValues) => {
    const newEntry: ReconciliationEntry = {
      id: `reconciliation-${Date.now()}`,
      ...values,
    };
    onUpdate([...data, newEntry].sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
    form.reset();
    setShowForm(false);
  };

  const handleDelete = (id: string) => {
    onUpdate(data.filter((entry) => entry.id !== id));
  };
  
  const sortedData = React.useMemo(() => {
    return [...data].sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [data]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Conciliação Bancária</CardTitle>
      </CardHeader>
      <CardContent>
        {!showForm && (
            <Button onClick={() => setShowForm(true)} variant="outline">
                <PlusCircle className="mr-2 h-4 w-4" /> Adicionar Lançamento
            </Button>
        )}
        {showForm && (
            <Card className="mb-6">
                <CardHeader>
                    <CardTitle>Novo Lançamento</CardTitle>
                </CardHeader>
                <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Data</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="bank"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Banco</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: Nubank, Sicoob" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descrição</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Compras no Supermercado" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="value"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Valor (R$)</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.01" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Categoria</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione uma categoria" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories.map((cat) => (
                            <SelectItem key={cat} value={cat}>
                              {cat}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Tipo de Lançamento</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex items-center space-x-4"
                      >
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="expense" />
                          </FormControl>
                          <FormLabel className="font-normal">Despesa</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="income" />
                          </FormControl>
                          <FormLabel className="font-normal">Receita</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end gap-2">
                <Button type="button" variant="ghost" onClick={() => setShowForm(false)}>Cancelar</Button>
                <Button type="submit">Salvar Lançamento</Button>
              </div>
            </form>
          </Form>
          </CardContent>
          </Card>
        )}

        <div className="mt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Data</TableHead>
                <TableHead>Banco</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead className="text-right">Valor</TableHead>
                <TableHead className="text-center">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedData.length > 0 ? (
                sortedData.map((entry) => (
                  <TableRow key={entry.id}>
                    <TableCell>{new Date(entry.date).toLocaleDateString('pt-BR', {timeZone: 'UTC'})}</TableCell>
                    <TableCell>{entry.bank}</TableCell>
                    <TableCell>{entry.description}</TableCell>
                    <TableCell>
                        <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full">{entry.category}</span>
                    </TableCell>
                    <TableCell
                      className={cn('text-right font-medium', {
                        'text-red-500': entry.type === 'expense',
                        'text-blue-500': entry.type === 'income',
                      })}
                    >
                      {entry.type === 'expense' ? '-' : '+'} {formatCurrency(entry.value)}
                    </TableCell>
                    <TableCell className="text-center">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(entry.id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    Nenhum lançamento para este mês.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReconciliationTab;
