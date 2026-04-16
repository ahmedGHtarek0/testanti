import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { FiArrowRight, FiCheckCircle, FiPlay } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Home = () => {
  const { scrollYProgress } = useScroll();
  const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-black min-h-screen"
    >
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Mock background pattern / video placeholder */}
        <div className="absolute inset-0 z-0 opacity-40">
           <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/80 to-black z-10" />
           <img 
              src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop" 
              alt="Gym hero" 
              className="w-full h-full object-cover object-center scale-105"
           />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center justify-center gap-2 text-gym-neon mb-6 uppercase tracking-[0.2em] text-sm font-bold"
          >
            <span className="w-12 h-[2px] bg-gym-neon"></span>
            Elevate Your Reality
            <span className="w-12 h-[2px] bg-gym-neon"></span>
          </motion.div>
          
          <motion.h1 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-6xl md:text-8xl font-heading font-black mb-6 uppercase tracking-tighter leading-none"
          >
            Unleash The <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Titan Within</span>
          </motion.h1>
          
          <motion.p 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto font-light"
          >
            Experience a next-generation facility equipped with AI-driven training, biometric tracking, and world-class equipment.
          </motion.p>
          
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <Link to="/register" className="w-full sm:w-auto px-8 py-4 bg-gym-neon text-black font-bold text-lg rounded-full shadow-neon hover:shadow-[0_0_30px_rgba(204,255,0,0.8)] transition-all flex items-center justify-center gap-2 group">
              Start Free Trial
              <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <button className="w-full sm:w-auto px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold text-lg rounded-full hover:bg-white/20 transition-all flex items-center justify-center gap-2">
              <FiPlay /> Watch Tour
            </button>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 relative z-20 border-y border-white/5 bg-zinc-950">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
            {[
              { label: 'Active Members', value: '15K+' },
              { label: 'Expert Trainers', value: '50+' },
              { label: 'Facility Area', value: '40k sqft' },
              { label: 'AI Programs', value: '100+' }
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <h3 className="text-4xl md:text-5xl font-heading font-black text-white mb-2">{stat.value}</h3>
                <p className="text-gray-500 uppercase tracking-wider text-sm font-bold">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Parallax */}
      <section className="py-32 relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <motion.div 
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex-1"
            >
              <h2 className="text-4xl md:text-6xl font-heading font-black mb-6 uppercase">Next-Gen <br/><span className="text-gym-neon">Technology</span></h2>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                Our facility is equipped with state-of-the-art biometric tracking and AI-powered equipment that learns your body and adapts to your workout, maximizing every second you spend here.
              </p>
              <ul className="space-y-4">
                {['Smart Equipment Integration', 'AI-Driven Routine Generation', 'Real-time Form Correction', 'Biometric Recovery Zones'].map((feature, i) => (
                  <motion.li 
                    key={i}
                    className="flex items-center gap-3 text-white font-medium"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + (i * 0.1) }}
                  >
                    <FiCheckCircle className="text-gym-neon text-xl" />
                    {feature}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            <motion.div 
              className="flex-1 relative"
               initial={{ opacity: 0, x: 100 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8 }}
            >
              <div className="absolute inset-0 bg-gym-neon rounded-2xl blur-[100px] opacity-20 transform -rotate-12 translate-x-12"></div>
              <img 
                src="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=2070&auto=format&fit=crop" 
                alt="Gym Equipment" 
                className="relative z-10 rounded-2xl border border-white/10 shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Bottom */}
      <section className="py-32 bg-gym-neon text-black text-center relative overflow-hidden">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          className="container mx-auto px-6 relative z-10"
        >
          <h2 className="text-5xl md:text-7xl font-heading font-black mb-8 uppercase tracking-tight">Ready to Transform?</h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto font-medium">Join Titan Fit today and get access to our premium facilities, AI coaching, and world-class trainers.</p>
          <Link to="/register" className="inline-flex items-center gap-2 px-10 py-5 bg-black text-white font-bold text-xl rounded-full hover:bg-zinc-800 transition-all transform hover:scale-105 active:scale-95 shadow-2xl">
            Claim Your Spot <FiArrowRight />
          </Link>
        </motion.div>
      </section>
    </motion.div>
  );
};

export default Home;
