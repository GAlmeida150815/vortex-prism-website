import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import heroLogo from '@/assets/hero_white.png'; 

const Hero = () => {
  return (
    <div className="relative min-h-[calc(100vh-5rem)] flex flex-col items-center justify-center overflow-hidden">
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-prism-gradient opacity-20 blur-[120px] rounded-full pointer-events-none -z-10"></div>
      
      <div className="absolute top-[35%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white opacity-40 blur-[100px] rounded-full pointer-events-none -z-10"></div>

      <div className="z-10 flex flex-col items-center text-center px-6">
        
        {/* Animated Logo */}
        <motion.img 
          src={heroLogo} 
          alt="Vortex Prism Logo" 
          className="w-64 md:w-96 mb-8 relative z-10 drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]"
          initial={{ opacity: 0, scale: 0.8, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />

        {/* Animated Text */}
        <motion.h1 
          className="font-display text-5xl md:text-7xl font-black tracking-widest mb-4 mt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          VORTEX <span className="text-prism">PRISM</span>
        </motion.h1>

        <motion.p 
          className="font-sans text-xl md:text-2xl text-vortex-muted font-medium tracking-widest mb-10 max-w-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          DOMINATING THE SERVER. ONE ROUND AT A TIME.
        </motion.p>

        {/* Call to Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Link 
            to="/roster" 
            className="group relative inline-flex items-center justify-center px-8 py-3 font-display font-bold tracking-widest text-white transition-all duration-300 ease-in-out bg-vortex-gray border border-vortex-muted/30 hover:border-transparent overflow-hidden"
          >
            <span className="absolute inset-0 w-full h-full bg-prism-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"></span>
            <span className="relative z-10 group-hover:text-vortex-black transition-colors duration-300">MEET THE ROSTER</span>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;