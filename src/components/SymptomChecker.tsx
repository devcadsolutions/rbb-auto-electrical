import { useState } from 'react';
import { AlertTriangle, Clock, Hammer, ArrowRight, CheckCircle, Info } from 'lucide-react';
import { SYMPTOMS } from '../data';
import { ElectricalSymptom } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface SymptomCheckerProps {
  onSelectService: (serviceId: string) => void;
}

export default function SymptomChecker({ onSelectService }: SymptomCheckerProps) {
  const [selectedSymptomId, setSelectedSymptomId] = useState<string>(SYMPTOMS[0].id);

  const activeSymptom = SYMPTOMS.find((s) => s.id === selectedSymptomId) || SYMPTOMS[0];

  const getSeverityStyles = (severity: string) => {
    switch (severity) {
      case 'critical':
        return {
          bg: 'bg-red-500/10 border-red-500/30 text-red-400',
          badge: 'bg-red-500 text-white animate-pulse',
          label: 'CRITICAL HAZARD - STOP CAR'
        };
      case 'high':
        return {
          bg: 'bg-amber-500/10 border-amber-500/30 text-amber-400',
          badge: 'bg-amber-500 text-zinc-950',
          label: 'HIGH CONTINGENCY - DIAGNOSE NOW'
        };
      case 'medium':
        return {
          bg: 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400',
          badge: 'bg-yellow-500 text-zinc-950',
          label: 'WARNING - AT RISK'
        };
      default:
        return {
          bg: 'bg-blue-500/10 border-blue-500/30 text-blue-400',
          badge: 'bg-blue-500 text-white',
          label: 'MODERATE - REPAIR SLATE'
        };
    }
  };

  const severityInfo = getSeverityStyles(activeSymptom.severity);

  return (
    <section id="diagnose" className="scroll-mt-16 py-16 px-4 bg-zinc-950 text-white border-t border-zinc-800">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center md:max-w-3xl md:mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-yellow-500/10 border border-yellow-500/30 rounded-full text-yellow-500 text-xs font-mono mb-3 uppercase tracking-wider">
            <Info className="w-4 h-4" />
            <span>Interactive Electrical Troubleshooter</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
            Is Your Vehicle Misbehaving?
          </h2>
          <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
            Select what you are hearing or feeling below. Our diagnostic solver isolates common vehicle electrical failures and suggests quick direct fixes.
          </p>
        </div>

        {/* Solver Widget Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-zinc-900 border border-zinc-800 rounded-2xl p-4 sm:p-6 lg:p-8 relative overflow-hidden shadow-2xl">
          
          <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/5 blur-3xl rounded-full" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 blur-3xl rounded-full" />

          {/* Left Column: Symptoms Selector list */}
          <div className="lg:col-span-5 flex flex-col gap-3 z-10">
            <span className="text-xs font-mono uppercase text-zinc-500 tracking-wider mb-1 block">
              Step 1: Choose Your Fault Symptom
            </span>
            <div className="flex flex-col gap-2 max-h-[380px] overflow-y-auto pr-1">
              {SYMPTOMS.map((item) => {
                const isActive = selectedSymptomId === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setSelectedSymptomId(item.id)}
                    className={`relative w-full text-left p-4 rounded-xl border transition-all cursor-pointer overflow-hidden ${
                      isActive
                        ? 'border-yellow-500 text-white'
                        : 'bg-zinc-900/60 border-zinc-800/80 text-zinc-400 hover:border-zinc-750 hover:text-zinc-200'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeSymptomPill"
                        className="absolute inset-0 bg-yellow-500/10 -z-10"
                        transition={{ type: "spring", stiffness: 350, damping: 28 }}
                      />
                    )}
                    <div className="font-semibold text-sm sm:text-base flex items-start gap-2.5 relative z-10">
                      <span className={`w-2 h-2 rounded-full mt-2 shrink-0 ${
                        item.severity === 'critical' ? 'bg-red-500 animate-ping' :
                        item.severity === 'high' ? 'bg-amber-500' : 'bg-yellow-500'
                      }`} />
                      <span>{item.symptom}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Diagnostic Output Card */}
          <div className="lg:col-span-7 bg-zinc-950/60 border border-zinc-800/80 rounded-2xl p-5 sm:p-7 flex flex-col justify-between z-10 min-h-[450px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedSymptomId}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.26, ease: [0.25, 1, 0.5, 1] }}
                className="flex flex-col justify-between h-full w-full"
              >
                <div>
                  {/* Fault Diagnostics Title */}
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-5 pb-5 border-b border-zinc-800/80">
                    <div>
                      <span className="text-xs font-mono uppercase text-zinc-500 tracking-wider block mb-1">
                        Step 2: Diagnosis &amp; Isolated Causes
                      </span>
                      <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white font-heading">
                        {activeSymptom.symptom}
                      </h3>
                    </div>
                    <span className={`px-3 py-1 text-[10px] font-mono rounded-full font-bold tracking-wider ${severityInfo.badge}`}>
                      {severityInfo.label}
                    </span>
                  </div>

                  {/* Symptom description */}
                  <p className="text-zinc-300 text-sm leading-relaxed mb-6">
                    {activeSymptom.description}
                  </p>

                  {/* Isolated Causes list */}
                  <div className="mb-6">
                    <span className="text-xs font-mono uppercase text-yellow-500 tracking-wider block mb-3 font-semibold">
                      Common Electrical Culprits
                    </span>
                    <ul className="space-y-3">
                      {activeSymptom.potentialCauses.map((cause, idx) => (
                        <li key={idx} className="flex gap-3 text-sm text-zinc-300 items-start">
                          <div className="bg-yellow-500/10 p-1 rounded-md text-yellow-500 shrink-0 mt-0.5">
                            <AlertTriangle className="w-3.5 h-3.5" />
                          </div>
                          <span>{cause}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Repair difficulties details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-zinc-800/60 mb-6 text-xs font-mono">
                    <div className="flex items-center gap-2">
                      <Hammer className="w-4 h-4 text-zinc-400 shrink-0" />
                      <div>
                        <span className="text-zinc-500 block uppercase">Self-Repair Safe?</span>
                        <span className="text-zinc-300 font-sans text-sm mt-0.5 block font-medium">
                          No. Advanced tools required.
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-zinc-400 shrink-0" />
                      <div>
                        <span className="text-zinc-500 block uppercase">Diagnostics Time</span>
                        <span className="text-zinc-300 font-sans text-sm mt-0.5 block font-medium">
                          15 to 20 minutes on-site
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Direct Instant Action Call-To-Action */}
                <div className="bg-gradient-to-r from-yellow-500/5 to-amber-500/5 border border-yellow-500/20 rounded-xl p-4 sm:p-5 flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="flex gap-3 items-center">
                    <div className="bg-yellow-500 text-zinc-950 p-2.5 rounded-lg shrink-0">
                      <CheckCircle className="w-5 h-5 fill-current" />
                    </div>
                    <div>
                      <span className="text-xs font-mono text-zinc-400 block tracking-tight uppercase">
                        Recommended Fix Service
                      </span>
                      <span className="text-white hover:text-yellow-400 font-bold font-sans text-sm sm:text-base leading-snug transition-colors">
                        Automotive Scan &amp; Electrical Test
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => onSelectService(activeSymptom.recommendedServiceId)}
                    className="w-full md:w-auto bg-yellow-500 hover:bg-yellow-400 text-zinc-950 px-5 py-3 rounded-lg font-bold text-sm tracking-tight flex items-center justify-center gap-1.5 transition-transform hover:translate-x-0.5 cursor-pointer"
                  >
                    <span>Check Cost &amp; Book Fix</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

      </div>
    </section>
  );
}
