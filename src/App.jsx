import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import Trainers from './pages/Trainers';
import BMI from './pages/BMI';
import AICoach from './pages/AICoach';

// Custom Cursor Component
import CustomCursor from './components/CustomCursor';

function AnimatedRoutes() {
  const location = useLocation();
  const { user } = useAuth();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/trainers" element={<Trainers />} />
        <Route path="/bmi" element={<BMI />} />
        <Route path="/ai-coach" element={<AICoach />} />
        
        {/* Protected Routes Mock */}
        <Route 
          path="/dashboard" 
          element={user ? <Dashboard /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/admin" 
          element={user?.isAdmin ? <AdminDashboard /> : <Navigate to="/login" />} 
        />
        
        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <div className="flex flex-col min-h-screen bg-gym-light text-zinc-900 dark:bg-black dark:text-white transition-colors duration-300 relative">
            <CustomCursor />
            <Navbar />
            <main className="flex-grow pt-20"> 
              <AnimatedRoutes />
          </main>
          <Footer />
        </div>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
