
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import PageHeader from '@/components/PageHeader';
import { DataTable, DataTableColumn } from '@/components/ui/data-table';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ActivityLog {
  id: string;
  user_id: string;
  action: string;
  entity_type: string;
  entity_id: string | null;
  details: any | null;
  ip_address: string | null;
  user_agent: string | null;
  created_at: string | null;
}

const ActivityLogsPage = () => {
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('activity_logs')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) {
          throw error;
        }
        
        setLogs(data || []);
      } catch (error: any) {
        toast.error('Failed to load activity logs: ' + error.message);
        console.error('Error fetching activity logs:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLogs();
  }, []);

  const getActionBadge = (action: string) => {
    switch (action.toLowerCase()) {
      case 'create':
        return <Badge className="bg-green-500">Create</Badge>;
      case 'update':
        return <Badge>Update</Badge>;
      case 'delete':
        return <Badge variant="destructive">Delete</Badge>;
      case 'view':
        return <Badge variant="outline">View</Badge>;
      case 'login':
        return <Badge variant="secondary">Login</Badge>;
      case 'export':
        return <Badge className="bg-blue-500">Export</Badge>;
      default:
        return <Badge variant="outline">{action}</Badge>;
    }
  };

  const columns: DataTableColumn<ActivityLog>[] = [
    {
      header: 'User',
      accessorKey: 'user_id',
      cell: (row) => row.user_id.substring(0, 8),
    },
    {
      header: 'Action',
      accessorKey: 'action',
      cell: (row) => getActionBadge(row.action),
    },
    {
      header: 'Entity Type',
      accessorKey: 'entity_type',
      cell: (row) => row.entity_type.charAt(0).toUpperCase() + row.entity_type.slice(1),
    },
    {
      header: 'Entity ID',
      accessorKey: 'entity_id',
      cell: (row) => row.entity_id ? row.entity_id.substring(0, 8) : '-',
    },
    {
      header: 'IP Address',
      accessorKey: 'ip_address',
      cell: (row) => row.ip_address || '-',
    },
    {
      header: 'Timestamp',
      accessorKey: 'created_at',
      cell: (row) => {
        if (!row.created_at) return '-';
        const date = new Date(row.created_at);
        return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
      },
    },
  ];

  // No add new button for activity logs as they are system-generated
  
  const handleRowClick = (row: ActivityLog) => {
    toast.info(`Selected activity log: ${row.action} on ${row.entity_type} (${row.id.substring(0, 8)})`);
  };

  return (
    <div>
      <PageHeader 
        title="Activity Logs" 
        subtitle="Track user activities in the system" 
      />
      
      <Card>
        <CardContent className="p-6">
          <DataTable
            data={logs}
            columns={columns}
            isLoading={isLoading}
            onRowClick={handleRowClick}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default ActivityLogsPage;
