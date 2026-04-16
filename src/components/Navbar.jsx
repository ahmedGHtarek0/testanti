import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiUser, FiMoon, FiSun } from 'react-icons/fi';
import clsx from 'clsx';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Trainers', path: '/trainers' },
    { name: 'BMI', path: '/bmi' },
    { name: 'AI Coach', path: '/ai-coach' },
  ];

  return (
    <nav className={clsx(
      'fixed w-full z-50 transition-all duration-300',
      isScrolled ? 'glass py-3' : 'bg-transparent py-5'
    )}>
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        <Link to="/" className="text-2xl font-heading font-black tracking-tighter text-zinc-900 dark:text-white flex items-center gap-1 transition-colors">
          TITAN<span className="text-gym-neon">.FIT</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.path} 
              to={link.path}
              className={clsx(
                "relative font-medium text-sm transition-colors hover:text-gym-neon",
                location.pathname === link.path ? "text-gym-neon font-semibold" : "text-gray-300"
              )}
            >
              {link.name}
              {location.pathname === link.path && (
                <motion.div 
                  layoutId="nav-indicator"
                  className="absolute -bottom-2 left-0 w-full h-[2px] bg-gym-neon drop-shadow-[0_0_5px_rgba(204,255,0,0.8)]"
                />
              )}
            </Link>
          ))}
        </div>

        {/* Auth Buttons Desktop */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              <Link 
                to={user.isAdmin ? '/admin' : '/dashboard'} 
                className="flex items-center gap-2 text-sm font-medium hover:text-gym-neon text-zinc-800 dark:text-gray-200 transition-colors"
               >
                <FiUser /> {user.name}
              </Link>
              <button 
                onClick={logout}
                className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-red-500 transition-colors"
               >
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link to="/login" className="text-sm font-medium text-zinc-800 dark:text-white hover:text-gym-neon transition-colors">Log In</Link>
              <Link to="/register" className="px-5 py-2.5 bg-gym-neon text-black text-sm font-bold rounded-full shadow-neon hover:shadow-[0_0_20px_rgba(204,255,0,0.6)] transition-all transform hover:scale-105 active:scale-95">
                Join Now
              </Link>
            </>
          )}

          <button onClick={toggleTheme} className="ml-2 text-xl text-zinc-800 dark:text-white hover:text-gym-neon transition-colors">
             {theme === 'dark' ? <FiSun /> : <FiMoon />}
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-2xl text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-black/95 backdrop-blur-xl border-b border-white/10 flex flex-col md:hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-lg font-medium text-gray-300 hover:text-gym-neon"
                >
                  {link.name}
                </Link>
              ))}
              <div className="h-[1px] bg-white/10 w-full my-2" />
              {user ? (
                <>
                  <Link 
                    to={user.isAdmin ? '/admin' : '/dashboard'} 
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-lg font-medium text-gym-neon"
                  >
                    Dashboard
                  </Link>
                  <button 
                    onClick={() => { logout(); setMobileMenuOpen(false); }}
                    className="text-lg font-medium text-red-500 text-left"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-white">Log In</Link>
                  <Link to="/register" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-gym-neon">Join Now</Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
