
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import PageHeader from '@/components/PageHeader';
import { DataTable, DataTableColumn } from '@/components/ui/data-table';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface InventoryItem {
  id: string;
  name: string;
  sku: string | null;
  category: string | null;
  quantity: number;
  price: number;
  supplier: string | null;
  created_at: string | null;
  updated_at: string | null;
  last_supply: string | null;
  min_quantity: number | null;
}

const InventoryPage = () => {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('inventory')
          .select('*')
          .order('name', { ascending: true });
        
        if (error) {
          throw error;
        }
        
        setInventory(data || []);
      } catch (error: any) {
        toast.error('Failed to load inventory: ' + error.message);
        console.error('Error fetching inventory:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInventory();
  }, []);

  const getStockStatus = (item: InventoryItem) => {
    const minQuantity = item.min_quantity || 20;
    
    if (item.quantity <= 0) {
      return <Badge variant="destructive">Out of Stock</Badge>;
    } else if (item.quantity < minQuantity) {
      return <Badge variant="outline" className="text-orange-500 border-orange-500">Low Stock</Badge>;
    } else {
      return <Badge variant="secondary">In Stock</Badge>;
    }
  };

  const columns: DataTableColumn<InventoryItem>[] = [
    {
      header: 'Name',
      accessorKey: 'name',
    },
    {
      header: 'SKU',
      accessorKey: 'sku',
      cell: (row) => row.sku || '-',
    },
    {
      header: 'Category',
      accessorKey: 'category',
      cell: (row) => row.category || 'Uncategorized',
    },
    {
      header: 'Quantity',
      accessorKey: 'quantity',
    },
    {
      header: 'Status',
      accessorKey: (row) => getStockStatus(row),
    },
    {
      header: 'Price',
      accessorKey: 'price',
      cell: (row) => `$${row.price.toFixed(2)}`,
    },
    {
      header: 'Supplier',
      accessorKey: 'supplier',
      cell: (row) => row.supplier || '-',
    }
  ];

  const handleAddNew = () => {
    toast.info('Add new inventory item feature coming soon');
    // Implementation for adding new inventory item
  };

  const handleRowClick = (row: InventoryItem) => {
    toast.info(`Selected item: ${row.name}`);
    // Navigate to inventory item detail page or open detail modal
  };

  return (
    <div>
      <PageHeader 
        title="Inventory" 
        subtitle="Manage your inventory items" 
        onAddNew={handleAddNew}
      />
      
      <Card>
        <CardContent className="p-6">
          <DataTable
            data={inventory}
            columns={columns}
            isLoading={isLoading}
            onRowClick={handleRowClick}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default InventoryPage;
