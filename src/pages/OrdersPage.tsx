
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import PageHeader from '@/components/PageHeader';
import { DataTable, DataTableColumn } from '@/components/ui/data-table';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Order {
  id: string;
  order_number: string;
  customer_name: string;
  total_amount: number;
  status: string;
  order_date: string | null;
  created_at: string | null;
  updated_at: string | null;
}

const OrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('orders')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) {
          throw error;
        }
        
        setOrders(data || []);
      } catch (error: any) {
        toast.error('Failed to load orders: ' + error.message);
        console.error('Error fetching orders:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { variant: "default" | "secondary" | "destructive" | "outline" }> = {
      "Pending": { variant: "outline" },
      "Processing": { variant: "secondary" },
      "Shipped": { variant: "default" },
      "Delivered": { variant: "default" },
      "Cancelled": { variant: "destructive" },
    };

    const config = statusMap[status] || { variant: "outline" };

    return <Badge variant={config.variant}>{status}</Badge>;
  };

  const columns: DataTableColumn<Order>[] = [
    {
      header: 'Order #',
      accessorKey: 'order_number',
    },
    {
      header: 'Customer',
      accessorKey: 'customer_name',
    },
    {
      header: 'Total',
      accessorKey: 'total_amount',
      cell: (row) => `$${row.total_amount.toFixed(2)}`,
    },
    {
      header: 'Status',
      accessorKey: 'status',
      cell: (row) => getStatusBadge(row.status),
    },
    {
      header: 'Order Date',
      accessorKey: 'order_date',
      cell: (row) => row.order_date ? new Date(row.order_date).toLocaleDateString() : '-',
    }
  ];

  const handleAddNew = () => {
    toast.info('Add new order feature coming soon');
    // Implementation for creating new order
  };

  const handleRowClick = (row: Order) => {
    toast.info(`Selected order: ${row.order_number}`);
    // Navigate to order detail page or open detail modal
  };

  return (
    <div>
      <PageHeader 
        title="Orders" 
        subtitle="Manage customer orders" 
        onAddNew={handleAddNew}
      />
      
      <Card>
        <CardContent className="p-6">
          <DataTable
            data={orders}
            columns={columns}
            isLoading={isLoading}
            onRowClick={handleRowClick}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default OrdersPage;
