import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-muted/40 border-t">
      <div className="container px-4 py-10 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">ShopHub</h3>
            <p className="text-muted-foreground">
              Your one-stop shop for quality products at affordable prices.
            </p>
            <div className="flex space-x-4 mt-4">
              <Link to="#" className="text-muted-foreground hover:text-primary">
                <Facebook size={20} />
              </Link>
              <Link to="#" className="text-muted-foreground hover:text-primary">
                <Instagram size={20} />
              </Link>
              <Link to="#" className="text-muted-foreground hover:text-primary">
                <Twitter size={20} />
              </Link>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">Shop</h3>
            <ul className="space-y-2">
              <li><Link to="/products" className="text-muted-foreground hover:text-primary">All Products</Link></li>
              <li><Link to="/categories" className="text-muted-foreground hover:text-primary">Categories</Link></li>
              <li><Link to="/deals" className="text-muted-foreground hover:text-primary">Deals</Link></li>
              <li><Link to="/new-arrivals" className="text-muted-foreground hover:text-primary">New Arrivals</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">About</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-muted-foreground hover:text-primary">Our Story</Link></li>
              <li><Link to="/contact" className="text-muted-foreground hover:text-primary">Contact Us</Link></li>
              <li><Link to="/careers" className="text-muted-foreground hover:text-primary">Careers</Link></li>
              <li><Link to="/privacy-policy" className="text-muted-foreground hover:text-primary">Privacy Policy</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li><Link to="/help" className="text-muted-foreground hover:text-primary">Help Center</Link></li>
              <li><Link to="/shipping" className="text-muted-foreground hover:text-primary">Shipping Information</Link></li>
              <li><Link to="/returns" className="text-muted-foreground hover:text-primary">Returns & Exchanges</Link></li>
              <li><Link to="/faq" className="text-muted-foreground hover:text-primary">FAQ</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} ShopHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}