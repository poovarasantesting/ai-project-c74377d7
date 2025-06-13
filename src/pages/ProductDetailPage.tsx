import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getProductById, getProductsByCategory, Product } from '@/data/products';
import { Button } from '@/components/ui/button';
import { ShoppingCart, ArrowLeft } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import ProductCard from '@/components/ProductCard';

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  
  useEffect(() => {
    if (id) {
      const productId = parseInt(id, 10);
      const foundProduct = getProductById(productId);
      
      if (foundProduct) {
        setProduct(foundProduct);
        
        // Find related products from the same category
        const related = getProductsByCategory(foundProduct.category)
          .filter(p => p.id !== foundProduct.id)
          .slice(0, 4);
        setRelatedProducts(related);
      }
    }
  }, [id]);
  
  if (!product) {
    return (
      <div className="container px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <p className="mb-6">The product you're looking for doesn't exist or has been removed.</p>
        <Button onClick={() => navigate('/products')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Products
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
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {/* Product Image */}
        <div className="overflow-hidden rounded-lg border">
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Product Info */}
        <div>
          <div className="mb-6">
            <Link to={`/categories/${product.category}`} className="text-sm text-primary hover:underline">
              {product.category}
            </Link>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-2xl font-bold">${product.price.toFixed(2)}</span>
            </div>
          </div>
          
          <div className="mb-8">
            <h2 className="font-semibold mb-2">Description</h2>
            <p className="text-muted-foreground">{product.description}</p>
          </div>
          
          <Button 
            onClick={() => addToCart(product)} 
            size="lg" 
            className="w-full md:w-auto"
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
          </Button>
        </div>
      </div>
      
      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-6">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedProducts.map(relatedProduct => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}