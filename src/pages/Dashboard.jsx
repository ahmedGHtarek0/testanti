import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { FiCheckCircle, FiClock, FiTarget, FiAward, FiStar } from 'react-icons/fi';
import { useState, useEffect } from 'react';

const Dashboard = () => {
  const { user } = useAuth();
  const [userData, setUserData] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);

  const fetchData = async () => {
    if (!user?._id) return;
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/users/${user._id}`);
      const data = await res.json();
      setUserData(data);

      const res2 = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/users/leaderboard`);
      const lbData = await res2.json();
      setLeaderboard(lbData);
    } catch(err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  const completeWorkout = async (workoutId) => {
    if (!user?._id) return;
    try {
      await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/users/${user._id}/workouts/${workoutId}/complete`, { method: 'PUT' });
      fetchData(); // Refresh points/badges
    } catch(err) {
      console.error(err);
    }
  };

  const pts = userData?.points || 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto px-4 md:px-8 py-10 text-zinc-900 dark:text-white"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
        <div>
          <motion.h1 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="text-4xl font-heading font-black dark:text-white uppercase tracking-tight"
          >
            Welcome, {userData?.name || user?.name || 'Titan'}
          </motion.h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">Your gamified fitness journey.</p>
        </div>
        
        {/* Replace Pro Plan badge with points badge */}
        <div className="px-4 py-2 rounded-full border border-gym-neon/30 bg-gym-neon/10 text-gym-neon text-sm font-bold flex items-center gap-2">
          <FiStar className="animate-pulse" />
          {pts} Titan Points
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {[
          { title: 'Total Points', value: pts, unit: 'lifetime', icon: FiTarget, color: 'text-gym-neon' },
          { title: 'Badges Earned', value: userData?.badges?.length || 0, unit: 'achievements', icon: FiAward, color: 'text-yellow-500' },
          { title: 'Workouts Done', value: userData?.workouts?.filter(w=>w.completed).length || 0, unit: 'completed', icon: FiCheckCircle, color: 'text-green-500' },
          { title: 'Pending Routines', value: userData?.workouts?.filter(w=>!w.completed).length || 0, unit: 'assigned', icon: FiClock, color: 'text-purple-500' },
        ].map((card, i) => (
          <motion.div 
            key={i}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-6 bg-white dark:bg-zinc-900 shadow-md dark:shadow-none"
          >
            <div className={`p-3 rounded-xl bg-gray-100 dark:bg-white/5 w-max mb-4 ${card.color}`}>
              <card.icon size={24} />
            </div>
            <h3 className="text-3xl font-heading font-bold dark:text-white mb-1">{card.value}</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">{card.title} <span className="opacity-50 font-normal">({card.unit})</span></p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Workout Table */}
        <motion.div className="lg:col-span-2 glass-card p-6 bg-white dark:bg-zinc-900 shadow-md dark:shadow-none">
          <div className="flex justify-between items-center mb-6">
             <h3 className="text-xl font-bold dark:text-white">Active Training Plan</h3>
             <span className="text-xs text-gym-neon uppercase font-bold">+10 pts per completion</span>
          </div>
          
          <div className="space-y-4">
            {!userData?.workouts || userData.workouts.length === 0 ? (
               <p className="text-gray-500">No workouts assigned yet. Ask your coach!</p>
            ) : (
               userData.workouts.map((w, idx) => (
                 <div key={idx} className={`p-4 rounded-xl border ${w.completed ? 'border-gym-neon/30 bg-gym-neon/5' : 'border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-zinc-950'} flex justify-between items-center transition-colors`}>
                    <div>
                      <h4 className={`font-bold ${w.completed ? 'text-gray-400 line-through' : 'text-zinc-900 dark:text-white'}`}>{w.title}</h4>
                      <p className="text-sm text-gray-500 mt-1">{w.description}</p>
                    </div>
                    {w.completed ? (
                      <div className="flex items-center gap-1 text-gym-neon font-bold text-sm">
                         <FiCheckCircle /> Completed
                      </div>
                    ) : (
                      <button onClick={() => completeWorkout(w._id)} className="px-4 py-2 bg-gym-neon text-black font-bold text-sm rounded hover:scale-105 transition-transform">
                        Complete
                      </button>
                    )}
                 </div>
               ))
            )}
          </div>
        </motion.div>

        {/* Top 10 Hall of Fame Sidebar */}
        <motion.div className="glass-card p-6 bg-white dark:bg-zinc-900 shadow-md dark:shadow-none flex flex-col">
          <div className="flex justify-center mb-6 text-yellow-500">
             <FiAward size={40} />
          </div>
          <h3 className="text-xl font-black text-center dark:text-white mb-2 uppercase text-gym-neon">Hall of Fame</h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm text-center mb-6">Top 10 Global Titans based on points earned.</p>
          
          <div className="space-y-3 flex-grow overflow-y-auto">
             {leaderboard.map((lbUser, idx) => (
               <div key={lbUser._id} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-zinc-950 border border-gray-100 dark:border-zinc-800">
                 <div className="flex items-center gap-3">
                   <span className={`font-black ${idx===0 ? 'text-yellow-500 text-lg' : idx===1 ? 'text-gray-400' : idx===2 ? 'text-orange-600' : 'text-gray-600'}`}>
                     #{idx + 1}
                   </span>
                   <span className="font-bold dark:text-white text-sm">{lbUser.name}</span>
                 </div>
                 <div className="text-gym-neon font-mono text-sm tracking-widest">{lbUser.points} pts</div>
               </div>
             ))}
          </div>
        </motion.div>
      </div>

      {/* Badges Earned Section */}
      {userData?.badges?.length > 0 && (
        <motion.div className="mt-8 glass-card p-6 bg-white dark:bg-zinc-900 shadow-md dark:shadow-none">
           <h3 className="text-xl font-bold dark:text-white mb-4">Milestone Badges</h3>
           <div className="flex flex-wrap gap-4">
              {userData.badges.map((badge, idx) => (
                 <div key={idx} className="flex items-center gap-2 px-4 py-2 rounded-full border border-yellow-500/30 bg-yellow-500/10 text-yellow-500 font-bold">
                    <FiAward /> {badge}
                 </div>
              ))}
           </div>
        </motion.div>
      )}

    </motion.div>
  );
};

export default Dashboard;
