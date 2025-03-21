
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import PageHeader from '@/components/PageHeader';
import { DataTable, DataTableColumn } from '@/components/ui/data-table';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Profile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  role: string | null;
  created_at: string | null;
  updated_at: string | null;
}

const ProfilesPage = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .order('created_at', { ascending: true });
        
        if (error) {
          throw error;
        }
        
        setProfiles(data || []);
      } catch (error: any) {
        toast.error('Failed to load profiles: ' + error.message);
        console.error('Error fetching profiles:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  const getRoleBadge = (role: string | null) => {
    if (!role) return <Badge variant="outline">User</Badge>;
    
    switch (role.toLowerCase()) {
      case 'admin':
        return <Badge>Admin</Badge>;
      case 'manager':
        return <Badge variant="secondary">Manager</Badge>;
      case 'editor':
        return <Badge className="bg-blue-500">Editor</Badge>;
      case 'user':
        return <Badge variant="outline">User</Badge>;
      default:
        return <Badge variant="outline">{role}</Badge>;
    }
  };

  const columns: DataTableColumn<Profile>[] = [
    {
      header: 'ID',
      accessorKey: 'id',
      cell: (row) => row.id.substring(0, 8),
    },
    {
      header: 'First Name',
      accessorKey: 'first_name',
      cell: (row) => row.first_name || '-',
    },
    {
      header: 'Last Name',
      accessorKey: 'last_name',
      cell: (row) => row.last_name || '-',
    },
    {
      header: 'Full Name',
      accessorKey: (row) => {
        const firstName = row.first_name || '';
        const lastName = row.last_name || '';
        return firstName || lastName ? `${firstName} ${lastName}`.trim() : '-';
      },
    },
    {
      header: 'Role',
      accessorKey: 'role',
      cell: (row) => getRoleBadge(row.role),
    },
    {
      header: 'Created',
      accessorKey: 'created_at',
      cell: (row) => row.created_at ? new Date(row.created_at).toLocaleDateString() : '-',
    },
  ];

  const handleAddNew = () => {
    toast.info('Add new profile feature coming soon');
  };

  const handleRowClick = (row: Profile) => {
    const fullName = [row.first_name, row.last_name].filter(Boolean).join(' ') || row.id.substring(0, 8);
    toast.info(`Selected profile: ${fullName}`);
  };

  return (
    <div>
      <PageHeader 
        title="User Profiles" 
        subtitle="Manage system user accounts" 
        onAddNew={handleAddNew}
      />
      
      <Card>
        <CardContent className="p-6">
          <DataTable
            data={profiles}
            columns={columns}
            isLoading={isLoading}
            onRowClick={handleRowClick}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilesPage;
