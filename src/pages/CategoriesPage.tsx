import { Link } from 'react-router-dom';
import { getCategories, getProductsByCategory } from '@/data/products';
import CategoryCard from '@/components/CategoryCard';

export default function CategoriesPage() {
  const categories = getCategories();
  
  // Get first product image from each category as the category image
  const categoryData = categories.map(category => {
    const productsInCategory = getProductsByCategory(category);
    const imageUrl = productsInCategory.length > 0 ? productsInCategory[0].imageUrl : '';
    
    return {
      category,
      productCount: productsInCategory.length,
      imageUrl
    };
  });
  
  return (
    <div className="container px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Shop by Category</h1>
      <p className="text-muted-foreground mb-8">Browse our products by category</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categoryData.map(({ category, productCount, imageUrl }) => (
          <CategoryCard 
            key={category}
            category={category}
            productCount={productCount}
            imageUrl={imageUrl}
          />
        ))}
      </div>
    </div>
  );
}