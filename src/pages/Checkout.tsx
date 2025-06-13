import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import { 
  CreditCard, 
  DollarSign, 
  LockIcon, 
  Package, 
  ShieldCheck, 
  Truck, 
  User 
} from "lucide-react";

export default function Checkout() {
  const navigate = useNavigate();
  const { cart, cartTotal, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  if (cart.length === 0) {
    navigate("/cart");
    return null;
  }
  
  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Order placed successfully!",
        description: "Thank you for your purchase. You will receive a confirmation email shortly.",
      });
      clearCart();
      navigate("/");
      setIsSubmitting(false);
    }, 1500);
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmitOrder}>
            <div className="space-y-8">
              {/* Shipping Information */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <User className="mr-2 h-5 w-5 text-primary" />
                    <h2 className="text-xl font-semibold">Shipping Information</h2>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" required className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" required className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" required className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" type="tel" required className="mt-1" />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="address">Address</Label>
                      <Input id="address" required className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input id="city" required className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="postalCode">Postal Code</Label>
                      <Input id="postalCode" required className="mt-1" />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="country">Country</Label>
                      <Input id="country" required className="mt-1" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Shipping Method */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Truck className="mr-2 h-5 w-5 text-primary" />
                    <h2 className="text-xl font-semibold">Shipping Method</h2>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-md">
                      <div className="flex items-center">
                        <input 
                          type="radio" 
                          id="standard" 
                          name="shipping" 
                          className="mr-3" 
                          defaultChecked 
                        />
                        <div>
                          <Label htmlFor="standard" className="font-medium">Standard Shipping</Label>
                          <p className="text-sm text-gray-500">Delivery in 5-7 business days</p>
                        </div>
                      </div>
                      <span className="font-medium">Free</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 border rounded-md">
                      <div className="flex items-center">
                        <input 
                          type="radio" 
                          id="express" 
                          name="shipping" 
                          className="mr-3" 
                        />
                        <div>
                          <Label htmlFor="express" className="font-medium">Express Shipping</Label>
                          <p className="text-sm text-gray-500">Delivery in 2-3 business days</p>
                        </div>
                      </div>
                      <span className="font-medium">$12.99</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Payment Information */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <CreditCard className="mr-2 h-5 w-5 text-primary" />
                    <h2 className="text-xl font-semibold">Payment Method</h2>
                  </div>
                  
                  <Tabs defaultValue="card" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 mb-6">
                      <TabsTrigger value="card">Credit Card</TabsTrigger>
                      <TabsTrigger value="paypal">PayPal</TabsTrigger>
                    </TabsList>
                    <TabsContent value="card">
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="cardName">Name on Card</Label>
                          <Input id="cardName" required className="mt-1" />
                        </div>
                        <div>
                          <Label htmlFor="cardNumber">Card Number</Label>
                          <Input id="cardNumber" required className="mt-1" placeholder="1234 5678 9012 3456" />
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                          <div>
                            <Label htmlFor="expiration">Expiration Date</Label>
                            <Input id="expiration" required className="mt-1" placeholder="MM/YY" />
                          </div>
                          <div>
                            <Label htmlFor="cvv">CVV</Label>
                            <Input id="cvv" required className="mt-1" placeholder="123" />
                          </div>
                        </div>
                        <div className="flex items-center text-sm text-gray-500 mt-4">
                          <LockIcon className="h-4 w-4 mr-2" />
                          Your payment information is secure and encrypted
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="paypal">
                      <div className="text-center py-8">
                        <p className="mb-4">You will be redirected to PayPal to complete your payment.</p>
                        <Button type="button" className="w-full md:w-auto">
                          <DollarSign className="mr-2 h-4 w-4" />
                          Pay with PayPal
                        </Button>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
              
              <div className="lg:hidden">
                <OrderSummary cart={cart} cartTotal={cartTotal} />
              </div>
              
              <Button type="submit" className="w-full lg:w-auto" disabled={isSubmitting}>
                {isSubmitting ? "Processing..." : "Place Order"}
              </Button>
            </div>
          </form>
        </div>
        
        <div className="hidden lg:block">
          <div className="sticky top-20">
            <OrderSummary cart={cart} cartTotal={cartTotal} />
          </div>
        </div>
      </div>
    </div>
  );
}

function OrderSummary({ cart, cartTotal }: { cart: any[], cartTotal: number }) {
  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        
        <div className="space-y-4 mb-6">
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-md overflow-hidden mr-3">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <p className="font-medium truncate max-w-[200px]">{item.title}</p>
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                </div>
              </div>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>
        
        <Separator className="my-4" />
        
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Subtotal</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Shipping</span>
            <span>Free</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Tax</span>
            <span>${(cartTotal * 0.1).toFixed(2)}</span>
          </div>
          <Separator />
          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>
            <span>${(cartTotal + (cartTotal * 0.1)).toFixed(2)}</span>
          </div>
        </div>
        
        <div className="mt-6 flex items-center justify-center space-x-2 text-sm text-gray-500">
          <ShieldCheck className="h-4 w-4" />
          <span>Secure Checkout</span>
          <Package className="h-4 w-4 ml-2" />
          <span>Free Returns</span>
        </div>
      </CardContent>
    </Card>
  );
}