import { motion } from 'framer-motion';

const Highlights = () => {
  const clips = [
    {
      id: 1,
      title: "Bottle Flip ?! - By HnDR",
      match: "Office",
      date: "APR 2026",
      youtubeId: "ECuFCgvVppY"
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <div className="relative min-h-[calc(100vh-5rem)] flex flex-col items-center px-6 py-24 overflow-hidden">
      
      {/* Background ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-prism-gradient opacity-10 blur-[150px] rounded-full pointer-events-none -z-10"></div>

      <div className="w-full max-w-7xl mx-auto z-10">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.h1 
            className="font-display text-5xl md:text-6xl font-black tracking-widest mb-4 uppercase"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            MATCH <span className="text-prism">HIGHLIGHTS</span>
          </motion.h1>
          <motion.p 
            className="text-vortex-muted font-sans text-lg tracking-widest uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Watch the roster dominate the server.
          </motion.p>
        </div>

        {/* Video Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-10"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {clips.map((clip) => (
            <motion.div 
              key={clip.id} 
              variants={cardVariants}
              className="group flex flex-col bg-vortex-dark border border-vortex-gray overflow-hidden hover:border-vortex-muted transition-colors duration-300"
            >
              {/* 16:9 Video Container */}
              <div className="relative w-full pt-[56.25%] bg-vortex-black overflow-hidden">
                <iframe 
                  className="absolute top-0 left-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${clip.youtubeId}?rel=0&modestbranding=1`} 
                  title={clip.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                ></iframe>
              </div>

              {/* Video Info Container */}
              <div className="p-6 relative overflow-hidden">
                {/* Subtle animated border on hover */}
                <div className="absolute top-0 left-0 w-full h-[2px] bg-prism-gradient scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-out"></div>
                
                <h3 className="font-display text-2xl font-bold tracking-widest text-white mb-2 group-hover:text-prism transition-colors duration-300">
                  {clip.title}
                </h3>
                
                <div className="flex justify-between items-center mt-4">
                  <span className="font-sans text-vortex-light font-bold tracking-[0.1em] uppercase text-sm px-3 py-1 bg-vortex-gray rounded-sm">
                    {clip.match}
                  </span>
                  <span className="font-sans text-vortex-muted tracking-widest text-sm">
                    {clip.date}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </div>
  );
};

export default Highlights;