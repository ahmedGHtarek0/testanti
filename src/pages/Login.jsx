import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { FiMail, FiLock, FiLogIn, FiAlertCircle } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const user = await login(email, password);
      if (user.isAdmin) {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setError('Invalid credentials. Hint: admin@gmail.com / 123456');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20"
    >
      {/* Background elements */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-gym-neon/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="w-full max-w-md px-6 relative z-10 pb-20">
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="glass-card p-10 mt-10"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-heading font-black uppercase text-white mb-2">Welcome Back</h2>
            <p className="text-gray-400 text-sm">Enter your credentials to access your terminal.</p>
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-lg text-sm flex items-center gap-2 mb-6"
            >
              <FiAlertCircle />
              {error}
            </motion.div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-zinc-900/50 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-gym-neon focus:ring-1 focus:ring-gym-neon transition-all"
                  placeholder="admin@gmail.com"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-300">Password</label>
                <a href="#" className="text-xs text-gym-neon hover:underline">Forgot password?</a>
              </div>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-zinc-900/50 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-gym-neon focus:ring-1 focus:ring-gym-neon transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-gym-neon text-black font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 hover:shadow-neon transition-all disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                 <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, ease: "linear", duration: 1 }}
                  className="w-5 h-5 border-2 border-black border-t-transparent rounded-full"
                />
              ) : (
                <>
                  <FiLogIn /> Access Terminal
                </>
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-gray-400">
            Don't have an account? <Link to="/register" className="text-gym-neon hover:underline">Register Now</Link>
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Login;
