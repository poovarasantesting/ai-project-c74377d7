import { Product } from '@/data/products';
import { Button } from './ui/button';
import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  return (
    <div className="group relative overflow-hidden rounded-lg border bg-background transition-all hover:shadow-md">
      <Link to={`/products/${product.id}`} className="block">
        <div className="aspect-square overflow-hidden">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
          />
        </div>
        <div className="p-4">
          <h3 className="font-medium truncate">{product.name}</h3>
          <p className="text-sm text-muted-foreground mb-2">{product.category}</p>
          <p className="font-bold">${product.price.toFixed(2)}</p>
        </div>
      </Link>
      <div className="absolute bottom-4 right-4 opacity-0 transition-opacity group-hover:opacity-100">
        <Button 
          size="icon" 
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            addToCart(product);
          }}
        >
          <ShoppingCart className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}