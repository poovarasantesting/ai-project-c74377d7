import { Link } from 'react-router-dom';
import { ArrowRight, Truck, Clock, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductGrid from '@/components/ProductGrid';
import { products } from '@/data/products';

export default function HomePage() {
  // Get featured products (first 4 for the example)
  const featuredProducts = products.slice(0, 4);
  
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-muted/30">
        <div className="container px-4 py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                Discover Quality Products for Your Lifestyle
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Shop the latest trends and essentials with fast shipping and hassle-free returns.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/products">
                  <Button size="lg">
                    Shop Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/categories">
                  <Button variant="outline" size="lg">
                    Browse Categories
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] overflow-hidden rounded-xl">
                <img 
                  src="https://images.unsplash.com/photo-1607082349566-187342175e2f?q=80&w=1000&auto=format&fit=crop" 
                  alt="Shopping collection" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16">
        <div className="container px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">Featured Products</h2>
            <Link to="/products" className="text-primary hover:underline flex items-center">
              View All
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <ProductGrid products={featuredProducts} />
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-muted/30 py-16">
        <div className="container px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">Why Shop With Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-background rounded-lg p-6 text-center shadow-sm">
              <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Truck className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Free Shipping</h3>
              <p className="text-muted-foreground">
                Free shipping on all orders over $50
              </p>
            </div>
            <div className="bg-background rounded-lg p-6 text-center shadow-sm">
              <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
              <p className="text-muted-foreground">
                Get your orders delivered within 3-5 business days
              </p>
            </div>
            <div className="bg-background rounded-lg p-6 text-center shadow-sm">
              <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <ShieldCheck className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure Payment</h3>
              <p className="text-muted-foreground">
                Your payment information is always protected
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Subscribe to Our Newsletter
            </h2>
            <p className="text-muted-foreground mb-6">
              Get updates on new products, special offers, and seasonal discounts.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
              <Button>Subscribe</Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}