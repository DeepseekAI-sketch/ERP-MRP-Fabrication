
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import PageHeader from '@/components/PageHeader';
import { DataTable, DataTableColumn } from '@/components/ui/data-table';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Shipment {
  id: string;
  order_id: string;
  shipping_company: string;
  tracking_number: string | null;
  status: string;
  estimated_delivery: string | null;
  actual_delivery: string | null;
  created_at: string | null;
  updated_at: string | null;
  shipping_method_id: string | null;
}

const ShipmentsPage = () => {
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchShipments = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('shipments')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) {
          throw error;
        }
        
        setShipments(data || []);
      } catch (error: any) {
        toast.error('Failed to load shipments: ' + error.message);
        console.error('Error fetching shipments:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchShipments();
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return <Badge variant="outline">Pending</Badge>;
      case 'processing':
        return <Badge variant="secondary">Processing</Badge>;
      case 'shipped':
        return <Badge>Shipped</Badge>;
      case 'delivered':
        return <Badge className="bg-green-500">Delivered</Badge>;
      case 'cancelled':
        return <Badge variant="destructive">Cancelled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const columns: DataTableColumn<Shipment>[] = [
    {
      header: 'Order ID',
      accessorKey: 'order_id',
      cell: (row) => row.order_id.substring(0, 8),
    },
    {
      header: 'Shipping Company',
      accessorKey: 'shipping_company',
    },
    {
      header: 'Tracking #',
      accessorKey: 'tracking_number',
      cell: (row) => row.tracking_number || '-',
    },
    {
      header: 'Status',
      accessorKey: 'status',
      cell: (row) => getStatusBadge(row.status),
    },
    {
      header: 'Est. Delivery',
      accessorKey: 'estimated_delivery',
      cell: (row) => row.estimated_delivery ? new Date(row.estimated_delivery).toLocaleDateString() : '-',
    },
    {
      header: 'Actual Delivery',
      accessorKey: 'actual_delivery',
      cell: (row) => row.actual_delivery ? new Date(row.actual_delivery).toLocaleDateString() : '-',
    },
    {
      header: 'Created',
      accessorKey: 'created_at',
      cell: (row) => row.created_at ? new Date(row.created_at).toLocaleDateString() : '-',
    },
  ];

  const handleAddNew = () => {
    toast.info('Add new shipment feature coming soon');
  };

  const handleRowClick = (row: Shipment) => {
    toast.info(`Selected shipment: ${row.id.substring(0, 8)}`);
  };

  return (
    <div>
      <PageHeader 
        title="Shipments" 
        subtitle="Track order shipments" 
        onAddNew={handleAddNew}
      />
      
      <Card>
        <CardContent className="p-6">
          <DataTable
            data={shipments}
            columns={columns}
            isLoading={isLoading}
            onRowClick={handleRowClick}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default ShipmentsPage;
