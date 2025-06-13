import React from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

export default function Shop() {
  const { toast } = useToast();
  
  const products: Product[] = [
    {
      id: 1,
      name: "Premium Notebook",
      description: "High-quality notebook with 200 pages of premium paper",
      price: 24.99,
      image: "https://images.unsplash.com/photo-1531346680769-a1d79b57de5c?q=80&w=500&auto=format&fit=crop"
    },
    {
      id: 2,
      name: "Mechanical Keyboard",
      description: "Ergonomic mechanical keyboard with customizable RGB lighting",
      price: 129.99,
      image: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?q=80&w=500&auto=format&fit=crop"
    },
    {
      id: 3,
      name: "Wireless Headphones",
      description: "Noise-cancelling wireless headphones with 30-hour battery life",
      price: 199.99,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=500&auto=format&fit=crop"
    },
    {
      id: 4,
      name: "Smart Watch",
      description: "Fitness tracking smartwatch with heart rate monitor",
      price: 249.99,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=500&auto=format&fit=crop"
    },
    {
      id: 5,
      name: "Portable Charger",
      description: "20,000mAh portable power bank with fast charging",
      price: 49.99,
      image: "https://images.unsplash.com/photo-1583863788301-5401713c3207?q=80&w=500&auto=format&fit=crop"
    },
    {
      id: 6,
      name: "Wireless Mouse",
      description: "Ergonomic wireless mouse with adjustable DPI",
      price: 34.99,
      image: "https://images.unsplash.com/photo-1605773527852-c546a8584ea3?q=80&w=500&auto=format&fit=crop"
    }
  ];

  const addToCart = (product: Product) => {
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
      duration: 3000,
    });
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Shop</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="overflow-hidden flex flex-col h-full">
            <div className="h-48 overflow-hidden">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover transition-transform hover:scale-105"
              />
            </div>
            <CardHeader>
              <CardTitle>{product.name}</CardTitle>
              <CardDescription>${product.price.toFixed(2)}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p>{product.description}</p>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={() => addToCart(product)} 
                className="w-full"
              >
                <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}