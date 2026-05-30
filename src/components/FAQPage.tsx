import React, { useState } from 'react';
import { HelpCircle, ChevronDown, Search, Phone, MessageSquare, ShieldCheck, Clock, MapPin, Zap } from 'lucide-react';
import { FAQ_CATEGORIES } from '../faqData';
import { motion, AnimatePresence } from 'motion/react';

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState<string>("services-diagnostics");
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState("");

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Get currently selected tab category
  const selectedCategory = FAQ_CATEGORIES.find(cat => cat.id === activeCategory) || FAQ_CATEGORIES[0];

  // Flat list of all FAQs for searchable mode
  const allFaqs = FAQ_CATEGORIES.flatMap(cat => 
    cat.items.map(item => ({ ...item, categoryTitle: cat.title }))
  );

  // Filter FAQs based on search input
  const filteredFaqs = searchQuery.trim() === ""
    ? selectedCategory.items
    : allFaqs.filter(faq => 
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      );

  return (
    <div className="bg-zinc-950 text-white min-h-screen py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        
        {/* Page Title & Intro */}
        <div className="text-center mb-12">
          <span className="text-xs font-mono uppercase text-yellow-500 tracking-widest block mb-2 font-bold bg-yellow-500/10 border border-yellow-500/20 px-3.5 py-1.5 rounded-full w-fit mx-auto select-none">
            💡 100% TRANSPARENCY: FAQS FOR DRIVERS
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white uppercase mt-4 mb-3">
            Frequently Asked Questions
          </h1>
          <p className="text-zinc-400 text-sm sm:text-base max-w-xl mx-auto">
            Find immediate answers regarding pricing, service warranties, radiator repairs, industrial rewinding, and home-service coverage.
          </p>
        </div>

        {/* Real-time Search Box */}
        <div className="relative max-w-lg mx-auto mb-10">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
            <Search className="w-5 h-5" />
          </div>
          <input
            type="text"
            placeholder="Search questions (e.g. radiator, starter, warranty)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 focus:border-yellow-500 focus:outline-none rounded-2xl pl-11 pr-4 py-3.5 text-sm text-white placeholder-zinc-500 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-xs font-mono text-zinc-500 hover:text-white"
            >
              Clear
            </button>
          )}
        </div>

        {/* Categories Tab Selector (Hidden if searching) */}
        {searchQuery.trim() === "" && (
          <div className="flex justify-center gap-2 mb-8 overflow-x-auto pb-2 scrollbar-none">
            {FAQ_CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCategory(cat.id);
                    setOpenIndex(0); // auto-open first Q on tab switch
                  }}
                  className={`px-4 py-2.5 rounded-xl border text-xs font-bold font-mono uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-yellow-500 border-yellow-500 text-zinc-950 shadow-lg shadow-yellow-500/10'
                      : 'bg-zinc-900 border-zinc-850 text-zinc-400 hover:text-white hover:border-zinc-700'
                  }`}
                >
                  {cat.title}
                </button>
              );
            })}
          </div>
        )}

        {/* FAQ Display Area */}
        <div className="bg-zinc-900 border border-zinc-805 rounded-3xl p-5 sm:p-8 shadow-2xl">
          {searchQuery.trim() !== "" && (
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block mb-4">
              Found {filteredFaqs.length} match{filteredFaqs.length !== 1 ? 'es' : ''} for &ldquo;{searchQuery}&rdquo;:
            </span>
          )}

          <div className="space-y-4">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, index) => {
                const isOpen = searchQuery.trim() !== "" || openIndex === index;
                return (
                  <div
                    key={index}
                    className="border border-zinc-800 bg-zinc-950/40 rounded-2xl overflow-hidden transition-colors hover:border-zinc-700"
                  >
                    <button
                      onClick={() => searchQuery.trim() === "" && handleToggle(index)}
                      className={`w-full text-left p-5 flex justify-between items-start gap-4 text-sm sm:text-base font-bold text-white hover:text-yellow-500 transition-colors uppercase font-mono tracking-tight ${
                        searchQuery.trim() !== "" ? 'cursor-default' : 'cursor-pointer'
                      }`}
                    >
                      <span>{faq.question}</span>
                      {searchQuery.trim() === "" && (
                        <ChevronDown className={`w-4 h-4 text-zinc-500 transition-transform duration-300 mt-1 shrink-0 ${isOpen ? 'rotate-180 text-yellow-500' : ''}`} />
                      )}
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.15 }}
                        >
                          <div className="p-5 pt-0 border-t border-zinc-850/60 text-zinc-400 text-xs sm:text-sm leading-relaxed font-sans relative">
                            {faq.answer}
                            {'categoryTitle' in faq && (
                              <span className="absolute bottom-2 right-4 text-[9px] font-mono text-zinc-650 tracking-wider">
                                IN: {faq.categoryTitle}
                              </span>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-10">
                <p className="text-zinc-500 text-sm">No FAQs match your search. Try adjusting your query!</p>
                <button
                  onClick={() => setSearchQuery("")}
                  className="mt-4 px-4 py-2 bg-zinc-850 hover:bg-zinc-800 text-zinc-300 font-bold rounded-xl text-xs uppercase cursor-pointer"
                >
                  Reset Search Filter
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Dynamic Helpdesk Box for Questions not found */}
        <div className="mt-12 bg-gradient-to-r from-zinc-950 to-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row justify-between items-center gap-6 shadow-xl leading-relaxed">
          <div className="flex items-center gap-4 text-left">
            <span className="w-12 h-12 rounded-full bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center text-yellow-500 shrink-0">
              <Zap className="w-5 h-5 fill-current animate-pulse" />
            </span>
            <div>
              <h4 className="text-lg font-bold text-white tracking-tight uppercase">Have a specific vehicle fault?</h4>
              <p className="text-zinc-400 text-xs sm:text-sm mt-0.5 max-w-md">
                Don&rsquo;t play guessing games with your car’s computer boards. Speaks with an RBB Master technician directly to get high-fidelity technical advice.
              </p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0 justify-end">
            <a
              href="mailto:jannlester123@gmail.com"
              className="text-center px-4 py-3 bg-zinc-950 hover:bg-zinc-900 text-zinc-300 hover:text-white rounded-xl text-xs font-mono font-bold border border-zinc-800 transition-all uppercase"
            >
              ✉️ Email Desk
            </a>
            <a
              href="https://m.me/rbbautoelectrical"
              target="_blank"
              rel="noopener noreferrer"
              className="text-center px-4 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold transition-all uppercase flex items-center justify-center gap-1.5"
            >
              <MessageSquare className="w-3.5 h-3.5 fill-current" />
              <span>Messenger Desk</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
