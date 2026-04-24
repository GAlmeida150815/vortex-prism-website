import { motion } from 'framer-motion';

const Merch = () => {
  const upcomingItems = [
    { id: 1, name: 'Vortex Pro Jersey 2026', type: 'Apparel', status: 'In Production' },
    { id: 2, name: 'Prism Stealth Hoodie', type: 'Apparel', status: 'Design Phase' },
    { id: 3, name: 'Limited Edition Deskmat', type: 'Accessory', status: 'Sampling' },
  ];

  return (
    <div className="relative min-h-[calc(100vh-5rem)] flex flex-col items-center px-6 py-24 overflow-hidden">
      
      {/* Background ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-prism-gradient opacity-10 blur-[180px] rounded-full pointer-events-none -z-10 animate-pulse"></div>

      <div className="w-full max-w-6xl mx-auto z-10 text-center">
        
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-20"
        >
          <span className="inline-block px-4 py-1 mb-4 text-xs font-black tracking-[0.3em] uppercase bg-white text-vortex-black rounded-full">
            Seasonal Drop 01
          </span>
          <h1 className="font-display text-6xl md:text-8xl font-black tracking-tighter mb-6 italic uppercase">
            SOON TO <span className="text-prism animate-pulse">COME</span>
          </h1>
          <p className="font-sans text-vortex-muted text-lg tracking-widest uppercase max-w-xl mx-auto">
            High-performance gear designed for the server. 
            <br />Built for the <span className="text-white">Vortex Prisma</span> elite.
          </p>
        </motion.div>

        {/* Coming Soon Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {upcomingItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              className="group relative aspect-[4/5] bg-vortex-dark border border-vortex-gray flex flex-col items-center justify-center p-8 overflow-hidden"
            >
              {/* Background "Ghost" Text */}
              <div className="absolute -rotate-12 pointer-events-none select-none opacity-[0.03] group-hover:opacity-[0.07] transition-opacity duration-700">
                <span className="font-display text-9xl font-black leading-none">VORTEX</span>
              </div>

              {/* Status Indicator */}
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-prism animate-ping"></div>
                <span className="text-[10px] font-bold tracking-widest text-vortex-muted uppercase">{item.status}</span>
              </div>

              {/* Item Info */}
              <div className="relative z-10 text-center">
                <h3 className="font-display text-2xl font-black tracking-widest mb-2 group-hover:text-prism transition-colors duration-300 italic uppercase">
                  {item.name}
                </h3>
                <p className="font-sans text-xs text-vortex-muted tracking-[0.2em] uppercase font-bold">
                  {item.type}
                </p>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-prism-gradient opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-24 p-12 border-2 border-dashed border-vortex-gray max-w-2xl mx-auto"
        >
          <h2 className="font-display text-2xl font-black mb-4 uppercase tracking-widest">Join the Waiting List</h2>
          <div className="flex flex-col sm:flex-row gap-4">
            <input 
              type="email" 
              placeholder="ENTER YOUR EMAIL" 
              className="flex-grow bg-vortex-black border border-vortex-gray px-6 py-4 font-sans text-sm tracking-widest focus:outline-none focus:border-white transition-colors uppercase"
            />
            <button className="px-8 py-4 bg-white text-vortex-black font-display font-black tracking-widest text-sm hover:bg-prism transition-all duration-300 uppercase">
              Notify Me
            </button>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default Merch;