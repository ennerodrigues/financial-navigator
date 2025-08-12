"use client"

import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import type { Entry } from '@/lib/types';
import { Label } from '../ui/label';

interface EditableEntryProps {
  entry: Entry;
  onUpdate: (updatedEntry: Entry) => void;
  onDelete: (id: string) => void;
  isNameEditable?: boolean;
}

const EditableEntry: React.FC<EditableEntryProps> = ({ entry, onUpdate, onDelete, isNameEditable = true }) => {
  
  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    onUpdate({ ...entry, value: isNaN(value) ? 0 : value });
  };
  
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate({ ...entry, name: e.target.value });
  };
  
  return (
    <div className="flex flex-col sm:flex-row items-center gap-2 p-2 border-b">
      <div className="w-full sm:w-2/5">
        {isNameEditable ? (
           <Input
            type="text"
            value={entry.name}
            onChange={handleNameChange}
            placeholder="Nome da entrada"
            className="font-medium"
          />
        ) : (
          <Label className="font-medium text-sm">{entry.name}</Label>
        )}
      </div>
      <div className="w-full sm:w-2/5">
        <Input
          type="number"
          value={entry.value}
          onChange={handleValueChange}
          placeholder="Valor"
          className="text-right"
        />
      </div>
      <div className="w-full sm:w-1/5 flex justify-end">
        {isNameEditable && (
          <Button variant="ghost" size="icon" onClick={() => onDelete(entry.id)}>
            <Trash2 className="h-4 w-4 text-destructive" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default EditableEntry;
