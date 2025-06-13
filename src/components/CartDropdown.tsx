import { useCart } from '@/context/CartContext';
import { MinusCircle, PlusCircle, Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';

export default function CartDropdown() {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <h3 className="font-medium text-lg mb-2">Your cart is empty</h3>
        <p className="text-muted-foreground text-sm mb-4">Add some products to your cart</p>
        <Link to="/products">
          <Button>Browse Products</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <h3 className="font-bold text-lg mb-4">Your Cart</h3>
      <div className="flex-1 overflow-auto">
        {cartItems.map((item) => (
          <div key={item.product.id} className="flex items-center py-4 border-b">
            <div className="h-16 w-16 overflow-hidden rounded-md mr-4">
              <img
                src={item.product.imageUrl}
                alt={item.product.name}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h4 className="font-medium">{item.product.name}</h4>
              <p className="text-muted-foreground">${item.product.price.toFixed(2)}</p>
              <div className="flex items-center mt-2">
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-6 w-6"
                  onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                >
                  <MinusCircle className="h-4 w-4" />
                </Button>
                <span className="mx-2">{item.quantity}</span>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-6 w-6"
                  onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                >
                  <PlusCircle className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 ml-auto"
                  onClick={() => removeFromCart(item.product.id)}
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="pt-4 border-t mt-auto">
        <div className="flex justify-between mb-4">
          <span className="font-medium">Total</span>
          <span className="font-bold">${getCartTotal().toFixed(2)}</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline" onClick={clearCart}>
            Clear Cart
          </Button>
          <Link to="/checkout">
            <Button className="w-full">Checkout</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}