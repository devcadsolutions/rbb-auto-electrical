import { useState, useEffect } from 'react';
import { Menu, X, Phone, MapPin, Zap, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  onNavigate: (section: string) => void;
  activeSection: string;
  currentView: 'home' | 'diagnose' | 'services' | 'gallery' | 'booking' | 'about' | 'faqs' | 'contact';
  onViewChange: (view: 'home' | 'diagnose' | 'services' | 'gallery' | 'booking' | 'about' | 'faqs' | 'contact') => void;
}

export default function Navbar({ onNavigate, activeSection, currentView, onViewChange }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', section: 'home' },
    { label: 'Services', section: 'services' },
    { label: 'About', section: 'about' },
    { label: 'FAQs', section: 'faqs' },
    { label: 'Contact', section: 'contact' },
  ];

  const handleNavClick = (sectionId: string) => {
    onViewChange(sectionId as any);
    onNavigate(sectionId);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <>
      {/* Top Banner Contact Strip - Desktop only */}
      <div className="hidden md:flex bg-zinc-950 text-zinc-100 py-2.5 px-6 border-b border-zinc-800 text-xs justify-between items-center font-mono tracking-tight shrink-0">
        <div className="flex gap-6 items-center">
          <span className="flex items-center gap-1.5 text-yellow-400">
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span>TESDA Certified Auto Electrical &amp; Rewinding Experts</span>
          </span>
          <span className="flex items-center gap-1.5 text-zinc-400">
            <Clock className="w-3.5 h-3.5" />
            <span>Mon - Sat: 8:00 AM - 5:00 PM</span>
          </span>
        </div>
        <div className="flex gap-6 items-center">
          <a
            href="tel:09914683462"
            className="flex items-center gap-1.5 hover:text-yellow-400 transition-colors text-yellow-500 font-bold"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Call: 0991 468 3462 / 0929 665 3193</span>
          </a>
          <span className="flex items-center gap-1.5 text-zinc-400">
            <MapPin className="w-3.5 h-3.5" />
            <span>Parañaque (Main) &amp; Pasig Branches</span>
          </span>
        </div>
      </div>

      {/* Main Header */}
      <header
        id="navbar"
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-zinc-900/95 backdrop-blur-md shadow-lg border-b border-zinc-800 py-3'
            : 'bg-zinc-900 py-4 border-b border-zinc-800'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Logo Brand Brand */}
          <div 
            onClick={() => handleNavClick('home')} 
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center shadow-md shadow-yellow-500/20 group-hover:scale-105 transition-transform">
              <Zap className="w-6 h-6 text-zinc-950 font-black fill-current" />
            </div>
            <div>
              <span className="text-lg font-bold tracking-tight text-white block leading-none">
                RBB <span className="text-yellow-500">AUTO ELECTRICAL</span>
              </span>
              <span className="text-[10px] font-mono text-zinc-400 tracking-wider uppercase block mt-1">
                &amp; MOTOR REWINDING CENTER
              </span>
            </div>
          </div>

          {/* Desktop Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.section;
              return (
                <button
                  key={item.section}
                  onClick={() => handleNavClick(item.section)}
                  className={`relative px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 cursor-pointer ${
                    isActive
                      ? 'text-yellow-500 font-semibold'
                      : 'text-zinc-300 hover:text-white'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavTab"
                      className="absolute inset-0 bg-zinc-800/65 rounded-md -z-10"
                      transition={{ type: "spring", stiffness: 350, damping: 28 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Action Call Button on Desktop */}
          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={() => handleNavClick('booking')}
              className="bg-yellow-500 hover:bg-yellow-400 text-zinc-950 px-5 py-2 text-sm font-bold rounded-lg transition-transform hover:-translate-y-0.5 active:translate-y-0 shadow-md shadow-yellow-500/10 cursor-pointer"
            >
              Book Electrical Scan
            </button>
          </div>

          {/* Mobile hamburger trigger */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ type: "spring", stiffness: 280, damping: 26 }}
            className="fixed inset-x-0 top-[65px] md:hidden z-30 bg-zinc-900 border-b border-zinc-800 shadow-2xl p-5"
          >
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <button
                  key={item.section}
                  onClick={() => handleNavClick(item.section)}
                  className={`w-full text-left py-3 px-4 rounded-lg text-base font-medium transition-colors ${
                    activeSection === item.section
                      ? 'text-yellow-500 bg-zinc-800/80 font-semibold'
                      : 'text-zinc-300 hover:text-white hover:bg-zinc-800/40'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              
              <div className="mt-4 pt-4 border-t border-zinc-800 flex flex-col gap-3">
                <a
                  href="tel:09914683462"
                  className="flex items-center justify-center gap-2.5 w-full bg-yellow-500 text-zinc-950 py-3 rounded-lg font-bold text-center hover:bg-yellow-400"
                >
                  <Phone className="w-5 h-5" />
                  <span>Call Main Branch</span>
                </a>
                <button
                  onClick={() => handleNavClick('booking')}
                  className="w-full text-center py-3 bg-zinc-800 text-white rounded-lg font-bold hover:bg-zinc-700"
                >
                  Inquire / Book Appointment
                </button>
                <div className="flex justify-center gap-1 items-center mt-2 text-xs text-zinc-400 font-mono">
                  <span>📍 Parañaque &amp; Pasig</span>
                  <span className="mx-2">•</span>
                  <span>⚙️ Open 8AM - 5PM</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
