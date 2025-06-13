import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getProductsByCategory, getCategories, Product } from '@/data/products';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import ProductGrid from '@/components/ProductGrid';

export default function CategoryDetailPage() {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [categoryExists, setCategoryExists] = useState(true);
  
  useEffect(() => {
    if (category) {
      const categories = getCategories();
      if (categories.includes(category)) {
        const categoryProducts = getProductsByCategory(category);
        setProducts(categoryProducts);
        setCategoryExists(true);
      } else {
        setCategoryExists(false);
      }
    }
  }, [category]);
  
  if (!categoryExists) {
    return (
      <div className="container px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Category Not Found</h1>
        <p className="mb-6">The category you're looking for doesn't exist.</p>
        <Button onClick={() => navigate('/categories')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Categories
        </Button>
      </div>
    );
  }
  
  return (
    <div className="container px-4 py-8">
      <div className="mb-8">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </div>
      
      <h1 className="text-3xl font-bold mb-2">{category}</h1>
      <p className="text-muted-foreground mb-8">
        {products.length} {products.length === 1 ? 'product' : 'products'} in this category
      </p>
      
      {products.length > 0 ? (
        <ProductGrid products={products} />
      ) : (
        <div className="text-center py-12">
          <p className="text-xl font-medium mb-4">No products in this category yet</p>
          <Link to="/products">
            <Button>View All Products</Button>
          </Link>
        </div>
      )}
    </div>
  );
}