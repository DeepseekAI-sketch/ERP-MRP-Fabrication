
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import PageHeader from '@/components/PageHeader';
import { DataTable, DataTableColumn } from '@/components/ui/data-table';
import { Card, CardContent } from '@/components/ui/card';

interface InventoryCategory {
  id: string;
  name: string;
  description: string | null;
  created_at: string | null;
}

const InventoryCategoriesPage = () => {
  const [categories, setCategories] = useState<InventoryCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('inventory_categories')
          .select('*')
          .order('name', { ascending: true });
        
        if (error) {
          throw error;
        }
        
        setCategories(data || []);
      } catch (error: any) {
        toast.error('Failed to load inventory categories: ' + error.message);
        console.error('Error fetching inventory categories:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const columns: DataTableColumn<InventoryCategory>[] = [
    {
      header: 'Name',
      accessorKey: 'name',
    },
    {
      header: 'Description',
      accessorKey: 'description',
      cell: (row) => row.description || '-',
    },
    {
      header: 'Created At',
      accessorKey: 'created_at',
      cell: (row) => row.created_at ? new Date(row.created_at).toLocaleDateString() : '-',
    }
  ];

  const handleAddNew = () => {
    toast.info('Add new category feature coming soon');
    // Implementation for adding new category
  };

  const handleRowClick = (row: InventoryCategory) => {
    toast.info(`Selected category: ${row.name}`);
    // Navigate to category detail page or open detail modal
  };

  return (
    <div>
      <PageHeader 
        title="Inventory Categories" 
        subtitle="Manage product categories" 
        onAddNew={handleAddNew}
      />
      
      <Card>
        <CardContent className="p-6">
          <DataTable
            data={categories}
            columns={columns}
            isLoading={isLoading}
            onRowClick={handleRowClick}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default InventoryCategoriesPage;
