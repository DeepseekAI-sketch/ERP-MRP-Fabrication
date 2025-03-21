
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import PageHeader from '@/components/PageHeader';
import { DataTable, DataTableColumn } from '@/components/ui/data-table';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { StarIcon } from 'lucide-react';

interface Review {
  id: string;
  product_id: string;
  customer_id: string;
  title: string | null;
  content: string;
  rating: number;
  sentiment: string | null;
  is_reported: boolean | null;
  admin_response: string | null;
  created_at: string | null;
  product_name?: string; // For join data
  customer_name?: string; // For join data
}

const ReviewsPage = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setIsLoading(true);
        // Since we don't have direct access to product names from the reviews table,
        // we'll just get the raw data for now
        const { data, error } = await supabase
          .from('reviews')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) {
          throw error;
        }
        
        // In a real implementation, you would join with products and customers tables
        // to get the names
        const reviewsWithNames = data?.map(review => ({
          ...review,
          product_name: `Product ID: ${review.product_id.substring(0, 8)}`,
          customer_name: `Customer ID: ${review.customer_id.substring(0, 8)}`
        })) || [];
        
        setReviews(reviewsWithNames);
      } catch (error: any) {
        toast.error('Failed to load reviews: ' + error.message);
        console.error('Error fetching reviews:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const renderStars = (rating: number) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <StarIcon 
            key={i} 
            className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
          />
        ))}
      </div>
    );
  };

  const getSentimentBadge = (sentiment: string | null) => {
    if (!sentiment) return null;
    
    switch (sentiment.toLowerCase()) {
      case 'positive':
        return <Badge className="bg-green-500">Positive</Badge>;
      case 'neutral':
        return <Badge variant="secondary">Neutral</Badge>;
      case 'negative':
        return <Badge variant="destructive">Negative</Badge>;
      default:
        return <Badge variant="outline">{sentiment}</Badge>;
    }
  };

  const columns: DataTableColumn<Review>[] = [
    {
      header: 'Product',
      accessorKey: 'product_name',
    },
    {
      header: 'Customer',
      accessorKey: 'customer_name',
    },
    {
      header: 'Title',
      accessorKey: 'title',
      cell: (row) => row.title || 'No Title',
    },
    {
      header: 'Rating',
      accessorKey: 'rating',
      cell: (row) => renderStars(row.rating),
    },
    {
      header: 'Sentiment',
      accessorKey: 'sentiment',
      cell: (row) => getSentimentBadge(row.sentiment),
    },
    {
      header: 'Reported',
      accessorKey: 'is_reported',
      cell: (row) => row.is_reported ? <Badge variant="destructive">Reported</Badge> : null,
    },
    {
      header: 'Date',
      accessorKey: 'created_at',
      cell: (row) => row.created_at ? new Date(row.created_at).toLocaleDateString() : '-',
    },
  ];

  const handleAddNew = () => {
    toast.info('Add new review feature coming soon');
  };

  const handleRowClick = (row: Review) => {
    toast.info(`Selected review: ${row.title || 'No Title'}`);
  };

  return (
    <div>
      <PageHeader 
        title="Product Reviews" 
        subtitle="Manage customer product reviews" 
        onAddNew={handleAddNew}
      />
      
      <Card>
        <CardContent className="p-6">
          <DataTable
            data={reviews}
            columns={columns}
            isLoading={isLoading}
            onRowClick={handleRowClick}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default ReviewsPage;
