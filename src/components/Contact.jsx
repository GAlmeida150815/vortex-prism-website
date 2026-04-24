import { motion } from 'framer-motion';

const Contact = () => {
  const contactLinks = [
    { 
      name: 'Discord', 
      label: 'Connect with us', 
      url: 'https://discord.gg/S3NHZRTtyP', 
      type: 'social' 
    },
    { 
      name: 'INSTAGRAM', 
      label: '@VortexPrism', 
      url: 'https://instagram.com/vortexprism', 
      type: 'social' 
    },
    { 
      name: 'LINKTREE', 
      label: 'All Our Links', 
      url: 'https://linktr.ee/vortexprismcs2', 
      type: 'social' 
    },
    { 
      name: 'BUSINESS & SCRIMS', 
      label: 'vortexprismcs2@gmail.com', 
      url: 'mailto:vortexprismcs2@gmail.com', 
      type: 'email' 
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <div className="relative min-h-[calc(100vh-5rem)] flex flex-col items-center justify-center px-6 py-24 overflow-hidden">
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-prism-gradient opacity-10 blur-[150px] rounded-full pointer-events-none -z-10"></div>

      <div className="w-full max-w-3xl mx-auto text-center z-10">
        
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h1 className="font-display text-5xl md:text-7xl font-black tracking-widest mb-6">
            GET IN <span className="text-prism">TOUCH</span>
          </h1>
          <p className="font-sans text-xl text-vortex-muted tracking-widest uppercase max-w-2xl mx-auto">
            Reach out for scrims, sponsorships, or to follow our journey to the top.
          </p>
        </motion.div>

        {/* Links Section */}
        <motion.div 
          className="flex flex-col gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {contactLinks.map((link) => (
            <motion.a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              variants={itemVariants}
              className="group relative flex flex-col sm:flex-row items-center justify-between p-8 bg-vortex-dark border border-vortex-gray hover:border-transparent overflow-hidden transition-all duration-300"
            >
              <div className="absolute inset-0 w-full h-full bg-prism-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out z-0"></div>
              
              <div className="absolute inset-0 w-full h-full bg-vortex-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>

              <div className="relative z-10 flex flex-col items-center sm:items-start mb-4 sm:mb-0">
                <h2 className="font-display text-3xl font-black tracking-widest text-white group-hover:text-white transition-colors duration-300">
                  {link.name}
                </h2>
              </div>

              <div className="relative z-10 flex items-center gap-4">
                <span className="font-sans font-bold tracking-[0.2em] text-vortex-muted group-hover:text-white transition-colors duration-300">
                  {link.label}
                </span>
                
                <svg 
                  className="w-6 h-6 text-vortex-muted group-hover:text-white group-hover:translate-x-2 transition-all duration-300" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </motion.a>
          ))}
        </motion.div>

      </div>
    </div>
  );
};

export default Contact;