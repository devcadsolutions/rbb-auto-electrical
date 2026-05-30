import { useState } from 'react';
import { Cpu, BatteryCharging, Zap, GitBranch, Binary, Eye, Wind, Gauge, ChevronRight, Check } from 'lucide-react';
import { SERVICES } from '../data';
import { ServiceItem } from '../types';
import { motion, AnimatePresence } from 'motion/react';

const ICON_MAP: Record<string, any> = {
  Cpu,
  BatteryCharging,
  Zap,
  GitBranch,
  Binary,
  Eye,
  Wind,
  Gauge,
};

interface ServicesListProps {
  onSelectService: (serviceId: string) => void;
}

export default function ServicesList({ onSelectService }: ServicesListProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { label: 'All Repairs', value: 'all' },
    { label: 'Auto Electrical', value: 'auto-electrical' },
    { label: 'Motor Rewinding', value: 'rewinding' },
    { label: 'Radiator Overhaul', value: 'radiator' },
    { label: 'OEM Parts Select', value: 'parts' },
    { label: 'Convenience Desk', value: 'convenience' },
  ];

  const filteredServices = SERVICES.filter((s) => {
    if (selectedCategory === 'all') return true;
    return s.category === selectedCategory;
  });

  return (
    <section id="services" className="scroll-mt-16 py-16 px-4 bg-zinc-900 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="md:flex items-end justify-between mb-10">
          <div className="mb-6 md:mb-0 max-w-2xl">
            <span className="text-xs font-mono uppercase text-yellow-500 tracking-wider block mb-2 font-semibold">
              Authorized Service Catalog
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-3">
              Premium Auto Electrical Services
            </h2>
            <p className="text-zinc-400 text-sm md:text-base">
              From microscopic electronic diagnostics to complete vehicle rewiring looms. Every job is carried out by certified auto electricians with upfront quotes.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-1.5 p-1 bg-zinc-950 border border-zinc-800 rounded-xl">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.value;
              return (
                <button
                  key={cat.value}
                  onClick={() => setSelectedCategory(cat.value)}
                  className={`relative px-3.5 py-1.5 rounded-lg text-xs font-semibold font-sans transition-colors cursor-pointer ${
                    isActive
                      ? 'text-yellow-500 font-bold'
                      : 'text-zinc-400 hover:text-zinc-100'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeCatalogCategory"
                      className="absolute inset-0 bg-zinc-805 border border-zinc-750/70 rounded-lg -z-10"
                      transition={{ type: "spring", stiffness: 350, damping: 28 }}
                    />
                  )}
                  <span className="relative z-10">{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Services Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredServices.map((service, index) => {
              const IconComponent = ICON_MAP[service.iconName] || Zap;
              return (
                <motion.div
                  layout
                  key={service.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.28, ease: "easeInOut" }}
                  className="bg-zinc-950 border border-zinc-800/80 hover:border-zinc-700/85 rounded-2xl p-5 sm:p-6 transition-all duration-300 hover:shadow-xl hover:shadow-yellow-500/[0.015] flex flex-col justify-between group"
                >
                  <div>
                    {/* Card Header Icon & Category */}
                    <div className="flex justify-between items-start mb-5">
                      <div className="w-11 h-11 bg-zinc-900 border border-zinc-800 rounded-xl flex items-center justify-center text-yellow-500 group-hover:bg-yellow-500 group-hover:text-zinc-950 transition-colors duration-300 shadow-inner">
                        <IconComponent className="w-5.5 h-5.5" />
                      </div>
                      <span className="text-xs font-semibold px-2.5 py-1 bg-zinc-900 border border-zinc-800/80 text-zinc-400 rounded-md uppercase tracking-wider font-mono">
                        {service.priceRange}
                      </span>
                    </div>

                    {/* Title & Description */}
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors duration-200">
                      {service.title}
                    </h3>
                    <p className="text-zinc-400 text-sm leading-relaxed mb-5">
                      {service.description}
                    </p>

                    {/* Service bullet features */}
                    <div className="space-y-2 mb-6">
                      <span className="text-[11px] font-mono uppercase text-zinc-500 block tracking-wider font-semibold">
                        Includes:
                      </span>
                      <ul className="grid grid-cols-1 gap-1.5 text-xs text-zinc-300">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <Check className="w-3.5 h-3.5 text-yellow-500 shrink-0" />
                            <span className="truncate">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Card CTA Action button */}
                  <button
                    onClick={() => onSelectService(service.id)}
                    className="w-full bg-zinc-900 hover:bg-yellow-500 text-zinc-200 hover:text-zinc-950 py-2.5 px-4 text-xs font-bold rounded-lg border border-zinc-800 hover:border-yellow-500/10 transition-all duration-200 flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <span>Select Fix Inquire</span>
                    <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  </button>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Floating Call Assistance Strip */}
        <div className="mt-12 bg-gradient-to-r from-zinc-950 to-zinc-900 border border-zinc-800 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row justify-between items-center gap-6 shadow-md shadow-zinc-950/20">
          <div className="flex items-center gap-4">
            <span className="w-12 h-12 rounded-full bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center text-yellow-500 shrink-0">
              <Zap className="w-6 h-6 fill-current animate-pulse" />
            </span>
            <div>
              <h4 className="text-lg font-bold text-white tracking-tight">Want to Book a FREE Vehicle Check-Up &amp; Estimate?</h4>
              <p className="text-zinc-400 text-sm mt-0.5 leading-snug">
                Secure a preferred repair slot at our Sucat (Parañaque) or Sandoval Ave. (Pasig) workshops today.
              </p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
            <a
              href="tel:09914683462"
              className="w-full md:w-auto text-center px-5 py-3 bg-zinc-950 hover:bg-zinc-900 text-zinc-200 hover:text-white rounded-lg text-xs font-mono font-bold border border-zinc-800 transition-transform active:translate-y-0.5"
            >
              📞 SUCAT: 0991 468 3462
            </a>
            <a
              href="tel:09952302458"
              className="w-full md:w-auto text-center px-5 py-3 bg-yellow-500 hover:bg-yellow-400 text-zinc-950 rounded-lg text-xs font-mono font-bold transition-transform active:translate-y-0.5"
            >
              📞 PASIG: 0995 230 2458
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
