
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import PageHeader from '@/components/PageHeader';
import { DataTable, DataTableColumn } from '@/components/ui/data-table';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Promotion {
  id: string;
  name: string;
  promo_code: string;
  discount_percentage: number;
  start_date: string;
  end_date: string;
  is_active: boolean | null;
  description: string | null;
  usage_count: number | null;
  usage_limit: number | null;
  applicable_products: string[] | null;
  applicable_categories: string[] | null;
  created_at: string | null;
}

const PromotionsPage = () => {
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('promotions')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) {
          throw error;
        }
        
        setPromotions(data || []);
      } catch (error: any) {
        toast.error('Failed to load promotions: ' + error.message);
        console.error('Error fetching promotions:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPromotions();
  }, []);

  const getStatusBadge = (promotion: Promotion) => {
    const now = new Date();
    const startDate = new Date(promotion.start_date);
    const endDate = new Date(promotion.end_date);
    
    if (!promotion.is_active) {
      return <Badge variant="outline">Inactive</Badge>;
    }
    
    if (now < startDate) {
      return <Badge variant="secondary">Scheduled</Badge>;
    }
    
    if (now > endDate) {
      return <Badge variant="destructive">Expired</Badge>;
    }
    
    return <Badge className="bg-green-500">Active</Badge>;
  };

  const columns: DataTableColumn<Promotion>[] = [
    {
      header: 'Name',
      accessorKey: 'name',
    },
    {
      header: 'Code',
      accessorKey: 'promo_code',
    },
    {
      header: 'Discount',
      accessorKey: 'discount_percentage',
      cell: (row) => `${row.discount_percentage}%`,
    },
    {
      header: 'Status',
      accessorKey: 'is_active',
      cell: (row) => getStatusBadge(row),
    },
    {
      header: 'Start Date',
      accessorKey: 'start_date',
      cell: (row) => new Date(row.start_date).toLocaleDateString(),
    },
    {
      header: 'End Date',
      accessorKey: 'end_date',
      cell: (row) => new Date(row.end_date).toLocaleDateString(),
    },
    {
      header: 'Usage',
      accessorKey: 'usage_count',
      cell: (row) => {
        const count = row.usage_count || 0;
        const limit = row.usage_limit;
        return limit ? `${count}/${limit}` : count.toString();
      },
    },
  ];

  const handleAddNew = () => {
    toast.info('Add new promotion feature coming soon');
  };

  const handleRowClick = (row: Promotion) => {
    toast.info(`Selected promotion: ${row.name}`);
  };

  return (
    <div>
      <PageHeader 
        title="Promotions" 
        subtitle="Manage marketing promotions and discounts" 
        onAddNew={handleAddNew}
      />
      
      <Card>
        <CardContent className="p-6">
          <DataTable
            data={promotions}
            columns={columns}
            isLoading={isLoading}
            onRowClick={handleRowClick}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default PromotionsPage;
