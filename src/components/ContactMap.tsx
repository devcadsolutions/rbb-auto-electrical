import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, ExternalLink, ShieldCheck, Copy, Check, Info, Settings, Compass } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { APIProvider, Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';

const API_KEY =
  process.env.GOOGLE_MAPS_PLATFORM_KEY ||
  (import.meta as any).env?.VITE_GOOGLE_MAPS_PLATFORM_KEY ||
  (globalThis as any).GOOGLE_MAPS_PLATFORM_KEY ||
  '';
const hasValidKey = Boolean(API_KEY) && API_KEY !== 'YOUR_API_KEY' && API_KEY.trim() !== '';

interface BranchInfo {
  id: string;
  name: string;
  address: string;
  shortAddress: string;
  phones: string[];
  whatsapp: string;
  instagram: string;
  email: string;
  mapUrl: string;
  coordinates: { lat: number; lng: number };
  directions: string[];
}

const BRANCHES: BranchInfo[] = [
  {
    id: 'paranaque',
    name: 'Parañaque Main Branch',
    address: '8102 Dr. A. Santos Ave., Brgy. San Dionisio, Sucat, Parañaque City, (Beside Petron), 1700',
    shortAddress: 'Sucat, Parañaque City (beside Petron)',
    phones: ['0991 468 3462', '0929 665 3193'],
    whatsapp: '+63 991 468 3462',
    instagram: 'RBB Auto Electrical Shop',
    email: 'jannlester123@gmail.com',
    mapUrl: 'https://www.google.com/maps/place/RBB+Auto+Electrical+and+Motor+Rewinding+Center/@14.4829076,120.9924725,17z/data=!3m1!4b1!4m6!3m5!1s0x3397cf0021eadc83:0xedd92ac1cd4b9702!8m2!3d14.4829076!4d120.9950474!16s%2Fg%2F11xgvk18tr?entry=ttu',
    coordinates: { lat: 14.4829076, lng: 120.9950474 },
    directions: [
      'Located along Sucat Road (Dr. A. Santos Ave.), beside the Petron station.',
      'Look for the prominent yellow "R.B.B. Auto Electrical" signboard.',
      'Open for walk-ins on all battery, alternator, starter, and radiator jobs.'
    ]
  },
  {
    id: 'pasig',
    name: 'Pasig Branch',
    address: '0270 Sandoval Ave., Brgy. Pinagbuhatan, Pasig City, Metro Manila',
    shortAddress: 'Pinagbuhatan, Pasig City',
    phones: ['0995 230 2458', '0968 497 4521'],
    whatsapp: '+63 995 230 2458',
    instagram: 'RBB Auto Electrical Shop',
    email: 'jannlester123@gmail.com',
    mapUrl: 'https://www.google.com/maps/place/RBB+Auto+Electrical+and+Motor+Rewinding+Center+-+Pasig+Branch,+Sandoval+Avenue,+Pinagbuhatan,+Pasig,+Metro+Manila/@9.9911747,111.4391287,6z/data=!4m2!3m1!1s0x3397c70027bf5843:0x9d61c024296bfe4c?hl=en-US',
    coordinates: { lat: 14.5492, lng: 121.0967 },
    directions: [
      'Located at 0270 Sandoval Ave., Pinagbuhatan, Pasig City.',
      'Fully equipped for computer diagnostics, starter/alternator rebuilding, and motor rewinding.',
      'Quick turnaround times for private cars, delivery vans, and heavy machinery.'
    ]
  }
];

export default function ContactMap() {
  const [activeTab, setActiveTab] = useState<string>('paranaque');
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);

  const activeBranch = BRANCHES.find((b) => b.id === activeTab) || BRANCHES[0];
  const [mapMode, setMapMode] = useState<'embed' | 'vector'>('embed');

  const handleCopyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(id);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <section id="contact" className="scroll-mt-16 py-16 px-4 bg-zinc-900 text-white border-t border-zinc-805">
      <div className="max-w-7xl mx-auto">
        
        {/* Section title & Branch Picker toggles */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="max-w-2xl">
            <span className="text-xs font-mono uppercase text-yellow-500 tracking-wider block mb-2 font-bold">
              Our Professional Workshops
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-3">
              RBB Shop Locations &amp; Directions
            </h2>
            <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
              We operate two fully-equipped auto-electrical &amp; motor rewinding specialist workshops in Metro Manila to serve you.
            </p>
          </div>

          {/* Branch Picker Tabs */}
          <div className="flex bg-zinc-950 p-1 border border-zinc-800 rounded-xl shrink-0">
            {BRANCHES.map((b) => {
              const isActive = activeTab === b.id;
              return (
                <button
                  key={b.id}
                  onClick={() => setActiveTab(b.id)}
                  className={`relative px-5 py-2.5 rounded-lg text-xs font-mono uppercase font-bold tracking-wider transition-colors cursor-pointer overflow-hidden ${
                    isActive
                      ? 'text-zinc-950'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeLocationTab"
                      className="absolute inset-0 bg-yellow-500 rounded-lg -z-10"
                      transition={{ type: "spring", stiffness: 350, damping: 28 }}
                    />
                  )}
                  <span className="relative z-10">
                    {b.id === 'paranaque' ? '⚡ Parañaque (Main)' : '⚙️ Pasig Branch'}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Panel: Contact Address card (taking 5 columns) */}
          <div className="lg:col-span-5 bg-zinc-950 border border-zinc-800 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-xl min-h-[460px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.28, ease: "easeOut" }}
                className="flex flex-col h-full justify-between w-full"
              >
                <div>
                  <span className="text-xs font-mono uppercase text-zinc-500 block mb-5 tracking-wide">
                    Direct Contact Card
                  </span>

              {/* Contact item: Phone */}
              <div className="flex gap-4 mb-6">
                <span className="w-10 h-10 rounded-xl bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </span>
                <div>
                  <span className="text-[10px] font-mono uppercase text-zinc-400 tracking-wider block">
                    Phone Hotlines
                  </span>
                  <div className="flex flex-col gap-1 mt-1">
                    {activeBranch.phones.map((p, idx) => (
                      <a
                        key={idx}
                        href={`tel:${p.replace(/\s+/g, '')}`}
                        className="text-base sm:text-lg text-white font-bold hover:text-yellow-400 transition-colors block"
                      >
                        {p}
                      </a>
                    ))}
                  </div>
                  <span className="text-xs text-zinc-500 mt-1 block">Urgent Starter / Alternator / Rewind service</span>
                </div>
              </div>

              {/* Contact item: Address */}
              <div className="flex gap-4 mb-6">
                <span className="w-10 h-10 rounded-xl bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </span>
                <div>
                  <span className="text-[10px] font-mono uppercase text-zinc-400 tracking-wider block">
                    Workshop Address
                  </span>
                  <p className="text-zinc-300 text-sm mt-1 leading-relaxed font-sans">
                    {activeBranch.address}
                  </p>
                  
                  {/* Address Copy and Map buttons */}
                  <div className="flex flex-wrap gap-2 mt-3.5 text-xs">
                    <button
                      onClick={() => handleCopyText(activeBranch.address, 'address')}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-zinc-900 hover:bg-zinc-850 rounded border border-zinc-800 hover:border-zinc-700 transition-all font-mono font-medium text-zinc-400 hover:text-white cursor-pointer"
                      title="Copy raw address text"
                    >
                      {copiedIndex === 'address' ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-green-500" />
                          <span className="text-green-400">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Address</span>
                        </>
                      )}
                    </button>
                    <a
                      href={activeBranch.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-yellow-500/10 hover:bg-yellow-500/20 rounded border border-yellow-500/20 text-yellow-400 hover:text-yellow-300 transition-colors font-mono font-medium cursor-pointer"
                    >
                      <span>Open on Google Maps</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                </div>
              </div>

              {/* Contact item: Mail & Socials */}
              <div className="flex gap-4 mb-6">
                <span className="w-10 h-10 rounded-xl bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </span>
                <div>
                  <span className="text-[10px] font-mono uppercase text-zinc-400 tracking-wider block">
                    Support Channels
                  </span>
                  <div className="mt-1 space-y-1">
                    <a
                      href={`mailto:${activeBranch.email}`}
                      className="text-zinc-300 hover:text-yellow-400 transition-colors text-sm block font-medium font-mono"
                    >
                      ✉️ {activeBranch.email}
                    </a>
                    <span className="text-zinc-300 text-sm block font-medium">
                      📱 IG: <span className="text-yellow-400 hover:underline cursor-pointer">@{activeBranch.instagram}</span>
                    </span>
                    <span className="text-zinc-300 text-sm block font-medium">
                      💬 FB: <span className="text-yellow-400 hover:underline cursor-pointer">RBB Auto Electrical and Motor Rewinding Center</span>
                    </span>
                    <span className="text-zinc-350 text-xs block font-mono mt-0.5">
                      WhatsApp: {activeBranch.whatsapp}
                    </span>
                  </div>
                </div>
              </div>

              {/* Courier Logistics info */}
              <div className="mb-6 p-3.5 bg-zinc-900/60 rounded-xl border border-zinc-805/50">
                <span className="text-[10px] font-mono uppercase text-yellow-500 tracking-wider block font-bold mb-2">
                  🚚 Shipping &amp; Logistics
                </span>
                <p className="text-xs text-zinc-300 leading-normal">
                  🏍️ <strong>Lalamove Shipping</strong> within Metro Manila.
                </p>
                <p className="text-xs text-zinc-300 leading-normal mt-1">
                  🚢 <strong>LBC Shipping</strong> nationwide (Luzon, Visayas, Mindanao) with <strong>COD/COP</strong> available!
                </p>
              </div>

              {/* Modes of Payment */}
              <div className="mb-6 p-3.5 bg-zinc-900/60 rounded-xl border border-zinc-805/50">
                <span className="text-[10px] font-mono uppercase text-zinc-400 tracking-wider block font-bold mb-2">
                  💵 Modes of Payment (MOP)
                </span>
                <div className="flex gap-2">
                  <span className="px-2.5 py-1 bg-zinc-950 text-zinc-300 rounded text-[10px] font-bold border border-zinc-800 font-mono">CASH</span>
                  <span className="px-2.5 py-1 bg-blue-950 text-blue-400 rounded text-[10px] font-bold border border-blue-900 font-mono">GCASH</span>
                  <span className="px-2.5 py-1 bg-green-950 text-green-400 rounded text-[10px] font-bold border border-green-900 font-mono">MAYA</span>
                </div>
              </div>

              {/* Contact item: Operational hours */}
              <div className="flex gap-4 mb-6">
                <span className="w-10 h-10 rounded-xl bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </span>
                <div>
                  <span className="text-[10px] font-mono uppercase text-zinc-400 tracking-wider block">
                    Working Hours
                  </span>
                  <span className="text-zinc-300 font-sans text-sm block font-medium mt-1">
                    Monday - Saturday : 8:00 AM - 5:00 PM
                  </span>
                  <span className="text-amber-500 font-sans text-xs mt-0.5 block font-medium">
                    Sunday : Closed (Contact for inquiries)
                  </span>
                </div>
              </div>

            </div>

            {/* Shield Check Trust block */}
            <div className="mt-6 pt-5 border-t border-zinc-900 flex gap-3 text-xs items-center text-zinc-500">
              <ShieldCheck className="w-8 h-8 text-yellow-500/80 shrink-0" />
              <span>Free check-up &amp; estimate. Full compliance and material warranty offered on RBB rewind works.</span>
            </div>

              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Panel: Stylized Map Canvas & Landmarks guide (taking 7 columns) */}
          <div className="lg:col-span-7 bg-zinc-950 border border-zinc-800 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-xl min-h-[460px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 16 }}
                transition={{ duration: 0.28, ease: [0.25, 1, 0.5, 1] }}
                className="flex flex-col h-full justify-between w-full"
              >
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                    <span className="text-xs font-mono uppercase text-zinc-500 tracking-wider">
                      Automotive Workshop Map &amp; Navigation Guide
                    </span>
                    <div className="flex bg-zinc-900/90 border border-zinc-800 p-0.5 rounded-lg text-[10px] font-mono self-start sm:self-auto select-none">
                      <button
                        type="button"
                        onClick={() => setMapMode('embed')}
                        className={`px-2.5 py-1 rounded transition-all cursor-pointer ${
                          mapMode === 'embed'
                            ? 'bg-yellow-500 text-zinc-950 font-bold shadow-md shadow-yellow-500/10'
                            : 'text-zinc-400 hover:text-white'
                        }`}
                        title="Launches high-reliability zero-key Google Map container"
                      >
                        📍 Direct Map (Always Works)
                      </button>
                      <button
                        type="button"
                        onClick={() => setMapMode('vector')}
                        className={`px-2.5 py-1 rounded transition-all cursor-pointer ${
                          mapMode === 'vector'
                            ? 'bg-yellow-500 text-zinc-950 font-bold shadow-md shadow-yellow-500/10'
                            : 'text-zinc-400 hover:text-white'
                        }`}
                        title="Advanced interactive vector overlay (Requires active API Key with Billing enabled)"
                      >
                        🛰️ SDK Vector Map
                      </button>
                    </div>
                  </div>
              
              {/* Landmark info items */}
              <p className="text-zinc-400 text-sm leading-relaxed mb-6 font-sans">
                Our physical workshop is fully recognizable with the official <strong>RBB Repair &amp; Rewind</strong> yellow branding. Bring your car, damaged motor, alternator, generator, or power tools directly to our workbenches.
              </p>

              {/* Dynamic Google Maps Widget */}
              {mapMode === 'embed' ? (
                <div className="relative w-full h-[320px] rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800 shadow-inner">
                  <iframe
                    src={`https://maps.google.com/maps?q=${activeBranch.coordinates.lat},${activeBranch.coordinates.lng}&t=&z=16&ie=UTF8&iwloc=&output=embed`}
                    className="w-full h-full border-0 opacity-90 hover:opacity-100 transition-opacity"
                    allowFullScreen={false}
                    loading="lazy"
                    title={activeBranch.name}
                  />
                </div>
              ) : hasValidKey ? (
                <div className="relative w-full h-[320px] rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800">
                  <APIProvider apiKey={API_KEY} version="weekly">
                    <Map
                      center={activeBranch.coordinates}
                      defaultZoom={15}
                      mapId="DEMO_MAP_ID"
                      internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
                      style={{ width: '100%', height: '100%' }}
                      gestureHandling="cooperative"
                      disableDefaultUI={false}
                    >
                      <AdvancedMarker position={activeBranch.coordinates} title={activeBranch.name}>
                        <Pin background="#eab308" glyphColor="#09090b" borderColor="#eab308" />
                      </AdvancedMarker>
                    </Map>
                  </APIProvider>
                </div>
              ) : (
                <div className="relative w-full h-[320px] rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800 flex flex-col justify-end p-4">
                  {/* Background grid canvas */}
                  <div className="absolute inset-0 opacity-15" style={{ backgroundImage: 'radial-gradient(ellipse at center, rgba(234,179,8,0.15) 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
                  
                  {/* Stylized route path */}
                  <svg className="absolute w-full h-full text-zinc-800 stroke-[2] fill-none opacity-40">
                    <path d="M 0,150 Q 150,70 300,140 T 600,160" />
                    <path d="M 150,0 Q 180,120 210,240" />
                    <path d="M 450,0 Q 430,125 410,240" />
                  </svg>

                  {/* Simulated Point */}
                  <div className="absolute top-[35%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 bg-zinc-950/95 border border-zinc-800 rounded-xl p-3.5 flex items-center gap-3 shadow-2xl w-[90%] sm:w-auto">
                    <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-yellow-500 rounded-full animate-ping" />
                    <div className="w-9 h-9 rounded-lg bg-yellow-500 text-zinc-950 flex items-center justify-center font-bold text-sm shrink-0">
                      📍
                    </div>
                    <div className="text-left">
                      <span className="text-[9px] font-mono text-yellow-500 block leading-none font-bold uppercase tracking-wider">
                        ACTIVE GPS PIN
                      </span>
                      <span className="text-xs font-bold text-white block mt-1 font-sans">
                        {activeBranch.name}
                      </span>
                      <span className="text-[9px] text-zinc-400 block font-mono mt-0.5">
                        {activeBranch.shortAddress} ({activeBranch.coordinates.lat}, {activeBranch.coordinates.lng})
                      </span>
                    </div>
                  </div>

                  {/* Setup Action instructions directly overlaid beautifully */}
                  <div className="relative z-10 w-full bg-zinc-955 border border-zinc-800/80 rounded-xl p-3 flex items-start gap-3 shadow-xl leading-relaxed text-left">
                    <Settings className="w-4 h-4 text-yellow-500 shrink-0 mt-0.5 animate-spin" style={{ animationDuration: '8s' }} />
                    <div>
                      <h4 className="text-[11px] font-bold text-zinc-100 uppercase tracking-tight">Add GOOGLE_MAPS_PLATFORM_KEY to Enable Dynamic GPS Maps</h4>
                      <p className="text-[10px] text-zinc-400 mt-0.5">
                        Get your API Key from Google Maps Platform Console. Then open <strong>Settings</strong> (⚙️ icon, top-right) &rarr; <strong>Secrets</strong> &rarr; Add key <code>GOOGLE_MAPS_PLATFORM_KEY</code> to instantly unlock fully dynamic navigation pathfinding!
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Landmark points list */}
              <div className="mt-6">
                <span className="text-xs font-mono uppercase text-yellow-500 block mb-3.5 tracking-wide font-bold flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5" />
                  <span>Interactive Navigation Instructions:</span>
                </span>
                <ul className="text-xs text-zinc-400 space-y-2.5">
                  {activeBranch.directions.map((d, i) => (
                    <li key={i} className="flex gap-2.5 items-start leading-relaxed">
                      <span className="text-yellow-500 shrink-0 mt-0.5">•</span>
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-zinc-900 text-center flex flex-col sm:flex-row gap-3.5 justify-center">
              <a
                href={activeBranch.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 bg-yellow-500 hover:bg-yellow-400 text-zinc-950 px-6 py-3 rounded-lg font-bold text-sm tracking-tight transition-all shadow-md shadow-yellow-500/10"
              >
                <span>Navigate to {activeBranch.id === 'paranaque' ? 'Parañaque' : 'Pasig'} via Google GPS</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
