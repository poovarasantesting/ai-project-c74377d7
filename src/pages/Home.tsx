import React from "react";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="flex flex-col md:flex-row gap-8 items-center">
        <div className="md:w-1/2">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to our Online Store</h1>
          <p className="text-lg mb-6">
            Discover our premium collection of products with amazing quality and affordable prices.
          </p>
          <Link to="/shop">
            <Button size="lg" className="group">
              <ShoppingBag className="mr-2 h-5 w-5 group-hover:animate-bounce" />
              Shop Now
            </Button>
          </Link>
        </div>
        <div className="md:w-1/2">
          <img 
            src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=1000&auto=format&fit=crop" 
            alt="Online Shopping" 
            className="rounded-lg shadow-lg w-full object-cover h-[400px]"
          />
        </div>
      </div>
      
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6 text-center">Featured Categories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {['Electronics', 'Accessories', 'Lifestyle'].map((category) => (
            <Link to="/shop" key={category} className="block">
              <div className="bg-gray-100 rounded-lg p-6 text-center transition-all hover:shadow-md hover:-translate-y-1">
                <h3 className="text-xl font-semibold">{category}</h3>
                <p className="mt-2">Explore our {category.toLowerCase()} collection</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}