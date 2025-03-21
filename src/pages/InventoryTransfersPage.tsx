
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import PageHeader from '@/components/PageHeader';
import { DataTable, DataTableColumn } from '@/components/ui/data-table';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface InventoryTransfer {
  id: string;
  product_id: string;
  from_warehouse_id: string;
  to_warehouse_id: string;
  quantity: number;
  status: string;
  created_at: string | null;
  updated_at: string | null;
  product_name?: string;
  from_warehouse_name?: string;
  to_warehouse_name?: string;
}

const InventoryTransfersPage = () => {
  const [transfers, setTransfers] = useState<InventoryTransfer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTransfers = async () => {
      try {
        setIsLoading(true);
        // This is a simplified query - in reality we would need to join with products and warehouses tables
        const { data: transfersData, error } = await supabase
          .from('inventory_transfers')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) {
          throw error;
        }
        
        // For this example, we're adding mock names since we can't join in this simple query
        // In reality, we would join with other tables to get the actual names
        const enhancedData = transfersData.map(transfer => ({
          ...transfer,
          product_name: `Product ${transfer.product_id.substring(0, 4)}`,
          from_warehouse_name: `Warehouse ${transfer.from_warehouse_id.substring(0, 4)}`,
          to_warehouse_name: `Warehouse ${transfer.to_warehouse_id.substring(0, 4)}`
        }));
        
        setTransfers(enhancedData || []);
      } catch (error: any) {
        toast.error('Failed to load transfers: ' + error.message);
        console.error('Error fetching transfers:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransfers();
  }, []);

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { variant: "default" | "secondary" | "destructive" | "outline" }> = {
      "Pending": { variant: "outline" },
      "In Transit": { variant: "secondary" },
      "Completed": { variant: "default" },
      "Cancelled": { variant: "destructive" },
    };

    const config = statusMap[status] || { variant: "outline" };

    return <Badge variant={config.variant}>{status}</Badge>;
  };

  const columns: DataTableColumn<InventoryTransfer>[] = [
    {
      header: 'Product',
      accessorKey: 'product_name',
    },
    {
      header: 'From',
      accessorKey: 'from_warehouse_name',
    },
    {
      header: 'To',
      accessorKey: 'to_warehouse_name',
    },
    {
      header: 'Quantity',
      accessorKey: 'quantity',
    },
    {
      header: 'Status',
      accessorKey: 'status',
      cell: (row) => getStatusBadge(row.status),
    },
    {
      header: 'Created',
      accessorKey: 'created_at',
      cell: (row) => row.created_at ? new Date(row.created_at).toLocaleDateString() : '-',
    }
  ];

  const handleAddNew = () => {
    toast.info('Add new transfer feature coming soon');
    // Implementation for creating new transfer
  };

  const handleRowClick = (row: InventoryTransfer) => {
    toast.info(`Selected transfer ID: ${row.id.substring(0, 8)}`);
    // Navigate to transfer detail page or open detail modal
  };

  return (
    <div>
      <PageHeader 
        title="Inventory Transfers" 
        subtitle="Manage inventory movements between warehouses" 
        onAddNew={handleAddNew}
      />
      
      <Card>
        <CardContent className="p-6">
          <DataTable
            data={transfers}
            columns={columns}
            isLoading={isLoading}
            onRowClick={handleRowClick}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default InventoryTransfersPage;
