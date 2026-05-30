import { ServiceItem, GalleryItem, TestimonialItem, ElectricalSymptom } from './types';

export const SERVICES: ServiceItem[] = [
  {
    id: 'starter',
    title: 'Starter Motor Repair, Diagnostics & Brand Swaps',
    description: 'Solve zero-cranking issues, engine clicking click-solenoids, or weak starter power. We repair, rewind, or swap assemblies for Toyota, Mitsubishi, Nissan, Honda, Geely, and Ford models using TESDA-level certified tool benches.',
    iconName: 'Zap',
    category: 'auto-electrical',
    priceRange: 'FREE SHOP CHECK-UP & ESTIMATE',
    features: ['Clicking Starter Solenoid Repair', 'Armature Coil High-Grade Rewinding', 'Carbon Brush Gears Rebuilding', 'Original Valeo, Denso & Ryobi Assemblies']
  },
  {
    id: 'alternator',
    title: 'Alternator Charging Diagnostics & Assembly Rebuilds',
    description: 'Resolves battery light dashboard warnings, weak battery outputs, slip-belt squeaks, or dead charging units. Includes bench load-testing, diode diagnostics, voltage regulator checkouts, and complete diagnostic checks.',
    iconName: 'BatteryCharging',
    category: 'auto-electrical',
    priceRange: 'BENCH DIAGNOSTICS INCLUDED',
    features: ['Voltage Regulator Performance Tests', 'Slip Belt Noise Alignment', 'Diodes & Plate Alternator Swaps', 'Genuine Bosch & Denso Alternators']
  },
  {
    id: 'rewinding',
    title: 'AC/DC Motor, Field Coil & Power Tool Rewinding',
    description: 'High-precision rewinding for single-phase and three-phase industrial motors, heavy-duty pumps, generator field coils, and building tools like concrete grinders or construction rotary drills.',
    iconName: 'Cpu',
    category: 'rewinding',
    priceRange: 'ESTIMATE UPON YARD INSPECTION',
    features: ['Class H Durable High-Heat Insulation', 'Armature & Stator Re-winding coils', 'Single & 3-Phase Plant Generator service', 'Builders Tools Torque Restoration']
  },
  {
    id: 'radiator',
    title: 'Radiator Overhaul, Coolant Flush & Cap Re-molding',
    description: 'Keep your coolant flowing smoothly. We de-clog copper and aluminum radiator cores, replace cracked plastic top caps, manual scale core channels, or service leaking tanks to prevent engine heat seizures.',
    iconName: 'Wind',
    category: 'radiator',
    priceRange: 'FREE YARD LEAK PRESSURE-CHECK',
    features: ['Core Scaling & De-clogging Cleans', 'Top & Bottom Cap Custom Mold Fits', 'Overheating Coolant Flush & Purge', 'Heater Core Leak Welding Solutions']
  },
  {
    id: 'parts',
    title: 'Premium OEM Electrical Parts & Accessory Swaps',
    description: 'Avoid counterfeit items that cook your electric boards. We stocks certified starter drivers, relays, fuses, alternator gears, and ready swap batteries (Amaron, Motolite, Panasonic) in our Parañaque & Pasig yards.',
    iconName: 'GitBranch',
    category: 'parts',
    priceRange: 'GENUINE BRANDS STOCKED',
    features: ['Authorized Valeo Partner Stocking', 'Original Motolite & Amaron Batteries', 'Fuses & Relay Board Swaps', 'Rust-Proof Terminal Cleaning Kits']
  },
  {
    id: 'convenience',
    title: 'Diagnostic Home Service & Fast-Enquiry Cues',
    description: 'Stuck at home? No starts? Ask about scheduling an on-site computer diagnostic check. Or pre-book an active shop bay in Sucat or Sandoval to prioritize your scanner inspection.',
    iconName: 'Gauge',
    category: 'convenience',
    priceRange: 'LOUNGE OR ACTIVE ON-SITE AREAS',
    features: ['On-Site Computerized OBD2 Scans', 'Emergency Charger & Jump Starts', 'Pre-booked Express Lane Priority', 'Messenger Consults Live in 15 Mins']
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Valeo Starter Assembly',
    description: 'Brand new original Valeo Starter for Nissan Xtrail and Altima installed with full warranty.',
    category: 'diagnostics',
    imageUrl: 'https://picsum.photos/seed/nissanstarter/800/600',
    date: 'May 2026',
    vehicle: 'Nissan Xtrail / Altima'
  },
  {
    id: 'gal-2',
    title: 'Valeo Alternator Replace',
    description: 'Swapped old alternator with brand new OEM Valeo unit to solve charging issues and battery warning codes.',
    category: 'battery',
    imageUrl: 'https://picsum.photos/seed/geelyalternator/800/600',
    date: 'May 2026',
    vehicle: 'Geely Coolray Sport'
  },
  {
    id: 'gal-3',
    title: 'Radiator Fan Motor Swap',
    description: 'Replaced a failing radiator fan motor with a premium Denso OEM replacement for perfect cooling.',
    category: 'aircon',
    imageUrl: 'https://picsum.photos/seed/toyotafan/800/600',
    date: 'April 2026',
    vehicle: 'Toyota Vios'
  },
  {
    id: 'gal-4',
    title: 'Alternator Pulley Replace',
    description: 'Replaced noisy pulley with a silent, heavy-duty original INA decoupling pulley.',
    category: 'wiring',
    imageUrl: 'https://picsum.photos/seed/navarapulley/800/600',
    date: 'May 2026',
    vehicle: 'Nissan Navara'
  },
  {
    id: 'gal-5',
    title: 'Electric Motor Rewinding',
    description: 'Complete high-tension magnet winding overhaul and varnish treatment of an industrial AC motor.',
    category: 'wiring',
    imageUrl: 'https://picsum.photos/seed/industrialmotor/800/600',
    date: 'March 2026',
    vehicle: 'Industrial AC Motor'
  },
  {
    id: 'gal-6',
    title: 'Radiator Core Flush & Cap',
    description: 'Removed scales from copper radiator core, replaced a cracked plastic top cap, and pressure tested.',
    category: 'aircon',
    imageUrl: 'https://picsum.photos/seed/carcore/800/600',
    date: 'May 2026',
    vehicle: 'Mitsubishi Adventure'
  }
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 't1',
    author: 'Arcyves M.',
    role: 'Toyota Fortuner Owner',
    date: 'March 2026',
    rating: 5,
    content: 'Very reliable auto shop. Fixed my Fortuner’s flashing warning lights under budget. Service was transparent, computer-run, and fast.',
    avatarSeed: 'arcyves'
  },
  {
    id: 't2',
    author: 'Mark Prince S.',
    role: 'Honda Civic Owner',
    date: 'January 2026',
    rating: 5,
    content: 'Rebuilt my starter solenoids beautifully in Parañaque. Honest technicians, fast turnaround, and very reasonable pricing.',
    avatarSeed: 'prince'
  },
  {
    id: 't3',
    author: 'Devin Smith',
    role: 'Van Fleet Operator',
    date: 'December 2025',
    rating: 5,
    content: 'Our delivery vans had severe battery drain issues. They did accurate parasitic load tests, found the ground shorts, and fixed them fast.',
    avatarSeed: 'devin'
  },
  {
    id: 't4',
    author: 'Shannen I.',
    role: 'Kia Soluto Driver',
    date: 'January 2026',
    rating: 5,
    content: 'Fixed my flickering headlights instantly with a new relay box and ground tuning. Highly accommodation-oriented staff and great prices!',
    avatarSeed: 'shan'
  }
];

export const SYMPTOMS: ElectricalSymptom[] = [
  {
    id: 'sym-1',
    symptom: 'Engine clicks but won\'t start',
    description: 'Turning key produces rapid clicks or silence. Headlights or dash lights also go very dim.',
    potentialCauses: ['Dead or weak battery (90%)', 'Worn alternator/starter brushes (8%)', 'Loose or corroded battery terminal cables (2%)'],
    severity: 'high',
    recommendedServiceId: 'starter',
    difficultyToSelfFix: 'Hard - requires heavy battery tester and multimeter.'
  },
  {
    id: 'sym-2',
    symptom: 'Battery Warning Light is ON',
    description: 'The red battery symbol remains glowing while driving, indicating the system is not actively charging.',
    potentialCauses: ['Failed alternator voltage regulator', 'Slipping or broken alternator drive belt', 'Blown main system charging fuse'],
    severity: 'critical',
    recommendedServiceId: 'alternator',
    difficultyToSelfFix: 'Critical Risk - Do not drive far, otherwise the car will stall mid-road.'
  },
  {
    id: 'sym-3',
    symptom: 'Headlights are dim or flash',
    description: 'Your headlights dim, sputter, or fluctuate under throttle or when the aircon turns on.',
    potentialCauses: ['Weak alternator charge output', 'Corroded socket grounding points', 'Sticky or aging headlight relays'],
    severity: 'medium',
    recommendedServiceId: 'parts',
    difficultyToSelfFix: 'Medium - Requires contact cleanup and circuit ground check.'
  },
  {
    id: 'sym-4',
    symptom: 'AC stops cooling when sitting in traffic',
    description: 'The AC blows ice-cold when driving but blows warm, humid air when idling or in traffic jams.',
    potentialCauses: ['Failing magnetic clutch coil', 'Malfunctioning radiator/condenser fan relay', 'Low freon levels with high heat electrical cutouts'],
    severity: 'medium',
    recommendedServiceId: 'radiator',
    difficultyToSelfFix: 'Hard - Requires checking both AC pressures and fan relay lines.'
  },
  {
    id: 'sym-5',
    symptom: 'Battery drains flat overnight',
    description: 'Your car battery goes flat over a single night even though all interior lights and accessories were turned off.',
    potentialCauses: ['Parasitic current draw (stuck relay or switch)', 'Incorrect aftermarket tracker/alarm installations', 'Internal battery plate short circuit'],
    severity: 'high',
    recommendedServiceId: 'convenience',
    difficultyToSelfFix: 'Hard - Requires fuse-by-fuse milliamp current check.'
  }
];
