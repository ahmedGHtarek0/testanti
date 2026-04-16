import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiActivity, FiSave, FiTrendingUp } from 'react-icons/fi';

const BMI = () => {
  const [height, setHeight] = useState(175);
  const [weight, setWeight] = useState(70);
  const [bmi, setBmi] = useState(22.9);
  const [category, setCategory] = useState({ text: 'Normal', color: '#10b981' });
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('bmiHistory');
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  useEffect(() => {
    const h = height / 100;
    const calculatedBmi = (weight / (h * h)).toFixed(1);
    setBmi(Number(calculatedBmi));

    if (calculatedBmi < 18.5) setCategory({ text: 'Underweight', color: '#3b82f6' });
    else if (calculatedBmi < 25) setCategory({ text: 'Normal', color: '#10b981' });
    else if (calculatedBmi < 30) setCategory({ text: 'Overweight', color: '#f59e0b' });
    else setCategory({ text: 'Obese', color: '#ef4444' });
  }, [height, weight]);

  const handleSave = () => {
    const newEntry = { date: new Date().toLocaleDateString(), bmi, weight };
    const newHistory = [newEntry, ...history].slice(0, 5); // keep last 5
    setHistory(newHistory);
    localStorage.setItem('bmiHistory', JSON.stringify(newHistory));
  };

  // Convert BMI to a percentage for the gauge (range 15 to 40)
  const gaugePercent = Math.min(Math.max((bmi - 15) / (40 - 15) * 100, 0), 100);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-5xl mx-auto px-4 md:px-8 py-10"
    >
      <div className="text-center mb-12">
        <h1 className="text-4xl font-heading font-black text-white uppercase tracking-tight flex items-center justify-center gap-3">
          <FiActivity className="text-gym-neon" /> Matrix Scanner
        </h1>
        <p className="text-gray-400 mt-2">Advanced biometrics calculation engine.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Input UI */}
        <motion.div 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="glass-card p-8"
        >
          <div className="mb-8">
            <div className="flex justify-between mb-4">
              <label className="text-sm font-bold text-gray-300 uppercase tracking-widest">Height (cm)</label>
              <span className="text-gym-neon font-bold text-xl">{height}</span>
            </div>
            <input 
              type="range" 
              min="100" 
              max="230" 
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="w-full appearance-none bg-zinc-800 h-2 rounded-full outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:bg-gym-neon [&::-webkit-slider-thumb]:rounded-full cursor-pointer"
            />
          </div>

          <div className="mb-10">
            <div className="flex justify-between mb-4">
              <label className="text-sm font-bold text-gray-300 uppercase tracking-widest">Weight (kg)</label>
              <span className="text-gym-neon font-bold text-xl">{weight}</span>
            </div>
            <input 
              type="range" 
              min="40" 
              max="150" 
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full appearance-none bg-zinc-800 h-2 rounded-full outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:bg-gym-neon [&::-webkit-slider-thumb]:rounded-full cursor-pointer"
            />
          </div>

          <button 
            onClick={handleSave}
            className="w-full py-4 border border-gym-neon text-gym-neon rounded-xl font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-gym-neon hover:text-black transition-all"
          >
            <FiSave /> Log Metrics
          </button>
        </motion.div>

        {/* Gauge UI */}
        <motion.div 
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="glass-card p-8 flex flex-col items-center justify-center relative overflow-hidden"
        >
           {/* Animated Gauge Background */}
           <div className="absolute inset-0 opacity-10" style={{ background: `radial-gradient(circle at center, ${category.color} 0%, transparent 70%)` }} />
           
           <div className="relative w-64 h-32 overflow-hidden mb-6">
             <div className="w-64 h-64 border-[16px] border-zinc-800 rounded-full border-b-transparent border-r-transparent transform -rotate-45 relative">
                {/* Gauge Fill Animation */}
                <motion.div 
                  initial={{ rotate: -135 }}
                  animate={{ rotate: -135 + (gaugePercent * 1.8) }} // 1.8 is 180 degrees / 100
                  transition={{ type: "spring", stiffness: 50 }}
                  className="absolute inset-[-16px] border-[16px] rounded-full border-b-transparent border-r-transparent"
                  style={{ borderColor: category.color }}
                />
             </div>
             <div className="absolute bottom-0 left-0 w-full text-center pb-2">
                <span className="text-6xl font-heading font-black" style={{ color: category.color }}>{bmi}</span>
             </div>
           </div>

           <h3 className="text-2xl font-bold uppercase tracking-widest" style={{ color: category.color }}>{category.text}</h3>
           <p className="text-gray-400 mt-2 text-center text-sm">Optimal BMI relies between 18.5 and 24.9.</p>
        </motion.div>

        {/* History */}
        {history.length > 0 && (
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="lg:col-span-2 glass-card p-6"
          >
            <h3 className="text-xl font-bold text-white mb-6 uppercase flex items-center gap-2">
              <FiTrendingUp className="text-gym-neon" /> Timeline
            </h3>
            <div className="space-y-3">
              {history.map((entry, idx) => (
                <div key={idx} className="flex justify-between items-center p-4 bg-zinc-900/50 rounded-lg">
                  <div className="text-white font-medium">{entry.date}</div>
                  <div className="flex gap-8">
                    <div className="text-gray-400"><span className="text-white font-bold">{entry.weight}</span> kg</div>
                    <div className="text-gym-neon font-bold text-lg">BMI: {entry.bmi}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default BMI;
