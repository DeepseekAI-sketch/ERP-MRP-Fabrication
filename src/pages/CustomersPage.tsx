
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import PageHeader from '@/components/PageHeader';
import { DataTable, DataTableColumn } from '@/components/ui/data-table';
import { Card, CardContent } from '@/components/ui/card';

interface Customer {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  address: string | null;
  created_at: string | null;
}

const CustomersPage = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('customers')
          .select('*')
          .order('name', { ascending: true });
        
        if (error) {
          throw error;
        }
        
        setCustomers(data || []);
      } catch (error: any) {
        toast.error('Failed to load customers: ' + error.message);
        console.error('Error fetching customers:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  const columns: DataTableColumn<Customer>[] = [
    {
      header: 'Name',
      accessorKey: 'name',
    },
    {
      header: 'Email',
      accessorKey: 'email',
      cell: (row) => row.email || '-',
    },
    {
      header: 'Phone',
      accessorKey: 'phone',
      cell: (row) => row.phone || '-',
    },
    {
      header: 'Address',
      accessorKey: 'address',
      cell: (row) => row.address || '-',
    }
  ];

  const handleAddNew = () => {
    toast.info('Add new customer feature coming soon');
    // Implementation for adding new customer
  };

  const handleRowClick = (row: Customer) => {
    toast.info(`Selected customer: ${row.name}`);
    // Navigate to customer detail page or open detail modal
  };

  return (
    <div>
      <PageHeader 
        title="Customers" 
        subtitle="Manage your customers" 
        onAddNew={handleAddNew}
      />
      
      <Card>
        <CardContent className="p-6">
          <DataTable
            data={customers}
            columns={columns}
            isLoading={isLoading}
            onRowClick={handleRowClick}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomersPage;
