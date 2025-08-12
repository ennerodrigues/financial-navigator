"use client"

import React from 'react';
import type { Entry } from '@/lib/types';
import EditableEntry from '../common/EditableEntry';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface IncomeTabProps {
  data: Entry[];
  onUpdate: (data: Entry[]) => void;
}

const IncomeTab: React.FC<IncomeTabProps> = ({ data, onUpdate }) => {
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
      id: `income-${Date.now()}`,
      name: 'Nova Receita',
      value: 0,
    };
    onUpdate([...data, newEntry]);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Fontes de Receita</CardTitle>
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
          <PlusCircle className="mr-2 h-4 w-4" /> Adicionar Receita
        </Button>
      </CardContent>
    </Card>
  );
};

export default IncomeTab;
