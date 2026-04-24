import { motion, AnimatePresence } from 'framer-motion';
import { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import SearchableSelect from '@/components/SearchableSelect';

const PLAYERS = {
  HNDR: 'HnDR', JFL: 'JFL', LIPWO: 'Lipwo', EDER: 'Eder',
  RAFA: 'Rafa', REFORMADO: 'Reformado', ICETAPZ: 'IceTapz'
};

const MAPS = {
  MIRAGE: 'Mirage', INFERNO: 'Inferno', NUKE: 'Nuke', OVERPASS: 'Overpass',
  VERTIGO: 'Vertigo', ANCIENT: 'Ancient', ANUBIS: 'Anubis', DUST2: 'Dust II',
  TRAIN: 'Train', OFFICE: 'Office', ITALY: 'Italy', MILLITIA: 'Militia'
};

const TAGS = {
  FUNNY: 'Funny', FAIL: 'Fail', BLAZE: 'Blaze', NINJA: 'Ninja',
  CLUTCH: 'Clutch', AWP: 'AWP', ACE: 'Ace', ONE_V_X: '1vX'
};

const PLATFORMS = {
  YOUTUBE: 'youtube', TWITCH: 'twitch'
};

const MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

const Highlights = () => {
  const clips = [
    {
      id: 1,
      title: "Bottle Flip ?!",
      player: PLAYERS.HNDR,
      match: MAPS.OFFICE,
      tags: [TAGS.FUNNY],
      date: "APR 2026",
      type: PLATFORMS.YOUTUBE,
      videoId: "ECuFCgvVppY"
    },
    {
      id: 2,
      title: "No Bullets 😒 ?",
      player: PLAYERS.JFL,
      match: MAPS.ANCIENT,
      tags: [TAGS.FAIL, TAGS.BLAZE],
      date: "MAY 2026",
      type: PLATFORMS.TWITCH,
      videoId: "WonderfulSourOcelotTwitchRaid-q1GJg_7i3MiBYq4X"
    },
    {
      id: 3,
      title: "1v2 Clutch",
      player: PLAYERS.LIPWO,
      match: MAPS.ANCIENT,
      tags: [TAGS.ONE_V_X, TAGS.BLAZE],
      date: "MAY 2026",
      type: PLATFORMS.TWITCH,
      videoId: "EnergeticBitterSoybeanKippa-W_ZmYtz-kixqYWSk"
    },
    {
      id: 4,
      title: "🥷 Defuse",
      player: PLAYERS.LIPWO,
      match: MAPS.ANCIENT,
      tags: [TAGS.NINJA, TAGS.ONE_V_X, TAGS.BLAZE],
      date: "MAY 2026",
      type: PLATFORMS.TWITCH,
      videoId: "PlumpEnjoyableMangoMrDestructoid-S5UVIQo4Z9_H1wNX"
    },
  ];

  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    player: "ALL",
    tag: "ALL",
    map: "ALL",
    date: "",
    platform: "ALL"
  });

  const [likedClips, setLikedClips] = useState(() => {
    try {
      const savedLikes = localStorage.getItem('vortex_liked_clips');
      return savedLikes ? JSON.parse(savedLikes) : [];
    } catch {
      return [];
    }
  });
  
  const [activeShareId, setActiveShareId] = useState(null);
  const [copiedClipId, setCopiedClipId] = useState(null);

  const [highlightedClipId, setHighlightedClipId] = useState(null);
  const clipRefs = useRef({});

  const [visibleCount, setVisibleCount] = useState(4);
  const observer = useRef();

  useEffect(() => {
    setVisibleCount(4);
  }, [searchQuery, filters]);

  const loadMoreRef = useCallback((node) => {
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setVisibleCount((prev) => prev + 4);
      }
    }, { rootMargin: "200px" });

    if (node) observer.current.observe(node);
  }, []);

  const formatClipDateToInput = (clipDate) => {
    if (!clipDate) return "";
    const [monthStr, year] = clipDate.split(" ");
    const monthIndex = MONTHS.indexOf(monthStr) + 1;
    const formattedMonth = monthIndex.toString().padStart(2, '0');
    return `${year}-${formattedMonth}`;
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sharedClipId = params.get('clip');
    
    if (sharedClipId) {
      const id = parseInt(sharedClipId, 10);
      setHighlightedClipId(id);
      
      const targetClip = clips.find(c => c.id === id);
      if (targetClip) {
        setSearchQuery(targetClip.title);
        
        setFilters({
          player: targetClip.player || "ALL",
          tag: "ALL",
          map: targetClip.match || "ALL",
          date: formatClipDateToInput(targetClip.date),
          platform: targetClip.type || "ALL"
        });
      }

      setTimeout(() => {
        if (clipRefs.current[id]) {
          clipRefs.current[id].scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);

      setTimeout(() => setHighlightedClipId(null), 4000);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLike = (clipId) => {
    setLikedClips((prevLikes) => {
      const newLikes = prevLikes.includes(clipId) 
        ? prevLikes.filter(id => id !== clipId) 
        : [...prevLikes, clipId];
      localStorage.setItem('vortex_liked_clips', JSON.stringify(newLikes));
      return newLikes;
    });
  };

  const handleSocialShare = async (platform, clip) => {
    const domain = window.location.origin;
    const url = `${domain}/highlights?clip=${clip.id}`;
    const text = `Check out this CS2 Highlight by ${clip.player}: "${clip.title}"!`;

    try {
      if (platform === 'twitter') {
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
      } else if (platform === 'whatsapp') {
        window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text + ' \n\n' + url)}`, '_blank');
      } else if (platform === 'discord') {
        await navigator.clipboard.writeText(`${text}\n\nWatch here: ${url}`);
        window.open('https://discord.com/app', '_blank');
      } else if (platform === 'instagram') {
        await navigator.clipboard.writeText(`${text}\n\nWatch here: ${url}`);
        window.open('https://instagram.com', '_blank');
      } else {
        await navigator.clipboard.writeText(`${text}\n\nWatch here: ${url}`);
      }
      
      setCopiedClipId(clip.id);
      setTimeout(() => setCopiedClipId(null), 2500);
    } catch (err) {
      console.error("Failed to share/copy:", err);
    }
    
    setActiveShareId(null);
  };

  const filterOptions = useMemo(() => {
    return {
      players: ["ALL", ...Object.values(PLAYERS)],
      tags: ["ALL", ...Object.values(TAGS)],
      maps: ["ALL", ...Object.values(MAPS)],
      platforms: ["ALL", ...Object.values(PLATFORMS)]
    };
  }, [clips]);

  const formatInputToClipDate = (yyyyMm) => {
    if (!yyyyMm) return "";
    const [year, month] = yyyMm.split("-");
    return `${MONTHS[parseInt(month, 10) - 1]} ${year}`;
  };

  const filteredClips = clips.filter(clip => {
    const matchesSearch = clip.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPlayer = filters.player === "ALL" || clip.player === filters.player;
    const matchesTag = filters.tag === "ALL" || (clip.tags && clip.tags.includes(filters.tag));
    const matchesMap = filters.map === "ALL" || clip.match === filters.map;
    const matchesDate = !filters.date || clip.date === formatInputToClipDate(filters.date);
    const matchesPlatform = filters.platform === "ALL" || clip.type === filters.platform;

    return matchesSearch && matchesPlayer && matchesTag && matchesMap && matchesDate && matchesPlatform;
  });

  const displayedClips = filteredClips.slice(0, visibleCount);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const getEmbedUrl = (clip) => {
    if (clip.type === PLATFORMS.YOUTUBE) {
      return `https://www.youtube.com/embed/${clip.videoId}?rel=0&modestbranding=1`;
    } 
    if (clip.type === PLATFORMS.TWITCH) {
      const domain = window.location.hostname;
      return `https://clips.twitch.tv/embed?clip=${clip.videoId}&parent=${domain}`;
    }
    return '';
  };

  const handleClearAll = () => {
    setSearchQuery("");
    setFilters({ player: "ALL", tag: "ALL", map: "ALL", date: "", platform: "ALL" });
  };

  return (
    <div className="relative min-h-[calc(100vh-5rem)] flex flex-col items-center px-6 py-24 overflow-hidden">
      
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-prism-gradient opacity-10 blur-[150px] rounded-full pointer-events-none -z-10"></div>

      <div className="w-full max-w-7xl mx-auto z-10 flex flex-col">
        
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
            Watch the roster dominate.
          </motion.p>
        </div>

        {/* --- CONTROLS / FILTERS BAR --- */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-12 flex flex-col gap-4 bg-vortex-dark/50 p-6 border border-vortex-gray rounded-sm backdrop-blur-sm relative z-50 shrink-0"
        >
          {/* Header & Clear All Box */}
          <div className="flex justify-between items-end mb-2 border-b border-vortex-gray/50 pb-3">
            <h2 className="font-display text-white font-bold tracking-widest text-lg">CLIP DATABASE</h2>
            <button 
              onClick={handleClearAll}
              className="text-xs text-vortex-muted hover:text-prism transition-colors font-bold tracking-[0.2em] uppercase border-b border-transparent hover:border-prism pb-0.5"
            >
              CLEAR ALL
            </button>
          </div>

          <div className="relative w-full">
            <input 
              type="text" 
              placeholder="SEARCH BY CLIP TITLE..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-vortex-black border border-vortex-gray px-4 py-3 font-sans text-sm tracking-widest text-white focus:outline-none focus:border-prism transition-colors uppercase"
            />
            {/* If there is a query, show an "X" button to quickly clear it, else show search icon */}
            {searchQuery ? (
               <button 
                 onClick={() => setSearchQuery("")}
                 className="absolute right-4 top-1/2 -translate-y-1/2 text-vortex-muted hover:text-white transition-colors"
               >
                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                 </svg>
               </button>
            ) : (
               <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-vortex-muted pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
               </svg>
            )}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <SearchableSelect label="Player" options={filterOptions.players} value={filters.player} onChange={(val) => handleFilterChange('player', val)} />
            <SearchableSelect label="Tag" options={filterOptions.tags} value={filters.tag} onChange={(val) => handleFilterChange('tag', val)} />
            <SearchableSelect label="Map" options={filterOptions.maps} value={filters.map} onChange={(val) => handleFilterChange('map', val)} />

            <div className="flex flex-col gap-1 relative">
              <div className="flex justify-between items-center">
                <label className="text-[10px] text-vortex-muted font-bold tracking-widest uppercase">Date</label>
                {filters.date && (
                  <button onClick={() => handleFilterChange('date', '')} className="text-[9px] text-vortex-muted hover:text-prism transition-colors tracking-widest">
                    CLEAR
                  </button>
                )}
              </div>
              <input 
                type="month" 
                value={filters.date}
                onChange={(e) => handleFilterChange('date', e.target.value)}
                style={{ colorScheme: 'dark' }} 
                className="w-full bg-vortex-black border border-vortex-gray text-vortex-light px-3 py-[7px] text-xs font-sans tracking-widest uppercase focus:outline-none focus:border-white cursor-pointer h-[36px]"
              />
            </div>

            <SearchableSelect label="Platform" options={filterOptions.platforms} value={filters.platform} onChange={(val) => handleFilterChange('platform', val)} />
          </div>
        </motion.div>

        {/* --- VIDEO GRID WITH ANIMATE PRESENCE --- */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-10 relative z-10 flex-grow">
          <AnimatePresence mode="popLayout">
            {displayedClips.length > 0 ? (
              displayedClips.map((clip) => {
                const isLiked = likedClips.includes(clip.id);
                const isCopied = copiedClipId === clip.id;
                const isShareOpen = activeShareId === clip.id;
                const isFocused = highlightedClipId === clip.id;

                return (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: -20, filter: "blur(5px)" }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    key={clip.id} 
                    ref={(el) => (clipRefs.current[clip.id] = el)}
                    className={`group flex flex-col bg-vortex-dark overflow-hidden transition-all duration-700 h-full relative ${
                      isFocused 
                        ? 'border border-[#8A2BE2] shadow-[0_0_30px_rgba(138,43,226,0.3)] z-20' 
                        : 'border border-vortex-gray hover:border-vortex-muted'
                    }`}
                  >
                    {/* 16:9 Video Container */}
                    <div className="relative w-full pt-[56.25%] bg-vortex-black border-b border-vortex-gray overflow-hidden">
                      <iframe 
                        className="absolute top-0 left-0 w-full h-full pointer-events-auto"
                        src={getEmbedUrl(clip)} 
                        title={clip.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen
                      ></iframe>
                    </div>

                    {/* Video Info Container */}
                    <div className="p-6 relative flex flex-col flex-grow">
                      <div className={`absolute top-0 left-0 w-full h-[2px] bg-prism-gradient origin-left transition-transform duration-500 ease-out z-0 ${isFocused ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></div>
                      
                      {/* Top line: Platform Badge */}
                      <div className="mb-4 relative z-10 flex justify-between items-start">
                        <span className={`inline-block px-2 py-1 text-[10px] font-bold tracking-widest uppercase rounded-sm ${clip.type === PLATFORMS.TWITCH ? 'bg-[#9146FF] text-white' : 'bg-[#FF0000] text-white'}`}>
                          {clip.type}
                        </span>
                        
                        <AnimatePresence>
                          {isFocused && (
                            <motion.span 
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0 }}
                              className="text-[10px] text-[#8A2BE2] font-bold tracking-[0.2em] uppercase"
                            >
                              SHARED CLIP
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Title & Dynamic Player Subtext */}
                      <div className="mb-6 relative z-10">
                        <h3 className="font-display text-2xl font-bold tracking-widest text-white group-hover:text-prism transition-colors duration-300">
                          {clip.title}
                        </h3>
                        {clip.player && (
                          <p className="font-sans text-xs font-bold tracking-[0.2em] text-vortex-muted uppercase mt-2">
                            BY {clip.player}
                          </p>
                        )}
                      </div>
                      
                      <div className="flex flex-col justify-end mt-auto gap-4 relative z-10">
                        {/* Tags Container */}
                        <div className="flex flex-wrap gap-2">
                          <span className="font-sans text-vortex-black font-bold tracking-[0.1em] uppercase text-xs px-3 py-1 bg-vortex-light rounded-sm">
                            {clip.match}
                          </span>
                          {clip.tags && clip.tags.map((tag, index) => (
                            <span 
                              key={index} 
                              className="font-sans text-vortex-muted font-bold tracking-[0.1em] uppercase text-xs px-3 py-1 border border-vortex-gray rounded-sm group-hover:border-vortex-muted transition-colors"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* --- FOOTER ROW: DATE & ACTIONS --- */}
                        <div className="flex justify-between items-center border-t border-vortex-gray/50 pt-4 mt-2">
                          <span className="font-sans text-vortex-muted tracking-widest text-xs">
                            {clip.date}
                          </span>
                          
                          {/* ACTION BUTTONS */}
                          <div className="flex items-center gap-4 relative">
                            
                            {/* Share Button & Popover Menu */}
                            <div className="relative">
                              <button 
                                onClick={() => setActiveShareId(isShareOpen ? null : clip.id)}
                                className={`flex items-center gap-2 transition-colors group/btn ${isCopied ? 'text-prism' : 'text-vortex-muted hover:text-white'}`}
                                title="Share Clip"
                              >
                                {isCopied ? (
                                  <span className="text-[10px] font-bold tracking-widest uppercase animate-in fade-in zoom-in duration-200">
                                    COPIED!
                                  </span>
                                ) : (
                                  <svg className="w-4 h-4 group-hover/btn:-translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                                  </svg>
                                )}
                              </button>

                              {/* The Share Where Popover Menu */}
                              <AnimatePresence>
                                {isShareOpen && (
                                  <>
                                    <div className="fixed inset-0 z-40" onClick={() => setActiveShareId(null)}></div>
                                    
                                    <motion.div
                                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                      animate={{ opacity: 1, y: 0, scale: 1 }}
                                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                      transition={{ duration: 0.2 }}
                                      className="absolute bottom-full right-0 mb-3 w-40 bg-vortex-black border border-vortex-gray shadow-2xl flex flex-col z-50 overflow-hidden"
                                    >
                                      <div className="px-3 py-2 border-b border-vortex-gray/50 text-[10px] text-vortex-muted tracking-widest uppercase font-bold bg-vortex-dark/50">
                                        Share Where?
                                      </div>
                                      
                                      <button onClick={() => handleSocialShare('twitter', clip)} className="text-left px-4 py-2 text-xs font-sans tracking-widest uppercase hover:bg-vortex-dark hover:text-prism border-l-2 border-transparent hover:border-prism transition-all">
                                        X (Twitter)
                                      </button>
                                      <button onClick={() => handleSocialShare('whatsapp', clip)} className="text-left px-4 py-2 text-xs font-sans tracking-widest uppercase hover:bg-vortex-dark hover:text-[#25D366] border-l-2 border-transparent hover:border-[#25D366] transition-all">
                                        WhatsApp
                                      </button>
                                      <button onClick={() => handleSocialShare('discord', clip)} className="text-left px-4 py-2 text-xs font-sans tracking-widest uppercase hover:bg-vortex-dark hover:text-[#5865F2] border-l-2 border-transparent hover:border-[#5865F2] transition-all">
                                        Discord
                                      </button>
                                      <button onClick={() => handleSocialShare('instagram', clip)} className="text-left px-4 py-2 text-xs font-sans tracking-widest uppercase hover:bg-vortex-dark hover:text-[#E1306C] border-l-2 border-transparent hover:border-[#E1306C] transition-all">
                                        Instagram
                                      </button>
                                      <div className="h-[1px] bg-vortex-gray/50 w-full my-1"></div>
                                      <button onClick={() => handleSocialShare('copy', clip)} className="text-left px-4 py-2 text-xs font-sans tracking-widest uppercase hover:bg-vortex-dark hover:text-white border-l-2 border-transparent hover:border-white transition-all text-vortex-muted">
                                        Copy Link
                                      </button>
                                    </motion.div>
                                  </>
                                )}
                              </AnimatePresence>
                            </div>

                            {/* Like Button */}
                            <button 
                              onClick={() => handleLike(clip.id)}
                              className={`transition-colors hover:scale-110 duration-200 ${isLiked ? 'text-red-500' : 'text-vortex-muted hover:text-red-400'}`}
                              title="Like Clip"
                            >
                              <svg className="w-5 h-5" fill={isLiked ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                              </svg>
                            </button>

                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })
            ) : (
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className={`col-span-1 md:col-span-2 py-20 text-center flex flex-col items-center justify-center`}
              >
                <svg className="w-16 h-16 text-vortex-gray mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <p className="font-display text-2xl text-vortex-muted tracking-widest">NO CLIPS FOUND</p>
                <button 
                  onClick={handleClearAll}
                  className="mt-4 font-sans text-xs font-bold tracking-[0.2em] text-white hover:text-prism transition-colors border-b border-transparent hover:border-prism pb-1"
                >
                  RESET FILTERS
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* --- INFINITE SCROLL OBSERVER TARGET --- */}
        {visibleCount < filteredClips.length && (
          <div ref={loadMoreRef} className="w-full flex justify-center items-center py-10 mt-8 shrink-0">
            <div className="flex flex-col items-center gap-3">
               <svg className="animate-spin h-6 w-6 text-prism" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
               </svg>
               <span className="text-vortex-muted text-[10px] font-bold tracking-[0.2em] uppercase animate-pulse">
                 LOADING MORE CLIPS
               </span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Highlights;