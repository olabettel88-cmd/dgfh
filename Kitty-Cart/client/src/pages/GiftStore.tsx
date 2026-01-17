import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { useCreateOrder } from "@/hooks/use-orders";
import { FloatingHearts } from "@/components/FloatingHearts";
import { CuteCat } from "@/components/CuteCat";
import { ProductCard } from "@/components/ProductCard";
import { CheckoutForm } from "@/components/CheckoutForm";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import { ShoppingBag, Star, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Static Data
const PRODUCTS = [
  {
    id: 1,
    name: "Parapluie",
    price: 0.1,
    category: "Mumuso",
    image: "/products/parapluie.png",
    colors: ["Gray", "Burgundy"],
    isGift: true
  },
  {
    id: 2,
    name: "Cardigan Boutons",
    price: 0.1,
    category: "Pull&Bear",
    image: "/products/gray-cardigan.png",
    colors: ["Gray", "Cream", "Burgundy", "Brown", "Dark Gray"]
  },
  {
    id: 3,
    name: "Pantalons Large",
    price: 0.1,
    category: "Pull&Bear",
    image: "/products/light-pants.png",
    colors: ["Light Gray", "Dark Blue"]
  },
  {
    id: 4,
    name: "Jeans Flare",
    price: 0.1,
    category: "Pull&Bear",
    image: "/products/black-jeans.png",
    colors: ["Black"]
  },
  {
    id: 5,
    name: "Pull Rayé",
    price: 0.1,
    category: "Pull&Bear",
    image: "/products/striped-sweater.png",
    colors: ["Brown/White"]
  }
];

const COLOR_MAP: Record<string, string> = {
  // Cardigans
  "Gray": "/products/gray-cardigan.png",
  "Cream": "/products/cream-cardigan.png",
  "Burgundy": "/products/burgundy-cardigan.png",
  "Brown": "/products/brown-cardigan.png",
  "Dark Gray": "/products/dark-gray-cardigan.png",
  // Pants
  "Light Gray": "/products/light-pants.png",
  "Dark Blue": "/products/dark-pants.png",
  // Jeans
  "Black": "/products/black-jeans.png",
  // Parapluie
  "Parapluie-Black": "/products/black-parapluie.png",
  "Parapluie-Burgundy": "/products/burgundy-parapluie.png",
  "Parapluie-Gray": "/products/gray-parapluie.png",
};

export default function GiftStore() {
  // State
  const [selectedProductIds, setSelectedProductIds] = useState<number[]>([1]);
  const [selectedColors, setSelectedColors] = useState<Record<number, string>>({
    1: "Gray",
    2: "Gray",
    3: "Light Gray",
    4: "Black",
    5: "Brown/White",
  });
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  
  const { mutate: createOrder, isPending } = useCreateOrder();
  const { toast } = useToast();

  const handleColorChange = (productId: number, color: string) => {
    setSelectedColors(prev => ({ ...prev, [productId]: color }));
  };

  // Handlers
  const toggleProduct = (productId: number) => {
    if (productId === 1) return; // Parapluie is locked
    setSelectedProductIds(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleCheckout = (formData: { address: string; phone: string }) => {
    const selectedItems = PRODUCTS.filter(p => selectedProductIds.includes(p.id)).map(p => {
      const colorKey = p.id === 1 ? `Parapluie-${selectedColors[p.id]}` : selectedColors[p.id];
      return {
        ...p,
        selectedColor: selectedColors[p.id],
        image: COLOR_MAP[colorKey] || p.image
      };
    });
    const totalAmount = selectedItems.reduce((sum, item) => sum + item.price, 0);

    const orderData = {
      ...formData,
      items: selectedItems,
      total: `${totalAmount.toFixed(2)} DH`
    };

    createOrder(orderData, {
      onSuccess: () => {
        setIsCheckoutOpen(false);
        setIsSuccessOpen(true);
        triggerConfetti();
      },
      onError: (error) => {
        toast({
          title: "Oups !",
          description: error.message,
          variant: "destructive",
        });
      }
    });
  };

  const triggerConfetti = () => {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999, shapes: ['circle'] };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
  };

  const calculateTotal = () => {
    return PRODUCTS
      .filter(p => selectedProductIds.includes(p.id))
      .reduce((sum, p) => sum + p.price, 0);
  };

  return (
    <div className="min-h-screen pb-24 overflow-x-hidden font-display bg-[#fafafa]">
          <FloatingHearts />
          {/* Header */}
          <header className="pt-20 pb-12 px-4 text-center relative z-10">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, type: "spring" }}
        >
          <h1 className="text-5xl md:text-7xl font-display text-gray-900 tracking-tight mb-4">
            Special Collection
          </h1>
          <div className="w-12 h-px bg-gray-300 mx-auto mb-6"></div>
          <p className="text-gray-400 max-w-md mx-auto text-sm uppercase tracking-[0.2em]">
            Curated just for you
          </p>
        </motion.div>
      </header>

      {/* Main Content */}
      <main className="container max-w-4xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          {PRODUCTS.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <ProductCard
                product={{
                  ...product,
                  image: product.id === 1 
                    ? (COLOR_MAP[`Parapluie-${selectedColors[product.id]}`] || product.image)
                    : (COLOR_MAP[selectedColors[product.id]] || product.image)
                }}
                isSelected={selectedProductIds.includes(product.id)}
                onToggle={() => toggleProduct(product.id)}
                selectedColor={selectedColors[product.id]}
                onColorChange={(color) => handleColorChange(product.id, color)}
                isLocked={product.id === 1}
              />
            </motion.div>
          ))}
        </div>
      </main>

      {/* Floating Bottom Bar */}
      <motion.div 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="fixed bottom-0 left-0 w-full p-4 z-40 pointer-events-none"
      >
        <div className="max-w-2xl mx-auto pointer-events-auto">
          <div className="glass-panel rounded-2xl p-4 flex items-center justify-between gap-3 md:gap-4">
            <div className="flex flex-col pl-2">
              <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Total</span>
              <span className="text-xl md:text-2xl font-display font-bold text-gray-900 whitespace-nowrap">
                {calculateTotal().toFixed(2)} DH
              </span>
            </div>
            
            <button
              onClick={() => setIsCheckoutOpen(true)}
              className="flex-1 max-w-[180px] md:max-w-none bg-gray-900 text-white font-bold py-2.5 md:py-3 px-4 md:px-6 rounded-xl shadow-xl hover:bg-black hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2 group text-sm md:text-base"
            >
              <ShoppingBag className="w-4 h-4 md:w-5 h-5 group-hover:animate-wiggle" />
              <span>Confirm</span>
            </button>
          </div>
        </div>
      </motion.div>

      <CuteCat />

      {/* Checkout Modal */}
      <Dialog open={isCheckoutOpen} onOpenChange={setIsCheckoutOpen}>
        <DialogContent className="w-[95%] sm:max-w-md bg-white border-gray-100 p-0 overflow-hidden max-h-[85vh] flex flex-col rounded-[2rem]">
          <div className="bg-gray-50 p-5 md:p-8 text-center border-b border-gray-100 shrink-0">
            <DialogTitle className="text-xl md:text-2xl font-display text-gray-900">Delivery Details</DialogTitle>
            <DialogDescription className="text-gray-400 mt-2 text-xs md:text-sm px-4">
              Enter your information below to complete the selection.
            </DialogDescription>
          </div>
          
          <div className="p-5 md:p-8 overflow-y-auto custom-scrollbar flex-1">
            <CheckoutForm onSubmit={handleCheckout} isPending={isPending} />
          </div>
        </DialogContent>
      </Dialog>

      {/* Success Modal */}
      <Dialog open={isSuccessOpen} onOpenChange={setIsSuccessOpen}>
        <DialogContent className="sm:max-w-md bg-white border-gray-100 text-center p-12">
          <motion.div 
            initial={{ scale: 0 }} 
            animate={{ scale: 1 }} 
            className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-8"
          >
            <Sparkles className="w-10 h-10 text-gray-900" />
          </motion.div>
          
          <DialogTitle className="text-3xl font-display text-gray-900 mb-6">Confirmed</DialogTitle>
          <div className="space-y-4 text-gray-500">
            <p className="text-lg">
              Your selection has been processed successfully.
            </p>
          </div>
          
          <div className="mt-10">
            <button 
              onClick={() => setIsSuccessOpen(false)}
              className="w-full py-4 rounded-xl bg-gray-900 text-white font-bold hover:bg-black transition-colors"
            >
              Close
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
