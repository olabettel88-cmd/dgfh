import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function CuteCat() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="fixed bottom-0 -right-2 z-50 pointer-events-auto"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.8 }}
            className="absolute -top-16 right-0 bg-white px-4 py-2 rounded-2xl rounded-br-none shadow-xl border-2 border-gray-100 whitespace-nowrap"
          >
            <p className="text-gray-900 font-bold font-display">Special for you</p>
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.img 
        src="https://i.pinimg.com/originals/cf/94/20/cf94204d9c184ff030c707026ce3deb4.gif"
        alt="Cute Cat"
        className="w-24 h-24 sm:w-32 sm:h-32 object-contain drop-shadow-lg cursor-pointer"
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
      />
    </div>
  );
}
