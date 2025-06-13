import { Link } from 'react-router-dom';

interface CategoryCardProps {
  category: string;
  productCount: number;
  imageUrl: string;
}

export default function CategoryCard({ category, productCount, imageUrl }: CategoryCardProps) {
  return (
    <Link to={`/categories/${category}`} className="group block">
      <div className="relative overflow-hidden rounded-lg">
        <div className="aspect-video overflow-hidden">
          <img 
            src={imageUrl} 
            alt={category} 
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent">
          <div className="absolute bottom-0 left-0 p-4 text-white">
            <h3 className="text-xl font-bold">{category}</h3>
            <p className="text-sm opacity-80">{productCount} products</p>
          </div>
        </div>
      </div>
    </Link>
  );
}