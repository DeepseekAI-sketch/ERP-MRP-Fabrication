
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import PageHeader from '@/components/PageHeader';
import { DataTable, DataTableColumn } from '@/components/ui/data-table';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface SecurityLog {
  id: string;
  event_type: string;
  user_id: string | null;
  ip_address: string | null;
  user_agent: string | null;
  created_at: string | null;
}

const SecurityLogsPage = () => {
  const [logs, setLogs] = useState<SecurityLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('security_logs')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) {
          throw error;
        }
        
        setLogs(data || []);
      } catch (error: any) {
        toast.error('Failed to load security logs: ' + error.message);
        console.error('Error fetching security logs:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLogs();
  }, []);

  const getEventTypeBadge = (eventType: string) => {
    switch (eventType.toLowerCase()) {
      case 'login':
      case 'login_success':
        return <Badge className="bg-green-500">Login Success</Badge>;
      case 'login_failed':
        return <Badge variant="destructive">Login Failed</Badge>;
      case 'logout':
        return <Badge variant="secondary">Logout</Badge>;
      case 'password_reset':
        return <Badge variant="outline">Password Reset</Badge>;
      case 'account_locked':
        return <Badge variant="destructive">Account Locked</Badge>;
      case 'permission_change':
        return <Badge>Permission Change</Badge>;
      default:
        return <Badge variant="outline">{eventType}</Badge>;
    }
  };

  const columns: DataTableColumn<SecurityLog>[] = [
    {
      header: 'Event Type',
      accessorKey: 'event_type',
      cell: (row) => getEventTypeBadge(row.event_type),
    },
    {
      header: 'User ID',
      accessorKey: 'user_id',
      cell: (row) => row.user_id ? row.user_id.substring(0, 8) : '-',
    },
    {
      header: 'IP Address',
      accessorKey: 'ip_address',
      cell: (row) => row.ip_address || '-',
    },
    {
      header: 'User Agent',
      accessorKey: 'user_agent',
      cell: (row) => {
        if (!row.user_agent) return '-';
        return row.user_agent.length > 30 
          ? `${row.user_agent.substring(0, 30)}...` 
          : row.user_agent;
      },
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

  // No add new button for security logs as they are system-generated
  
  const handleRowClick = (row: SecurityLog) => {
    toast.info(`Selected security log: ${row.event_type} (${row.id.substring(0, 8)})`);
  };

  return (
    <div>
      <PageHeader 
        title="Security Logs" 
        subtitle="Track security-related system events" 
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

export default SecurityLogsPage;
