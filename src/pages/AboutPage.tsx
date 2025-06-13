import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export default function AboutPage() {
  return (
    <div className="container px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">About ShopHub</h1>
        
        <div className="mb-12">
          <img 
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1000&auto=format&fit=crop" 
            alt="About ShopHub" 
            className="w-full h-auto rounded-lg mb-6 object-cover"
          />
          
          <h2 className="text-2xl font-bold mb-4">Our Story</h2>
          <p className="text-muted-foreground mb-4">
            Founded in 2023, ShopHub began with a simple mission: to provide high-quality products at affordable prices while delivering an exceptional shopping experience. What started as a small online store has grown into a beloved marketplace trusted by thousands of customers worldwide.
          </p>
          <p className="text-muted-foreground mb-4">
            Our team is passionate about curating a selection of products that combine functionality, style, and durability. We work directly with manufacturers and artisans to bring you exclusive items you won't find anywhere else.
          </p>
        </div>
        
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-muted/30 p-6 rounded-lg">
              <h3 className="font-bold text-lg mb-2">Quality</h3>
              <p className="text-muted-foreground">
                We stand behind every product we sell, ensuring it meets our strict standards for quality and durability.
              </p>
            </div>
            <div className="bg-muted/30 p-6 rounded-lg">
              <h3 className="font-bold text-lg mb-2">Sustainability</h3>
              <p className="text-muted-foreground">
                We're committed to reducing our environmental impact through eco-friendly packaging and sustainable sourcing.
              </p>
            </div>
            <div className="bg-muted/30 p-6 rounded-lg">
              <h3 className="font-bold text-lg mb-2">Community</h3>
              <p className="text-muted-foreground">
                We believe in giving back and support various charities and community initiatives.
              </p>
            </div>
          </div>
        </div>
        
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Meet Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="aspect-square overflow-hidden rounded-full mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop" 
                  alt="Team Member" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-bold">John Smith</h3>
              <p className="text-muted-foreground">Founder & CEO</p>
            </div>
            <div className="text-center">
              <div className="aspect-square overflow-hidden rounded-full mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=300&auto=format&fit=crop" 
                  alt="Team Member" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-bold">Sarah Johnson</h3>
              <p className="text-muted-foreground">Head of Design</p>
            </div>
            <div className="text-center">
              <div className="aspect-square overflow-hidden rounded-full mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop" 
                  alt="Team Member" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-bold">David Kim</h3>
              <p className="text-muted-foreground">Product Manager</p>
            </div>
            <div className="text-center">
              <div className="aspect-square overflow-hidden rounded-full mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=300&auto=format&fit=crop" 
                  alt="Team Member" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-bold">Emily Chen</h3>
              <p className="text-muted-foreground">Customer Success</p>
            </div>
          </div>
        </div>
        
        <div className="bg-muted/30 p-8 rounded-lg text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to start shopping?</h2>
          <p className="text-muted-foreground mb-6">
            Browse our collection of high-quality products and find something you'll love.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/products">
              <Button size="lg">Shop Now</Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" size="lg">Contact Us</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}