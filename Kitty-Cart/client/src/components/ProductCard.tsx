import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  colors?: string[];
}

interface ProductCardProps {
  product: Product;
  isSelected: boolean;
  onToggle: () => void;
  selectedColor?: string;
  onColorChange?: (color: string) => void;
  selectedSize?: string;
  onSizeChange?: (size: string) => void;
  isLocked?: boolean;
}

const SIZES = ["XS", "S", "M", "L", "XL"];

export function ProductCard({ 
  product, 
  isSelected, 
  onToggle, 
  selectedColor, 
  onColorChange,
  selectedSize,
  onSizeChange,
  isLocked 
}: ProductCardProps) {
  return (
    <motion.div 
      whileHover={!isLocked ? { y: -8 } : {}}
      className={cn(
        "relative group overflow-hidden rounded-3xl bg-white border transition-all duration-300 shadow-sm",
        isSelected 
          ? "border-gray-900" 
          : "border-gray-100 hover:border-gray-300",
        isLocked && "cursor-default"
      )}
    >
      {/* Selection Indicator */}
      <div 
        onClick={onToggle}
        className={cn(
          "absolute top-6 right-6 z-20 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300",
          isSelected ? "bg-gray-900 scale-100" : "bg-black/5 scale-90 opacity-0 group-hover:opacity-100",
          !isLocked && "cursor-pointer"
        )}
      >
        {isSelected && <Check className="w-5 h-5 text-white" strokeWidth={3} />}
      </div>

      {/* Image Container */}
      <div className={cn("aspect-[3/4] overflow-hidden relative bg-gray-50", !isLocked && "cursor-pointer")} onClick={onToggle}>
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className={cn(
          "absolute inset-0 bg-black/5 transition-opacity duration-300",
          isSelected ? "opacity-10" : "opacity-0 group-hover:opacity-5"
        )} />
      </div>

      {/* Content */}
      <div className="p-8 text-center">
        <p className="text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase mb-2 font-sans">
          {product.category}
        </p>
        <h3 className="text-xl font-bold text-gray-900 mb-2 font-display">
          {product.name}
        </h3>
        
        {/* Color Selection */}
        {product.colors && product.colors.length > 1 && (
          <div className="flex flex-wrap justify-center gap-1.5 mb-4">
            {product.colors.map(color => (
              <button
                key={color}
                onClick={() => onColorChange?.(color)}
                className={cn(
                  "px-2 py-1 text-[9px] uppercase tracking-wider rounded-full border transition-all whitespace-nowrap",
                  selectedColor === color 
                    ? "bg-gray-900 text-white border-gray-900" 
                    : "bg-white text-gray-400 border-gray-100 hover:border-gray-300"
                )}
              >
                {color}
              </button>
            ))}
          </div>
        )}

        {/* Size Selection */}
        {!isLocked && (
          <div className="mb-6">
            <p className="text-[9px] font-bold uppercase tracking-widest text-gray-300 mb-3">Taille</p>
            <div className="flex justify-center gap-2">
              {SIZES.map(size => (
                <button
                  key={size}
                  onClick={() => onSizeChange?.(size)}
                  className={cn(
                    "w-8 h-8 rounded-lg border text-[10px] font-bold transition-all",
                    selectedSize === size
                      ? "bg-gray-900 text-white border-gray-900"
                      : "bg-white text-gray-400 border-gray-100 hover:border-gray-300"
                  )}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        <p className="text-sm font-bold text-gray-500 font-sans">
          {product.price.toFixed(2)} DH
        </p>
      </div>
    </motion.div>
  );
}
