import { useState, useEffect, MouseEvent } from 'react';
import { Filter, Eye, ChevronLeft, ChevronRight, X, Calendar, Car, ZoomIn, Grid } from 'lucide-react';
import { GALLERY_ITEMS } from '../data';
import { GalleryItem } from '../types';
import { motion, AnimatePresence } from 'motion/react';

export default function GalleryGrid() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeImageIdx, setActiveImageIdx] = useState<number | null>(null);
  const [gridColumns, setGridColumns] = useState<number>(3); // Desired grid columns on desktop

  // Handle auto screen sizes to adapt columns nicely
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setGridColumns(1);
      } else if (window.innerWidth < 1024) {
        setGridColumns(2);
      } else {
        setGridColumns(3);
      }
    };
    handleResize(); // trigger once on mount
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const categories = [
    { label: 'All Projects', value: 'all' },
    { label: 'Diagnostics', value: 'diagnostics' },
    { label: 'Battery', value: 'battery' },
    { label: 'Wiring & Alternator', value: 'wiring' },
    { label: 'Aircon & AC Fixes', value: 'aircon' },
    { label: 'Lighting systems', value: 'lighting' },
    { label: 'ECU Programming', value: 'ecu' }
  ];

  const filteredItems = GALLERY_ITEMS.filter((item) => {
    if (selectedCategory === 'all') return true;
    return item.category === selectedCategory;
  });

  const handlePrevImage = (e?: MouseEvent) => {
    e?.stopPropagation();
    if (activeImageIdx !== null) {
      setActiveImageIdx((prev) => (prev !== null && prev > 0 ? prev - 1 : filteredItems.length - 1));
    }
  };

  const handleNextImage = (e?: MouseEvent) => {
    e?.stopPropagation();
    if (activeImageIdx !== null) {
      setActiveImageIdx((prev) => (prev !== null && prev < filteredItems.length - 1 ? prev + 1 : 0));
    }
  };

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeImageIdx === null) return;
      if (e.key === 'ArrowLeft') handlePrevImage();
      if (e.key === 'ArrowRight') handleNextImage();
      if (e.key === 'Escape') setActiveImageIdx(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeImageIdx, filteredItems]);

  const activeLightboxItem = activeImageIdx !== null ? filteredItems[activeImageIdx] : null;

  // Render flexible grid column classes dynamically to enforce physical custom columns selector
  const getGridColClass = () => {
    if (gridColumns === 1) return 'grid-cols-1';
    if (gridColumns === 2) return 'grid-cols-1 sm:grid-cols-2';
    if (gridColumns === 4) return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4';
    return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'; // Default 3 cols
  };

  return (
    <section id="gallery" className="scroll-mt-16 py-16 px-4 bg-zinc-950 text-white">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center md:max-w-3xl md:mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-yellow-500/10 border border-yellow-500/30 rounded-full text-yellow-500 text-xs font-mono mb-3 uppercase tracking-wider">
            <Grid className="w-3.5 h-3.5" />
            <span>Interactive Workshop Showcase</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
            Our Interactive Project Gallery & Jobs
          </h2>
          <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
            Real photos from our professional workshops in Parañaque &amp; Pasig. Witness our precise auto-electrical testing, master motor rewinding, and detailed system diagnostics.
          </p>
        </div>

        {/* Filters and Flexible Sizing Toolbar */}
        <div className="flex flex-col md:flex-row gap-5 items-stretch md:items-center justify-between pb-6 mb-8 border-b border-zinc-800">
          
          {/* Category Filter list */}
          <div className="flex flex-wrap gap-1.5 p-1 bg-zinc-900 border border-zinc-850 rounded-xl overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => {
                  setSelectedCategory(cat.value);
                  setActiveImageIdx(null); // Reset lightbox indexes just in case
                }}
                className={`text-xs font-medium px-3.5 py-1.5 rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCategory === cat.value
                    ? 'bg-yellow-500 text-zinc-950 font-bold'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Grid Layout flexible columns selector */}
          <div className="hidden sm:flex items-center gap-3 self-end md:self-auto bg-zinc-900 px-4 py-2 border border-zinc-80s rounded-xl">
            <span className="text-xs font-mono text-zinc-500 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" />
              <span>Grid Columns:</span>
            </span>
            <div className="flex gap-1.5">
              {[2, 3, 4].map((colNum) => (
                <button
                  key={colNum}
                  onClick={() => setGridColumns(colNum)}
                  className={`w-7- h-7 px-2 py-0.5 rounded text-xs font-mono font-bold transition-all ${
                    gridColumns === colNum
                      ? 'bg-zinc-800 text-yellow-500 border border-zinc-700'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-800/40'
                  }`}
                  title={`${colNum} Columns Grid`}
                >
                  {colNum}x
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Gallery Grid Layout with flexible column sizing */}
        <motion.div
          layout
          className={`grid ${getGridColClass()} gap-6 transition-all duration-500`}
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="group relative bg-zinc-900 border border-zinc-850 rounded-2xl overflow-hidden shadow-lg cursor-pointer transform transition-all hover:-translate-y-1 block duration-300"
                onClick={() => setActiveImageIdx(index)}
              >
                {/* Image Wrap */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-950">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500 filter brightness-95 group-hover:brightness-100"
                  />
                  
                  {/* Photo Overlay hover filter */}
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-50/20 via-zinc-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="bg-yellow-500 text-zinc-950 p-3 rounded-full shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <ZoomIn className="w-5 h-5 font-bold" />
                    </div>
                  </div>

                  {/* Category Pill Tag */}
                  <span className="absolute top-3.5 left-3.5 bg-zinc-900/90 text-[10px] font-mono uppercase text-yellow-500 px-2.5 py-1 rounded border border-zinc-800 tracking-wider">
                    {item.category}
                  </span>
                </div>

                {/* Card Info footer */}
                <div className="p-5 border-t border-zinc-850 bg-zinc-900/90 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 text-zinc-500 text-[11px] font-mono mb-2">
                      <Car className="w-3.5 h-3.5 text-yellow-500" />
                      <span className="text-zinc-400 font-sans font-medium">{item.vehicle}</span>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-white tracking-tight group-hover:text-yellow-400 transition-colors truncate">
                      {item.title}
                    </h3>
                    <p className="text-zinc-400 text-xs sm:text-sm mt-1 leading-relaxed line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                  
                  <div className="flex justify-between items-center mt-4 pt-3.5 border-t border-zinc-800/40 text-[10px] font-mono text-zinc-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{item.date}</span>
                    </span>
                    <span className="text-yellow-500 group-hover:underline flex items-center gap-0.5">
                      View details ↗
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty status */}
        {filteredItems.length === 0 && (
          <div className="text-center py-16 bg-zinc-900/50 rounded-2xl border border-zinc-800">
            <p className="text-zinc-500 text-sm font-mono mb-2">No repair photos available for this category yet.</p>
            <button
              onClick={() => setSelectedCategory('all')}
              className="text-xs text-yellow-500 hover:underline"
            >
              Reset Filters to View All Projects
            </button>
          </div>
        )}

        {/* Lightbox fullscreen viewer overlay */}
        <AnimatePresence>
          {activeLightboxItem && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-zinc-950/95 backdrop-blur-md flex flex-col items-center justify-center p-3 sm:p-5 md:p-8 select-none"
              onClick={() => setActiveImageIdx(null)}
            >
              {/* Close Button top right */}
              <button
                onClick={() => setActiveImageIdx(null)}
                className="absolute top-5 right-5 p-2 bg-zinc-900/90 border border-zinc-800 text-zinc-400 hover:text-white rounded-full transition-colors z-50 hover:scale-105"
                title="Close"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Lightbox Layout wrapper */}
              <div 
                className="max-w-5xl w-full flex flex-col items-center z-10"
                onClick={(e) => e.stopPropagation()} // stop parent from closing
              >
                {/* Photo Viewer block */}
                <div className="relative w-full aspect-[4/3] md:aspect-[16/10] bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 flex items-center justify-center">
                  <img
                    src={activeLightboxItem.imageUrl}
                    alt={activeLightboxItem.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />

                  {/* Left arrow trigger */}
                  <button
                    onClick={handlePrevImage}
                    className="absolute left-4 p-3 bg-zinc-900/80 border border-zinc-800 rounded-full text-zinc-300 hover:text-white hover:bg-zinc-800 transition-all z-10"
                    title="Previous Job"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>

                  {/* Right arrow trigger */}
                  <button
                    onClick={handleNextImage}
                    className="absolute right-4 p-3 bg-zinc-900/80 border border-zinc-800 rounded-full text-zinc-300 hover:text-white hover:bg-zinc-800 transition-all z-10"
                    title="Next Job"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>

                {/* Photo caption metadata footer */}
                <div className="w-full mt-5 bg-zinc-900 border border-zinc-800 rounded-2xl p-5 sm:p-6 text-left">
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono tracking-wider bg-yellow-500 text-zinc-950 px-2.5 py-1 rounded font-bold uppercase">
                        {activeLightboxItem.category}
                      </span>
                      <span className="text-zinc-500">•</span>
                      <div className="flex items-center gap-1 text-zinc-400 text-xs font-mono">
                        <Car className="w-3.5 h-3.5 text-yellow-500" />
                        <span>{activeLightboxItem.vehicle}</span>
                      </div>
                    </div>
                    <span className="text-zinc-500 text-xs font-mono flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{activeLightboxItem.date} Finished</span>
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-2">
                    {activeLightboxItem.title}
                  </h3>
                  <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
                    {activeLightboxItem.description}
                  </p>

                  <div className="mt-5 pt-4 border-t border-zinc-850 flex items-center justify-between text-xs text-zinc-500">
                    <span>Use ← and → keys to browse gallery</span>
                    <button
                      onClick={() => setActiveImageIdx(null)}
                      className="text-yellow-500 hover:underline hover:text-yellow-400 font-bold"
                    >
                      Return to Gallery Grid
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
