import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Product } from "@/types";
import { useCart } from "@/context/CartContext";
import { toast } from "@/components/ui/use-toast";

async function fetchProduct(id: string) {
  const response = await fetch(`https://fakestoreapi.com/products/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch product');
  }
  return response.json();
}

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const { data: product, isLoading, error } = useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProduct(id as string),
    enabled: !!id,
  });
  
  const handleAddToCart = () => {
    addToCart(product);
    toast({
      title: "Added to cart",
      description: `${product.title} has been added to your cart.`,
      duration: 2000,
    });
  };
  
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <Skeleton className="w-full md:w-1/2 aspect-square rounded-md" />
          <div className="w-full md:w-1/2 space-y-4">
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      </div>
    );
  }
  
  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-red-500 mb-4">Error loading product details. The product may not exist.</p>
        <Button variant="outline" onClick={() => navigate(-1)}>
          <ChevronLeft className="h-4 w-4 mr-2" />
          Go Back
        </Button>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6">
        <ChevronLeft className="h-4 w-4 mr-2" />
        Back to products
      </Button>
      
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/2">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <img 
              src={product.image} 
              alt={product.title} 
              className="w-full object-contain max-h-[400px]"
            />
          </div>
        </div>
        
        <div className="w-full md:w-1/2">
          <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
          
          <div className="flex items-center mb-4">
            <div className="flex items-center mr-2">
              {Array(5).fill(0).map((_, i) => (
                <Star key={i} 
                  className={`h-5 w-5 ${
                    i < Math.round(product.rating.rate) 
                      ? "text-yellow-400 fill-yellow-400" 
                      : "text-gray-300"
                  }`} 
                />
              ))}
            </div>
            <span className="text-sm text-gray-500">
              ({product.rating.count} reviews)
            </span>
          </div>
          
          <p className="text-2xl font-bold mb-6">${product.price.toFixed(2)}</p>
          
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-2">Description</h3>
            <p className="text-gray-700">{product.description}</p>
          </div>
          
          <div className="mb-6">
            <p className="text-sm text-gray-500 mb-2">Category: {product.category}</p>
          </div>
          
          <Button onClick={handleAddToCart} size="lg" className="w-full mb-4">
            <ShoppingCart className="mr-2 h-5 w-5" />
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}