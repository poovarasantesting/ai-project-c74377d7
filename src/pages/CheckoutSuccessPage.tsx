import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

export default function CheckoutSuccessPage() {
  const navigate = useNavigate();
  
  // Redirect to home if accessed directly
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
    }, 10000);
    
    return () => clearTimeout(timer);
  }, [navigate]);
  
  return (
    <div className="container px-4 py-16 max-w-lg mx-auto text-center">
      <div className="mb-6 flex justify-center">
        <CheckCircle className="h-16 w-16 text-green-500" />
      </div>
      <h1 className="text-3xl font-bold mb-4">Order Placed Successfully!</h1>
      <p className="text-muted-foreground mb-6">
        Thank you for your purchase. We've received your order and will process it shortly.
        You will receive a confirmation email with your order details.
      </p>
      <p className="text-muted-foreground mb-8">
        You will be redirected to the homepage in a few seconds.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link to="/">
          <Button>Return to Home</Button>
        </Link>
        <Link to="/products">
          <Button variant="outline">Continue Shopping</Button>
        </Link>
      </div>
    </div>
  );
}