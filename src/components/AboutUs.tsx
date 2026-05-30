import React from 'react';
import { Award, ShieldCheck, MapPin, Zap, Hammer, BadgeCheck, HelpCircle, Phone, ArrowUpRight } from 'lucide-react';

export default function AboutUs() {
  return (
    <div className="bg-zinc-950 text-white min-h-screen py-12 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        
        {/* Page Title & Intro */}
        <div className="text-center mb-16">
          <span className="text-xs font-mono uppercase text-yellow-500 tracking-widest block mb-2 font-bold bg-yellow-500/10 border border-yellow-500/20 px-3.5 py-1.5 rounded-full w-fit mx-auto select-none">
            ⚡ ESTABLISHED COILS & AUTO CLINIC
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white uppercase mt-4 mb-4">
            About Our Repair Center
          </h1>
          <p className="text-zinc-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            RBB Auto Electrical and Motor Rewinding Center is a specialized engineering shop focused purely on starting, charging, cooling, and winding systems.
          </p>
        </div>

        {/* 1. Core specializations vs General Repair */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center mb-16">
          <div className="md:col-span-7 space-y-6">
            <span className="text-xs font-mono text-yellow-500 font-bold uppercase tracking-wider block">
              🔧 ARCHITECTURAL SPECIALIZATION
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white uppercase font-sans">
              We Stay Hyper-Focused So You Get Precision
            </h2>
            <div className="text-zinc-350 text-sm sm:text-base space-y-4 leading-relaxed font-sans">
              <p>
                Unlike generalized repair shops that divide their focus across transmissions, alignments, and mechanics, <strong>RBB is an electrical and winding specialist.</strong> We concentrate our elite labor exclusively on what we do best: rebuilding alternators, diagnostics, radiator overheating, and single/three-phase industrial motor rewinding.
              </p>
              <p>
                By limiting our core services to these crucial electrical and rotating components, we maintain higher-fidelity technical knowledge, specialized testing tools, and authentic OEM-grade coil stocks.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4 pt-2">
              <div className="flex items-center gap-2 text-xs font-mono border border-zinc-800 bg-zinc-950 px-4 py-2 rounded-xl text-yellow-500 text-bold bg-yellow-500/5">
                🛡️ TESDA Certified Specialists
              </div>
              <div className="flex items-center gap-2 text-xs font-mono border border-zinc-800 bg-zinc-950 px-4 py-2 rounded-xl text-yellow-500 text-bold bg-yellow-500/5">
                ⚡ OEM Alternators & Starters
              </div>
            </div>
          </div>
          
          <div className="md:col-span-5 bg-zinc-90 w-full min-h-[250px] border border-zinc-850 hover:border-zinc-800 bg-zinc-900/40 rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all group">
            <div>
              <span className="p-3 bg-yellow-500/10 text-yellow-500 text-xs font-mono font-bold rounded-xl w-fit block mb-6 select-none border border-yellow-500/20">
                🚀 COILS, COPPER & CIRCUITS
              </span>
              <h3 className="text-lg font-black text-white uppercase mb-2 leading-tight">Starters &amp; Alternators Restoration</h3>
              <p className="text-zinc-400 text-xs leading-relaxed">
                We handle rebuilding, winding core fields, and replacing carbon brushes or solenoids for commercial fleets and private cars.
              </p>
            </div>
            <div className="text-[10px] font-mono text-zinc-550 border-t border-zinc-800/80 pt-4 flex justify-between items-center mt-6">
              <span>EST. 8:00 AM - 5:00 PM SPECIALISTS</span>
              <span className="text-yellow-505 font-bold">100% TRANS TRANSPARENCY</span>
            </div>
          </div>
        </div>

        {/* 2. Registered Local Yards */}
        <div id="physical-yards" className="mb-16">
          <div className="text-center mb-10">
            <span className="text-xs font-mono text-yellow-500 uppercase tracking-widest block font-bold">
              📍 METRO MANILA PRESENCE
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white uppercase mt-2">
              Our Two Secure Physical Workshop Yards
            </h2>
            <p className="text-zinc-500 text-xs sm:text-sm mt-1 max-w-lg mx-auto">
              Our facilities are fully staffed, highly accessible, and equipped with precision testing benches. Walk-ins are always welcome.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Parañaque Branch */}
            <div className="bg-zinc-900 border border-zinc-805 rounded-3xl p-6 sm:p-8 hover:border-zinc-700 transition-all text-left flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono text-yellow-500 font-bold uppercase tracking-wider block mb-2">
                  ⭐ MAIN WORKSHOP HEADQUARTERS
                </span>
                <h3 className="text-xl font-bold text-white uppercase mb-3">Parañaque Branch (Sucat)</h3>
                <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mb-6">
                  Conveniently situated along Dr. A. Santos Avenue (Sucat Road), right besides Petron. Our flagship yard carries advanced computerized car diagnostic systems, heavy-duty rewinding lathes, and diagnostic benches to complete quick alternator rebuilds and custom starter troubleshooting.
                </p>
              </div>
              
              <div className="pt-4 border-t border-zinc-800 flex flex-col gap-3">
                <a href="tel:09914683462" className="text-xs font-mono text-yellow-500 hover:underline flex items-center gap-1">
                  📞 Main Lines: <span className="font-bold text-white">0991 468 3462</span>
                </a>
                <a 
                  href="https://maps.google.com/?q=RBB+Auto+Electrical+Paranaque"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-fit text-xs font-mono uppercase bg-zinc-950 hover:bg-yellow-500 hover:text-zinc-950 px-4 py-2.5 rounded-xl border border-zinc-800 transition-all flex items-center gap-1.5 cursor-pointer mt-2"
                >
                  <span>Route on Google Maps</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Pasig Branch */}
            <div className="bg-zinc-900 border border-zinc-805 rounded-3xl p-6 sm:p-8 hover:border-zinc-700 transition-all text-left flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono text-yellow-500 font-bold uppercase tracking-wider block mb-2">
                  ⭐ REWINDING & REPAIR HUB
                </span>
                <h3 className="text-xl font-bold text-white uppercase mb-3">Pasig Branch (Pinagbuhatan)</h3>
                <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mb-6">
                  Centrally located along Sandoval Avenue, Pinagbuhatan, Pasig City. This branch caters to individual drivers, construction projects, and manufacturing facilities in East Metro Manila, providing skilled AC/DC motor rebuilding, field coil winding, and swift starter restorations.
                </p>
              </div>
              
              <div className="pt-4 border-t border-zinc-800 flex flex-col gap-3">
                <a href="tel:09952302458" className="text-xs font-mono text-yellow-500 hover:underline flex items-center gap-1">
                  📞 Pasig Line: <span className="font-bold text-white">0995 230 2458</span>
                </a>
                <a 
                  href="https://maps.google.com/?q=RBB+Auto+Electrical+Pasig"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-fit text-xs font-mono uppercase bg-zinc-950 hover:bg-yellow-500 hover:text-zinc-950 px-4 py-2.5 rounded-xl border border-zinc-800 transition-all flex items-center gap-1.5 cursor-pointer mt-2"
                >
                  <span>Route on Google Maps</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Customer-First approach */}
        <div className="bg-gradient-to-r from-zinc-950 to-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-10 text-left">
          <div className="max-w-3xl">
            <span className="text-xs font-mono text-yellow-500 font-bold uppercase tracking-wider block mb-2">
              🤝 HONEST ESTIMATES & DRIVE-IN BENCHMARKS
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white uppercase mb-4">The RBB Customer-First Principle</h3>
            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mb-6">
              We do not believe in unverified promises or hidden surcharge metrics. When you drive inside any of our RBB yards, you receive an upfront, itemized labor quote before we perform any winding or part replacement. 
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className="text-yellow-500 text-sm">✓</span>
                <span className="text-zinc-300">100% Free Drive-in OBD2 Scanner Visits</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-yellow-500 text-sm">✓</span>
                <span className="text-zinc-300">No Hard-Sell or Unsolicited Add-on Swaps</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-yellow-500 text-sm">✓</span>
                <span className="text-zinc-300">TESDA NC II Certified Auto Veterans</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-yellow-500 text-sm">✓</span>
                <span className="text-zinc-300">Original Copper Coils & Field Jigs used</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
