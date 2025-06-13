import { Link } from "react-router-dom";
import { Trash2, Minus, Plus, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/context/CartContext";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();
  
  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <ShoppingBag className="mx-auto h-16 w-16 text-gray-400 mb-4" />
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <p className="text-gray-500 mb-8">Looks like you haven't added anything to your cart yet.</p>
        <Button asChild>
          <Link to="/products">Browse Products</Link>
        </Button>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="hidden md:grid grid-cols-12 gap-4 mb-4 text-sm font-medium text-gray-500">
              <div className="col-span-6">Product</div>
              <div className="col-span-2 text-center">Price</div>
              <div className="col-span-2 text-center">Quantity</div>
              <div className="col-span-2 text-center">Total</div>
            </div>
            
            <Separator className="mb-6" />
            
            {cart.map((item) => (
              <div key={item.id} className="mb-6">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                  <div className="col-span-6 flex items-center space-x-4">
                    <Link to={`/products/${item.id}`} className="shrink-0">
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="w-16 h-16 object-contain"
                      />
                    </Link>
                    <div>
                      <Link to={`/products/${item.id}`} className="font-medium hover:text-primary">
                        {item.title}
                      </Link>
                      <p className="text-sm text-gray-500 mt-1">{item.category}</p>
                    </div>
                  </div>
                  
                  <div className="col-span-2 text-center">
                    <p className="md:hidden inline-block mr-2 font-medium">Price:</p>
                    ${item.price.toFixed(2)}
                  </div>
                  
                  <div className="col-span-2">
                    <div className="flex items-center justify-center">
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="h-8 w-8" 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="mx-2 w-8 text-center">{item.quantity}</span>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="h-8 w-8" 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="col-span-2 flex items-center justify-between md:justify-center">
                    <div>
                      <p className="md:hidden inline-block mr-2 font-medium">Total:</p>
                      <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <Separator className="mt-6" />
              </div>
            ))}
          </div>
        </div>
        
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-20">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Items ({cart.length})</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span>Free</span>
              </div>
              <Separator />
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
            </div>
            
            <Button asChild className="w-full">
              <Link to="/checkout">Proceed to Checkout</Link>
            </Button>
            
            <div className="mt-4">
              <Button variant="outline" asChild className="w-full">
                <Link to="/products">Continue Shopping</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}