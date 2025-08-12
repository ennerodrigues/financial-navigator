"use client"

import React from 'react';
import type { Entry } from '@/lib/types';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { formatCurrency } from '@/lib/utils';
import { Button } from '../ui/button';
import { PlusCircle, Trash2 } from 'lucide-react';
import EditableEntry from '../common/EditableEntry';

interface SavingsTabProps {
  data: Entry[];
  onUpdate: (data: Entry[]) => void;
}

const SavingsTab: React.FC<SavingsTabProps> = ({ data, onUpdate }) => {
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
      id: `savings-${Date.now()}`,
      name: 'Nova Reserva',
      value: 0,
    };
    onUpdate([...data, newEntry]);
  };

  const totalSavings = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Reservas e Investimentos</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
           {data.map(entry => (
            <EditableEntry
              key={entry.id}
              entry={entry}
              onUpdate={handleUpdateEntry}
              onDelete={handleDeleteEntry}
              isNameEditable={!entry.id.startsWith('reserva-')}
            />
          ))}
        </div>
        <Button onClick={handleAddEntry} className="mt-4" variant="outline">
          <PlusCircle className="mr-2 h-4 w-4" /> Adicionar Reserva
        </Button>
      </CardContent>
      <CardFooter className="flex justify-end font-bold text-lg">
        Total: {formatCurrency(totalSavings)}
      </CardFooter>
    </Card>
  );
};

export default SavingsTab;
