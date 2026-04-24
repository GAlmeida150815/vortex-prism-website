import { Link } from 'react-router-dom';
import heroLogo from '@/assets/hero_white.png';

const Navbar = () => {
  const navLinks = [
    { name: 'HOME', path: '/' },
    { name: 'ROSTER', path: '/roster' },
    { name: 'HIGHLIGHTS', path: '/highlights' },
    { name: 'CONTACT', path: '/contact' },
  ];

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
              className="relative group font-display text-sm tracking-widest text-vortex-light group-hover:text-prism-animated transition-all duration-300"
            >
              {link.name}
              
              <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-prism-gradient transition-all duration-300 ease-in-out group-hover:w-full"></span>
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center text-vortex-light">
          <button className="font-display tracking-widest text-sm border border-vortex-gray px-4 py-2 hover:border-vortex-muted transition-colors">
            MENU
          </button>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;