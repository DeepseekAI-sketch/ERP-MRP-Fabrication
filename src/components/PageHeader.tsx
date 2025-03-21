
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  onAddNew?: () => void;
}

const PageHeader: React.FC<PageHeaderProps> = ({ 
  title, 
  subtitle, 
  onAddNew 
}) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        {subtitle && (
          <p className="text-muted-foreground mt-1">{subtitle}</p>
        )}
      </div>
      {onAddNew && (
        <Button onClick={onAddNew} className="mt-4 md:mt-0">
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      )}
    </div>
  );
};

export default PageHeader;
