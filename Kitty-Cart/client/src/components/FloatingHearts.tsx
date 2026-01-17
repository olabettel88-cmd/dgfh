import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export function FloatingHearts() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-gray-200"
          initial={{ 
            x: Math.random() * 100 + "%", 
            y: "110%", 
            opacity: 0,
            scale: Math.random() * 0.5 + 0.5
          }}
          animate={{ 
            y: "-10%", 
            opacity: [0, 0.5, 0],
            rotate: 360
          }}
          transition={{ 
            duration: Math.random() * 10 + 10, 
            repeat: Infinity,
            delay: Math.random() * 20,
            ease: "linear"
          }}
        >
          <Sparkles size={Math.random() * 20 + 10} />
        </motion.div>
      ))}
    </div>
  );
}
