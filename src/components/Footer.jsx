import { Link } from 'react-router-dom';
import heroLogo from '@/assets/hero_white.png';

const Footer = () => {
  return (
    <footer className="bg-vortex-black border-t border-vortex-gray mt-10">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          
          {/* Brand Section */}
          <div className="flex flex-col items-start">
            <Link to="/" className="flex items-center gap-3 mb-4 cursor-pointer group">
              <img src={heroLogo} alt="Vortex Prism Icon" className="w-8 h-8 object-contain" />
              <span className="font-display text-xl font-black tracking-widest">
                VORTEX <span className="text-prism">PRISM</span>
              </span>
            </Link>
            <p className="text-vortex-muted font-sans text-sm max-w-xs leading-relaxed tracking-wider">
              Dominating the CS2 server. Follow our journey to the top of the competitive scene.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-start md:items-center">
            <h3 className="font-display font-bold text-white tracking-widest mb-4">NAVIGATION</h3>
            <ul className="flex flex-col gap-3 font-display text-sm tracking-widest text-vortex-muted">
              <li><Link to="/" className="hover:text-white transition-colors duration-300">HOME</Link></li>
              <li><Link to="/roster" className="hover:text-white transition-colors duration-300">ROSTER</Link></li>
              <li><Link to="/highlights" className="hover:text-white transition-colors duration-300">HIGHLIGHTS</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors duration-300">CONTACT</Link></li>
            </ul>
          </div>

          {/* Socials / Connect */}
          <div className="flex flex-col items-start md:items-end">
            <h3 className="font-display font-bold text-white tracking-widest mb-4">CONNECT</h3>
            <div className="flex flex-col md:items-end gap-3 font-display text-sm tracking-widest">
              <a href="https://www.instagram.com/vortexprism" target="_blank" rel="noreferrer" className="text-vortex-muted hover:text-white hover:-translate-y-1 transition-all duration-300">INSTAGRAM</a>
              <a href="https://www.youtube.com/@VortexPrism-cs2" target="_blank" rel="noreferrer" className="text-vortex-muted hover:text-white hover:-translate-y-1 transition-all duration-300">YOUTUBE</a>
              <a href="https://linktr.ee/vortexprismcs2" target="_blank" rel="noreferrer" className="text-vortex-muted hover:text-white hover:-translate-y-1 transition-all duration-300">LINKTREE</a>
              <a href="https://www.faceit.com/en/teams/cf2a0372-3005-4d9f-a6cf-84c150bceea0" target="_blank" rel="noreferrer" className="text-vortex-muted hover:text-[#FF5500] hover:-translate-y-1 transition-all duration-300">FACEIT</a>
            </div>
          </div>

        </div>

        {/* Bottom Copyright Area */}
        <div className="mt-12 pt-8 border-t border-vortex-gray flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-vortex-muted text-sm font-sans tracking-wider">
            &copy; {new Date().getFullYear()} Vortex Prisma. All rights reserved.
          </p>
          <p className="text-vortex-muted text-xs font-sans tracking-widest uppercase">
            Designed by <span className="text-prism font-bold">Eder</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;