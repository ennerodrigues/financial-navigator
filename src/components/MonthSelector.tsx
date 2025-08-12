"use client"

import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface MonthSelectorProps {
  selectedMonth: string;
  setSelectedMonth: (month: string) => void;
}

const months = [
  { key: '2025-08', name: 'Agosto 2025' },
  { key: '2025-09', name: 'Setembro 2025' },
  { key: '2025-10', name: 'Outubro 2025' },
  { key: '2025-11', name: 'Novembro 2025' },
  { key: '2025-12', name: 'Dezembro 2025' },
  { key: '2026-01', name: 'Janeiro 2026' },
];

const MonthSelector: React.FC<MonthSelectorProps> = ({ selectedMonth, setSelectedMonth }) => {
  return (
    <Select value={selectedMonth} onValueChange={setSelectedMonth}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Selecione o Mês" />
      </SelectTrigger>
      <SelectContent>
        {months.map(month => (
          <SelectItem key={month.key} value={month.key}>
            {month.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default MonthSelector;
