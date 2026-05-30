import { useState, FormEvent } from 'react';
import { Calendar, Phone, CheckCircle, Calculator, Info, InfoIcon, ShieldAlert } from 'lucide-react';
import { SERVICES } from '../data';
import { motion, AnimatePresence } from 'motion/react';

interface BookingWidgetProps {
  initialVehicleType?: string;
  initialServiceId?: string;
  key?: string;
}

export default function BookingWidget({ initialVehicleType, initialServiceId }: BookingWidgetProps = {}) {
  const [vehicleType, setVehicleType] = useState<string>(initialVehicleType || 'sedan');
  const [selectedServiceId, setSelectedServiceId] = useState<string>(initialServiceId || 'diagnostics');
  const [selectedBranch, setSelectedBranch] = useState<string>('paranaque');
  const [urgentRequest, setUrgentRequest] = useState<boolean>(false);
  
  // Booking Form fields
  const [fullName, setFullName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [modelVal, setModelVal] = useState<string>('');
  const [dateVal, setDateVal] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);

  // Price estimate math
  const getCalculatedPrice = () => {
    let baseMin = 500;
    let baseMax = 1200;

    const matchedService = SERVICES.find((s) => s.id === selectedServiceId);
    if (matchedService) {
      if (matchedService.id === 'diagnostics') {
        baseMin = 0; baseMax = 0; // FREE check up and estimate!
      } else if (matchedService.id === 'battery') {
        baseMin = 0; baseMax = 0; // FREE diagnostics check!
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

    // Adapt by vehicle type modifier
    let vehicleMultiplier = 1.0;
    if (vehicleType === 'suv') vehicleMultiplier = 1.15;
    if (vehicleType === 'pickup') vehicleMultiplier = 1.25;
    if (vehicleType === 'luxury_euro') vehicleMultiplier = 1.45;

    let finalMin = Math.round(baseMin * vehicleMultiplier);
    let finalMax = Math.round(baseMax * vehicleMultiplier);

    if (urgentRequest && (finalMin > 0 || finalMax > 0)) {
      finalMin += 300;
      finalMax += 500;
    }

    return {
      min: finalMin,
      max: finalMax
    };
  };

  const currentPrice = getCalculatedPrice();

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone) {
      alert('Please fill in your name and phone number so we can reach you.');
      return;
    }
    setSubmitted(true);
  };

  const handleResetForm = () => {
    setFullName('');
    setPhone('');
    setModelVal('');
    setDateVal('');
    setNotes('');
    setUrgentRequest(false);
    setSubmitted(false);
  };

  return (
    <section id="booking" className="scroll-mt-16 py-16 px-4 bg-zinc-900 text-white border-t border-zinc-805">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center md:max-w-3xl md:mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-yellow-500/10 border border-yellow-500/30 rounded-full text-yellow-500 text-xs font-mono mb-3 uppercase tracking-wider">
            <Calculator className="w-3.5 h-3.5" />
            <span>Interactive Price Estimator & Booking</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
            Transparent Price Estimator & Instant Booking
          </h2>
          <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
            Configure your vehicle type and electrical service needs below to instantly calculate a high-probability price bracket on the spot. No guesswork. Honest quotes.
          </p>
        </div>

        {/* Dynamic Calculator & Booking Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Block: The Interactive Calculator Module (Take 5 columns) */}
          <div className="lg:col-span-6 bg-zinc-950 border border-zinc-800 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-xl relative min-h-[550px]">
            <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/5 blur-2xl rounded-full" />
            
            <div>
              <span className="text-xs font-mono uppercase text-zinc-500 tracking-wider block mb-4">
                Configure Price Estimate
              </span>

              {/* 1. Vehicle Type selector */}
              <div className="mb-6">
                <label className="text-sm font-semibold text-zinc-300 block mb-2.5">
                  1. select Vehicle class
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {[
                    { id: 'sedan', label: 'Sedans & Hatchbacks (Local/Japanese)' },
                    { id: 'suv', label: 'Mid/Large SUVs & Pickups (Toyota, etc)' },
                    { id: 'pickup', label: 'Fleets, Delivery Vans & Trucks' },
                    { id: 'luxury_euro', label: 'European & Luxury Electronics' }
                  ].map((v) => {
                    const isActive = vehicleType === v.id;
                    return (
                      <button
                        key={v.id}
                        type="button"
                        onClick={() => setVehicleType(v.id)}
                        className={`relative text-left p-3.5 rounded-xl border transition-all cursor-pointer overflow-hidden ${
                          isActive
                            ? 'border-yellow-500 text-yellow-500 font-bold'
                            : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-750 hover:text-zinc-200'
                        }`}
                      >
                        {isActive && (
                          <motion.div
                            layoutId="activeInputPill"
                            className="absolute inset-0 bg-yellow-500/10 -z-10"
                            transition={{ type: "spring", stiffness: 350, damping: 28 }}
                          />
                        )}
                        <span className="relative z-10">{v.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. Service Item selector */}
              <div className="mb-6">
                <label className="text-sm font-semibold text-zinc-300 block mb-2.5">
                  2. Select Electrical Service Needed
                </label>
                <select
                  value={selectedServiceId}
                  onChange={(e) => setSelectedServiceId(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3.5 text-sm text-zinc-200 focus:outline-none focus:border-yellow-500 hover:border-zinc-700 transition-colors"
                >
                  {SERVICES.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.title} ({s.priceRange})
                    </option>
                  ))}
                </select>
              </div>

              {/* 3. Emergency Diagnostics Addon */}
              <div className="mb-6">
                <button
                  type="button"
                  onClick={() => setUrgentRequest(!urgentRequest)}
                  className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all text-left ${
                    urgentRequest
                      ? 'bg-amber-500/15 border-amber-500 text-amber-400 font-bold'
                      : 'bg-zinc-900/40 border-zinc-800 text-zinc-400 hover:border-zinc-800'
                  }`}
                >
                  <div className="flex gap-3 items-center text-xs sm:text-sm">
                    <ShieldAlert className="w-5 h-5 text-amber-500 shrink-0" />
                    <div>
                      <span className="block leading-none">Emergency / Priority Service Crew Request</span>
                      <span className="text-[10px] text-zinc-500 font-mono mt-1 block">Prioritized dispatch directly to your vehicle location (+₱300-₱500)</span>
                    </div>
                  </div>
                  <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                    urgentRequest ? 'bg-amber-500 border-amber-500 text-zinc-950' : 'border-zinc-700'
                  }`}>
                    {urgentRequest && <span className="text-xs">✓</span>}
                  </div>
                </button>
              </div>
            </div>

            {/* Price Output Window */}
            <div className="mt-8 bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs uppercase font-mono tracking-wider text-zinc-400">
                  Estimated Labor Price Bracket:
                </span>
                <span className="text-[10px] font-mono bg-yellow-500/10 text-yellow-500 px-2 py-0.5 rounded uppercase font-semibold">
                  {currentPrice.min === 0 ? '₱0 Promotion' : 'Transparent Base Estimate'}
                </span>
              </div>
              
              <motion.div
                key={`${selectedServiceId}-${vehicleType}-${urgentRequest}`}
                initial={{ opacity: 0, y: 4, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className="text-2xl sm:text-3xl font-extrabold tracking-tight text-yellow-400 mb-2 font-sans"
              >
                {currentPrice.min === 0 ? 'FREE Check-Up & Estimate!' : `₱${currentPrice.min.toLocaleString()} - ₱${currentPrice.max.toLocaleString()}`}
              </motion.div>

              <p className="text-zinc-500 text-xs leading-normal flex gap-1.5 items-start">
                <InfoIcon className="w-4 h-4 text-zinc-400 shrink-0 mt-0.5" />
                <span>Estimate matches professional labor, diagnostic sweep, and physical electrical tests. Parts, wires, replacement battery fees are determined in-shop post testing.</span>
              </p>
            </div>

          </div>

          {/* Right Block: Simple Booking Form (6 columns) */}
          <div className="lg:col-span-6 bg-zinc-950 border border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-xl">
            <AnimatePresence mode="wait">
              {!submitted ? (
                /* The Booking Form */
                <motion.form
                  key="booking-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleFormSubmit}
                  className="space-y-4"
                >
                  <span className="text-xs font-mono uppercase text-zinc-500 tracking-wider block mb-2">
                    Submit Booking Inquiry
                  </span>

                  <div>
                    <label className="text-xs font-semibold text-zinc-400 uppercase tracking-tight block mb-1.5">
                      Your Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Arcyves Macalintal"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 placeholder-zinc-600 text-sm focus:outline-none focus:border-yellow-500 hover:border-zinc-800 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-zinc-400 uppercase tracking-tight block mb-1.5">
                      Preferred Workshop Branch <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={selectedBranch}
                      onChange={(e) => setSelectedBranch(e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-200 focus:outline-none focus:border-yellow-500 hover:border-zinc-850 transition-colors"
                    >
                      <option value="paranaque">Parañaque Main Branch (beside Petron)</option>
                      <option value="pasig">Pasig Branch (0270 Sandoval Ave., Pinagbuhatan)</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-zinc-400 uppercase tracking-tight block mb-1.5">
                        Active Phone / Mobile <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. +63 917 123 4567"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 placeholder-zinc-600 text-sm focus:outline-none focus:border-yellow-500 hover:border-zinc-800 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-zinc-400 uppercase tracking-tight block mb-1.5">
                        Vehicle Year, Make & Model
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 2021 Toyota Fortuner"
                        value={modelVal}
                        onChange={(e) => setModelVal(e.target.value)}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 placeholder-zinc-600 text-sm focus:outline-none focus:border-yellow-500 hover:border-zinc-800 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-zinc-400 uppercase tracking-tight block mb-1.5">
                        Preferred In-Shop Date
                      </label>
                      <input
                        type="date"
                        value={dateVal}
                        onChange={(e) => setDateVal(e.target.value)}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-300 text-sm focus:outline-none focus:border-yellow-500 hover:border-zinc-800 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-zinc-400 uppercase tracking-tight block mb-1.5">
                        Preferred Arrival Hour
                      </label>
                      <select className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-300 text-sm focus:outline-none focus:border-yellow-500 hover:border-zinc-800 transition-colors">
                        <option>Morning (8:00 AM - 11:30 AM)</option>
                        <option>Afternoon (1:00 PM - 4:00 PM)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-zinc-400 uppercase tracking-tight block mb-1.5">
                      Describe What Spark or Start Issue is Happening (Optional)
                    </label>
                    <textarea
                      rows={3}
                      placeholder="e.g. Battery dead after 2 days of standing. Headlights glowing dim when alternator warning turns on."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 placeholder-zinc-600 text-sm focus:outline-none focus:border-yellow-500 hover:border-zinc-800 transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-yellow-500 hover:bg-yellow-400 text-zinc-950 py-3.5 rounded-xl font-bold font-sans text-sm tracking-tight transition-transform hover:-translate-y-0.5 active:translate-y-0 shadow-lg shadow-yellow-500/10 cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Calendar className="w-4 h-4 fill-current" />
                    <span>Inquire About Estimate Price Fix</span>
                  </button>

                  <p className="text-[10px] text-zinc-600 text-center font-mono uppercase mt-2">
                    🛡️ No payment card required. Pay only in-shop post vehicle diagnostic scan.
                  </p>
                </motion.form>
              ) : (
                /* Successful Submission screen */
                <motion.div
                  key="success-screen"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="py-10 text-center flex flex-col items-center justify-center h-full min-h-[380px]"
                >
                  <div className="w-16 h-16 bg-yellow-500/20 border border-yellow-500 text-yellow-500 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle className="w-8 h-8 fill-zinc-950" />
                  </div>
                  
                  <h3 className="text-2xl font-bold tracking-tight text-white mb-2">
                    Inquiry Submitted Successfully!
                  </h3>
                  
                  <p className="text-zinc-400 text-xs sm:text-sm max-w-sm mx-auto mb-6 leading-relaxed">
                    Thank you <span className="text-white font-bold">{fullName}</span>. We will analyze your vehicle details (<span className="text-yellow-400 font-mono text-xs">{modelVal || 'Not Specified'}</span>) and call/message you at <span className="text-white font-mono font-bold">{phone}</span> within 2 hours with in-shop diagnostics availability.
                  </p>

                  <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-left text-xs max-w-md w-full mb-8 font-mono">
                    <span className="text-yellow-500 font-bold block mb-1">📋 Your Estimated Price Bracket:</span>
                    <span className="text-white text-base font-bold font-sans block">
                      {currentPrice.min === 0 ? 'FREE Check-Up & Estimate!' : `₱${currentPrice.min.toLocaleString()} - ₱${currentPrice.max.toLocaleString()}`}
                    </span>
                    <span className="block mt-2 text-zinc-400 uppercase font-bold text-[9px]">
                      📍 Preferred: {selectedBranch === 'paranaque' 
                        ? '8102 Dr. A. Santos Ave. San Dionisio Parañaque City (beside Petron)'
                        : '0270 Sandoval Ave. Brgy. Pinagbuhatan Pasig City'}
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 w-full">
                    <button
                      onClick={handleResetForm}
                      className="w-full sm:w-1/2 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white py-3 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      Make Another Estimate
                    </button>
                    <a
                      href={selectedBranch === 'paranaque' ? 'tel:09914683462' : 'tel:09952302458'}
                      className="w-full sm:w-1/2 bg-yellow-500 hover:bg-yellow-400 text-zinc-950 py-3 rounded-lg text-xs font-bold uppercase tracking-wider text-center transition-colors block"
                    >
                      📞 Call {selectedBranch === 'paranaque' ? 'Parañaque' : 'Pasig'} Now
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
