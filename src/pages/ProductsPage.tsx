import { useState } from 'react';
import { products, getCategories } from '@/data/products';
import ProductGrid from '@/components/ProductGrid';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const categories = getCategories();
  
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
    
    return matchesSearch && matchesCategory;
  });
  
  return (
    <div className="container px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">All Products</h1>
      <p className="text-muted-foreground mb-8">Browse our collection of high-quality products</p>
      
      {/* Search and Filter Section */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex h-10 w-full rounded-md border border-input bg-background pl-10 pr-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>
        
        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedCategory === null ? "default" : "outline"}
            onClick={() => setSelectedCategory(null)}
            className="text-sm"
          >
            All
          </Button>
          {categories.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className="text-sm"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>
      
      {/* Results */}
      <div>
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl font-medium mb-2">No products found</p>
            <p className="text-muted-foreground mb-4">Try adjusting your search or filter criteria</p>
            <Button onClick={() => {
              setSearchTerm('');
              setSelectedCategory(null);
            }}>
              Reset Filters
            </Button>
          </div>
        ) : (
          <>
            <p className="text-muted-foreground mb-6">Showing {filteredProducts.length} products</p>
            <ProductGrid products={filteredProducts} />
          </>
        )}
      </div>
    </div>
  );
}