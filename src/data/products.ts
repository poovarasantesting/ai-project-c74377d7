export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Wireless Bluetooth Headphones",
    description: "Premium noise-cancelling headphones with 30-hour battery life and crystal-clear sound quality.",
    price: 199.99,
    imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop",
    category: "Electronics"
  },
  {
    id: 2,
    name: "Minimalist Desk Lamp",
    description: "Modern LED desk lamp with adjustable brightness and color temperature. Perfect for your home office.",
    price: 79.99,
    imageUrl: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=1000&auto=format&fit=crop",
    category: "Home"
  },
  {
    id: 3,
    name: "Smart Fitness Watch",
    description: "Track your workouts, heart rate, sleep, and more with this waterproof fitness tracker.",
    price: 149.99,
    imageUrl: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=1000&auto=format&fit=crop",
    category: "Fitness"
  },
  {
    id: 4,
    name: "Organic Cotton T-Shirt",
    description: "Ultra-soft, sustainably made cotton t-shirt available in multiple colors.",
    price: 29.99,
    imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1000&auto=format&fit=crop",
    category: "Clothing"
  },
  {
    id: 5,
    name: "Portable Espresso Maker",
    description: "Make barista-quality espresso anywhere with this compact, hand-powered espresso machine.",
    price: 89.99,
    imageUrl: "https://images.unsplash.com/photo-1577968897966-3d4325b36b61?q=80&w=1000&auto=format&fit=crop",
    category: "Kitchen"
  },
  {
    id: 6,
    name: "Smartphone Gimbal Stabilizer",
    description: "Create smooth, professional-looking videos with this 3-axis smartphone stabilizer.",
    price: 119.99,
    imageUrl: "https://images.unsplash.com/photo-1566864222010-d45675442c31?q=80&w=1000&auto=format&fit=crop",
    category: "Electronics"
  },
  {
    id: 7,
    name: "Indoor Plant Collection",
    description: "Set of 3 easy-care indoor plants in decorative pots. Perfect for purifying air and adding life to any room.",
    price: 64.99,
    imageUrl: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?q=80&w=1000&auto=format&fit=crop",
    category: "Home"
  },
  {
    id: 8,
    name: "Handcrafted Ceramic Mug Set",
    description: "Set of 4 unique, artisan-made ceramic mugs. Microwave and dishwasher safe.",
    price: 49.99,
    imageUrl: "https://images.unsplash.com/photo-1530968033775-2c92736b131e?q=80&w=1000&auto=format&fit=crop",
    category: "Kitchen"
  }
];

export const getProductById = (id: number): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category);
};

export const getCategories = (): string[] => {
  const categories = new Set(products.map(product => product.category));
  return Array.from(categories);
};