import React from 'react';
import { motion } from 'motion/react';
import { MessageCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { formatCurrency, cn } from '../lib/utils';

interface ProductCardProps {
  product: Product;
}

const availabilityConfig = {
  'in-stock': { label: 'In Stock', color: 'bg-green-500/10 text-green-600 border-green-500/20' },
  'low-stock': { label: 'Low Stock', color: 'bg-amber-500/10 text-amber-600 border-amber-500/20' },
  'out-of-stock': { label: 'Out of Stock', color: 'bg-red-500/10 text-red-600 border-red-500/20' },
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const whatsappNumber = '2348000000000'; // Replace with actual number
  const whatsappMessage = encodeURIComponent(`Hello Linos Security, I am interested in the ${product.name}.`);
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  const availability = availabilityConfig[product.availability];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col h-full"
    >
      {/* Image Container */}
      <Link to={`/product/${product.slug}`} className="relative aspect-[4/3] overflow-hidden bg-gray-50">
        <img
          src={product.image}
          alt={product.meta_title || product.name}
          referrerPolicy="no-referrer"
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          <span className="bg-primary/90 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full w-fit">
            {product.category.replace('-', ' ')}
          </span>
          <span className={cn(
            "backdrop-blur-md text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border w-fit transition-all duration-500 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0",
            availability.color
          )}>
            {availability.label}
          </span>
        </div>
      </Link>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <Link to={`/product/${product.slug}`}>
          <h3 className="text-xl font-display font-bold text-primary mb-2 group-hover:text-accent transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-gray-500 text-sm line-clamp-2 mb-4 flex-grow">
          {product.description}
        </p>

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
          <div className="flex flex-col">
            <span className="text-xs text-gray-400 uppercase tracking-wider font-bold">Starting From</span>
            <span className="text-lg font-bold text-primary">
              {formatCurrency(product.price)}
            </span>
          </div>

          <div className="flex space-x-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors shadow-lg shadow-green-500/20"
              title="Order on WhatsApp"
            >
              <MessageCircle className="w-5 h-5" />
            </a>
            <Link
              to={`/product/${product.slug}`}
              className="p-3 bg-accent text-primary rounded-xl hover:bg-accent-hover transition-colors shadow-lg shadow-accent/20"
              title="View Details"
            >
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
