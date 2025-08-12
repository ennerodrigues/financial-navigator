"use client"

import React from 'react';
import type { DebtEntry } from '@/lib/types';
import DebtEntryComponent from '../common/DebtEntry';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { formatCurrency } from '@/lib/utils';

interface DebtsTabProps {
  data: DebtEntry[];
  onUpdate: (data: DebtEntry[]) => void;
}

const DebtsTab: React.FC<DebtsTabProps> = ({ data, onUpdate }) => {
  const handleUpdateEntry = (updatedEntry: DebtEntry) => {
    const newData = data.map(d => d.id === updatedEntry.id ? updatedEntry : d);
    onUpdate(newData);
  };

  const totalDebts = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Controle de Dívidas</CardTitle>
      </CardHeader>
      <CardContent>
        {data.length > 0 ? (
          <div className="space-y-4">
            {data.map(entry => (
              <DebtEntryComponent
                key={entry.id}
                entry={entry}
                onUpdate={handleUpdateEntry}
              />
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground text-center py-8">Nenhuma dívida para este mês. 🎉</p>
        )}
      </CardContent>
      <CardFooter className="flex justify-end font-bold text-lg">
        Total: {formatCurrency(totalDebts)}
      </CardFooter>
    </Card>
  );
};

export default DebtsTab;
