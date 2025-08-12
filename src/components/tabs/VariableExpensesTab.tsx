"use client"

import React from 'react';
import type { Entry } from '@/lib/types';
import EditableEntry from '../common/EditableEntry';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { formatCurrency } from '@/lib/utils';

interface VariableExpensesTabProps {
  data: Entry[];
  onUpdate: (data: Entry[]) => void;
}

const VariableExpensesTab: React.FC<VariableExpensesTabProps> = ({ data, onUpdate }) => {
  const handleUpdateEntry = (updatedEntry: Entry) => {
    const newData = data.map(e => e.id === updatedEntry.id ? updatedEntry : e);
    onUpdate(newData);
  };

  const handleDeleteEntry = (id: string) => {
    const newData = data.filter(e => e.id !== id);
    onUpdate(newData);
  };

  const handleAddEntry = () => {
    const newEntry: Entry = {
      id: `variable-${Date.now()}`,
      name: 'Nova Despesa',
      value: 0,
    };
    onUpdate([...data, newEntry]);
  };

  const totalVariableExpenses = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Despesas Variáveis</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {data.map(entry => (
            <EditableEntry
              key={entry.id}
              entry={entry}
              onUpdate={handleUpdateEntry}
              onDelete={handleDeleteEntry}
            />
          ))}
        </div>
        <Button onClick={handleAddEntry} className="mt-4" variant="outline">
          <PlusCircle className="mr-2 h-4 w-4" /> Adicionar Despesa
        </Button>
      </CardContent>
      <CardFooter className="flex justify-end font-bold text-lg">
        Total: {formatCurrency(totalVariableExpenses)}
      </CardFooter>
    </Card>
  );
};

export default VariableExpensesTab;
