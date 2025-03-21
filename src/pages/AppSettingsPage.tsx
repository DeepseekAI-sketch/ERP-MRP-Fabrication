
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import PageHeader from '@/components/PageHeader';
import { DataTable, DataTableColumn } from '@/components/ui/data-table';
import { Card, CardContent } from '@/components/ui/card';

interface AppSetting {
  id: string;
  setting_key: string;
  setting_value: any;
  created_at: string | null;
  updated_at: string | null;
}

const AppSettingsPage = () => {
  const [settings, setSettings] = useState<AppSetting[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('app_settings')
          .select('*')
          .order('setting_key', { ascending: true });
        
        if (error) {
          throw error;
        }
        
        setSettings(data || []);
      } catch (error: any) {
        toast.error('Failed to load app settings: ' + error.message);
        console.error('Error fetching app settings:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const formatValue = (value: any) => {
    if (value === null || value === undefined) return '-';
    
    if (typeof value === 'object') {
      try {
        return JSON.stringify(value).substring(0, 50) + (JSON.stringify(value).length > 50 ? '...' : '');
      } catch (e) {
        return 'Complex object';
      }
    }
    
    if (typeof value === 'boolean') {
      return value ? 'True' : 'False';
    }
    
    return String(value);
  };

  const columns: DataTableColumn<AppSetting>[] = [
    {
      header: 'Setting Key',
      accessorKey: 'setting_key',
    },
    {
      header: 'Value',
      accessorKey: 'setting_value',
      cell: (row) => formatValue(row.setting_value),
    },
    {
      header: 'Last Updated',
      accessorKey: 'updated_at',
      cell: (row) => {
        if (!row.updated_at) return '-';
        const date = new Date(row.updated_at);
        return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
      },
    },
  ];

  const handleAddNew = () => {
    toast.info('Add new app setting feature coming soon');
  };

  const handleRowClick = (row: AppSetting) => {
    toast.info(`Selected setting: ${row.setting_key}`);
  };

  return (
    <div>
      <PageHeader 
        title="App Settings" 
        subtitle="Configure system-wide settings" 
        onAddNew={handleAddNew}
      />
      
      <Card>
        <CardContent className="p-6">
          <DataTable
            data={settings}
            columns={columns}
            isLoading={isLoading}
            onRowClick={handleRowClick}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default AppSettingsPage;
