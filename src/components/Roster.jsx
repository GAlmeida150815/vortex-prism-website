import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

// --- IMPORT BANNERS ---
import jflBanner from '@/assets/banners/jfl.png';
import lipwoBanner from '@/assets/banners/lipwo.png';
import ederBanner from '@/assets/banners/eder.png';
import rafaBanner from '@/assets/banners/rafa.png';
import hndrBanner from '@/assets/banners/hndr.png';
import reformadoBanner from '@/assets/banners/reformado.png';
import icetapzBanner from '@/assets/banners/icetapz.png';

// --- IMPORT PICTURES (No Background) ---
import jflPic from '@/assets/pictures/jfl.png';
import lipwoPic from '@/assets/pictures/lipwo.png';
import ederPic from '@/assets/pictures/eder.png';
import rafaPic from '@/assets/pictures/rafa.png';
import hndrPic from '@/assets/pictures/hndr.png';
import reformadoPic from '@/assets/pictures/reformado.png';
import icetapzPic from '@/assets/pictures/icetapz.png';

const Roster = () => {
  const mainRoster = [
    { name: 'JFL', role: 'Captain / AWP', picture: jflPic, banner: jflBanner, steam: 'https://steamcommunity.com/id/jfl-00/', steam64: '76561198278720732' },
    { name: 'Lipwo', role: 'Rifler', picture: lipwoPic, banner: lipwoBanner, steam: 'https://steamcommunity.com/id/lipwo/', steam64: '76561198000000001' },
    { name: 'Eder', role: 'Rifler', picture: ederPic, banner: ederBanner, steam: 'https://steamcommunity.com/id/eder150815/', steam64: '76561198000000002' },
    { name: 'Rafa', role: 'Rifler', picture: rafaPic, banner: rafaBanner, steam: 'https://steamcommunity.com/id/merafa/', steam64: '76561198000000003' },
    { name: 'HnRD', role: 'Rifler', picture: hndrPic, banner: hndrBanner, steam: 'https://steamcommunity.com/id/tavasquaseputa', steam64: '76561198000000004' },
  ];

  const substitutes = [
    { name: 'Reformado', role: 'Sub / Rifler', picture: reformadoPic, banner: reformadoBanner, steam: 'https://steamcommunity.com/id/reformad0', steam64: '76561198000000005' },
    { name: 'IceTapz', role: 'Sub / Rifler', picture: icetapzPic, banner: icetapzBanner, steam: 'https://steamcommunity.com/id/icetapz/', steam64: '76561198000000006' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const PlayerCard = ({ player }) => {
    const [stats] = useState(null);
    const [loading] = useState(false);
    const [error] = useState(false);

    return (
      <motion.div 
        variants={cardVariants}
        className="group relative h-[450px] bg-vortex-dark border border-vortex-gray overflow-hidden cursor-pointer"
      >
          <a href={player.steam} target="_blank" rel="noopener noreferrer" className="absolute inset-0 w-full h-full">
              {/* Banner Background */}
              <img 
                  src={player.banner} 
                  alt={`${player.name} Banner`} 
                  className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out z-0" 
              />

              {/* Cutout Foreground */}
              <div className="absolute inset-0 bg-vortex-black group-hover:bg-transparent transition-colors duration-500 z-10 flex items-end justify-center overflow-hidden">
                  <img 
                  src={player.picture} 
                  alt={`${player.name} Cutout`} 
                  className="w-full h-full object-contain object-bottom opacity-100 group-hover:opacity-0 transition-all duration-500 ease-in-out grayscale brightness-75 drop-shadow-[0_-10px_20px_rgba(0,0,0,0.5)] scale-125 group-hover:scale-100 origin-bottom" 
                  />
              </div>

              {/* Top Border Glow */}
              <div className="absolute top-0 left-0 w-full h-1 bg-prism-gradient scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-out z-20"></div>

              {/* Info Overlay Container */}
              <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-vortex-black via-vortex-black/90 to-transparent translate-y-4 group-hover:translate-y-0 transition-transform duration-500 z-20">
                  <h3 className="font-display text-3xl font-black tracking-widest text-white mb-1 group-hover:text-prism transition-all duration-500">
                      {player.name}
                  </h3>
                  <p className="font-sans text-vortex-muted font-bold tracking-[0.2em] uppercase text-sm drop-shadow-md">
                      {player.role}
                  </p>
                  
                  {/* SAFEGUARDED STATS SECTION */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100 mt-3 pt-3 border-t border-vortex-gray/50">
                      {loading ? (
                          <div className="flex items-center gap-2 text-vortex-muted text-xs tracking-widest uppercase">
                              <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                  <path className="opacity-75" fill="url(#prism-grad)" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                  <defs>
                                      <linearGradient id="prism-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                                          <stop offset="0%" stopColor="#8A2BE2" />
                                          <stop offset="50%" stopColor="#00BFFF" />
                                          <stop offset="100%" stopColor="#FF0000" />
                                      </linearGradient>
                                  </defs>
                              </svg>
                              SYNCING DATA...
                          </div>
                      ) : error || !stats ? (
                          <div className="flex justify-between items-center text-vortex-muted text-xs tracking-widest uppercase">
                              <span className="flex items-center gap-2">
                                  <div className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></div>
                                  STATS OFFLINE
                              </span>
                              <span className="group-hover:text-white transition-colors duration-300">
                                  VIEW STEAM ↗
                              </span>
                          </div>
                      ) : (
                          <div className="flex justify-between items-center text-xs tracking-widest uppercase">
                              <div className="flex gap-4">
                                  <div className="flex flex-col">
                                      <span className="text-[10px] text-vortex-muted">K/D RATIO</span>
                                      <span className="text-white font-bold">{stats?.segments?.[0]?.stats?.kd?.displayValue || 'N/A'}</span>
                                  </div>
                              </div>
                              <span className="text-vortex-muted group-hover:text-white transition-colors duration-300">
                                  VIEW STEAM ↗
                              </span>
                          </div>
                      )}
                  </div>
              </div>
          </a>
      </motion.div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-24 min-h-[calc(100vh-5rem)]">
      
      {/* Page Header */}
      <div className="text-center mb-16">
        <motion.h1 
          className="font-display text-5xl md:text-6xl font-black tracking-widest mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          STARTING <span className="text-prism">LINEUP</span>
        </motion.h1>
        <motion.p 
          className="text-vortex-muted font-sans text-lg tracking-widest uppercase"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          The core five dominating the server.
        </motion.p>
      </div>

      {/* Main Roster Grid */}
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-24"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {mainRoster.map((player) => (
          <PlayerCard key={player.name} player={player} />
        ))}
      </motion.div>

      {/* Substitutes Header */}
      <div className="text-center mb-10">
        <motion.h2 
          className="font-display text-3xl md:text-4xl font-black tracking-widest mb-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          SUBSTITUTES
        </motion.h2>
        <div className="w-16 h-1 bg-prism-gradient mx-auto"></div>
      </div>

      {/* Substitutes Grid */}
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-center"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="hidden lg:block"></div>
        {substitutes.map((player) => (
          <PlayerCard key={player.name} player={player} />
        ))}
        <div className="hidden lg:block"></div>
      </motion.div>

    </div>
  );
};

export default Roster;