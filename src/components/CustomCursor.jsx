import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);

  return (
    <>
      {/* Outer glow ring */}
      <motion.div
        className="fixed top-0 left-0 w-12 h-12 rounded-full border border-gym-neon/50 pointer-events-none z-[100] transform -translate-x-1/2 -translate-y-1/2 hidden md:block"
        animate={{
          x: mousePosition.x - 24,
          y: mousePosition.y - 24,
        }}
        transition={{ type: "spring", stiffness: 100, damping: 25, mass: 0.1 }}
      />
      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 bg-gym-neon rounded-full pointer-events-none z-[100] drop-shadow-[0_0_8px_rgba(204,255,0,0.8)] hidden md:block"
        animate={{
          x: mousePosition.x - 6,
          y: mousePosition.y - 6,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.1 }}
      />
    </>
  );
};

export default CustomCursor;
