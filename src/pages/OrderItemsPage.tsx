
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import PageHeader from '@/components/PageHeader';
import { DataTable, DataTableColumn } from '@/components/ui/data-table';
import { Card, CardContent } from '@/components/ui/card';

interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  price: number;
  created_at: string | null;
  product_name?: string;
  order_number?: string;
}

const OrderItemsPage = () => {
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrderItems = async () => {
      try {
        setIsLoading(true);
        // In a real implementation, we'd join with orders and inventory tables
        // to get the names, but for now we'll get the raw data
        const { data, error } = await supabase
          .from('order_items')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) {
          throw error;
        }

        // Since we don't have a proper join, we'll add mock names for demonstration
        // In a production app, you would use proper joins or separate queries
        const enhancedData = await Promise.all(data.map(async (item) => {
          // Fetch order number
          const { data: orderData } = await supabase
            .from('orders')
            .select('order_number')
            .eq('id', item.order_id)
            .single();
            
          // Fetch product name
          const { data: productData } = await supabase
            .from('inventory')
            .select('name')
            .eq('id', item.product_id)
            .single();
            
          return {
            ...item,
            order_number: orderData?.order_number || `Order ${item.order_id.substring(0, 4)}`,
            product_name: productData?.name || `Product ${item.product_id.substring(0, 4)}`
          };
        }));
        
        setOrderItems(enhancedData || []);
      } catch (error: any) {
        toast.error('Failed to load order items: ' + error.message);
        console.error('Error fetching order items:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrderItems();
  }, []);

  const columns: DataTableColumn<OrderItem>[] = [
    {
      header: 'Order',
      accessorKey: 'order_number',
    },
    {
      header: 'Product',
      accessorKey: 'product_name',
    },
    {
      header: 'Quantity',
      accessorKey: 'quantity',
    },
    {
      header: 'Price',
      accessorKey: 'price',
      cell: (row) => `$${row.price.toFixed(2)}`,
    },
    {
      header: 'Total',
      accessorKey: (row) => row.price * row.quantity,
      cell: (row) => `$${(row.price * row.quantity).toFixed(2)}`,
    },
    {
      header: 'Created',
      accessorKey: 'created_at',
      cell: (row) => row.created_at ? new Date(row.created_at).toLocaleDateString() : '-',
    },
  ];

  const handleAddNew = () => {
    toast.info('Add new order item feature coming soon');
  };

  const handleRowClick = (row: OrderItem) => {
    toast.info(`Selected order item: ${row.product_name} from ${row.order_number}`);
  };

  return (
    <div>
      <PageHeader 
        title="Order Items" 
        subtitle="View detailed order line items" 
        onAddNew={handleAddNew}
      />
      
      <Card>
        <CardContent className="p-6">
          <DataTable
            data={orderItems}
            columns={columns}
            isLoading={isLoading}
            onRowClick={handleRowClick}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderItemsPage;
