import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Product } from "@/types";
import { useCart } from "@/context/CartContext";
import { toast } from "@/components/ui/use-toast";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  
  const handleAddToCart = () => {
    addToCart(product);
    toast({
      title: "Added to cart",
      description: `${product.title} has been added to your cart.`,
      duration: 2000,
    });
  };
  
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <Link to={`/products/${product.id}`}>
        <div className="aspect-square overflow-hidden">
          <img
            src={product.image}
            alt={product.title}
            className="object-cover w-full h-full transition-transform hover:scale-105"
          />
        </div>
      </Link>
      <CardContent className="p-4">
        <Link to={`/products/${product.id}`}>
          <h3 className="font-medium text-lg truncate hover:text-primary transition-colors">
            {product.title}
          </h3>
        </Link>
        <p className="text-gray-500 text-sm mt-1">{product.category}</p>
        <p className="font-bold text-lg mt-2">${product.price.toFixed(2)}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full" onClick={handleAddToCart}>
          <ShoppingCart className="h-4 w-4 mr-2" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}