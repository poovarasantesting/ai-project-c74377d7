import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/10 to-primary/5 py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Shop With Confidence</h1>
              <p className="text-lg text-gray-700 mb-8">
                Discover our curated collection of quality products at amazing prices.
                Fast shipping, easy returns, and exceptional customer service.
              </p>
              <div className="flex space-x-4">
                <Button asChild size="lg">
                  <Link to="/products">
                    Shop Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=2070&auto=format&fit=crop" 
                alt="Shopping" 
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">Shop by Category</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "Electronics", image: "https://images.unsplash.com/photo-1526406915894-7bcd65f60845?q=80&w=400&auto=format&fit=crop" },
              { name: "Jewelry", image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=400&auto=format&fit=crop" },
              { name: "Men's Clothing", image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=400&auto=format&fit=crop" },
              { name: "Women's Clothing", image: "https://images.unsplash.com/photo-1590548784585-643d2b9f2925?q=80&w=400&auto=format&fit=crop" }
            ].map((category, index) => (
              <Link to="/products" key={index} className="group">
                <div className="relative overflow-hidden rounded-lg">
                  <img 
                    src={category.image}
                    alt={category.name}
                    className="w-full h-64 object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <h3 className="text-white text-xl font-semibold">{category.name}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Fast Delivery", description: "Get your products delivered to your doorstep quickly and efficiently." },
              { title: "Secure Payments", description: "Shop with confidence knowing your payment information is always secure." },
              { title: "Quality Products", description: "We carefully select all our products to ensure the highest quality." }
            ].map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}