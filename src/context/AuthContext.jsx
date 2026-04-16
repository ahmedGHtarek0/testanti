import { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('gymUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.message || 'Invalid credentials');
      }

      setUser(data);
      localStorage.setItem('gymUser', JSON.stringify(data));
      return data;
    } catch (err) {
      throw err;
    }
  };

  const register = async (email, password, name) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      setUser(data);
      localStorage.setItem('gymUser', JSON.stringify(data));
      return data;
    } catch (err) {
      throw err;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('gymUser');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
        {!loading && children}
    </AuthContext.Provider>
  );
};
