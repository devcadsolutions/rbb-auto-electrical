export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQCategory {
  id: string;
  title: string;
  icon: string;
  items: FAQItem[];
}

export const FAQ_CATEGORIES: FAQCategory[] = [
  {
    id: "services-diagnostics",
    title: "Services & Diagnostics",
    icon: "HelpCircle",
    items: [
      {
        question: "What services do you offer?",
        answer: "RBB provides starter and alternator repair, rewinding, and selected replacement options. The shop also handles AC/DC motor rewinding, generator servicing, power tool repair, radiator repair, radiator overhaul, and radiator cap replacement. Contact the shop to confirm availability for your vehicle or equipment."
      },
      {
        question: "Do you repair starters and alternators?",
        answer: "Yes. RBB handles starter and alternator repair and rewinding. Replacement units for selected vehicle models may also be available."
      },
      {
        question: "Do you sell brand-new starters and alternators?",
        answer: "Brand-new starter and alternator units may be available for selected vehicle models. Call or message the shop with your vehicle details to check current availability."
      },
      {
        question: "Do you offer free check-ups or estimates?",
        answer: "The business advertises free check-ups and estimates. Contact the shop to confirm the process and whether this applies to your specific concern."
      },
      {
        question: "What vehicle brands do you service?",
        answer: "Based on our repair history, we regularly handle vehicles from Toyota, Mitsubishi, Nissan, Ford, and Geely, among other major brands. Contact the shop to confirm whether your specific brand and model can be serviced."
      }
    ]
  },
  {
    id: "motors-radiators",
    title: "Motors & Radiators",
    icon: "ShieldAlert",
    items: [
      {
        question: "Do you repair radiators?",
        answer: "Yes. The shop offers radiator repair, radiator overhaul, and radiator cap replacement. Contact the shop to describe your concern."
      },
      {
        question: "Do you rewind electric motors?",
        answer: "Yes. RBB specializes in rewinding and repair services for single-phase and three-phase AC and DC motors."
      },
      {
        question: "Do you repair generators?",
        answer: "Yes. Generator repair and rewinding are list among the shop’s primary specialties."
      },
      {
        question: "Do you repair power tools?",
        answer: "Yes. Power tool repair is listed as an available service. Contact the shop to confirm whether your specific tool (drills, grinders, cutters, etc.) can be serviced."
      }
    ]
  },
  {
    id: "location-bookings",
    title: "Availability & Location",
    icon: "CreditCard",
    items: [
      {
        question: "Do you offer home service?",
        answer: "Home service is available upon request and depending on schedule. Contact the shop with your exact location and concern to confirm whether mobile mechanical support is available for your area and service requirement."
      },
      {
        question: "What should I send when making an inquiry?",
        answer: "Provide your name, contact number, vehicle model or equipment type, location if requesting home service, and a brief description of the issue. Photos of the faulty part or dashboard light also help us prepare an initial estimate."
      },
      {
        question: "Where is the shop located?",
        answer: "Our main workshop is located at 8102 Dr. A. Santos Avenue, Barangay San Dionisio, Parañaque City (beside Petron). We also operate an East Metro Manila hub in Pinagbuhatan, Pasig City."
      },
      {
        question: "What are your operating hours?",
        answer: "We are open daily from 8:00 AM to 5:00 PM, Monday through Sunday. Walk-ins are always welcome, but we recommend giving us a quick heads-up via call or message so we can prep our computer scanners for you."
      }
    ]
  }
];
