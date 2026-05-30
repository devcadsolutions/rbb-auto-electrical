import React, { useState, useEffect } from 'react';
import { Shield, Sparkles, Phone, Compass, Calendar, AlertTriangle, ShieldCheck, HelpCircle, ChevronUp, Zap, Clock, MapPin, BadgeCheck, Wrench, ShieldAlert, MessageSquare, Check, ChevronDown } from 'lucide-react';
import { SERVICES } from './data';
import Navbar from './components/Navbar';
import SymptomChecker from './components/SymptomChecker';
import ServicesList from './components/ServicesList';
import GalleryGrid from './components/GalleryGrid';
import BookingWidget from './components/BookingWidget';
import TestimonialsSlider from './components/TestimonialsSlider';
import ContactMap from './components/ContactMap';
import AboutUs from './components/AboutUs';
import FAQPage from './components/FAQPage';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [currentView, setCurrentView] = useState<'home' | 'diagnose' | 'services' | 'gallery' | 'booking' | 'about' | 'faqs' | 'contact'>('home');
  const [prefillVehicleType, setPrefillVehicleType] = useState('sedan');
  const [prefillServiceId, setPrefillServiceId] = useState('diagnostics');

  // Interactive UI states for the new homepage features
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [landingName, setLandingName] = useState('');
  const [landingPhone, setLandingPhone] = useState('');
  const [landingVehicle, setLandingVehicle] = useState('');
  const [landingIssue, setLandingIssue] = useState('');
  const [landingBranch, setLandingBranch] = useState<'paranaque' | 'pasig'>('paranaque');
  const [landingSuccess, setLandingSuccess] = useState(false);

  const handleLandingFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!landingName || !landingPhone) {
      alert('Please provide your name and mobile number. Thank you!');
      return;
    }
    setLandingSuccess(true);
  };

  const resetLandingForm = () => {
    setLandingName('');
    setLandingPhone('');
    setLandingVehicle('');
    setLandingIssue('');
    setLandingBranch('paranaque');
    setLandingSuccess(false);
  };

  // Hero price estimator logic matching original models
  const getHeroPrice = () => {
    let baseMin = 500;
    let baseMax = 1250;

    const matchedService = SERVICES.find((s) => s.id === prefillServiceId);
    if (matchedService) {
      if (matchedService.id === 'diagnostics') {
        baseMin = 0; baseMax = 0;
      } else if (matchedService.id === 'battery') {
        baseMin = 0; baseMax = 0;
      } else if (matchedService.id === 'alternator') {
        baseMin = 1200; baseMax = 3500;
      } else if (matchedService.id === 'rewinding') {
        baseMin = 1000; baseMax = 4800;
      } else if (matchedService.id === 'radiator') {
        baseMin = 800; baseMax = 2500;
      } else if (matchedService.id === 'wiring') {
        baseMin = 1500; baseMax = 6000;
      } else if (matchedService.id === 'fuse-relay') {
        baseMin = 400; baseMax = 1200;
      } else if (matchedService.id === 'lighting') {
        baseMin = 500; baseMax = 1800;
      }
    }

    let vehicleMultiplier = 1.0;
    if (prefillVehicleType === 'suv') vehicleMultiplier = 1.15;
    if (prefillVehicleType === 'pickup') vehicleMultiplier = 1.25;
    if (prefillVehicleType === 'luxury_euro') vehicleMultiplier = 1.45;

    return {
      min: Math.round(baseMin * vehicleMultiplier),
      max: Math.round(baseMax * vehicleMultiplier)
    };
  };

  const heroPrice = getHeroPrice();

  // Monitor active view alignment and show floating scroll indicator
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    if (currentView !== 'home') {
      setActiveSection(currentView);
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentView]);

  const handleSelectServiceFromWidget = (serviceId: string) => {
    setPrefillServiceId(serviceId);
    setPrefillVehicleType('sedan');
    setCurrentView('booking');
    setActiveSection('booking');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderView = () => {
    switch (currentView) {
      case 'diagnose':
        return (
          <div className="bg-zinc-950 text-white py-12 px-4 sm:px-6 animate-fade-in">
            <div className="max-w-7xl mx-auto mb-10 text-center">
              <span className="text-xs font-mono uppercase text-yellow-500 tracking-widest block mb-2 font-bold bg-yellow-500/10 border border-yellow-500/20 px-3 py-1 rounded-full w-fit mx-auto select-none">
                OBD2 computerized fault isolation
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white uppercase mt-4 mb-4">
                Symptom &amp; Fault Diagnostics
              </h1>
              <p className="text-zinc-400 text-sm sm:text-base max-w-xl mx-auto">
                Isolate check-engine lights, parasitic battery drains, slow starts, and high-resistance wiring problems instantly using our digital debugger engine.
              </p>
            </div>
            <SymptomChecker onSelectService={handleSelectServiceFromWidget} />
          </div>
        );
      case 'services':
        return (
          <div className="bg-zinc-950 text-white py-12 px-4 sm:px-6 animate-fade-in">
            <div className="max-w-7xl mx-auto mb-10 text-center">
              <span className="text-xs font-mono uppercase text-yellow-500 tracking-widest block mb-2 font-bold bg-yellow-500/10 border border-yellow-500/20 px-3 py-1 rounded-full w-fit mx-auto select-none">
                TESDA mechanical expertise
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white uppercase mt-4 mb-4">
                Our Automotive Services
              </h1>
              <p className="text-zinc-400 text-sm sm:text-base max-w-xl mx-auto">
                Explore our full suite of professional auto-electrical restoration, computer sweeps, alternator starter assemblies, and high-precision motor rewinding.
              </p>
            </div>
            <ServicesList onSelectService={handleSelectServiceFromWidget} />
          </div>
        );
      case 'gallery':
        return (
          <div className="bg-zinc-950 text-white py-12 px-4 sm:px-6 animate-fade-in">
            <div className="max-w-7xl mx-auto mb-10 text-center">
              <span className="text-xs font-mono uppercase text-yellow-500 tracking-widest block mb-1 font-bold bg-yellow-500/10 border border-yellow-500/20 px-3 py-1 rounded-full w-fit mx-auto select-none">
                Workmanship showcase
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white uppercase mt-4 mb-4">
                Operations Gallery Grid
              </h1>
              <p className="text-zinc-400 text-sm sm:text-base max-w-xl mx-auto">
                Real photos showcasing our computerized automotive scanner tests, premium starter replacements, and physical workshop services in Metro Manila.
              </p>
            </div>
            <GalleryGrid />
          </div>
        );
      case 'booking':
        return (
          <div className="bg-zinc-950 text-white py-12 px-4 sm:px-6 animate-fade-in">
            <div className="max-w-7xl mx-auto mb-10 text-center">
              <span className="text-xs font-mono uppercase text-yellow-500 tracking-widest block mb-2 font-bold bg-yellow-500/10 border border-yellow-500/20 px-3 py-1 rounded-full w-fit mx-auto select-none">
                No hidden costs • Upfront estimates
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white uppercase mt-4 mb-4">
                Estimate fee &amp; instant booking
              </h1>
              <p className="text-zinc-400 text-sm sm:text-base max-w-xl mx-auto">
                Request a quote for on-site diagnostics, or schedule an in-lounge workshop appointment at our Parañaque or Pasig branches.
              </p>
            </div>
            <BookingWidget key={`${prefillVehicleType}-${prefillServiceId}`} initialVehicleType={prefillVehicleType} initialServiceId={prefillServiceId} />
            <TestimonialsSlider />
          </div>
        );
      case 'about':
        return (
          <AboutUs />
        );
      case 'faqs':
        return (
          <FAQPage />
        );
      case 'contact':
        return (
          <div className="bg-zinc-950 text-white py-12 px-4 sm:px-6 animate-fade-in">
            <div className="max-w-7xl mx-auto mb-10 text-center">
              <span className="text-xs font-mono uppercase text-yellow-500 tracking-widest block mb-1 font-bold bg-yellow-500/10 border border-yellow-500/20 px-3 py-1 rounded-full w-fit mx-auto select-none">
                Parañaque &amp; Pasig workshop locations
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white uppercase mt-4 mb-4">
                Get Directions &amp; branch Contacts
              </h1>
              <p className="text-zinc-400 text-sm sm:text-base max-w-xl mx-auto">
                Connect with our expert mechanics or walk in directly to our Parañaque (Sucat) or Pasig workshops for skilled repairs and motor rewinding.
              </p>
            </div>
            <ContactMap />
          </div>
        );
      case 'home':
      default:
        return (
          <div className="animate-fade-in text-white pb-16">
            
            {/* 1. HERO SECTION: Answers the customer's urgent questions immediately */}
            <section
              id="home"
              className="relative bg-zinc-900 border-b border-zinc-800 pt-16 pb-20 px-4 overflow-hidden flex items-center min-h-[85vh]"
            >
              <div className="absolute inset-0 bg-radial from-yellow-500/5 via-transparent to-transparent flex items-center justify-center opacity-70 pointer-events-none" />
              <div className="absolute top-[10%] right-[-10%] w-96 h-96 bg-yellow-500/5 blur-[120px] rounded-full pointer-events-none" />
              
              <div className="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                
                {/* Left Column: Core Urgencies & Actions */}
                <div className="lg:col-span-7 flex flex-col items-start text-left">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-yellow-500/10 border border-yellow-500/30 rounded-full text-yellow-500 text-xs font-mono mb-6 uppercase tracking-wider font-semibold">
                    <Shield className="w-3.5 h-3.5 fill-yellow-500/20 text-yellow-500 animate-pulse" />
                    <span>TESDA NC II Certified Auto Electrical Specialist</span>
                  </div>

                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white mb-4 uppercase leading-tight font-sans">
                    Auto Electrical Repair and <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-400 font-extrabold text-transparent bg-clip-text">Motor Rewinding Services</span> <br />
                    <span className="text-sm text-yellow-500 font-mono tracking-widest block mt-2 font-bold select-none text-left">IN PARAÑAQUE</span>
                  </h1>

                  <p className="text-zinc-350 text-sm sm:text-base leading-relaxed mb-6 max-w-xl">
                    Get your starter, alternator, radiator, generator, motor, or power tool checked by a local repair specialist. Visit our shop or ask about home-service availability.
                  </p>

                  <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-zinc-400 mb-8 font-mono">
                    <span className="flex items-center gap-1.5 bg-zinc-950 border border-zinc-850 px-3 py-1.5 rounded-md">
                      <MapPin className="w-4 h-4 text-yellow-500 shrink-0" />
                      <span>Near Petron, Dr. A. Santos Avenue, Parañaque</span>
                    </span>
                    <span className="flex items-center gap-1.5 bg-zinc-950 border border-zinc-850 px-3 py-1.5 rounded-md">
                      <Clock className="w-4 h-4 text-yellow-500 shrink-0" />
                      <span>Open Daily: 8:00 AM - 5:00 PM</span>
                    </span>
                  </div>

                  {/* Urgent Hero Call-To-Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 w-full max-w-lg">
                    <button
                      onClick={() => {
                        setCurrentView('booking');
                        setActiveSection('booking');
                        window.scrollTo({ top: 0, behavior: 'instant' });
                      }}
                      className="flex-1 px-6 py-4 bg-yellow-500 hover:bg-yellow-400 text-zinc-950 font-black rounded-xl text-center text-xs uppercase tracking-wider transition-all shadow-lg shadow-yellow-500/10 flex items-center justify-center gap-2 active:scale-[0.98] cursor-pointer"
                    >
                      <span>📅 Book a Check-Up</span>
                    </button>
                    
                    <a
                      href="tel:09914683462"
                      className="flex-1 px-6 py-4 bg-zinc-800 hover:bg-zinc-755 border border-zinc-755/95 text-zinc-100 font-bold rounded-xl text-center text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
                    >
                      <Phone className="w-4 h-4 fill-current text-white/90" />
                      <span>Call for Assistance</span>
                    </a>

                    <button
                      onClick={() => {
                        setLandingIssue("Inquiring about Home Service availability. Details of my vehicle & concern: ");
                        const contactEl = document.getElementById('front-desk-contact');
                        if (contactEl) {
                          contactEl.scrollIntoView({ behavior: 'smooth' });
                        } else {
                          setCurrentView('contact');
                          window.scrollTo({ top: 0, behavior: 'instant' });
                        }
                      }}
                      className="flex-1 px-6 py-4 bg-zinc-905 hover:bg-zinc-855 border border-zinc-800 text-zinc-350 hover:text-white font-bold rounded-xl text-center text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>🏠 Ask Home Service</span>
                    </button>
                  </div>

                  <p className="text-zinc-500 text-[10px] mt-4 font-mono uppercase tracking-widest">
                    ⚡ Fast checks for Toyota, Mitsubishi, Nissan, Honda, Geely, Ford &amp; Fleets
                  </p>
                </div>

                {/* Right Column: Real Photo of Service & Trust Indicators */}
                <div className="lg:col-span-5 relative">
                  <div className="relative rounded-3xl overflow-hidden border border-zinc-805 shadow-2xl group">
                    <img 
                      src="https://images.unsplash.com/photo-1517524206127-48bbd363f3d7?auto=format&fit=crop&w=700&q=80" 
                      alt="Real RBB electrical diagnostics workshop in action" 
                      referrerPolicy="no-referrer"
                      className="w-full h-[320px] object-cover filter brightness-95 group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-zinc-950 via-zinc-950/70 to-transparent p-6 pt-20">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-mono uppercase text-yellow-500 font-bold block">RBB Workshop Yard</span>
                        <span className="px-2.5 py-0.5 bg-green-500/15 text-green-400 border border-green-500/30 text-[10px] font-mono rounded-full font-bold animate-pulse">Open Now</span>
                      </div>
                      <p className="text-white text-sm font-semibold mb-1">Skilled auto electrical tracing and repairs done on the spot.</p>
                      <span className="text-zinc-400 text-xs font-mono">No guessing. We find and fix the source.</span>
                    </div>
                  </div>

                  {/* Overlaid rating card */}
                  <div className="absolute -bottom-5 -left-5 bg-zinc-950 border border-zinc-800 rounded-2xl p-4 shadow-xl hidden sm:flex items-center gap-3">
                    <div className="w-10 h-10 bg-yellow-500/10 rounded-xl flex items-center justify-center text-yellow-500 text-xl font-bold font-mono">
                      ★
                    </div>
                    <div>
                      <span className="text-xs font-mono text-zinc-400 block leading-none">RATED 4.9/5 BY CAR OWNERS</span>
                      <span className="text-white text-sm font-bold mt-1 block">Metro Manila&rsquo;s Trusted Mechanics</span>
                    </div>
                  </div>
                </div>

              </div>
            </section>

            {/* 2. TRUST STRIP: Establishes prompt authority */}
            <div className="bg-zinc-950 border-y border-zinc-855 py-6">
              <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-2 lg:grid-cols-5 gap-6 text-center">
                  <div className="p-2 border-r last:border-0 border-zinc-850/60 flex flex-col items-center">
                    <span className="text-yellow-500 text-xs sm:text-sm font-black block tracking-tight uppercase">📍 Local Shop in Parañaque</span>
                    <span className="text-zinc-400 text-[10px] sm:text-xs mt-1 block font-mono">Beside Petron along Dr. A. Santos Avenue</span>
                  </div>
                  <div className="p-2 lg:border-r last:lg:border-0 border-zinc-850/60 flex flex-col items-center">
                    <span className="text-yellow-500 text-xs sm:text-sm font-black block tracking-tight uppercase">⚡ Starter &amp; Alternators</span>
                    <span className="text-zinc-400 text-[10px] sm:text-xs mt-1 block font-mono">Specialists in repairs &amp; parts swaps</span>
                  </div>
                  <div className="p-2 border-r last:border-0 border-zinc-850/60 flex flex-col items-center">
                    <span className="text-yellow-500 text-xs sm:text-sm font-black block tracking-tight uppercase">⚙️ Motor Rewinding</span>
                    <span className="text-zinc-400 text-[10px] sm:text-xs mt-1 block font-mono">High-precision AC/DC motor services</span>
                  </div>
                  <div className="p-2 lg:border-r last:lg:border-0 border-zinc-850/60 flex flex-col items-center">
                    <span className="text-yellow-500 text-xs sm:text-sm font-black block tracking-tight uppercase">🏠 Home Service</span>
                    <span className="text-zinc-400 text-[10px] sm:text-xs mt-1 block font-mono">Available in nearby areas upon scheduling</span>
                  </div>
                  <div className="p-2 col-span-2 lg:col-span-1 flex flex-col items-center">
                    <span className="text-yellow-500 text-xs sm:text-sm font-black block tracking-tight uppercase">📞 Call or Message</span>
                    <span className="text-zinc-400 text-[10px] sm:text-xs mt-1 block font-mono">Direct active lines for free estimates</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. SYMPTOM TROUBLESHOOTING LIST: Helps users locate what matches their current car crisis */}
            <section className="py-20 bg-zinc-900 border-b border-zinc-805">
              <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="text-center md:max-w-3xl md:mx-auto mb-14">
                  <span className="text-xs font-mono text-yellow-550 font-bold uppercase tracking-wider block mb-2">
                    EASY VEHICLE TROUBLESHOOTER
                  </span>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white uppercase font-sans">
                    Experiencing Any of These Problems?
                  </h2>
                  <p className="text-zinc-400 text-sm sm:text-base mt-2">
                    Automotive electrical faults can be extremely frustrating. Match your system symptoms below to understand the potential culprit.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto mb-10">
                  {[
                    { text: "Car will not start (clicks or completely dead)", reason: "Weak or discharging battery plates / loose wiring connections", icon: "❌" },
                    { text: "Battery drains flat overnight", reason: "Current leak / malfunctioning aftermarket accessories & relays", icon: "🔋" },
                    { text: "Headlights are dim or flickering", reason: "Slipping alternator belt / oxidized socket grounding terminal", icon: "💡" },
                    { text: "Dashboard warning lights stay on", reason: "Sensor logic failure / ECU fault codes / system voltage drop", icon: "⚠️" },
                    { text: "Air-conditioning not cooling correctly", reason: "Bad radiator fan relays / magnetic compressor clutch failure", icon: "❄️" },
                    { text: "Power windows/locks malfunctioning", reason: "Burnt window motor regulator / oxidized cabin switch boards", icon: "🪟" },
                    { text: "Wiring smells burnt or fuses keep blowing", reason: "Direct short circuit to metal frame / incorrect fuse ratings used", icon: "🔥" }
                  ].map((problem, index) => (
                    <div key={index} className="bg-zinc-950 border border-zinc-800/85 p-5 rounded-2xl flex items-start gap-4 hover:border-yellow-500/20 transition-colors">
                      <span className="text-2xl mt-0.5 shrink-0 block">{problem.icon}</span>
                      <div>
                        <p className="text-zinc-200 text-sm sm:text-base font-bold leading-normal">{problem.text}</p>
                        <span className="text-[11px] text-yellow-500 block mt-1 font-mono uppercase tracking-wide">💡 Culprit: {problem.reason}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-center">
                  <button 
                    onClick={() => {
                      setCurrentView('diagnose');
                      window.scrollTo({ top: 0, behavior: 'instant' });
                    }}
                    className="px-8 py-4 bg-yellow-500 hover:bg-yellow-400 text-zinc-950 font-black rounded-xl text-xs uppercase tracking-wider transition-all duration-200 hover:-translate-y-0.5 shadow-lg shadow-yellow-500/10 cursor-pointer inline-flex items-center gap-2"
                  >
                    <span>Have Your Vehicle Checked</span>
                    <span>→</span>
                  </button>
                </div>
              </div>
            </section>

            {/* NEW SECTION: RBB ADVANTAGE BENTO BOX */}
            <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 relative scroll-mt-24">
              <div className="text-center md:max-w-3xl md:mx-auto mb-16">
                <span className="text-xs font-mono uppercase text-yellow-500 tracking-wider block mb-2 font-bold select-none">
                  A TRUSTED AUTO-CLINIC EXPERIENCE
                </span>
                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white uppercase leading-tight">
                  Why Drivers Choose RBB Center
                </h2>
                <p className="text-zinc-400 text-sm sm:text-base mt-2">
                  Precision mechanics, expert testing rigs, and upfront pricing under one roof.
                </p>
              </div>

              {/* Bento Grid */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                
                {/* Card 1: NC II Certified */}
                <div className="md:col-span-7 bg-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-8 flex flex-col justify-between hover:border-zinc-700 transition-all group min-h-[220px] relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/5 blur-2xl rounded-full" />
                  <div>
                    <div className="w-10 h-10 bg-yellow-500/10 border border-yellow-500/20 rounded-xl flex items-center justify-center text-yellow-500 mb-6 font-bold text-lg">
                      🎓
                    </div>
                    <h3 className="text-xl font-bold uppercase text-white mb-2 tracking-tight">NC I &amp; NC II Certified Masters</h3>
                    <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed max-w-xl">
                      Our master mechanics are fully certified in electrical troubleshooting, harness repairs, and high-precision copper motor rewinding.
                    </p>
                  </div>
                  <div className="text-yellow-500 font-mono text-[10px] uppercase font-bold tracking-widest mt-4">
                    ✓ Rigorous Professional Standards
                  </div>
                </div>

                {/* Card 2: Diagnostics */}
                <div className="md:col-span-5 bg-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-8 flex flex-col justify-between hover:border-zinc-700 transition-all group min-h-[220px]">
                  <div>
                    <div className="w-10 h-10 bg-yellow-500/10 border border-yellow-500/20 rounded-xl flex items-center justify-center text-yellow-500 mb-6 font-bold text-lg">
                      💻
                    </div>
                    <h3 className="text-xl font-bold uppercase text-white mb-2 tracking-tight">OBD2 Scanner Sweeps</h3>
                    <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                      We scan your vehicle’s computer system (ECU) in minutes to diagnose warning lights, battery drains, and charging circuits.
                    </p>
                  </div>
                  <div className="text-yellow-500 font-mono text-[10px] uppercase font-bold tracking-widest mt-4">
                    ✓ Fast Fault Isolation
                  </div>
                </div>

                {/* Card 3: Free Check-up */}
                <div className="md:col-span-4 bg-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-8 flex flex-col justify-between hover:border-zinc-700 transition-all group min-h-[180px]">
                  <div>
                    <h4 className="text-3xl font-black text-yellow-500 mb-2">₱0</h4>
                    <h3 className="text-lg font-bold uppercase text-white mb-1.5 tracking-tight">Free Diagnostic Promo</h3>
                    <p className="text-zinc-400 text-xs leading-relaxed">
                      Get a free initial OBD2 scanner scan with any workshop checkup visit.
                    </p>
                  </div>
                </div>

                {/* Card 4: Double Location */}
                <div className="md:col-span-4 bg-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-8 flex flex-col justify-between hover:border-zinc-700 transition-all group min-h-[180px]">
                  <div>
                    <h4 className="text-3xl font-black text-yellow-500 mb-2">Dual</h4>
                    <h3 className="text-lg font-bold uppercase text-white mb-1.5 tracking-tight">Physical Workshop Yards</h3>
                    <p className="text-zinc-400 text-xs leading-relaxed">
                      Two secure locations in Parañaque (Sucat Road) and Pasig (Sandoval Avenue).
                    </p>
                  </div>
                </div>

                {/* Card 5: Emergency Cover */}
                <div className="md:col-span-4 bg-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-8 flex flex-col justify-between hover:border-zinc-700 transition-all group min-h-[180px]">
                  <div>
                    <h4 className="text-3xl font-black text-yellow-500 mb-2">OEM</h4>
                    <h3 className="text-lg font-bold uppercase text-white mb-1.5 tracking-tight">On-Hand Brand Stocks</h3>
                    <p className="text-zinc-400 text-xs leading-relaxed">
                      Original Valeo, Denso, and Bosch starters/alternators on standby for fast swaps.
                    </p>
                  </div>
                </div>

              </div>
            </section>

            {/* 3. OUR WORKSHOP SERVICES - Aligned exact name and list from Section 4 of the plan */}
            <section id="signature-services" className="mx-auto max-w-7xl px-4 py-20 scroll-mt-24">
              <div className="text-center md:max-w-3xl md:mx-auto mb-16">
                <span className="text-xs font-mono uppercase text-yellow-500 tracking-wider block mb-2 font-bold select-none">
                  COMPLETE AUTO SERVICES DIRECTORY
                </span>
                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white uppercase font-sans">
                  Our Main Services
                </h2>
                <p className="text-zinc-350 text-sm sm:text-base mt-2">
                  From vehicle starting and charging issues to motor rewinding and radiator repairs, RBB provides practical repair and replacement options for customers in Parañaque and nearby areas.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    title: "Starter Motor Services",
                    desc: "Diagnose, repair, rewind, or replace faulty starter motors for supported vehicle models.",
                    tag: "Starting Systems",
                    icon: "🚀",
                    ctaLabel: "View Starter Services",
                    action: () => {
                      setCurrentView('services');
                      setActiveSection('services');
                      window.scrollTo({ top: 0, behavior: 'instant' });
                    }
                  },
                  {
                    title: "Alternator Services",
                    desc: "Check, repair, rewind, or replace alternators experiencing charging-related issues.",
                    tag: "Charging Systems",
                    icon: "⚡",
                    ctaLabel: "View Alternator Services",
                    action: () => {
                      setCurrentView('services');
                      setActiveSection('services');
                      window.scrollTo({ top: 0, behavior: 'instant' });
                    }
                  },
                  {
                    title: "Motor and Generator Rewinding",
                    desc: "Repair and rewind AC/DC motors and generator units.",
                    tag: "Rewinding Specialty",
                    icon: "⚙️",
                    ctaLabel: "View Rewinding Services",
                    action: () => {
                      setCurrentView('services');
                      setActiveSection('services');
                      window.scrollTo({ top: 0, behavior: 'instant' });
                    }
                  },
                  {
                    title: "Radiator Services",
                    desc: "Request radiator overhaul, radiator repair, cap replacement, and related cooling-system work.",
                    tag: "Cooling & Overheating",
                    icon: "💧",
                    ctaLabel: "View Radiator Services",
                    action: () => {
                      setCurrentView('services');
                      setActiveSection('services');
                      window.scrollTo({ top: 0, behavior: 'instant' });
                    }
                  },
                  {
                    title: "Power Tool Repair",
                    desc: "Ask about repair and servicing for supported electrical power tools.",
                    tag: "Coil Winding & Parts",
                    icon: "🛠️",
                    ctaLabel: "Ask About Power Tool Repair",
                    action: () => {
                      setLandingIssue("Inquiring about electrical power tool repair (drill, grinder, etc.). Tool details: ");
                      const contactEl = document.getElementById('front-desk-contact');
                      if (contactEl) {
                        contactEl.scrollIntoView({ behavior: 'smooth' });
                      } else {
                        setCurrentView('contact');
                        window.scrollTo({ top: 0, behavior: 'instant' });
                      }
                    }
                  },
                  {
                    title: "Home Service and Check-Ups",
                    desc: "Contact the shop to ask about home-service availability and initial checking.",
                    tag: "On-Site Support",
                    icon: "🏠",
                    ctaLabel: "Message Us",
                    action: () => {
                      window.open("https://m.me/rbbautoelectrical", "_blank", "noopener,noreferrer");
                    }
                  }
                ].map((s, idx) => (
                  <div 
                    key={idx}
                    className="bg-zinc-900 border border-zinc-800 hover:border-yellow-500/30 rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 hover:scale-[1.01] hover:shadow-xl relative group text-left"
                  >
                    <div>
                      <div className="w-12 h-12 rounded-xl bg-zinc-950 border border-zinc-850 flex items-center justify-center text-2xl mb-4 group-hover:bg-yellow-500 group-hover:text-zinc-950 transition-colors">
                        {s.icon}
                      </div>
                      <h3 className="text-lg font-bold tracking-tight text-white uppercase font-sans mb-1.5 leading-snug">
                        {s.title}
                      </h3>
                      <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mb-6">
                        {s.desc}
                      </p>
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-yellow-500 font-bold uppercase tracking-wider block mb-4">
                        📍 {s.tag}
                      </span>
                      <button 
                        onClick={s.action}
                        className="w-full inline-block text-center text-xs py-3 rounded-xl bg-zinc-950 hover:bg-yellow-500 hover:text-zinc-950 border border-zinc-800 text-zinc-350 hover:border-yellow-500 font-bold transition-all uppercase tracking-wide cursor-pointer"
                      >
                        {s.ctaLabel} &rarr;
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 4. "Your time matters more than car troubles" Stepper section */}
            <section className="bg-zinc-900 py-20 border-y border-zinc-800">
              <div className="max-w-7xl mx-auto px-4 sm:px-6">
                
                <div className="text-center md:max-w-3xl md:mx-auto mb-16">
                  <span className="text-xs font-mono uppercase text-yellow-500 tracking-wider block mb-2 font-bold select-none">
                    THREE SIMPLE STEPS
                  </span>
                  <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white uppercase leading-snug">
                    Professional Shop Repairs Made Stress-Free
                  </h2>
                  <p className="text-zinc-400 text-sm sm:text-base mt-2">
                    Restore your auto electrical systems or motor winding components at our workshop in three simple steps:
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                  {/* Horizontal flow connector lines for desktop */}
                  <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-0.5 bg-zinc-800 z-0" />

                  {/* Step 1 */}
                  <div className="flex flex-col items-center md:items-center text-center relative z-10 px-4">
                    <div className="flex items-center justify-center size-16 rounded-full border border-yellow-500 bg-zinc-950 text-yellow-500 text-xl font-black mb-6">
                      1
                    </div>
                    <h4 className="text-xl font-bold text-white uppercase mb-2">Get an Estimate</h4>
                    <p className="text-zinc-400 text-sm leading-relaxed">
                      Tell us what your component or system needs or specify symptoms for a free, fully transparent labor and parts estimate.
                    </p>
                  </div>

                  {/* Step 2 */}
                  <div className="flex flex-col items-center md:items-center text-center relative z-10 px-4">
                    <div className="flex items-center justify-center size-16 rounded-full border border-yellow-500 bg-zinc-950 text-yellow-500 text-xl font-black mb-6">
                      2
                    </div>
                    <h4 className="text-xl font-bold text-white uppercase mb-2">Book an Appointment</h4>
                    <p className="text-zinc-400 text-sm leading-relaxed">
                      Select whichever workshop branch (Parañaque or Pasig) and custom scheduled time that fits your day perfectly.
                    </p>
                  </div>

                  {/* Step 3 */}
                  <div className="flex flex-col items-center md:items-center text-center relative z-10 px-4">
                    <div className="flex items-center justify-center size-16 rounded-full border border-yellow-500 bg-zinc-950 text-yellow-500 text-xl font-black mb-6">
                      3
                    </div>
                    <h4 className="text-xl font-bold text-white uppercase mb-2">Get Your Car Fixed</h4>
                    <p className="text-zinc-400 text-sm leading-relaxed">
                      Drive in and put your keys in our master technicians' hands. We carry out precision repairs on-site while you wait securely!
                    </p>
                  </div>

                </div>
              </div>
            </section>

            {/* 5. Interactive Available over 100 Cities Map highlight */}
            <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                
                <div className="lg:col-span-5 text-left">
                  <span className="text-xs font-mono uppercase text-yellow-500 tracking-wider block mb-2 font-bold select-none">
                    REGIONAL SERVICE COVERS
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white uppercase mb-6 leading-tight">
                    Our workshops serve clients across Metro Manila
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed mb-6 font-sans">
                    RBB Auto Electrical and Motor Rewinding Center operates premier service hubs in Parañaque and Pasig. We accommodate walk-ins, commercial fleet accounts, and professional scheduled shop sessions for complete computerized electrical diagnostics and alternator, starter, motor, or radiator setups.
                  </p>

                  {/* Local Cities tag cloud */}
                  <div className="flex flex-wrap gap-2 text-xs font-mono text-zinc-400">
                    <span className="px-3 py-1 bg-zinc-900 border border-zinc-800 rounded">Parañaque</span>
                    <span className="px-3 py-1 bg-zinc-900 border border-zinc-800 rounded">Pasig</span>
                    <span className="px-3 py-1 bg-zinc-900 border border-zinc-800 rounded">Makati</span>
                    <span className="px-3 py-1 bg-zinc-900 border border-zinc-800 rounded">Taguig / BGC</span>
                    <span className="px-3 py-1 bg-zinc-900 border border-zinc-800 rounded">Las Piñas</span>
                    <span className="px-3 py-1 bg-zinc-900 border border-zinc-800 rounded">Muntinlupa</span>
                    <span className="px-3 py-1 bg-zinc-900 border border-zinc-800 rounded">Manila City</span>
                    <span className="px-3 py-1 bg-zinc-900 border border-zinc-800 rounded">Rizal</span>
                    <span className="px-3 py-1 bg-zinc-900 border border-zinc-800 rounded">Cavite</span>
                  </div>
                </div>

                {/* Graphic map grid illustration */}
                <div className="lg:col-span-7 bg-zinc-900 border border-zinc-800 rounded-3xl p-6 relative overflow-hidden flex flex-col justify-center min-h-[300px]">
                  <div className="absolute inset-0 bg-radial from-yellow-500/5 via-transparent to-transparent opacity-80 pointer-events-none" />
                  <div className="absolute top-4 right-4 font-mono text-[8px] text-zinc-600">MAP ENGINE ENGAGED</div>
                  
                  {/* Simulated service map visualization */}
                  <div className="text-center relative z-10 py-8">
                    <div className="inline-block text-3xl mb-4 text-yellow-500 animate-bounce">📍</div>
                    <h4 className="text-lg font-bold text-zinc-100 uppercase tracking-tight">METRO MANILA COVERAGE MAP</h4>
                    <p className="text-zinc-550 text-xs mt-1 max-w-sm mx-auto leading-normal">
                      Full-care workshop facilities base in Parañaque (Sucat Road) and Pasig (Sandoval Ave), servicing neighboring areas including Taguig, BGC, Makati, and Rizal.
                    </p>
                    
                    {/* Visual grid */}
                    <div className="mt-8 flex justify-center gap-1.5 opacity-60">
                      <span className="w-1.5 h-6 bg-yellow-500 rounded-full animate-pulse" />
                      <span className="w-1.5 h-10 bg-yellow-500 rounded-full animate-pulse [animation-delay:0.2s]" />
                      <span className="w-1.5 h-16 bg-yellow-500 rounded-full animate-pulse [animation-delay:0.4s]" />
                      <span className="w-1.5 h-12 bg-yellow-500 rounded-full animate-pulse [animation-delay:0.1s]" />
                      <span className="w-1.5 h-8 bg-yellow-550 rounded-full animate-pulse [animation-delay:0.3s]" />
                    </div>
                  </div>
                </div>

              </div>
            </section>

            {/* 6. Makes & Models section */}
            <section className="bg-zinc-950 py-20 border-y border-zinc-900">
              <div className="max-w-7xl mx-auto px-4 sm:px-6">
                
                <div className="text-center max-w-2xl mx-auto mb-16">
                  <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white mb-3">
                    WE SERVICE MOST MAKES AND MODELS
                  </h3>
                  <p className="text-zinc-400 text-xs sm:text-sm">
                    Our certified auto-electrical technicians rewires, diagnoses, repairs, and rewinds parts for all leading vehicle brands on the road:
                  </p>
                </div>

                {/* Makes and models actual logos grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5 max-w-5xl mx-auto">
                  {[
                    { name: 'TOYOTA', slug: 'toyota' },
                    { name: 'HONDA', slug: 'honda' },
                    { name: 'MITSUBISHI', slug: 'mitsubishi' },
                    { name: 'HYUNDAI', slug: 'hyundai' },
                    { name: 'NISSAN', slug: 'nissan' },
                    { name: 'KIA', slug: 'kia' },
                    { name: 'SUZUKI', slug: 'suzuki' },
                    { name: 'FORD', slug: 'ford' },
                    { name: 'MAZDA', slug: 'mazda' },
                    { name: 'ISUZU', slug: 'isuzu' },
                    { name: 'BMW', slug: 'bmw' },
                    { name: 'AUDI', slug: 'audi' },
                    { name: 'GEELY', slug: 'geely' },
                    { name: 'CHEVROLET', slug: 'chevrolet' },
                    { name: 'SUBARU', slug: 'subaru' }
                  ].map((brand) => (
                    <div 
                      key={brand.name}
                      className="bg-white flex flex-col items-center justify-center p-6 rounded-2xl border border-zinc-200 shadow-sm hover:shadow-xl hover:scale-105 transition-all duration-300 h-28 sm:h-32 text-center"
                    >
                      <img 
                        src={`https://cdn.simpleicons.org/${brand.slug}`}
                        alt={`${brand.name} Logo`}
                        className="h-10 sm:h-12 w-auto object-contain mb-3 max-w-[80%] select-none active:scale-95 transition-transform"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          // Fallback to text inside if image can't load
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                      <span className="text-[10px] sm:text-[11px] font-black tracking-widest text-zinc-900 font-sans uppercase">
                        {brand.name}
                      </span>
                    </div>
                  ))}
                </div>

              </div>
            </section>

            {/* 5. PHOTO GALLERY: REAL RBB WORKSHOP REPAIR TRANSACTION ACTIONS */}
            <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 border-t border-zinc-900 relative">
              <div className="text-center md:max-w-3xl md:mx-auto mb-14">
                <span className="text-xs font-mono text-yellow-500 font-bold uppercase tracking-wider block mb-2">
                  OUR ACTIVE TECHNICAL WORKSHOP BAYS
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white uppercase font-sans">
                  Real Workshop Actions
                </h2>
                <p className="text-zinc-400 text-xs sm:text-sm mt-2">
                  Our diagnostics equipment and master winding benches cater to simple daily drivers up to commercial industrial operations.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {[
                  { title: "OBD2 Computer Diagnostics", desc: "Isolating electrical and warning sensor codes instantly.", img: "https://images.unsplash.com/photo-1517524206127-48bbd363f3d7?auto=format&fit=crop&w=500&q=80" },
                  { title: "Alternator Bench Testing", desc: "Verifying current charge outputs and solenoid health.", img: "https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=500&q=80" },
                  { title: "Heavy Duty Winding Benches", desc: "Highly professional industrial stator copper coil rewinds.", img: "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&w=500&q=80" },
                  { title: "Complex Circuit Tracing", desc: "Safely isolating ground leakage shorts on chassis boards.", img: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=500&q=80" }
                ].map((item, idx) => (
                  <div key={idx} className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden group hover:border-zinc-750 transition-all">
                    <div className="h-44 overflow-hidden relative">
                      <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90" referrerPolicy="no-referrer" />
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-80" />
                    </div>
                    <div className="p-4">
                      <h4 className="text-sm font-bold text-white uppercase mb-1">{item.title}</h4>
                      <p className="text-zinc-400 text-xs leading-normal">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 6. VERIFIABLE LOCAL TRUST: GENUINE REVIEWS GRID */}
            <section className="py-20 bg-zinc-900 border-y border-zinc-800">
              <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="text-center md:max-w-3xl md:mx-auto mb-14">
                  <span className="text-xs font-mono text-yellow-500 font-bold uppercase tracking-wider block mb-2">
                    GENUINE REVIEWS FROM METRO MANILA DRIVERS
                  </span>
                  <h2 className="text-2xl sm:text-3xl md:text-x font-extrabold tracking-tight text-white uppercase font-sans">
                    Stories Of Trust &amp; Savings
                  </h2>
                  <p className="text-zinc-400 text-xs sm:text-sm mt-2">
                    We keep Metro Manila moving. See real-world reviews from vehicle owners who saved thousands on diagnostics and correct tracking.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                  {[
                    {
                      name: "Mark De Leon",
                      car: "Geely Coolray Owner",
                      review: "My dashboard warning lights stayed on, and other shops wanted to replace my whole harness for over ₱25,000. RBB found a single grounded terminal wire in 45 minutes and solved it cleanly. Truly honest Master techs!",
                      badge: "M"
                    },
                    {
                      name: "Vicente Cruz",
                      car: "L300 Fleet Manager",
                      review: "Starter and alternator delays block our logistics fleet and cost us cash. RBB always executes industrial rewinding same-day or equips us with original Valeo swaps on the fly. Very reliable business partner.",
                      badge: "V"
                    },
                    {
                      name: "Grace Santos",
                      car: "Toyota Vios Owner",
                      review: "My battery was draining completely flat overnight. The electrical guys traced the static current leak directly to my bad aftermarket alarm relay setup. Quick diagnosis, honest rates, and free sweeps.",
                      badge: "G"
                    }
                  ].map((item, index) => (
                    <div key={index} className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6 flex flex-col justify-between hover:border-yellow-500/10 transition-all duration-300">
                      <div>
                        <div className="flex gap-1 mb-4 text-yellow-500">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <span key={i} className="text-lg">★</span>
                          ))}
                        </div>
                        <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed italic mb-6">
                          &ldquo;{item.review}&rdquo;
                        </p>
                      </div>
                      <div className="flex items-center gap-3 pt-4 border-t border-zinc-850">
                        <div className="size-9 rounded-full bg-yellow-500/10 text-yellow-500 font-bold flex items-center justify-center text-xs">
                          {item.badge}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-sm font-bold text-white font-sans">{item.name}</span>
                            <span className="text-[9px] uppercase font-mono text-green-400 font-bold bg-green-500/10 px-1.5 py-0.5 rounded border border-green-500/20">Verified</span>
                          </div>
                          <span className="text-zinc-500 text-[10px] font-mono block">{item.car}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* 7. COMPACT FAQ ACCORDIONS */}
            <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6">
              <div className="text-center mb-14">
                <span className="text-xs font-mono text-yellow-500 font-bold uppercase tracking-wider block mb-2">
                  100% TRANSPARENCY: FAQS FOR DRIVERS
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white uppercase font-sans">
                  Frequently Asked Questions
                </h2>
                <p className="text-zinc-400 text-xs sm:text-sm mt-1">
                  Everything you need to know about our rates, diagnostic computer, and warranty.
                </p>
              </div>

              <div className="space-y-4 max-w-3xl mx-auto">
                {[
                  {
                    q: "How much is your computer scanner check-up?",
                    a: "It is exactly ₱0! We perform OBD2 computer diagnostic sweeps completely free of charge upon checking into our Parañaque or Pasig workshops."
                  },
                  {
                    q: "Do you offer warranty on repairs?",
                    a: "Yes. All starter, alternator, winding wire assemblies, and customized harness configurations installed by us are covered by RBB master mechanics' workshop warranty."
                  },
                  {
                    q: "Can you rewind heavy industrial AC/DC motors?",
                    a: "Yes. RBB specializes in high-precision winding for single-phase and three-phase industrial electric motors, generator field coils, water pumps, and heavy construction drills."
                  },
                  {
                    q: "How long does a vehicle wire short trace take?",
                    a: "A typical dashboard circuit short check takes anywhere from 30 minutes to 2 hours. We perform table and oscilloscope trace verification and clear the diagnostic errors upfront."
                  }
                ].map((faq, index) => {
                  const isOpen = openFaqIndex === index;
                  return (
                    <div key={index} className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden transition-colors">
                      <button
                        onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                        className="w-full text-left p-5 flex justify-between items-center text-sm sm:text-base font-bold text-white hover:text-yellow-500 transition-colors uppercase font-mono tracking-tight cursor-pointer"
                      >
                        <span>{faq.q}</span>
                        <ChevronDown className={`w-4 h-4 text-zinc-500 transition-transform duration-300 ${isOpen ? 'rotate-180 text-yellow-500' : ''}`} />
                      </button>
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.15 }}
                          >
                            <div className="p-5 pt-0 border-t border-zinc-850/60 text-zinc-400 text-xs sm:text-sm leading-relaxed font-sans">
                              {faq.a}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* 8. HUMANE FRONT DESK BOOKINGS & PHYSICAL YARDS */}
            <section id="front-desk-contact" className="py-20 bg-zinc-900 border-t border-zinc-800 scroll-mt-24">
              <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="text-center md:max-w-2xl md:mx-auto mb-16">
                  <span className="text-xs font-mono text-yellow-500 font-bold uppercase tracking-wider block mb-2">
                    DUAL METRO MANILA REPAIR HUBS
                  </span>
                  <h2 className="text-3xl font-extrabold tracking-tight text-white uppercase font-sans">
                    Connect With RBB Center
                  </h2>
                  <p className="text-zinc-400 text-xs sm:text-sm mt-2">
                    Request an estimate, speak directly with a Master mechanic, or drive straight into our nearest service branch.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto">
                  
                  {/* Left: Branches, Maps, Open Hours */}
                  <div className="lg:col-span-6 space-y-6">
                    <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-500/5 blur-xl rounded-full" />
                      <h3 className="text-lg font-bold text-white uppercase mb-2 font-sans flex items-center gap-2">
                        <span>👋</span>
                        <span>Front Desk Assistance</span>
                      </h3>
                      <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                        We are open daily from 8:00 AM to 5:00 PM. No bookings strictly required—walk-ins are welcome but pre-booking helps prioritize your computer scans!
                      </p>
                    </div>

                    <div id="fast-map" className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Sucat Yard */}
                      <div className="bg-zinc-950 border border-zinc-800 rounded-px p-6 flex flex-col justify-between rounded-3xl">
                        <div>
                          <span className="text-[10px] font-mono text-yellow-500 font-bold uppercase block mb-1">🔧 BRANCH YARD A</span>
                          <h4 className="text-base font-bold text-white uppercase mb-2 font-sans">Parañaque (Sucat)</h4>
                          <p className="text-zinc-400 text-xs leading-normal mb-4">
                            Sucat Road, Parañaque, Metro Manila (Besides outstanding local commercial spots)
                          </p>
                        </div>
                        <div className="space-y-3 pt-3 border-t border-zinc-850">
                          <a href="tel:09914683462" className="text-xs font-mono text-yellow-500 hover:underline block">
                            📞 PHONE: 0991 468 3462
                          </a>
                          <a 
                            href="https://maps.google.com/?q=RBB+Auto+Electrical+Paranaque" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="inline-block text-[10px] font-mono uppercase bg-zinc-900 px-3 py-1.5 rounded border border-zinc-850 text-zinc-300 hover:text-white"
                          >
                            🗺️ Open Google Maps
                          </a>
                        </div>
                      </div>

                      {/* Pasig Yard */}
                      <div className="bg-zinc-950 border border-zinc-800 rounded-px p-6 flex flex-col justify-between rounded-3xl">
                        <div>
                          <span className="text-[10px] font-mono text-yellow-500 font-bold uppercase block mb-1">🔧 BRANCH YARD B</span>
                          <h4 className="text-base font-bold text-white uppercase mb-2 font-sans">Pasig (Pinagbuhatan)</h4>
                          <p className="text-zinc-400 text-xs leading-normal mb-4">
                            Pinagbuhatan, Pasig, Metro Manila (Centrally located for East Metro Manila drivers)
                          </p>
                        </div>
                        <div className="space-y-3 pt-3 border-t border-zinc-850">
                          <a href="tel:09952302458" className="text-xs font-mono text-yellow-500 hover:underline block">
                            📞 PHONE: 0995 230 2458
                          </a>
                          <a 
                            href="https://maps.google.com/?q=RBB+Auto+Electrical+Pasig" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="inline-block text-[10px] font-mono uppercase bg-zinc-900 px-3 py-1.5 rounded border border-zinc-850 text-zinc-300 hover:text-white"
                          >
                            🗺️ Open Google Maps
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* Email and Messenger */}
                    <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                      <div>
                        <span className="text-[10px] font-mono text-zinc-500 uppercase block">DIRECT DIGITAL MAIL</span>
                        <a href="mailto:jannlester123@gmail.com" className="text-sm font-mono text-white hover:text-yellow-500 font-bold">
                          jannlester123@gmail.com
                        </a>
                      </div>
                      <a 
                        href="https://m.me/rbbautoelectrical" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2"
                      >
                        <MessageSquare className="w-4 h-4 fill-current" />
                        <span>Facebook Messenger</span>
                      </a>
                    </div>
                  </div>

                  {/* Right Column: Dynamic Form */}
                  <div id="front-desk-contact" className="lg:col-span-6 bg-zinc-950 border border-zinc-805 rounded-3xl p-6 sm:p-8 relative">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/5 blur-3xl rounded-full" />
                    
                    {!landingSuccess ? (
                      <form onSubmit={handleLandingFormSubmit} className="space-y-5">
                        <div>
                          <span className="text-[10px] font-mono text-yellow-500 font-bold uppercase tracking-widest block mb-1">
                            FREE INITIAL DIAGNOSTIC CALL
                          </span>
                          <h3 className="text-xl font-bold text-white uppercase font-sans">Quick Repair Enquiry</h3>
                          <p className="text-zinc-500 text-xs mt-1 leading-normal">
                            Detail what faults your vehicle is expressing. A technical advisor will respond within 15 minutes.
                          </p>
                        </div>

                        <div>
                          <label className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider block mb-2">
                            1. Your Name *
                          </label>
                          <input 
                            type="text" 
                            required
                            placeholder="e.g. Juan Dela Cruz"
                            value={landingName}
                            onChange={(e) => setLandingName(e.target.value)}
                            className="w-full bg-zinc-905 border border-zinc-800 focus:border-yellow-500 focus:outline-none rounded-xl px-4 py-3 text-sm text-white"
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider block mb-2">
                              2. Mobile Number *
                            </label>
                            <input 
                              type="tel" 
                              required
                              placeholder="e.g. 0991 468 3462"
                              value={landingPhone}
                              onChange={(e) => setLandingPhone(e.target.value)}
                              className="w-full bg-zinc-905 border border-zinc-800 focus:border-yellow-500 focus:outline-none rounded-xl px-4 py-3 text-sm text-white"
                            />
                          </div>
                          <div>
                            <label className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider block mb-2">
                              3. Your Vehicle / Motor
                            </label>
                            <input 
                              type="text" 
                              placeholder="e.g. Toyota Vios 2018"
                              value={landingVehicle}
                              onChange={(e) => setLandingVehicle(e.target.value)}
                              className="w-full bg-zinc-905 border border-zinc-800 focus:border-yellow-500 focus:outline-none rounded-xl px-4 py-3 text-sm text-white"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider block mb-2">
                            4. Preferred Workshop Branch *
                          </label>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            <button
                              type="button"
                              onClick={() => setLandingBranch('paranaque')}
                              className={`flex flex-col items-start p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                                landingBranch === 'paranaque'
                                  ? 'border-yellow-500 bg-yellow-500/10 text-white'
                                  : 'border-zinc-800 bg-zinc-905 hover:bg-zinc-900 text-zinc-400 hover:text-zinc-200'
                              }`}
                            >
                              <span className="text-xs font-bold font-sans uppercase tracking-tight flex items-center gap-1.5">
                                <span className={`w-1.5 h-1.5 rounded-full ${landingBranch === 'paranaque' ? 'bg-yellow-500 animate-pulse' : 'bg-zinc-600'}`} />
                                Parañaque Branch (Sucat HQ)
                              </span>
                              <span className="text-[10px] text-zinc-500 mt-1 font-mono leading-tight">
                                Besides Petron, Dr. A. Santos Ave
                              </span>
                            </button>

                            <button
                              type="button"
                              onClick={() => setLandingBranch('pasig')}
                              className={`flex flex-col items-start p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                                landingBranch === 'pasig'
                                  ? 'border-yellow-500 bg-yellow-500/10 text-white'
                                  : 'border-zinc-800 bg-zinc-905 hover:bg-zinc-900 text-zinc-400 hover:text-zinc-200'
                              }`}
                            >
                              <span className="text-xs font-bold font-sans uppercase tracking-tight flex items-center gap-1.5">
                                <span className={`w-1.5 h-1.5 rounded-full ${landingBranch === 'pasig' ? 'bg-yellow-500 animate-pulse' : 'bg-zinc-600'}`} />
                                Pasig Branch (Sandoval Ave)
                              </span>
                              <span className="text-[10px] text-zinc-500 mt-1 font-mono leading-tight">
                                Pinagbuhatan, Pasig City HUB
                              </span>
                            </button>
                          </div>
                        </div>

                        <div>
                          <label className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider block mb-2">
                            5. Explain What&rsquo;s Wrong
                          </label>
                          <textarea 
                            rows={3}
                            placeholder="e.g. Battery drops voltage / alternator making a squealing noise"
                            value={landingIssue}
                            onChange={(e) => setLandingIssue(e.target.value)}
                            className="w-full bg-zinc-905 border border-zinc-800 focus:border-yellow-500 focus:outline-none rounded-xl px-4 py-3 text-sm text-white resize-none"
                          />
                        </div>

                        <button 
                          type="submit"
                          className="w-full p-4 bg-yellow-500 hover:bg-yellow-400 text-zinc-950 font-black rounded-xl text-center text-xs uppercase tracking-widest transition-transform active:translate-y-0.5 shadow-lg shadow-yellow-500/10 cursor-pointer"
                        >
                          Request Free Assistance Call &rarr;
                        </button>

                        <div className="flex items-center gap-2 justify-center text-[10px] text-zinc-600 font-mono">
                          <span>🔒 Anti-spam guarantee</span>
                          <span>•</span>
                          <span>🛡️ TESDA Certified Quality Repairs</span>
                        </div>
                      </form>
                    ) : (
                      <div className="text-center py-12">
                        <div className="size-16 bg-yellow-500/10 text-yellow-500 border border-yellow-500/35 rounded-full flex items-center justify-center text-3xl mx-auto mb-6">
                          ✓
                        </div>
                        <h3 className="text-2xl font-black text-white uppercase mb-2 animate-pulse">Inquiry Sent Successfully!</h3>
                        <p className="text-zinc-400 text-xs sm:text-sm max-w-sm mx-auto leading-relaxed mb-8 font-sans">
                          Thank you, <span className="font-bold text-yellow-500">{landingName}</span>! Your inquiry for our <span className="font-bold text-yellow-500">{landingBranch === 'paranaque' ? 'Parañaque Branch (Sucat HQ)' : 'Pasig Branch (Pinagbuhatan HUB)'}</span> has been received. Our automotive electrical advisor will telephone you at <span className="font-mono font-bold text-yellow-500">{landingPhone}</span> within 15 minutes to coordinate your inspection!
                        </p>
                        <button 
                          onClick={resetLandingForm}
                          className="px-6 py-3 bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 hover:border-zinc-750 text-zinc-300 font-bold rounded-xl text-xs uppercase tracking-wider transition-colors cursor-pointer"
                        >
                          Send Another Enquiry
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </section>
          </div>
        );
    }
  };

  return (
    <div className="bg-zinc-950 min-h-screen text-white font-sans flex flex-col antialiased selection:bg-yellow-500 selection:text-zinc-900 overflow-x-hidden">
      
      {/* 1. Header Toolbar */}
      <Navbar
        activeSection={activeSection}
        onNavigate={setActiveSection}
        currentView={currentView}
        onViewChange={setCurrentView}
      />

      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3, ease: [0.215, 0.61, 0.355, 1] }}
          >
            {renderView()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* 9. Footer block */}
      <footer className="bg-zinc-950 border-t border-zinc-900 py-10 px-4 text-center text-zinc-500 text-xs sm:text-sm font-mono shrink-0">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 bg-yellow-500 rounded flex items-center justify-center font-bold text-zinc-950 text-xs">⚡</span>
            <span className="text-zinc-200 font-sans font-bold">RBB Auto Electrical and Motor Rewinding Center © 2022 - 2026</span>
          </div>
          <p className="text-zinc-500 font-sans">
            Parañaque &amp; Pasig, Metro Manila. All Rights Reserved. Repair &amp; Rewind specialists.
          </p>
          <div className="flex gap-4">
            <button onClick={() => setActiveSection('home')} className="hover:text-yellow-500">Back back to top</button>
            <span>•</span>
            <button onClick={() => handleSelectServiceFromWidget('booking')} className="hover:text-yellow-500">Quote Inquiries</button>
          </div>
        </div>
      </footer>

      {/* 10. Sticky Mobile Core Action Bar (Fixed bottom block on smaller viewports with Call, Message, and Directions) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-zinc-950/95 backdrop-blur-md border-t border-zinc-850 py-3 px-4 flex gap-2 shadow-2xl">
        <a
          href="tel:09914683462"
          className="flex-1 bg-yellow-500 text-zinc-950 text-center py-3 rounded-xl font-bold text-xs uppercase tracking-tight flex items-center justify-center gap-1"
        >
          📞 Call
        </a>
        <a
          href="https://m.me/rbbautoelectrical"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 bg-blue-600 text-white text-center py-3 rounded-xl font-bold text-xs uppercase tracking-tight flex items-center justify-center gap-1"
        >
          💬 Message
        </a>
        <a
          href="https://maps.google.com/?q=RBB+Auto+Electrical+Paranaque"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 bg-zinc-800 text-zinc-300 border border-zinc-700 text-center py-3 rounded-xl font-bold text-xs uppercase tracking-tight flex items-center justify-center gap-1"
        >
          🗺️ Route
        </a>
      </div>

      {/* 11. Floating top scroll indicator button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-18 md:bottom-6 right-6 p-3 bg-zinc-900 hover:bg-yellow-500 hover:text-zinc-950 text-yellow-500 rounded-full border border-zinc-800 hover:border-yellow-500 shadow-xl transition-all duration-350 z-30 group cursor-pointer hover:scale-105"
          title="Back to Top"
        >
          <ChevronUp className="w-5 h-5 transition-transform group-hover:-translate-y-0.5" />
        </button>
      )}

    </div>
  );
}
