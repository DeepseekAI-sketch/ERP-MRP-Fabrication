
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import PageHeader from '@/components/PageHeader';
import { DataTable, DataTableColumn } from '@/components/ui/data-table';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface PurchaseOrder {
  id: string;
  supplier_id: string;
  order_date: string | null;
  status: string;
  expected_delivery: string | null;
  total_amount: number | null;
  created_at: string | null;
  updated_at: string | null;
  supplier_name?: string; // For join data
}

const PurchaseOrdersPage = () => {
  const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrder[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPurchaseOrders = async () => {
      try {
        setIsLoading(true);
        // Fetch purchase orders with supplier information
        const { data, error } = await supabase
          .from('purchase_orders')
          .select('*, suppliers(name)')
          .order('created_at', { ascending: false });
        
        if (error) {
          throw error;
        }
        
        // Transform the data to include supplier_name
        const formattedData = data?.map(po => ({
          ...po,
          supplier_name: po.suppliers ? po.suppliers.name : 'Unknown Supplier'
        })) || [];
        
        setPurchaseOrders(formattedData);
      } catch (error: any) {
        toast.error('Failed to load purchase orders: ' + error.message);
        console.error('Error fetching purchase orders:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPurchaseOrders();
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'draft':
        return <Badge variant="outline">Draft</Badge>;
      case 'pending':
        return <Badge variant="secondary">Pending</Badge>;
      case 'approved':
        return <Badge>Approved</Badge>;
      case 'received':
        return <Badge className="bg-green-500">Received</Badge>;
      case 'cancelled':
        return <Badge variant="destructive">Cancelled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const columns: DataTableColumn<PurchaseOrder>[] = [
    {
      header: 'ID',
      accessorKey: 'id',
      cell: (row) => row.id.substring(0, 8),
    },
    {
      header: 'Supplier',
      accessorKey: 'supplier_name',
      cell: (row) => row.supplier_name || 'Unknown',
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
    },
    {
      header: 'Expected Delivery',
      accessorKey: 'expected_delivery',
      cell: (row) => row.expected_delivery ? new Date(row.expected_delivery).toLocaleDateString() : '-',
    },
    {
      header: 'Total Amount',
      accessorKey: 'total_amount',
      cell: (row) => row.total_amount ? `$${row.total_amount.toFixed(2)}` : '-',
    },
  ];

  const handleAddNew = () => {
    toast.info('Add new purchase order feature coming soon');
  };

  const handleRowClick = (row: PurchaseOrder) => {
    toast.info(`Selected purchase order: ${row.id.substring(0, 8)}`);
  };

  return (
    <div>
      <PageHeader 
        title="Purchase Orders" 
        subtitle="Manage orders to suppliers" 
        onAddNew={handleAddNew}
      />
      
      <Card>
        <CardContent className="p-6">
          <DataTable
            data={purchaseOrders}
            columns={columns}
            isLoading={isLoading}
            onRowClick={handleRowClick}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default PurchaseOrdersPage;
