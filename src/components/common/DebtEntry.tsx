"use client";

import React from 'react';
import type { DebtEntry as DebtEntryType } from '@/lib/types';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent } from '@/components/ui/card';
import { formatCurrency } from '@/lib/utils';
import { cn } from '@/lib/utils';
import { Calendar, Hash, Banknote } from 'lucide-react';

interface DebtEntryProps {
  entry: DebtEntryType;
  onUpdate: (updatedEntry: DebtEntryType) => void;
}

const DebtEntry: React.FC<DebtEntryProps> = ({ entry, onUpdate }) => {
  const handlePaidChange = (checked: boolean) => {
    onUpdate({ ...entry, paid: checked });
  };

  return (
    <Card className={cn('transition-all', entry.paid ? 'bg-muted/50' : 'bg-card')}>
      <CardContent className="p-4 flex items-start gap-4">
        <div className="flex items-center h-full pt-1">
          <Checkbox
            id={`debt-${entry.id}`}
            checked={entry.paid}
            onCheckedChange={handlePaidChange}
            aria-label={`Marcar ${entry.name} como pago`}
          />
        </div>
        <div className="flex-grow">
          <label
            htmlFor={`debt-${entry.id}`}
            className={cn(
              'font-semibold text-lg cursor-pointer',
              entry.paid && 'line-through text-muted-foreground'
            )}
          >
            {entry.name}
          </label>
           {entry.description && (
            <p className="text-sm italic text-muted-foreground mt-1">
              {entry.description}
            </p>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Banknote className="h-4 w-4 text-primary" />
              <span className="font-bold text-base text-primary">{formatCurrency(entry.value)}</span>
            </div>
            {entry.dueDate && (
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>Vencimento dia: {entry.dueDate}</span>
              </div>
            )}
            {entry.currentInstallment && entry.totalInstallments && (
              <div className="flex items-center gap-2">
                <Hash className="h-4 w-4" />
                <span>
                  Parcela: {entry.currentInstallment}/{entry.totalInstallments}
                </span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DebtEntry;
