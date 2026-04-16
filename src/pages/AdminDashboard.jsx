import { motion } from 'framer-motion';
import { FiUsers, FiUser, FiAward, FiActivity, FiShield, FiTrash2, FiPlus } from 'react-icons/fi';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const AdminDashboard = () => {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [workoutTitle, setWorkoutTitle] = useState('');
  const [workoutDesc, setWorkoutDesc] = useState('');
  
  const fetchUsers = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/users`);
      const data = await res.json();
      setUsers(data);
    } catch(err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const promoteUser = async (id) => {
    try {
      await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/users/${id}/promote`, { method: 'PUT' });
      fetchUsers();
    } catch(err) { console.error(err); }
  };

  const deleteUser = async (id) => {
    try {
      await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/users/${id}`, { method: 'DELETE' });
      setSelectedUser(null);
      fetchUsers();
    } catch(err) { console.error(err); }
  };

  const assignWorkout = async (e) => {
    e.preventDefault();
    if(!selectedUser) return;
    try {
      await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/users/${selectedUser._id}/workouts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: workoutTitle, description: workoutDesc })
      });
      setWorkoutTitle('');
      setWorkoutDesc('');
      alert('Workout assigned!');
      fetchUsers();
      // Re-fetch selected user local state or just close
      setSelectedUser(null);
    } catch(err) { console.error(err); }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto px-4 md:px-8 py-10 text-zinc-900 dark:text-white"
    >
      <div className="mb-10">
        <h1 className="text-4xl font-heading font-black dark:text-white uppercase tracking-tight">Admin Terminal</h1>
        <p className="text-gray-500 dark:text-gray-400">Advanced user gamification operations.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {[
          { title: 'Total Titans', value: users.length, icon: FiUsers, color: 'text-gym-neon' },
          { title: 'Active Admins', value: users.filter(u=>u.isAdmin).length, icon: FiShield, color: 'text-purple-500' },
          { title: 'Total Points', value: users.reduce((acc, u) => acc + u.points, 0), icon: FiAward, color: 'text-orange-500' },
          { title: 'System Status', value: 'Online', icon: FiActivity, color: 'text-green-500' },
        ].map((card, i) => (
          <motion.div 
            key={i}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-6 border-l-4 border-l-gym-neon bg-white dark:bg-zinc-900 shadow-md dark:shadow-none"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">{card.title}</p>
                <h3 className="text-3xl font-heading font-bold dark:text-white mt-1">{card.value}</h3>
              </div>
              <div className={`p-3 rounded-xl bg-gray-100 dark:bg-white/5 ${card.color}`}>
                <card.icon size={20} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* User List */}
        <motion.div className="lg:col-span-2 glass-card p-6 bg-white dark:bg-zinc-900 shadow-md dark:shadow-none">
          <h3 className="text-xl font-bold dark:text-white mb-6">Titan Registry</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-200 dark:border-zinc-800 text-sm text-gray-400 uppercase">
                  <th className="py-3 px-4">Name</th>
                  <th className="py-3 px-4">Email</th>
                  <th className="py-3 px-4">Role</th>
                  <th className="py-3 px-4">Points</th>
                  <th className="py-3 px-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map(u => (
                  <tr key={u._id} className="border-b border-gray-100 dark:border-zinc-800/50 hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition-colors">
                    <td className="py-3 px-4 font-bold">{u.name}</td>
                    <td className="py-3 px-4 text-gray-500">{u.email}</td>
                    <td className="py-3 px-4">
                      {u.isAdmin ? <span className="text-xs bg-purple-500/10 text-purple-500 py-1 px-2 rounded-full font-bold">Admin</span> : <span className="text-xs bg-gray-500/10 text-gray-500 py-1 px-2 rounded-full font-bold">Member</span>}
                    </td>
                    <td className="py-3 px-4 font-mono text-gym-neon">{u.points}</td>
                    <td className="py-3 px-4 flex justify-center gap-2">
                       <button onClick={() => setSelectedUser(u)} className="px-3 py-1 bg-gym-neon text-black text-xs font-bold rounded hover:shadow-neon transition-all">Manage</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Management Panel */}
        <motion.div className="glass-card p-6 bg-white dark:bg-zinc-900 shadow-md dark:shadow-none border border-gray-200 dark:border-white/5 relative">
          {!selectedUser ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-400 text-center py-20">
               <FiUser size={40} className="mb-4 opacity-50" />
               <p>Select a Titan from the registry to assign workouts or modify permissions.</p>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex justify-between items-start border-b border-gray-200 dark:border-zinc-800 pb-4">
                 <div>
                   <h3 className="text-xl font-black uppercase text-gym-neon">{selectedUser.name}</h3>
                   <p className="text-sm text-gray-500">{selectedUser.email}</p>
                 </div>
                 <button onClick={() => setSelectedUser(null)} className="text-gray-400 hover:text-white">✕</button>
              </div>

              <div>
                <h4 className="text-sm font-bold uppercase text-gray-500 mb-3">Assign Workout</h4>
                <form onSubmit={assignWorkout} className="space-y-3">
                  <input required value={workoutTitle} onChange={e=>setWorkoutTitle(e.target.value)} type="text" placeholder="Workout Title (e.g. Chest & Triceps)" className="w-full bg-gray-50 dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 rounded p-2 text-sm focus:border-gym-neon outline-none" />
                  <textarea required value={workoutDesc} onChange={e=>setWorkoutDesc(e.target.value)} placeholder="Description & Sets" className="w-full bg-gray-50 dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 rounded p-2 text-sm focus:border-gym-neon outline-none h-20" />
                  <button type="submit" className="w-full bg-gym-neon text-black font-bold py-2 rounded flex items-center justify-center gap-2 hover:bg-lime-400 transition-colors">
                    <FiPlus /> Push to User
                  </button>
                </form>
              </div>

              <div className="pt-4 border-t border-gray-200 dark:border-zinc-800 space-y-3">
                <h4 className="text-sm font-bold uppercase text-gray-500 mb-3">Danger Zone</h4>
                {!selectedUser.isAdmin && (
                  <button onClick={() => promoteUser(selectedUser._id)} className="w-full border border-purple-500 text-purple-500 font-bold py-2 rounded flex items-center justify-center gap-2 hover:bg-purple-500 hover:text-white transition-colors">
                    <FiShield /> Promote to Admin
                  </button>
                )}
                {selectedUser.email !== currentUser.email && (
                  <button onClick={() => deleteUser(selectedUser._id)} className="w-full border border-red-500 text-red-500 font-bold py-2 rounded flex items-center justify-center gap-2 hover:bg-red-500 hover:text-white transition-colors">
                    <FiTrash2 /> Terminate Account
                  </button>
                )}
              </div>
            </div>
          )}
        </motion.div>

      </div>
    </motion.div>
  );
};

export default AdminDashboard;
