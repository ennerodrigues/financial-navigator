"use client"

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface SummaryCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  color?: string;
  isBalance?: boolean;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ title, value, icon, color, isBalance = false }) => {
  return (
    <Card className="hover:shadow-md transition-shadow duration-300">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className={cn('text-2xl font-bold', color, isBalance ? (value.startsWith('-') ? 'text-destructive' : 'text-green-600') : '')}>
          {value}
        </div>
      </CardContent>
    </Card>
  );
};

export default SummaryCard;
