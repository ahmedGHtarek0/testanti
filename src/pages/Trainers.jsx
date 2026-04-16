import { motion } from 'framer-motion';
import { useState } from 'react';
import { FiStar, FiCalendar, FiX, FiThumbsUp } from 'react-icons/fi';


const trainers = [
  { id: 1, name: 'Marcus Vance', role: 'Strength & Conditioning', rating: 4.9, img: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?q=80&w=2000&auto=format&fit=crop' },
  { id: 2, name: 'Sarah Jenkins', role: 'HIIT & Cardio', rating: 4.8, img: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=2000&auto=format&fit=crop' },
  { id: 3, name: 'David Cho', role: 'Calisthenics & Mobility', rating: 5.0, img: 'https://images.unsplash.com/photo-1613695277838-89c0aeb2dada?q=80&w=2000&auto=format&fit=crop' },
  { id: 4, name: 'Elena Rostova', role: 'Yoga & Pilates', rating: 4.7, img: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=2000&auto=format&fit=crop' },
  { id: 5, name: 'Jamal Smith', role: 'Powerlifting Base', rating: 4.9, img: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2000&auto=format&fit=crop' },
  { id: 6, name: 'Zoe Martinez', role: 'Boxing & MMA', rating: 4.8, img: 'https://images.unsplash.com/photo-1548690312-e3b507d8c110?q=80&w=2000&auto=format&fit=crop' },
];

const Trainers = () => {
  const [selectedTrainer, setSelectedTrainer] = useState(null);
  const [rating, setRating] = useState(0);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto px-4 md:px-8 py-10"
    >
      <div className="text-center mb-16">
        <h1 className="text-5xl font-heading font-black text-white uppercase tracking-tight mb-4 text-gym-neon">Elite Coaching</h1>
        <p className="text-gray-400 max-w-2xl mx-auto">Access world-class professionals dedicated to pushing your limits. Select a trainer to book a 1-on-1 session.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {trainers.map((trainer, i) => (
          <motion.div 
            key={trainer.id}
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group relative rounded-2xl overflow-hidden cursor-pointer"
            onClick={() => setSelectedTrainer(trainer)}
            // 3D Tilt illusion via perspective
            style={{ perspective: 1000 }}
          >
            <div className="relative h-[400px] w-full transform transition-transform duration-500 group-hover:scale-105 group-hover:rotate-1">
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
              <img src={trainer.img} alt={trainer.name} className="w-full h-full object-cover object-center" />
              
              <div className="absolute bottom-0 left-0 w-full p-6 z-20 transform transition-transform duration-300 translate-y-4 group-hover:translate-y-0">
                <div className="flex items-center gap-1 text-gym-neon mb-2">
                  <FiStar fill="currentColor" />
                  <span className="text-sm font-bold">{trainer.rating}</span>
                </div>
                <h3 className="text-2xl font-heading font-bold text-white uppercase">{trainer.name}</h3>
                <p className="text-gray-300 text-sm mb-4">{trainer.role}</p>
                
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="w-full py-3 bg-white/20 backdrop-blur-md text-white font-bold rounded-lg border border-white/30 hover:bg-gym-neon hover:text-black hover:border-gym-neon transition-all">
                    View Profile
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Booking Modal Mockup */}
      {selectedTrainer && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setSelectedTrainer(null)} />
          <motion.div 
             initial={{ scale: 0.9, opacity: 0 }}
             animate={{ scale: 1, opacity: 1 }}
             className="glass-card w-full max-w-lg relative z-10 overflow-hidden"
          >
            <button 
              onClick={() => setSelectedTrainer(null)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-black/50 text-white rounded-full hover:bg-red-500 transition-colors z-20"
            >
              <FiX />
            </button>
            <div className="h-48 relative">
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent z-10" />
              <img src={selectedTrainer.img} className="w-full h-full object-cover" alt="" />
            </div>
            <div className="p-8 relative z-20 -mt-10">
               <h3 className="text-3xl font-heading font-bold text-white uppercase">{selectedTrainer.name}</h3>
               <p className="text-gym-neon font-medium mb-6">{selectedTrainer.role}</p>
               
               <div className="space-y-4">
                 <div>
                   <label className="text-xs text-gray-400 uppercase tracking-widest font-bold">Select Date</label>
                   <input type="date" className="w-full mt-1 bg-zinc-800/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-gym-neon" />
                 </div>
                 <div>
                   <label className="text-xs text-gray-400 uppercase tracking-widest font-bold">Rate Coach Experience</label>
                   <div className="flex gap-2 mt-2">
                     {[1,2,3,4,5].map((star) => (
                       <FiStar 
                         key={star} 
                         size={24} 
                         className={`cursor-pointer transition-colors ${rating >= star ? 'text-yellow-500 fill-yellow-500' : 'text-gray-500'}`} 
                         onClick={() => setRating(star)} 
                       />
                     ))}
                   </div>
                 </div>
                 <button 
                   onClick={() => {
                     if(rating > 0) alert(`Rated ${rating} stars! Analytics updated.`);
                     alert(`Session requested with ${selectedTrainer.name}!`);
                     setSelectedTrainer(null);
                     setRating(0);
                   }}
                   className="w-full mt-4 bg-gym-neon text-black font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:shadow-neon transition-all"
                 >
                   <FiThumbsUp /> Confirm & Rate
                 </button>
               </div>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default Trainers;
