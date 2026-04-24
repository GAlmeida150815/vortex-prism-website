import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SearchableSelect = ({ label, options, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredOptions = options.filter(opt =>
    opt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-1 relative">
      <label className="text-[10px] text-vortex-muted font-bold tracking-widest uppercase">
        {label}
      </label>
      
      {/* Selector Button */}
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-vortex-black border border-vortex-gray text-vortex-light px-3 py-[9px] text-xs font-sans tracking-widest uppercase cursor-pointer flex justify-between items-center h-[36px] hover:border-vortex-muted transition-colors"
      >
        <span className="truncate pr-2">{value}</span>
        <svg className={`w-3 h-3 text-vortex-muted transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Invisible backdrop to detect outside clicks */}
            <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)}></div>
            
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
              className="absolute top-[100%] left-0 w-full mt-1 bg-vortex-black border border-vortex-gray z-50 shadow-2xl overflow-hidden"
            >
              {/* Dropdown Search Input */}
              <div className="p-2 border-b border-vortex-gray bg-vortex-dark/50">
                <input
                  type="text"
                  autoFocus
                  placeholder={`SEARCH ${label}...`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onClick={(e) => e.stopPropagation()} 
                  className="w-full bg-vortex-black border border-vortex-gray/50 text-white text-xs px-3 py-2 outline-none focus:border-prism transition-colors tracking-widest uppercase"
                />
              </div>
              
              {/* Options List */}
              <div className="max-h-64 overflow-y-auto bg-vortex-black [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                {filteredOptions.length > 0 ? (
                  filteredOptions.map(opt => (
                    <div
                      key={opt}
                      onClick={() => {
                        onChange(opt);
                        setIsOpen(false);
                        setSearchTerm("");
                      }}
                      className={`px-3 py-3 text-xs font-sans tracking-widest uppercase cursor-pointer hover:bg-vortex-dark hover:text-prism transition-colors border-l-2 ${value === opt ? 'border-prism text-prism bg-vortex-dark/50' : 'border-transparent text-vortex-light'}`}
                    >
                      {opt}
                    </div>
                  ))
                ) : (
                  <div className="px-3 py-4 text-xs text-vortex-muted font-sans tracking-widest uppercase text-center italic">
                    NO MATCHES
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchableSelect;