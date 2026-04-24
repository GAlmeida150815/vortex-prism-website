import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import heroLogo from '@/assets/hero_white.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'HOME', path: '/' },
    { name: 'ROSTER', path: '/roster' },
    { name: 'HIGHLIGHTS', path: '/highlights' },
    { name: 'MERCH', path: '/merch' },
    { name: 'CONTACT', path: '/contact' },
  ];

  const menuVariants = {
    hidden: { 
      opacity: 0, 
      y: -20,
      transition: { duration: 0.2, ease: "easeIn" }
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.3, 
        ease: "easeOut",
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const linkVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: "easeOut" } }
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-vortex-black/80 backdrop-blur-md border-b border-vortex-gray">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Logo Section */}
        <Link to="/" className="flex items-center gap-3 cursor-pointer group">
          <img 
            src={heroLogo} 
            alt="Vortex Prism Icon" 
            className="w-10 h-10 object-contain group-hover:scale-110 transition-transform duration-300"
          />
          <span className="font-display text-2xl font-black tracking-widest hidden sm:block">
            VORTEX <span className="text-prism">PRISM</span>
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex gap-10">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path} 
              className="relative group font-display text-sm tracking-widest text-vortex-light hover:text-prism-animated transition-all duration-300"
            >
              {link.name}
              <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-prism-gradient transition-all duration-300 ease-in-out group-hover:w-full"></span>
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center text-vortex-light">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="font-display tracking-widest text-sm border border-vortex-gray px-4 py-2 hover:border-vortex-muted transition-colors w-24"
          >
            {isOpen ? 'CLOSE' : 'MENU'}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu powered by Framer Motion */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="md:hidden absolute top-20 left-0 w-full bg-vortex-black/95 backdrop-blur-xl border-b border-vortex-gray shadow-2xl overflow-hidden"
          >
            <div className="flex flex-col px-6 py-8 gap-8">
              {navLinks.map((link) => (
                <motion.div key={link.name} variants={linkVariants}>
                  <Link 
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className="block font-display text-xl font-bold tracking-widest text-vortex-light hover:text-prism-animated transition-all duration-300 w-full"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;