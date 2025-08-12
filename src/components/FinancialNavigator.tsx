"use client";

import React, { useState, useMemo, useEffect } from 'react';
import useFirebaseData from '@/hooks/useFirebaseData';
import { initialFinancialData } from '@/lib/data';
import type { FinancialData, MonthData } from '@/lib/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Summary from './Summary';
import MonthSelector from './MonthSelector';
import IncomeTab from './tabs/IncomeTab';
import FixedExpensesTab from './tabs/FixedExpensesTab';
import VariableExpensesTab from './tabs/VariableExpensesTab';
import DebtsTab from './tabs/DebtsTab';
import SavingsTab from './tabs/SavingsTab';
import ReconciliationTab from './tabs/ReconciliationTab';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Download } from 'lucide-react';
import { generateCSV, downloadCSV } from '@/lib/utils';


export function FinancialNavigator() {
  const [data, setData, loading] = useFirebaseData('financial-data');
  const [selectedMonth, setSelectedMonth] = useState('2025-08');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const currentMonthData = useMemo(() => {
    return data[selectedMonth] || initialFinancialData[selectedMonth];
  }, [data, selectedMonth]);

  const handleUpdate = (updatedMonthData: Partial<MonthData>) => {
    const newData = {
      ...data,
      [selectedMonth]: {
        ...currentMonthData,
        ...updatedMonthData,
      },
    };
    setData(newData);
  };

  const totals = useMemo(() => {
    if (!currentMonthData) return { income: 0, fixed: 0, variable: 0, debts: 0, savings: 0, expenses: 0, balance: 0 };
    const income = currentMonthData.income.reduce((acc, item) => acc + item.value, 0);
    const fixed = currentMonthData.fixedExpenses.reduce((acc, item) => acc + item.value, 0);
    const variable = currentMonthData.variableExpenses.reduce((acc, item) => acc + item.value, 0);
    const debts = currentMonthData.debts.reduce((acc, item) => acc + item.value, 0);
    const savings = currentMonthData.savings.reduce((acc, item) => acc + item.value, 0);
    const expenses = fixed + variable + debts + savings;
    const balance = income - expenses;
    return { income, fixed, variable, debts, savings, expenses, balance };
  }, [currentMonthData]);

  const handleExportCSV = () => {
    const csvContent = generateCSV(currentMonthData, totals, selectedMonth);
    downloadCSV(csvContent, `financeiro_${selectedMonth}.csv`);
  };

  if (!isMounted || loading) {
    return <div className="text-center">Carregando...</div>;
  }

  return (
    <Card className="w-full shadow-lg">
      <CardContent className="p-4 md:p-6">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6 gap-4">
          <h2 className="text-2xl font-bold text-primary">Painel Financeiro</h2>
          <div className="flex gap-2">
            <MonthSelector selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth} />
            <Button onClick={handleExportCSV} variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Exportar CSV
            </Button>
          </div>
        </div>

        <Summary totals={totals} />

        <Tabs defaultValue="income" className="w-full mt-6">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-6">
            <TabsTrigger value="income">Receitas</TabsTrigger>
            <TabsTrigger value="fixed">Despesas Fixas</TabsTrigger>
            <TabsTrigger value="variable">Despesas Variáveis</TabsTrigger>
            <TabsTrigger value="debts">Dívidas</TabsTrigger>
            <TabsTrigger value="savings">Reservas</TabsTrigger>
            <TabsTrigger value="reconciliation">Conciliação</TabsTrigger>
          </TabsList>
          
          <TabsContent value="income" className="mt-4">
            <IncomeTab data={currentMonthData.income} onUpdate={(income) => handleUpdate({ income })} />
          </TabsContent>
          <TabsContent value="fixed" className="mt-4">
            <FixedExpensesTab data={currentMonthData.fixedExpenses} onUpdate={(fixedExpenses) => handleUpdate({ fixedExpenses })} />
          </TabsContent>
          <TabsContent value="variable" className="mt-4">
            <VariableExpensesTab data={currentMonthData.variableExpenses} onUpdate={(variableExpenses) => handleUpdate({ variableExpenses })} />
          </TabsContent>
          <TabsContent value="debts" className="mt-4">
            <DebtsTab data={currentMonthData.debts} onUpdate={(debts) => handleUpdate({ debts })} />
          </TabsContent>
          <TabsContent value="savings" className="mt-4">
            <SavingsTab data={currentMonthData.savings} onUpdate={(savings) => handleUpdate({ savings })} />
          </TabsContent>
           <TabsContent value="reconciliation" className="mt-4">
            <ReconciliationTab data={currentMonthData.reconciliation} onUpdate={(reconciliation) => handleUpdate({ reconciliation })} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
