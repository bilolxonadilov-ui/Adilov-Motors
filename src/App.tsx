/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Check,
  Sliders,
  ShieldCheck,
  Sparkles,
  Send,
  Instagram,
  X,
  Menu,
  Bookmark,
  FileText,
  Copy,
  Download,
  PhoneCall,
  MapPin,
  Gauge,
} from 'lucide-react';

interface ShowcaseItem {
  id: string;
  title: string;
  category: 'Hypercars' | 'Bespoke SUVs' | 'Horology & Lifestyle';
  kicker: string;
  price: number;
  priceFormatted: string;
  powerSpec: string;
  accelerationSpec: string;
  allocationSpec: string;
  image: string;
  exteriorFinish: string;
  interiorTrim: string;
  weightDelta: string;
  summary: string;
  technicalHighlights: string[];
}

interface ChassisOption {
  id: string;
  name: string;
  subtitle: string;
  basePrice: number;
  baseHp: number;
  zeroToHundred: string;
  image: string;
  defaultSummary: string;
}

interface ConfigOption {
  id: string;
  label: string;
  detail: string;
  priceDelta: number;
  hpDelta?: number;
  weightDeltaKg?: number;
  leadWeeksDelta: number;
  swatchHex: string;
}

const HERO_IMAGE = '/src/assets/images/hero_adilov_hypercar_1790762506387.jpg';

const SHOWCASE_ITEMS: ShowcaseItem[] = [
  {
    id: 'adilov-valkyrie-obsidian',
    title: 'Adilov V12 Sovereign Noir',
    category: 'Hypercars',
    kicker: 'Full Autoclave Carbon Body · Commission #01 of 05',
    price: 890000,
    priceFormatted: '$890,000',
    powerSpec: '980 HP',
    accelerationSpec: '2.3s 0–100 km/h',
    allocationSpec: '2 Slots Remaining',
    image: '/src/assets/images/hero_adilov_hypercar_1790762506387.jpg',
    exteriorFinish: 'Matte Obsidian T1000 Weave with 24k Gold Leaf Pin-Striping',
    interiorTrim: 'Anthracite Alcantara & Aniline Saddle Leather',
    weightDelta: '-145 kg vs Factory Spec',
    summary:
      'Engineered in our Geneva and Tashkent wind-tunnel facilities, the Sovereign Noir replaces every stamped aluminum panel with aerospace pre-preg carbon fiber and pairs an Inconel valved exhaust with forged champagne-gold center-lock monoblocks.',
    technicalHighlights: [
      '6.5L Naturally Aspirated V12 with Titanium Internal Valvetrain (9,200 RPM Redline)',
      'Full T1000 Pre-Preg Autoclave Carbon Widebody (-145 kg dry mass reduction)',
      'Custom Brembo CCM-R Carbon-Ceramic Braking System with Brushed Bronze Calipers',
      'Bespoke Cabin Telemetry Cluster Milled from Solid Billet Brass & Sapphire Crystal',
    ],
  },
  {
    id: 'adilov-obsidian-gt',
    title: 'Adilov GT-R Black Label',
    category: 'Hypercars',
    kicker: 'Bi-Turbo Grand Tourer · Track & Boulevard Calibration',
    price: 645000,
    priceFormatted: '$645,000',
    powerSpec: '860 HP',
    accelerationSpec: '2.5s 0–100 km/h',
    allocationSpec: '3 Slots Remaining',
    image: '/src/assets/images/showcase_obsidian_gt_1790762525904.jpg',
    exteriorFinish: 'Satin Basalt Black over Exposed Twill Carbon Splitters',
    interiorTrim: 'Quilted Obsidian Bridge of Weir Leather & Brushed Bronze',
    weightDelta: '-92 kg vs Factory Spec',
    summary:
      'Built for transcontinental velocity, the GT-R Black Label integrates active front aero flaps, hybrid ceramic ball-bearing turbochargers, and a hand-stitched acoustic cabin insulated to 58 dBA at 200 km/h.',
    technicalHighlights: [
      '4.0L Twin-Scroll Bi-Turbo V8 with Billet Compressor Wheels (1,050 Nm Torque)',
      'Active Carbon Rear Diffuser & Aero-Curtain Front Fender Louvers',
      '22-Inch Forged Monoblock Wheels in Satin Champagne Bronze',
      'Hand-Crafted Luggage Set in Matching Obsidian Calfskin Included',
    ],
  },
  {
    id: 'adilov-monarch-suv',
    title: 'Adilov Monarch G-900 Armored',
    category: 'Bespoke SUVs',
    kicker: 'Diplomatic B6+ Protection · Executive Lounge Cabin',
    price: 780000,
    priceFormatted: '$780,000',
    powerSpec: '900 HP',
    accelerationSpec: '3.1s 0–100 km/h',
    allocationSpec: '1 Slot Remaining',
    image: '/src/assets/images/showcase_sovereign_suv_1790762539472.jpg',
    exteriorFinish: 'Anthracite Metallic Silk with Forged Gold 24" Monoblocks',
    interiorTrim: 'Dual Reclining Captain Suites · Starlight Acoustic Headliner',
    weightDelta: 'Ballistic Kevlar & Carbon Composite Cell',
    summary:
      'Commanding road presence paired with invisible B6+ ballistic protection. The Monarch G-900 features an extended rear executive partition, biometric watch-winder safe, and 24-inch forged monoblock wheels.',
    technicalHighlights: [
      '900 HP / 1,250 Nm Reinforced Biturbo Powertrain with Heavy-Duty Cooling Pack',
      'Discreet Multi-Layer Ballistic Glass & Kevlar-Carbon Passenger Cell',
      'Rear Executive Console with Solid Rose-Gold Champagne Flutes & Humidor',
      '24-Inch Forged Monoblock Wheels with Pax Run-Flat Security System',
    ],
  },
  {
    id: 'adilov-chronograph-01',
    title: 'Calibre AML-01 Tourbillon & Key',
    category: 'Horology & Lifestyle',
    kicker: 'Swiss Flying Tourbillon · Paired Vehicle Transponder',
    price: 165000,
    priceFormatted: '$165,000',
    powerSpec: '120h Power Reserve',
    accelerationSpec: '21,600 vph',
    allocationSpec: 'numbered Edition of 12',
    image: '/src/assets/images/showcase_chronograph_edition_1790762550634.jpg',
    exteriorFinish: 'NTPT Forged Carbon Case & 18k Brushed Rose Gold Bezel',
    interiorTrim: 'Grade 5 Titanium Bridges with Encrypted NFC Ignition Module',
    weightDelta: '38g Total Watch Head Mass',
    summary:
      'Co-developed with master independent watchmakers in Geneva, the Calibre AML-01 houses a manual-wind flying tourbillon and an encrypted micro-transponder synchronized directly to your Adilov vehicle commission.',
    technicalHighlights: [
      'In-House Manual-Wind Flying Tourbillon Movement with Double Barrel (120h Reserve)',
      'Case Milled from the Same Autoclave Carbon Batch as the Client’s Vehicle',
      'Bespoke Carbon & 18k Gold Smart Key Fob with Long-Range Telemetry Display',
      'Delivered in a Biometric Obsidian Stone & Brass Presentation Vault',
    ],
  },
  {
    id: 'adilov-spider-corsa',
    title: 'Adilov Corsa Spider Aperta',
    category: 'Hypercars',
    kicker: 'Open-Cockpit Aero Commission · Titanium Exhaust',
    price: 740000,
    priceFormatted: '$740,000',
    powerSpec: '910 HP',
    accelerationSpec: '2.4s 0–100 km/h',
    allocationSpec: '2 Slots Remaining',
    image: '/src/assets/images/showcase_track_spider_1790762564630.jpg',
    exteriorFinish: 'Gloss Exposed Carbon Weave with Metallic Gold Pinstripes',
    interiorTrim: 'Weather-Sealed Carbon Bucket Seats & Gold Anodized Paddles',
    weightDelta: '-118 kg vs Factory Spec',
    summary:
      'An unfiltered open-air sensory instrument. The Corsa Spider Aperta channels intake air directly past sculpted carbon buttresses into a gold-lined engine bay, producing a 9,000 RPM acoustic signature.',
    technicalHighlights: [
      '3D-Printed Thin-Wall Titanium Exhaust with Gold Heat-Dissipation Shielding',
      'Wind-Tunnel Sculpted Twin Buttresses & Swan-Neck Carbon Rear Wing',
      'Center-Lock Forged Magnesium Wheels in Brushed Champagne Gold',
      'Custom-Molded Carbon Fiber Driver & Passenger Monocoque Seating',
    ],
  },
];

const CHASSIS_OPTIONS: ChassisOption[] = [
  {
    id: 'sovereign-v12',
    name: 'Sovereign V12 Coupe',
    subtitle: '6.5L Naturally Aspirated · Full Carbon Widebody',
    basePrice: 680000,
    baseHp: 880,
    zeroToHundred: '2.3s',
    image: '/src/assets/images/hero_adilov_hypercar_1790762506387.jpg',
    defaultSummary: 'Flagship low-slung V12 silhouette with autoclave pre-preg carbon aero architecture.',
  },
  {
    id: 'monarch-suv',
    name: 'Monarch G-900 Widebody',
    subtitle: '4.0L Bi-Turbo V8 · Executive Lounge & Optional B6+ Armor',
    basePrice: 520000,
    baseHp: 820,
    zeroToHundred: '3.1s',
    image: '/src/assets/images/showcase_sovereign_suv_1790762539472.jpg',
    defaultSummary: 'Ultra-luxury widebody SUV blending commanding presence with bespoke rear lounge cabinetry.',
  },
  {
    id: 'corsa-spider',
    name: 'Corsa Spider Aperta',
    subtitle: 'Open-Top Mid-Engine · Track Downforce Calibration',
    basePrice: 610000,
    baseHp: 850,
    zeroToHundred: '2.4s',
    image: '/src/assets/images/showcase_track_spider_1790762564630.jpg',
    defaultSummary: 'Open-cockpit supercar engineered for razor-sharp turn-in and titanium exhaust acoustics.',
  },
];

const AERO_PACKAGES: ConfigOption[] = [
  {
    id: 'aero-stealth',
    label: 'Stealth Satin T1000 Weave',
    detail: 'Front splitter, side skirts, and rear diffuser in matte autoclave carbon',
    priceDelta: 48000,
    hpDelta: 25,
    weightDeltaKg: -65,
    leadWeeksDelta: 6,
    swatchHex: '#1c1c1e',
  },
  {
    id: 'aero-gold-thread',
    label: '24k Gold-Thread Exposed Carbon',
    detail: 'Interwoven 24-karat gold filament carbon panels with hand-laid pinstriping',
    priceDelta: 85000,
    hpDelta: 45,
    weightDeltaKg: -95,
    leadWeeksDelta: 9,
    swatchHex: '#c5a059',
  },
  {
    id: 'aero-corsa-track',
    label: 'Sovereign Corsa Downforce Spec + Inconel Exhaust',
    detail: 'Active swan-neck wing, fender louvers, and gold-shielded Inconel exhaust (+100 HP)',
    priceDelta: 118000,
    hpDelta: 100,
    weightDeltaKg: -145,
    leadWeeksDelta: 12,
    swatchHex: '#d4af37',
  },
];

const WHEEL_PACKAGES: ConfigOption[] = [
  {
    id: 'wheel-champagne',
    label: '23" Brushed Champagne Gold Monoblock',
    detail: 'CNC-milled from aerospace 6061-T6 aluminum with hidden titanium hardware',
    priceDelta: 24000,
    weightDeltaKg: -18,
    leadWeeksDelta: 2,
    swatchHex: '#d4af37',
  },
  {
    id: 'wheel-bronze',
    label: '24" Smoked Bronze Aerodisc Forged',
    detail: 'Carbon-louvered aero ring with brushed bronze inner barrel',
    priceDelta: 34000,
    weightDeltaKg: -22,
    leadWeeksDelta: 3,
    swatchHex: '#8c6d3b',
  },
  {
    id: 'wheel-magnesium',
    label: '23" Center-Lock Forged Magnesium + Gold Calipers',
    detail: 'Ultra-lightweight track magnesium wheels with Brembo CCM-R ceramic rotors',
    priceDelta: 46000,
    weightDeltaKg: -34,
    leadWeeksDelta: 4,
    swatchHex: '#e5c76b',
  },
];

const CABIN_PACKAGES: ConfigOption[] = [
  {
    id: 'cabin-obsidian',
    label: 'Obsidian Aniline Leather & Alcantara',
    detail: 'Hand-welt diamond stitching with solid billet bronze switchgear',
    priceDelta: 36000,
    leadWeeksDelta: 3,
    swatchHex: '#262626',
  },
  {
    id: 'cabin-sovereign-gold',
    label: 'Saddle Bridge Leather & 24k Gold Leaf Fascia',
    detail: 'Bespoke acoustic insulation, starlight headliner, and custom luggage suite',
    priceDelta: 68000,
    leadWeeksDelta: 5,
    swatchHex: '#9a7138',
  },
  {
    id: 'cabin-horology-suite',
    label: 'Full Atelier Interior + Paired Calibre AML-01 Tourbillon',
    detail: 'Includes bespoke dashboard watch dock & matching forged-carbon Swiss tourbillon',
    priceDelta: 175000,
    leadWeeksDelta: 8,
    swatchHex: '#d4af37',
  },
];

function SafeLuxuryImage({
  src,
  alt,
  className = '',
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#161616] via-[#101010] to-[#0a0a0a] text-center p-6 ${className}`}
      >
        <Gauge className="w-8 h-8 text-[#d4af37]/70 mb-2" />
        <span className="text-xs text-[#a39e93] max-w-[22ch]">{alt}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}

export default function App() {
  // Showcase state
  const [activeCategory, setActiveCategory] = useState<
    'All' | 'Hypercars' | 'Bespoke SUVs' | 'Horology & Lifestyle'
  >('All');
  const [spotlightIndex, setSpotlightIndex] = useState<number>(0);
  const [selectedSpecItem, setSelectedSpecItem] = useState<ShowcaseItem | null>(null);

  // Saved Private Dossier state
  const [dossierIds, setDossierIds] = useState<string[]>(['adilov-valkyrie-obsidian']);
  const [isDossierOpen, setIsDossierOpen] = useState<boolean>(false);

  // Mobile Menu state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  // Configurator state
  const [selectedChassisId, setSelectedChassisId] = useState<string>(CHASSIS_OPTIONS[0].id);
  const [selectedAeroId, setSelectedAeroId] = useState<string>(AERO_PACKAGES[1].id);
  const [selectedWheelId, setSelectedWheelId] = useState<string>(WHEEL_PACKAGES[0].id);
  const [selectedCabinId, setSelectedCabinId] = useState<string>(CABIN_PACKAGES[0].id);
  const [customEngraving, setCustomEngraving] = useState<string>('ADILOV ONE OF ONE');

  // VIP Booking Modal & Form state
  const [isBookingModalOpen, setIsBookingModalOpen] = useState<boolean>(false);
  const [bookingSourceNote, setBookingSourceNote] = useState<string>('');
  const [clientName, setClientName] = useState<string>('');
  const [clientContact, setClientContact] = useState<string>('');
  const [clientLocation, setClientLocation] = useState<string>('Dubai Private Lounge');
  const [clientCommissionType, setClientCommissionType] = useState<string>(
    'Full Vehicle Allocation'
  );
  const [clientNotes, setClientNotes] = useState<string>('');
  const [formError, setFormError] = useState<string>('');
  const [bookingConfirmedId, setBookingConfirmedId] = useState<string | null>(null);
  const [copiedHandle, setCopiedHandle] = useState<string | null>(null);
  const [isHtmlExportOpen, setIsHtmlExportOpen] = useState<boolean>(false);
  const [copiedHtml, setCopiedHtml] = useState<boolean>(false);

  const filteredShowcase = useMemo(() => {
    if (activeCategory === 'All') return SHOWCASE_ITEMS;
    return SHOWCASE_ITEMS.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  // Computed Configurator Summary
  const activeChassis = useMemo(
    () => CHASSIS_OPTIONS.find((c) => c.id === selectedChassisId) || CHASSIS_OPTIONS[0],
    [selectedChassisId]
  );
  const activeAero = useMemo(
    () => AERO_PACKAGES.find((a) => a.id === selectedAeroId) || AERO_PACKAGES[0],
    [selectedAeroId]
  );
  const activeWheel = useMemo(
    () => WHEEL_PACKAGES.find((w) => w.id === selectedWheelId) || WHEEL_PACKAGES[0],
    [selectedWheelId]
  );
  const activeCabin = useMemo(
    () => CABIN_PACKAGES.find((c) => c.id === selectedCabinId) || CABIN_PACKAGES[0],
    [selectedCabinId]
  );

  const totalConfiguredPrice =
    activeChassis.basePrice +
    activeAero.priceDelta +
    activeWheel.priceDelta +
    activeCabin.priceDelta;

  const totalConfiguredHp = activeChassis.baseHp + (activeAero.hpDelta || 0);
  const totalWeightSaved =
    Math.abs(activeAero.weightDeltaKg || 0) + Math.abs(activeWheel.weightDeltaKg || 0);
  const totalLeadWeeks =
    8 +
    activeAero.leadWeeksDelta +
    activeWheel.leadWeeksDelta +
    activeCabin.leadWeeksDelta;

  const buildReferenceCode = useMemo(() => {
    const cCode = activeChassis.id.slice(0, 3).toUpperCase();
    const aCode = activeAero.id.split('-')[1]?.slice(0, 2).toUpperCase() || 'AE';
    const wCode = activeWheel.id.split('-')[1]?.slice(0, 2).toUpperCase() || 'WH';
    const iCode = activeCabin.id.split('-')[1]?.slice(0, 2).toUpperCase() || 'CB';
    return `AML-${cCode}-${aCode}${wCode}${iCode}`;
  }, [activeChassis, activeAero, activeWheel, activeCabin]);

  const toggleDossierItem = (id: string) => {
    setDossierIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const dossierItems = useMemo(
    () => SHOWCASE_ITEMS.filter((item) => dossierIds.includes(item.id)),
    [dossierIds]
  );

  const handleOpenBookingWithBuild = () => {
    const summaryText = `Build Code ${buildReferenceCode}: ${activeChassis.name} · ${activeAero.label} · ${activeWheel.label} · ${activeCabin.label} (Plaque: "${customEngraving || 'STANDARD'}") — Est. $${totalConfiguredPrice.toLocaleString()}`;
    setBookingSourceNote(summaryText);
    setClientNotes(summaryText);
    setBookingConfirmedId(null);
    setFormError('');
    setIsBookingModalOpen(true);
  };

  const handleOpenBookingWithItem = (item: ShowcaseItem) => {
    const summaryText = `Allocation Inquiry: ${item.title} (${item.priceFormatted}) — ${item.kicker}`;
    setBookingSourceNote(summaryText);
    setClientNotes(summaryText);
    setBookingConfirmedId(null);
    setFormError('');
    setIsBookingModalOpen(true);
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    const trimmedName = clientName.trim();
    const trimmedContact = clientContact.trim();

    if (trimmedName.length < 2) {
      setFormError('Please enter your full name or family office representative title.');
      return;
    }

    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedContact);
    const isPhoneOrHandle =
      trimmedContact.startsWith('@') ||
      /^[+\d\s()-]{7,20}$/.test(trimmedContact);

    if (!isEmail && !isPhoneOrHandle) {
      setFormError(
        'Please provide a valid direct email address, international phone number, or @telegram handle.'
      );
      return;
    }

    const randomCode = `VIP-${Math.floor(100000 + Math.random() * 900000)}`;
    setBookingConfirmedId(randomCode);
  };

  const handleCopySocial = (handle: string) => {
    navigator.clipboard?.writeText(handle);
    setCopiedHandle(handle);
    setTimeout(() => setCopiedHandle(null), 2000);
  };

  const handleCarouselStep = (direction: 'prev' | 'next') => {
    if (filteredShowcase.length === 0) return;
    if (direction === 'prev') {
      setSpotlightIndex((prev) =>
        prev <= 0 ? filteredShowcase.length - 1 : prev - 1
      );
    } else {
      setSpotlightIndex((prev) =>
        prev >= filteredShowcase.length - 1 ? 0 : prev + 1
      );
    }
  };

  const standaloneHtmlTemplate = useMemo(() => {
    return `<!DOCTYPE html>
<html lang="en" class="dark scroll-smooth">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Adilov Motors & Lifestyle — VIP Dark Luxury Template</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&family=Plus+Jakarta+Sans:wght@400;500;600&family=Syne:wght@600;700&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Plus Jakarta Sans', sans-serif; background: #0a0a0a; color: #f5f3ef; }
    h1, h2, h3, .font-display { font-family: 'Syne', sans-serif; }
    .font-mono-num { font-family: 'JetBrains Mono', monospace; font-variant-numeric: tabular-nums; }
    .glass-panel { background: rgba(18, 18, 18, 0.78); backdrop-filter: blur(16px); border: 1px solid rgba(255,255,255,0.08); }
  </style>
</head>
<body class="bg-[#0a0a0a] text-[#f5f3ef] antialiased">
  <!-- Sticky Navigation -->
  <header class="sticky top-0 z-50 h-16 glass-panel px-6 lg:px-12 flex items-center justify-between">
    <a href="#" class="font-display text-lg font-bold tracking-tight text-[#f5f3ef]">Adilov Motors & Lifestyle</a>
    <nav class="hidden md:flex items-center gap-8 text-sm text-[#a39e93]">
      <a href="#collection" class="hover:text-[#d4af37] transition-colors">Collection</a>
      <a href="#configurator" class="hover:text-[#d4af37] transition-colors">Configurator</a>
      <a href="#atelier" class="hover:text-[#d4af37] transition-colors">Atelier</a>
      <a href="#concierge" class="hover:text-[#d4af37] transition-colors">Concierge</a>
    </nav>
    <a href="#concierge" class="px-4 py-2 text-xs font-medium bg-[#d4af37] text-[#0a0a0a] rounded hover:bg-[#c5a059] transition-colors">Book Allocation</a>
  </header>
  <!-- Hero -->
  <section class="relative min-h-[88vh] flex items-center px-6 lg:px-12 py-24">
    <div class="max-w-4xl space-y-6">
      <p class="text-xs text-[#d4af37] tracking-wider">Tashkent · Geneva · Dubai — Bespoke Coachbuilding & Horology</p>
      <h1 class="font-display text-4xl sm:text-6xl font-bold leading-[1.08]">Sculpted in Autoclave Carbon. Finished in 24k Gold.</h1>
      <p class="text-[#a39e93] max-w-2xl text-base leading-relaxed">Limited-production hypercar aerodynamics, armored executive SUVs, and Swiss flying tourbillons tailored to individual collector specifications.</p>
      <div class="pt-2 flex flex-wrap gap-4">
        <a href="#collection" class="px-6 py-3 rounded bg-[#d4af37] text-[#0a0a0a] font-semibold text-sm">Explore Collection</a>
        <a href="#configurator" class="px-6 py-3 rounded border border-white/15 text-[#f5f3ef] text-sm hover:border-[#d4af37]">Configure Commission</a>
      </div>
    </div>
  </section>
</body>
</html>`;
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f5f3ef] flex flex-col selection:bg-[#d4af37]/30">
      {/* 1. TOP BAR CONTRACT: Strictly 3 Zones, 1 Row, <= 15% Mobile Viewport Height (h-16 = 64px) */}
      <header className="sticky top-0 z-40 h-16 w-full glass-panel border-b border-white/[0.08] transition-colors">
        <div className="max-w-[1360px] mx-auto h-full px-5 sm:px-8 lg:px-12 flex items-center justify-between gap-4">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#top"
            className="font-display text-base sm:text-lg font-bold tracking-tight text-[#f5f3ef] hover:text-[#d4af37] transition-colors duration-150 whitespace-nowrap shrink-0"
          >
            Adilov Motors &amp; Lifestyle
          </a>

          {/* Zone 2: 4–5 single-line clean text navigation links */}
          <nav
            aria-label="Primary Navigation"
            className="hidden md:flex items-center gap-8 text-sm font-medium text-[#b8b3a8]"
          >
            <a
              href="#collection"
              className="relative py-1 hover:text-[#f5f3ef] transition-colors duration-150 whitespace-nowrap after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#d4af37] hover:after:w-full after:transition-all after:duration-150"
            >
              Collection
            </a>
            <a
              href="#configurator"
              className="relative py-1 hover:text-[#f5f3ef] transition-colors duration-150 whitespace-nowrap after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#d4af37] hover:after:w-full after:transition-all after:duration-150"
            >
              Configurator
            </a>
            <a
              href="#atelier"
              className="relative py-1 hover:text-[#f5f3ef] transition-colors duration-150 whitespace-nowrap after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#d4af37] hover:after:w-full after:transition-all after:duration-150"
            >
              Atelier
            </a>
            <a
              href="#concierge"
              className="relative py-1 hover:text-[#f5f3ef] transition-colors duration-150 whitespace-nowrap after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#d4af37] hover:after:w-full after:transition-all after:duration-150"
            >
              Concierge
            </a>
          </nav>

          {/* Zone 3: 1–2 Primary Actions */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsDossierOpen(true)}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium text-[#e5e0d5] bg-[#161616] border border-white/[0.08] hover:border-[#d4af37]/50 transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Bookmark className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>Dossier</span>
              <span className="font-mono-num text-[#d4af37]">({dossierIds.length})</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setBookingSourceNote('Direct VIP Consultation Request');
                setBookingConfirmedId(null);
                setFormError('');
                setIsBookingModalOpen(true);
              }}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-[#d4af37] text-[#0a0a0a] hover:bg-[#e2be46] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>Book Allocation</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="md:hidden p-2 rounded-lg text-[#e5e0d5] hover:bg-white/5 border border-white/[0.08]"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden glass-panel border-b border-white/[0.08] px-6 py-5 space-y-4">
            <div className="flex flex-col space-y-3 text-sm font-medium text-[#e5e0d5]">
              <a
                href="#collection"
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-1.5 hover:text-[#d4af37]"
              >
                Collection
              </a>
              <a
                href="#configurator"
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-1.5 hover:text-[#d4af37]"
              >
                Interactive Configurator
              </a>
              <a
                href="#atelier"
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-1.5 hover:text-[#d4af37]"
              >
                Bespoke Atelier &amp; Proof
              </a>
              <a
                href="#concierge"
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-1.5 hover:text-[#d4af37]"
              >
                VIP Concierge &amp; Booking
              </a>
            </div>
            <button
              type="button"
              onClick={() => {
                setIsMobileMenuOpen(false);
                setBookingSourceNote('Mobile VIP Consultation Request');
                setBookingConfirmedId(null);
                setIsBookingModalOpen(true);
              }}
              className="w-full py-2.5 px-4 rounded-lg text-xs font-semibold bg-[#d4af37] text-[#0a0a0a] text-center whitespace-nowrap"
            >
              Book Private Allocation
            </button>
          </div>
        )}
      </header>

      <main id="top" className="flex-1">
        {/* SECTION 1: FULL-SCREEN CINEMATIC HERO */}
        <section className="relative min-h-[calc(100vh-4rem)] flex items-end lg:items-center overflow-hidden border-b border-white/[0.08]">
          {/* Cinematic Background Image with Measured Scrim */}
          <div className="absolute inset-0 z-0">
            <SafeLuxuryImage
              src={HERO_IMAGE}
              alt="Adilov Sovereign V12 bespoke matte carbon hypercar with forged gold wheels in dark concrete gallery"
              className="w-full h-full object-cover object-center scale-[1.02] transition-transform duration-700"
            />
            {/* Measured multi-stop contrast scrim for guaranteed WCAG AA legibility */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/95 via-[#0a0a0a]/75 to-[#0a0a0a]/35" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/45 to-[#0a0a0a]/40" />
          </div>

          <div className="relative z-10 w-full max-w-[1360px] mx-auto px-5 sm:px-8 lg:px-12 py-16 lg:py-24">
            <div className="max-w-3xl space-y-6">
              {/* Quiet unboxed regional & domain trust marker (Zero-Pill discipline) */}
              <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-medium text-[#d4af37]">
                <span>Tashkent</span>
                <span aria-hidden="true">·</span>
                <span>Geneva</span>
                <span aria-hidden="true">·</span>
                <span>Dubai</span>
                <span aria-hidden="true">—</span>
                <span className="text-[#cfc9be]">
                  Bespoke Coachbuilding, Carbon Aerodynamics &amp; Haute Horlogerie
                </span>
              </div>

              {/* Bold Luxury Display Headline with text-balance */}
              <h1 className="font-display text-4xl sm:text-5xl lg:text-[62px] font-bold tracking-tight text-[#f5f3ef] leading-[1.06] text-balance">
                Sculpted in Autoclave Carbon. Crowned in 24k Gold.
              </h1>

              {/* Concrete Value Proposition */}
              <p className="text-base sm:text-lg text-[#c7c2b8] max-w-[62ch] leading-relaxed font-normal">
                Adilov Motors &amp; Lifestyle engineers numbered automotive commissions, B6+ armored
                flagships, and synchronized mechanical timepieces for private collectors. Limited to
                twelve bespoke vehicle builds per calendar year.
              </p>

              {/* Primary CTA Button with Glowing Border Animation + Secondary Action */}
              <div className="pt-3 flex flex-wrap items-center gap-4">
                <div className="cta-glow-wrapper">
                  <a
                    href="#collection"
                    className="relative z-10 inline-flex items-center gap-2.5 px-7 py-3.5 rounded-[7px] bg-[#0e0e0e] hover:bg-[#151515] text-[#f5f3ef] text-sm font-semibold transition-colors duration-150 whitespace-nowrap"
                  >
                    <span className="text-[#d4af37]">Explore Collection</span>
                    <ArrowUpRight className="w-4 h-4 text-[#d4af37]" />
                  </a>
                </div>

                <a
                  href="#configurator"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg text-sm font-medium text-[#e5e0d5] bg-[#121212]/80 hover:bg-[#1a1a1a] border border-white/[0.12] hover:border-[#c5a059]/60 transition-colors duration-150 whitespace-nowrap"
                >
                  <Sliders className="w-4 h-4 text-[#c5a059]" />
                  <span>Configure Commission</span>
                </a>
              </div>
            </div>

            {/* Bottom Architectural Telemetry Strip (Unboxed, Tabular Numerals) */}
            <div className="mt-14 lg:mt-20 pt-8 border-t border-white/[0.1] grid grid-cols-2 sm:grid-cols-4 gap-6 lg:gap-10 max-w-4xl">
              <div>
                <p className="text-xs text-[#9e988e]">Peak Powertrain Output</p>
                <p className="font-mono-num text-xl sm:text-2xl font-semibold text-[#f5f3ef] mt-1">
                  980 HP <span className="text-xs font-normal text-[#d4af37]">/ 9,200 RPM</span>
                </p>
              </div>
              <div>
                <p className="text-xs text-[#9e988e]">0–100 km/h Sprint</p>
                <p className="font-mono-num text-xl sm:text-2xl font-semibold text-[#f5f3ef] mt-1">
                  2.3s <span className="text-xs font-normal text-[#d4af37]">Launch Spec</span>
                </p>
              </div>
              <div>
                <p className="text-xs text-[#9e988e]">Dry Mass Reduction</p>
                <p className="font-mono-num text-xl sm:text-2xl font-semibold text-[#f5f3ef] mt-1">
                  -145 kg <span className="text-xs font-normal text-[#d4af37]">T1000 Pre-Preg</span>
                </p>
              </div>
              <div>
                <p className="text-xs text-[#9e988e]">2026 Build Allocations</p>
                <p className="font-mono-num text-xl sm:text-2xl font-semibold text-[#f5f3ef] mt-1">
                  12 Units <span className="text-xs font-normal text-[#d4af37]">Global Cap</span>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: EXCLUSIVE SHOWCASE (FILTERABLE GRID + SPOTLIGHT SLIDER) */}
        <section
          id="collection"
          className="py-20 lg:py-28 border-b border-white/[0.08] bg-[#0a0a0a]"
        >
          <div className="max-w-[1360px] mx-auto px-5 sm:px-8 lg:px-12">
            {/* Section Header + Interactive Filter Controls */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-10 border-b border-white/[0.08]">
              <div className="space-y-3 max-w-2xl">
                <p className="text-xs font-medium text-[#d4af37]">
                  01. Curated Collector Inventory &amp; Bespoke Commissions
                </p>
                <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#f5f3ef] text-balance">
                  Exclusive Showcase
                </h2>
                <p className="text-sm sm:text-base text-[#a39e93] leading-relaxed">
                  Each commission undergoes 1,400 hours of hand-laid carbon fabrication, dyno
                  calibration, and metallurgic finishing before private air-freight delivery.
                </p>
              </div>

              {/* Interactive Filter Controls (Functional Buttons) + Carousel Step Controls */}
              <div className="flex flex-wrap items-center gap-3">
                <div
                  role="tablist"
                  aria-label="Filter collection by category"
                  className="flex flex-wrap items-center gap-1 p-1 rounded-lg bg-[#121212] border border-white/[0.08]"
                >
                  {(
                    ['All', 'Hypercars', 'Bespoke SUVs', 'Horology & Lifestyle'] as const
                  ).map((cat) => {
                    const active = activeCategory === cat;
                    return (
                      <button
                        key={cat}
                        type="button"
                        role="tab"
                        aria-selected={active}
                        onClick={() => {
                          setActiveCategory(cat);
                          setSpotlightIndex(0);
                        }}
                        className={`px-3.5 py-1.5 rounded-md text-xs font-medium transition-colors duration-150 whitespace-nowrap cursor-pointer ${
                          active
                            ? 'bg-[#d4af37] text-[#0a0a0a] font-semibold'
                            : 'text-[#b8b3a8] hover:text-[#f5f3ef]'
                        }`}
                      >
                        {cat}
                      </button>
                    );
                  })}
                </div>

                {/* Prev / Next Spotlight Stepper */}
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => handleCarouselStep('prev')}
                    aria-label="Highlight previous commission"
                    className="p-2 rounded-lg bg-[#121212] border border-white/[0.08] text-[#cfcac0] hover:border-[#d4af37] hover:text-[#d4af37] transition-colors duration-150 cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleCarouselStep('next')}
                    aria-label="Highlight next commission"
                    className="p-2 rounded-lg bg-[#121212] border border-white/[0.08] text-[#cfcac0] hover:border-[#d4af37] hover:text-[#d4af37] transition-colors duration-150 cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Featured Cards Grid (Consistent 4:3 Image Aspect Ratio, Single-Elevation Glassmorphism) */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              {filteredShowcase.map((item, idx) => {
                const isSaved = dossierIds.includes(item.id);
                const isSpotlighted = idx === spotlightIndex % filteredShowcase.length;

                return (
                  <article
                    key={item.id}
                    className={`group rounded-xl overflow-hidden glass-panel transition-transform duration-200 hover:-translate-y-1 flex flex-col justify-between ${
                      isSpotlighted
                        ? 'border-[#d4af37]/55'
                        : 'border-white/[0.08] hover:border-[#c5a059]/45'
                    }`}
                  >
                    <div>
                      {/* 4:3 Media Container with subtle zoom-on-hover */}
                      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#141414]">
                        <SafeLuxuryImage
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover object-center transition-transform duration-200 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent opacity-80" />

                        {/* Bookmark / Save to Dossier Icon Button */}
                        <button
                          type="button"
                          onClick={() => toggleDossierItem(item.id)}
                          aria-label={
                            isSaved ? 'Remove from private dossier' : 'Save to private dossier'
                          }
                          className={`absolute top-3.5 right-3.5 p-2.5 rounded-lg backdrop-blur-md transition-colors duration-150 cursor-pointer ${
                            isSaved
                              ? 'bg-[#d4af37] text-[#0a0a0a]'
                              : 'bg-[#0a0a0a]/75 text-[#f5f3ef] border border-white/15 hover:border-[#d4af37]'
                          }`}
                        >
                          <Bookmark className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Card Body: Unboxed Metadata Kicker -> Primary Title -> Price & Telemetry */}
                      <div className="p-6 space-y-4">
                        {/* Quiet 1-line unboxed metadata with middle-dot separators */}
                        <div className="flex items-center gap-2 text-xs text-[#c5a059]">
                          <span>{item.category}</span>
                          <span aria-hidden="true">·</span>
                          <span className="text-[#9e988e] truncate">{item.allocationSpec}</span>
                        </div>

                        <div className="flex items-baseline justify-between gap-3">
                          <h3 className="font-display text-xl font-bold text-[#f5f3ef] group-hover:text-[#d4af37] transition-colors duration-150">
                            {item.title}
                          </h3>
                          <span className="font-mono-num text-base font-semibold text-[#d4af37] shrink-0">
                            {item.priceFormatted}
                          </span>
                        </div>

                        <p className="text-xs text-[#9e988e]">{item.kicker}</p>

                        <p className="text-sm text-[#bdb8ae] leading-relaxed line-clamp-3">
                          {item.summary}
                        </p>
                      </div>
                    </div>

                    {/* Card Footer: Tabular Spec Strip + Action Buttons */}
                    <div className="px-6 pb-6 pt-3 space-y-4 border-t border-white/[0.06]">
                      <div className="flex items-center justify-between text-xs font-mono-num text-[#cfcac0]">
                        <span>{item.powerSpec}</span>
                        <span aria-hidden="true" className="text-white/20">
                          ·
                        </span>
                        <span>{item.accelerationSpec}</span>
                        <span aria-hidden="true" className="text-white/20">
                          ·
                        </span>
                        <span className="text-[#c5a059]">{item.weightDelta.split(' ')[0]}</span>
                      </div>

                      <div className="flex items-center gap-2.5 pt-1">
                        <button
                          type="button"
                          onClick={() => setSelectedSpecItem(item)}
                          className="flex-1 py-2.5 px-3.5 rounded-lg text-xs font-medium text-[#f5f3ef] bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.08] transition-colors duration-150 whitespace-nowrap cursor-pointer"
                        >
                          Inspect Spec Sheet
                        </button>
                        <button
                          type="button"
                          onClick={() => handleOpenBookingWithItem(item)}
                          className="py-2.5 px-4 rounded-lg text-xs font-semibold bg-[#d4af37] text-[#0a0a0a] hover:bg-[#e2be46] transition-colors duration-150 whitespace-nowrap cursor-pointer"
                        >
                          Reserve Build
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* SECTION 3: INTERACTIVE CONFIGURATOR PREVIEW & BESPOKE ATELIER */}
        <section
          id="configurator"
          className="py-20 lg:py-28 border-b border-white/[0.08] bg-[#0d0d0d]"
        >
          <div className="max-w-[1360px] mx-auto px-5 sm:px-8 lg:px-12">
            <div className="max-w-2xl space-y-3 mb-12">
              <p className="text-xs font-medium text-[#d4af37]">
                02. Bespoke Commission Studio &amp; Live Specification Builder
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#f5f3ef] text-balance">
                Interactive Atelier Configurator
              </h2>
              <p className="text-sm sm:text-base text-[#a39e93] leading-relaxed">
                Tailor your base chassis, autoclave carbon weave, forged wheel metallurgy, and
                horological pairing. Generate an encrypted build code for immediate studio
                allocation.
              </p>
            </div>

            {/* Split Configurator Workspace */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
              {/* Left 7 Columns: Live Visual Stage & Telemetry Readout */}
              <div className="lg:col-span-7 space-y-6">
                <div className="rounded-xl overflow-hidden glass-panel border border-white/[0.1]">
                  <div className="relative aspect-[16/10] w-full bg-[#121212] overflow-hidden">
                    <SafeLuxuryImage
                      src={activeChassis.image}
                      alt={activeChassis.name}
                      className="w-full h-full object-cover object-center transition-opacity duration-200"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/25 to-transparent" />

                    {/* Top Overlay: Encrypted Commission Build Code */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2">
                      <div className="px-3.5 py-1.5 rounded-md bg-[#0a0a0a]/85 backdrop-blur-md border border-white/10 text-xs text-[#e5e0d5] font-mono-num">
                        BUILD CODE: <span className="text-[#d4af37]">{buildReferenceCode}</span>
                      </div>
                      <div className="px-3.5 py-1.5 rounded-md bg-[#0a0a0a]/85 backdrop-blur-md border border-white/10 text-xs text-[#c5a059] font-mono-num">
                        PLAQUE: &ldquo;{customEngraving || 'ONE OF ONE'}&rdquo;
                      </div>
                    </div>

                    {/* Bottom Overlay: Selected Chassis Summary */}
                    <div className="absolute bottom-4 left-4 right-4 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                      <div>
                        <p className="text-xs text-[#d4af37]">{activeChassis.subtitle}</p>
                        <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#f5f3ef]">
                          {activeChassis.name}
                        </h3>
                      </div>
                      <div className="text-left sm:text-right">
                        <p className="text-xs text-[#a39e93]">Configured Commission Total</p>
                        <p className="font-mono-num text-2xl sm:text-3xl font-bold text-[#d4af37]">
                          ${totalConfiguredPrice.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Live Dynamic Telemetry Bar */}
                  <div className="p-6 grid grid-cols-2 sm:grid-cols-4 gap-6 border-t border-white/[0.08] bg-[#121212]/90">
                    <div>
                      <span className="text-xs text-[#9e988e] block">Calibrated Output</span>
                      <span className="font-mono-num text-lg font-semibold text-[#f5f3ef]">
                        {totalConfiguredHp} HP
                      </span>
                    </div>
                    <div>
                      <span className="text-xs text-[#9e988e] block">0–100 km/h</span>
                      <span className="font-mono-num text-lg font-semibold text-[#f5f3ef]">
                        {activeChassis.zeroToHundred}
                      </span>
                    </div>
                    <div>
                      <span className="text-xs text-[#9e988e] block">Unsprung &amp; Aero Mass</span>
                      <span className="font-mono-num text-lg font-semibold text-[#d4af37]">
                        -{totalWeightSaved} kg
                      </span>
                    </div>
                    <div>
                      <span className="text-xs text-[#9e988e] block">Atelier Lead Time</span>
                      <span className="font-mono-num text-lg font-semibold text-[#f5f3ef]">
                        {totalLeadWeeks} Weeks
                      </span>
                    </div>
                  </div>
                </div>

                {/* Itemized Build Manifest */}
                <div className="p-6 rounded-xl glass-panel space-y-4">
                  <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
                    <h4 className="text-sm font-semibold text-[#f5f3ef]">
                      Itemized Commission Manifest
                    </h4>
                    <span className="font-mono-num text-xs text-[#c5a059]">
                      FOB Geneva / Dubai Atelier
                    </span>
                  </div>
                  <div className="space-y-2.5 text-xs sm:text-sm">
                    <div className="flex items-center justify-between text-[#cfcac0]">
                      <span>Base Platform: {activeChassis.name}</span>
                      <span className="font-mono-num">
                        ${activeChassis.basePrice.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-[#cfcac0]">
                      <span>Carbon Architecture: {activeAero.label}</span>
                      <span className="font-mono-num text-[#d4af37]">
                        +${activeAero.priceDelta.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-[#cfcac0]">
                      <span>Forged Metallurgy: {activeWheel.label}</span>
                      <span className="font-mono-num text-[#d4af37]">
                        +${activeWheel.priceDelta.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-[#cfcac0]">
                      <span>Interior &amp; Horology: {activeCabin.label}</span>
                      <span className="font-mono-num text-[#d4af37]">
                        +${activeCabin.priceDelta.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right 5 Columns: Interactive Option Selectors */}
              <div className="lg:col-span-5 p-6 sm:p-7 rounded-xl glass-panel space-y-6">
                {/* Step 1: Chassis Selection */}
                <div className="space-y-2.5">
                  <label className="block text-xs font-semibold text-[#d4af37]">
                    Step 01 · Select Base Platform
                  </label>
                  <div className="grid grid-cols-1 gap-2.5">
                    {CHASSIS_OPTIONS.map((chassis) => {
                      const selected = chassis.id === selectedChassisId;
                      return (
                        <button
                          key={chassis.id}
                          type="button"
                          onClick={() => setSelectedChassisId(chassis.id)}
                          className={`w-full text-left p-3.5 rounded-lg border transition-colors duration-150 flex items-center justify-between gap-3 cursor-pointer ${
                            selected
                              ? 'bg-[#d4af37]/12 border-[#d4af37] text-[#f5f3ef]'
                              : 'bg-[#141414] border-white/[0.08] text-[#b8b3a8] hover:border-white/25'
                          }`}
                        >
                          <div>
                            <div className="text-sm font-semibold text-[#f5f3ef]">
                              {chassis.name}
                            </div>
                            <div className="text-xs text-[#9e988e]">{chassis.subtitle}</div>
                          </div>
                          <div className="font-mono-num text-xs font-semibold text-[#d4af37] shrink-0">
                            ${(chassis.basePrice / 1000).toFixed(0)}k
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Step 2: Carbon & Aero Package */}
                <div className="space-y-2.5">
                  <label className="block text-xs font-semibold text-[#d4af37]">
                    Step 02 · Autoclave Carbon &amp; Exhaust Spec
                  </label>
                  <div className="grid grid-cols-1 gap-2.5">
                    {AERO_PACKAGES.map((aero) => {
                      const selected = aero.id === selectedAeroId;
                      return (
                        <button
                          key={aero.id}
                          type="button"
                          onClick={() => setSelectedAeroId(aero.id)}
                          className={`w-full text-left p-3.5 rounded-lg border transition-colors duration-150 flex items-start justify-between gap-3 cursor-pointer ${
                            selected
                              ? 'bg-[#d4af37]/12 border-[#d4af37] text-[#f5f3ef]'
                              : 'bg-[#141414] border-white/[0.08] text-[#b8b3a8] hover:border-white/25'
                          }`}
                        >
                          <div className="space-y-0.5">
                            <div className="text-xs sm:text-sm font-semibold text-[#f5f3ef]">
                              {aero.label}
                            </div>
                            <div className="text-xs text-[#9e988e]">{aero.detail}</div>
                          </div>
                          <span className="font-mono-num text-xs font-medium text-[#d4af37] shrink-0">
                            +${(aero.priceDelta / 1000).toFixed(0)}k
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Step 3: Forged Wheels */}
                <div className="space-y-2.5">
                  <label className="block text-xs font-semibold text-[#d4af37]">
                    Step 03 · Forged Wheel Metallurgy
                  </label>
                  <div className="grid grid-cols-1 gap-2">
                    {WHEEL_PACKAGES.map((wheel) => {
                      const selected = wheel.id === selectedWheelId;
                      return (
                        <button
                          key={wheel.id}
                          type="button"
                          onClick={() => setSelectedWheelId(wheel.id)}
                          className={`w-full text-left p-3 rounded-lg border transition-colors duration-150 flex items-center justify-between gap-3 cursor-pointer ${
                            selected
                              ? 'bg-[#d4af37]/12 border-[#d4af37]'
                              : 'bg-[#141414] border-white/[0.08] hover:border-white/25'
                          }`}
                        >
                          <div className="text-xs sm:text-sm font-medium text-[#f5f3ef]">
                            {wheel.label}
                          </div>
                          <span className="font-mono-num text-xs text-[#d4af37] shrink-0">
                            +${(wheel.priceDelta / 1000).toFixed(0)}k
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Step 4: Cabin & Horology Pairing */}
                <div className="space-y-2.5">
                  <label className="block text-xs font-semibold text-[#d4af37]">
                    Step 04 · Bespoke Cabin &amp; Horology Pairing
                  </label>
                  <div className="grid grid-cols-1 gap-2">
                    {CABIN_PACKAGES.map((cabin) => {
                      const selected = cabin.id === selectedCabinId;
                      return (
                        <button
                          key={cabin.id}
                          type="button"
                          onClick={() => setSelectedCabinId(cabin.id)}
                          className={`w-full text-left p-3 rounded-lg border transition-colors duration-150 flex items-center justify-between gap-3 cursor-pointer ${
                            selected
                              ? 'bg-[#d4af37]/12 border-[#d4af37]'
                              : 'bg-[#141414] border-white/[0.08] hover:border-white/25'
                          }`}
                        >
                          <div className="text-xs sm:text-sm font-medium text-[#f5f3ef]">
                            {cabin.label}
                          </div>
                          <span className="font-mono-num text-xs text-[#d4af37] shrink-0">
                            +${(cabin.priceDelta / 1000).toFixed(0)}k
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Custom Sill Plaque Engraving */}
                <div className="space-y-2">
                  <label
                    htmlFor="plaque-input"
                    className="block text-xs font-semibold text-[#c5a059]"
                  >
                    Step 05 · Solid 18k Gold Sill Plaque Inscription
                  </label>
                  <input
                    id="plaque-input"
                    type="text"
                    maxLength={28}
                    value={customEngraving}
                    onChange={(e) => setCustomEngraving(e.target.value.toUpperCase())}
                    placeholder="ENTER COLLECTOR INSCRIPTION"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#141414] border border-white/15 focus:border-[#d4af37] focus:outline-none text-xs font-mono-num text-[#f5f3ef]"
                  />
                </div>

                {/* Lock Specification CTA */}
                <button
                  type="button"
                  onClick={handleOpenBookingWithBuild}
                  className="w-full py-3.5 px-6 rounded-lg bg-[#d4af37] hover:bg-[#e2be46] text-[#0a0a0a] font-semibold text-sm transition-colors duration-150 flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
                >
                  <span>Lock Specification &amp; Request Allocation</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: ATELIER ENGINEERING CAPABILITIES & ADJACENT PROOF OF IMPACT */}
        <section
          id="atelier"
          className="py-20 lg:py-28 border-b border-white/[0.08] bg-[#0a0a0a]"
        >
          <div className="max-w-[1360px] mx-auto px-5 sm:px-8 lg:px-12 space-y-16">
            <div className="max-w-2xl space-y-3">
              <p className="text-xs font-medium text-[#d4af37]">
                03. Coachbuilding Disciplines &amp; Verified Collector Outcomes
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#f5f3ef] text-balance">
                Engineering Without Compromise
              </h2>
              <p className="text-sm sm:text-base text-[#a39e93] leading-relaxed">
                Every Adilov commission is validated on our 4WD chassis dynamometer and certified
                to TÜV and FIA structural standards.
              </p>
            </div>

            {/* Asymmetric Bento Capabilities Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 p-8 rounded-xl glass-panel flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                  <span className="font-mono-num text-xs text-[#d4af37]">
                    01. Aerospace Pre-Preg Carbon &amp; Gold Metallurgy
                  </span>
                  <h3 className="font-display text-2xl font-bold text-[#f5f3ef]">
                    Autoclave Structural Fabrication with Embedded 24k Filament
                  </h3>
                  <p className="text-sm sm:text-base text-[#b8b3a8] leading-relaxed max-w-[65ch]">
                    We cure T1000 high-modulus carbon fiber at 140°C and 6 bar pressure, reducing
                    vehicle curb weight by up to 145 kg while increasing torsional rigidity by 28%.
                    Exposed weave panels are hand-lacquered with micron-milled 24-karat gold leaf
                    clearcoats.
                  </p>
                </div>
                <div className="pt-4 border-t border-white/[0.08] flex flex-wrap items-center gap-6 text-xs font-mono-num text-[#d4af37]">
                  <span>0.15 mm Panel Gap Tolerance</span>
                  <span aria-hidden="true">·</span>
                  <span>3,200 Hours Computational Fluid Dynamics</span>
                  <span aria-hidden="true">·</span>
                  <span>TÜV Rheinland Certified</span>
                </div>
              </div>

              <div className="p-8 rounded-xl glass-panel flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                  <span className="font-mono-num text-xs text-[#d4af37]">
                    02. Diplomatic B6+ Ballistic Shielding
                  </span>
                  <h3 className="font-display text-xl font-bold text-[#f5f3ef]">
                    Invisible Armored Protection
                  </h3>
                  <p className="text-sm text-[#b8b3a8] leading-relaxed">
                    Zero external visual signature. Multi-laminate polycarbonate ballistic glazing
                    and aramid-carbon survival cells engineered for heads of state and family
                    offices.
                  </p>
                </div>
                <div className="pt-4 border-t border-white/[0.08] text-xs font-mono-num text-[#c5a059]">
                  VPAM BRV 2009 / ERV Certified
                </div>
              </div>

              <div className="p-8 rounded-xl glass-panel flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                  <span className="font-mono-num text-xs text-[#d4af37]">
                    03. Inconel &amp; Titanium Acoustics
                  </span>
                  <h3 className="font-display text-xl font-bold text-[#f5f3ef]">
                    Formula-Grade Exhaust Systems
                  </h3>
                  <p className="text-sm text-[#b8b3a8] leading-relaxed">
                    Laser-sintered 0.8 mm Inconel 625 headers lined with pure gold thermal foil
                    deliver +65 HP at the rear wheels and shed 29 kg from the rear overhang.
                  </p>
                </div>
                <div className="pt-4 border-t border-white/[0.08] text-xs font-mono-num text-[#c5a059]">
                  Dual-Mode Telemetry Valve Control
                </div>
              </div>

              <div className="lg:col-span-2 p-8 rounded-xl glass-panel flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                  <span className="font-mono-num text-xs text-[#d4af37]">
                    04. Synchronized Geneva Horology &amp; Private Concierge
                  </span>
                  <h3 className="font-display text-2xl font-bold text-[#f5f3ef]">
                    Co-Engineered Mechanical Timepieces &amp; Enclosed Air Logistics
                  </h3>
                  <p className="text-sm sm:text-base text-[#b8b3a8] leading-relaxed max-w-[65ch]">
                    Every full-vehicle commission includes the option of a matching flying
                    tourbillon wristwatch milled from the exact carbon billet of your chassis, plus
                    enclosed climate-controlled air freight to Dubai, Zurich, London, or Tashkent.
                  </p>
                </div>
                <div className="pt-4 border-t border-white/[0.08] flex flex-wrap items-center gap-6 text-xs font-mono-num text-[#d4af37]">
                  <span>48-Hour Global Flying Technician Dispatch</span>
                  <span aria-hidden="true">·</span>
                  <span>5-Year Unlimited Mileage Powertrain Warranty</span>
                </div>
              </div>
            </div>

            {/* Claim-to-Proof Adjacency: Attributable Collector Testimonials & Quantified Proof */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <blockquote className="p-7 rounded-xl bg-[#121212] border border-white/[0.08] space-y-4">
                <p className="text-sm sm:text-base text-[#e5e0d5] leading-relaxed">
                  &ldquo;Before commissioning Adilov Motors, our collection’s V12 coupe suffered
                  from front-axle lift above 270 km/h. Their autoclave carbon aero kit and Inconel
                  valvetrain overhaul cut our Yas Marina lap time by 3.8 seconds while commandingly
                  appreciating 22% at private auction within 14 months.&rdquo;
                </p>
                <footer className="text-xs text-[#a39e93] flex items-center justify-between pt-2 border-t border-white/[0.06]">
                  <span>
                    <strong className="text-[#f5f3ef] font-semibold">Tariq Al-Mansoor</strong> ·
                    Managing Principal, Al-Mansoor Heritage Collection (Dubai)
                  </span>
                  <span className="font-mono-num text-[#d4af37]">Commission #02/2025</span>
                </footer>
              </blockquote>

              <blockquote className="p-7 rounded-xl bg-[#121212] border border-white/[0.08] space-y-4">
                <p className="text-sm sm:text-base text-[#e5e0d5] leading-relaxed">
                  &ldquo;We required B6+ ballistic protection across two executive SUVs without the
                  sluggish handling of traditional armor. Adilov’s carbon-aramid cell and 900 HP
                  calibration shaved 310 kg off standard armoring weight and delivered both vehicles
                  to Geneva two weeks ahead of schedule.&rdquo;
                </p>
                <footer className="text-xs text-[#a39e93] flex items-center justify-between pt-2 border-t border-white/[0.06]">
                  <span>
                    <strong className="text-[#f5f3ef] font-semibold">Dr. Henrik Lindqvist</strong> ·
                    Director of Security &amp; Fleet, Nordstern Family Office (Zurich)
                  </span>
                  <span className="font-mono-num text-[#d4af37]">Commission #09/2025</span>
                </footer>
              </blockquote>
            </div>
          </div>
        </section>

        {/* SECTION 5: VIP CONCIERGE & PRIVATE BOOKING SECTION */}
        <section id="concierge" className="py-20 lg:py-28 bg-[#0d0d0d]">
          <div className="max-w-[1360px] mx-auto px-5 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
              {/* Left 5 Columns: Direct VIP Channels (Telegram / Instagram / Lounges) */}
              <div className="lg:col-span-5 space-y-8">
                <div className="space-y-3">
                  <p className="text-xs font-medium text-[#d4af37]">
                    04. Private Consultation &amp; Direct Dispatch
                  </p>
                  <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#f5f3ef] text-balance">
                    Reserve Your Private Atelier Consultation
                  </h2>
                  <p className="text-sm sm:text-base text-[#a39e93] leading-relaxed">
                    Connect directly with our Senior Commissioning Director via encrypted Telegram
                    concierge, official Instagram portfolio, or schedule a private viewing at our
                    showrooms.
                  </p>
                </div>

                {/* Direct Telegram & Instagram Quick-Links */}
                <div className="space-y-3.5">
                  <div className="p-5 rounded-xl glass-panel flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-lg bg-[#d4af37]/15 border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37] shrink-0">
                        <Send className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-[#f5f3ef]">
                          Telegram VIP Desk
                        </div>
                        <div className="text-xs font-mono-num text-[#c5a059]">
                          @adilovmotors_vip · 24/7 Encrypted Line
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleCopySocial('@adilovmotors_vip')}
                        className="px-3 py-1.5 rounded-md text-xs font-medium bg-white/[0.06] hover:bg-white/[0.12] text-[#e5e0d5] transition-colors cursor-pointer whitespace-nowrap"
                      >
                        {copiedHandle === '@adilovmotors_vip' ? 'Copied' : 'Copy Handle'}
                      </button>
                      <a
                        href="https://t.me/adilovmotors_vip"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-md bg-[#d4af37] text-[#0a0a0a] hover:bg-[#e2be46] transition-colors"
                        aria-label="Open Telegram VIP Desk"
                      >
                        <ArrowUpRight className="w-4 h-4" />
                      </a>
                    </div>
                  </div>

                  <div className="p-5 rounded-xl glass-panel flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-lg bg-[#d4af37]/15 border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37] shrink-0">
                        <Instagram className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-[#f5f3ef]">
                          Instagram Official Atelier
                        </div>
                        <div className="text-xs font-mono-num text-[#c5a059]">
                          @adilov.motors · Build Chronicles
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleCopySocial('@adilov.motors')}
                        className="px-3 py-1.5 rounded-md text-xs font-medium bg-white/[0.06] hover:bg-white/[0.12] text-[#e5e0d5] transition-colors cursor-pointer whitespace-nowrap"
                      >
                        {copiedHandle === '@adilov.motors' ? 'Copied' : 'Copy Handle'}
                      </button>
                      <a
                        href="https://instagram.com/adilov.motors"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-md bg-[#d4af37] text-[#0a0a0a] hover:bg-[#e2be46] transition-colors"
                        aria-label="Open Instagram Official Atelier"
                      >
                        <ArrowUpRight className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Private Commissioning Lounges */}
                <div className="p-6 rounded-xl glass-panel space-y-4">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#d4af37]">
                    <MapPin className="w-4 h-4" />
                    <span>Private Commissioning Lounges (By Appointment)</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                    <div>
                      <p className="font-semibold text-[#f5f3ef]">Tashkent HQ</p>
                      <p className="text-[#9e988e] mt-0.5">Amir Temur Ave 107B, Penthouse Vault</p>
                    </div>
                    <div>
                      <p className="font-semibold text-[#f5f3ef]">Dubai DIFC</p>
                      <p className="text-[#9e988e] mt-0.5">Gate Village 08, Private Gallery 4</p>
                    </div>
                    <div>
                      <p className="font-semibold text-[#f5f3ef]">Geneva Salon</p>
                      <p className="text-[#9e988e] mt-0.5">Rue du Rhône 42, 1204 Genève</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right 7 Columns: Minimalist Gold-Accented VIP Booking Form */}
              <div className="lg:col-span-7 p-7 sm:p-9 rounded-xl glass-panel-gold">
                {bookingConfirmedId ? (
                  <div className="py-8 space-y-5 text-center">
                    <div className="w-12 h-12 rounded-full bg-[#d4af37]/20 border border-[#d4af37] text-[#d4af37] flex items-center justify-center mx-auto">
                      <Check className="w-6 h-6" />
                    </div>
                    <div className="space-y-2">
                      <p className="text-xs font-mono-num text-[#d4af37]">
                        ALLOCATION DOSSIER REGISTERED · REF #{bookingConfirmedId}
                      </p>
                      <h3 className="font-display text-2xl font-bold text-[#f5f3ef]">
                        Private Concierge Dispatched
                      </h3>
                      <p className="text-sm text-[#b8b3a8] max-w-md mx-auto leading-relaxed">
                        Thank you, <span className="text-[#f5f3ef] font-medium">{clientName}</span>.
                        Our Managing Director of Commissions will reach out via{' '}
                        <span className="text-[#d4af37] font-mono-num">{clientContact}</span> within
                        2 hours with your confidential build dossier for{' '}
                        <span className="text-[#f5f3ef]">{clientLocation}</span>.
                      </p>
                    </div>
                    <div className="pt-3">
                      <button
                        type="button"
                        onClick={() => {
                          setBookingConfirmedId(null);
                          setClientName('');
                          setClientContact('');
                        }}
                        className="px-5 py-2.5 rounded-lg text-xs font-semibold bg-[#d4af37] text-[#0a0a0a] hover:bg-[#e2be46] transition-colors cursor-pointer"
                      >
                        Submit Another Commission Inquiry
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleBookingSubmit} className="space-y-5" noValidate>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-white/[0.08]">
                      <div>
                        <h3 className="font-display text-xl font-bold text-[#f5f3ef]">
                          Confidential Allocation Request
                        </h3>
                        <p className="text-xs text-[#9e988e]">
                          Protected by strict Non-Disclosure Agreement upon submission.
                        </p>
                      </div>
                      <span className="font-mono-num text-xs text-[#d4af37]">
                        BUILD REF: {buildReferenceCode}
                      </span>
                    </div>

                    {formError && (
                      <div
                        role="alert"
                        className="p-3.5 rounded-lg bg-red-950/50 border border-red-500/40 text-xs text-red-200"
                      >
                        {formError}
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                        <label
                          htmlFor="vip-name"
                          className="block text-xs font-medium text-[#d4af37]"
                        >
                          Principal Name or Family Office *
                        </label>
                        <input
                          id="vip-name"
                          type="text"
                          required
                          value={clientName}
                          onChange={(e) => setClientName(e.target.value)}
                          placeholder="e.g., Rustam Adilov / Sovereign Capital"
                          className="w-full px-4 py-3 rounded-lg bg-[#0a0a0a]/90 border border-white/15 focus:border-[#d4af37] focus:outline-none text-sm text-[#f5f3ef] placeholder:text-[#6e6a63] transition-colors"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label
                          htmlFor="vip-contact"
                          className="block text-xs font-medium text-[#d4af37]"
                        >
                          Direct Email, Phone, or @Telegram *
                        </label>
                        <input
                          id="vip-contact"
                          type="text"
                          required
                          value={clientContact}
                          onChange={(e) => setClientContact(e.target.value)}
                          placeholder="+971 50 000 0000 or @collector"
                          className="w-full px-4 py-3 rounded-lg bg-[#0a0a0a]/90 border border-white/15 focus:border-[#d4af37] focus:outline-none text-sm text-[#f5f3ef] placeholder:text-[#6e6a63] transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                        <label
                          htmlFor="vip-commission-type"
                          className="block text-xs font-medium text-[#c5a059]"
                        >
                          Commission Category
                        </label>
                        <select
                          id="vip-commission-type"
                          value={clientCommissionType}
                          onChange={(e) => setClientCommissionType(e.target.value)}
                          className="w-full px-4 py-3 rounded-lg bg-[#0a0a0a]/90 border border-white/15 focus:border-[#d4af37] focus:outline-none text-sm text-[#f5f3ef]"
                        >
                          <option value="Full Vehicle Allocation">Full Vehicle Allocation</option>
                          <option value="Bespoke Carbon & Powertrain Conversion">
                            Donor Vehicle Carbon &amp; Powertrain Conversion
                          </option>
                          <option value="Diplomatic B6+ Armored SUV">
                            Diplomatic B6+ Armored SUV
                          </option>
                          <option value="Calibre AML-01 Tourbillon Timepiece">
                            Calibre AML-01 Tourbillon Timepiece
                          </option>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label
                          htmlFor="vip-salon"
                          className="block text-xs font-medium text-[#c5a059]"
                        >
                          Preferred Consultation Salon
                        </label>
                        <select
                          id="vip-salon"
                          value={clientLocation}
                          onChange={(e) => setClientLocation(e.target.value)}
                          className="w-full px-4 py-3 rounded-lg bg-[#0a0a0a]/90 border border-white/15 focus:border-[#d4af37] focus:outline-none text-sm text-[#f5f3ef]"
                        >
                          <option value="Dubai DIFC Private Lounge">
                            Dubai DIFC Private Lounge
                          </option>
                          <option value="Tashkent Penthouse Vault">
                            Tashkent Penthouse Vault
                          </option>
                          <option value="Geneva Rue du Rhône Salon">
                            Geneva Rue du Rhône Salon
                          </option>
                          <option value="Flying Atelier Director (Client Residence)">
                            Flying Atelier Director (Client Residence)
                          </option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label
                        htmlFor="vip-notes"
                        className="block text-xs font-medium text-[#c5a059]"
                      >
                        Configured Build Code &amp; Bespoke Requirements
                      </label>
                      <textarea
                        id="vip-notes"
                        rows={3}
                        value={clientNotes}
                        onChange={(e) => setClientNotes(e.target.value)}
                        placeholder={`Optional: Reference build code ${buildReferenceCode}, preferred delivery quarter, or specific upholstery/armor requests...`}
                        className="w-full px-4 py-3 rounded-lg bg-[#0a0a0a]/90 border border-white/15 focus:border-[#d4af37] focus:outline-none text-sm text-[#f5f3ef] placeholder:text-[#6e6a63] transition-colors"
                      />
                    </div>

                    <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <span className="text-xs text-[#9e988e]">
                        Direct response time: &le; 2 hours for verified collectors.
                      </span>
                      <button
                        type="submit"
                        className="px-7 py-3.5 rounded-lg bg-[#d4af37] hover:bg-[#e2be46] text-[#0a0a0a] font-semibold text-sm transition-colors duration-150 whitespace-nowrap cursor-pointer"
                      >
                        Request Private Allocation
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* QUIET LUXURY FOOTER */}
      <footer className="bg-[#080808] border-t border-white/[0.08] py-12 px-5 sm:px-8 lg:px-12">
        <div className="max-w-[1360px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="space-y-2">
            <span className="font-display text-lg font-bold tracking-tight text-[#f5f3ef]">
              Adilov Motors &amp; Lifestyle
            </span>
            <p className="text-xs text-[#8e8980] max-w-md">
              Bespoke Automotive Coachbuilding, T1000 Carbon Aerodynamics &amp; Synchronized
              Horology. © {new Date().getFullYear()} Adilov Motors Holding SA. All rights reserved.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs text-[#a39e93]">
            <a href="#collection" className="hover:text-[#d4af37] transition-colors">
              Collection
            </a>
            <a href="#configurator" className="hover:text-[#d4af37] transition-colors">
              Configurator
            </a>
            <a href="#atelier" className="hover:text-[#d4af37] transition-colors">
              Atelier
            </a>
            <a
              href="https://t.me/adilovmotors_vip"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#d4af37] transition-colors"
            >
              Telegram
            </a>
            <a
              href="https://instagram.com/adilov.motors"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#d4af37] transition-colors"
            >
              Instagram
            </a>
            <button
              type="button"
              onClick={() => setIsHtmlExportOpen(true)}
              className="inline-flex items-center gap-1.5 text-[#d4af37] hover:underline cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Single-File HTML Code</span>
            </button>
          </div>
        </div>
      </footer>

      {/* MODAL 1: SPECIFICATION SHEET INSPECTOR */}
      {selectedSpecItem && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="spec-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
        >
          <div className="relative w-full max-w-2xl rounded-xl glass-panel-gold p-6 sm:p-8 max-h-[90vh] overflow-y-auto space-y-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs text-[#d4af37]">{selectedSpecItem.kicker}</p>
                <h3
                  id="spec-modal-title"
                  className="font-display text-2xl font-bold text-[#f5f3ef] mt-1"
                >
                  {selectedSpecItem.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedSpecItem(null)}
                aria-label="Close specification sheet"
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-[#cfcac0] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="aspect-[16/9] w-full rounded-lg overflow-hidden bg-[#141414]">
              <SafeLuxuryImage
                src={selectedSpecItem.image}
                alt={selectedSpecItem.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-4 rounded-lg bg-[#0a0a0a]/80 border border-white/[0.08] font-mono-num text-xs">
              <div>
                <span className="text-[#8e8980] block">Allocation Price</span>
                <span className="text-sm font-semibold text-[#d4af37]">
                  {selectedSpecItem.priceFormatted}
                </span>
              </div>
              <div>
                <span className="text-[#8e8980] block">Output / Spec</span>
                <span className="text-sm font-semibold text-[#f5f3ef]">
                  {selectedSpecItem.powerSpec}
                </span>
              </div>
              <div>
                <span className="text-[#8e8980] block">Performance</span>
                <span className="text-sm font-semibold text-[#f5f3ef]">
                  {selectedSpecItem.accelerationSpec}
                </span>
              </div>
            </div>

            <div className="space-y-2 text-xs sm:text-sm text-[#cfcac0]">
              <p>
                <strong className="text-[#f5f3ef]">Exterior Finish:</strong>{' '}
                {selectedSpecItem.exteriorFinish}
              </p>
              <p>
                <strong className="text-[#f5f3ef]">Interior Trim:</strong>{' '}
                {selectedSpecItem.interiorTrim}
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-semibold text-[#d4af37]">
                Bespoke Engineering Highlights
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-[#b8b3a8]">
                {selectedSpecItem.technicalHighlights.map((highlight) => (
                  <li key={highlight} className="flex items-start gap-2.5">
                    <span className="text-[#d4af37] mt-0.5">·</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-white/[0.08] flex flex-wrap items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => toggleDossierItem(selectedSpecItem.id)}
                className="px-4 py-2.5 rounded-lg text-xs font-medium bg-white/5 hover:bg-white/10 text-[#f5f3ef] border border-white/10 cursor-pointer"
              >
                {dossierIds.includes(selectedSpecItem.id)
                  ? 'Saved in Private Dossier'
                  : 'Add to Private Dossier'}
              </button>
              <button
                type="button"
                onClick={() => {
                  const item = selectedSpecItem;
                  setSelectedSpecItem(null);
                  handleOpenBookingWithItem(item);
                }}
                className="px-5 py-2.5 rounded-lg text-xs font-semibold bg-[#d4af37] text-[#0a0a0a] hover:bg-[#e2be46] cursor-pointer"
              >
                Request Allocation for This Piece
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: VIP ALLOCATION BOOKING MODAL */}
      {isBookingModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="vip-booking-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
        >
          <div className="relative w-full max-w-xl rounded-xl glass-panel-gold p-6 sm:p-8 max-h-[90vh] overflow-y-auto space-y-5">
            <div className="flex items-start justify-between gap-4 border-b border-white/[0.08] pb-4">
              <div>
                <p className="text-xs text-[#d4af37] font-mono-num">
                  VIP ALLOCATION DESK · DIRECT DISPATCH
                </p>
                <h3
                  id="vip-booking-modal-title"
                  className="font-display text-2xl font-bold text-[#f5f3ef] mt-1"
                >
                  Book Private Consultation
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsBookingModalOpen(false)}
                aria-label="Close booking modal"
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-[#cfcac0] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {bookingSourceNote && (
              <div className="p-3.5 rounded-lg bg-[#0a0a0a]/80 border border-[#d4af37]/30 text-xs text-[#e5e0d5] font-mono-num">
                {bookingSourceNote}
              </div>
            )}

            {bookingConfirmedId ? (
              <div className="py-6 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-[#d4af37]/20 border border-[#d4af37] text-[#d4af37] flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <p className="text-xs font-mono-num text-[#d4af37]">
                  DOSSIER CONFIRMED · #{bookingConfirmedId}
                </p>
                <h4 className="font-display text-xl font-bold text-[#f5f3ef]">
                  Your Senior Commissioning Advisor Has Been Notified
                </h4>
                <p className="text-xs sm:text-sm text-[#b8b3a8] max-w-md mx-auto">
                  We have logged your specification and will contact{' '}
                  <span className="text-[#f5f3ef]">{clientContact}</span> shortly.
                </p>
                <button
                  type="button"
                  onClick={() => setIsBookingModalOpen(false)}
                  className="px-6 py-2.5 rounded-lg bg-[#d4af37] text-[#0a0a0a] text-xs font-semibold cursor-pointer"
                >
                  Return to Showroom
                </button>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-4" noValidate>
                {formError && (
                  <div className="p-3 rounded-lg bg-red-950/60 border border-red-500/40 text-xs text-red-200">
                    {formError}
                  </div>
                )}

                <div className="space-y-1.5">
                  <label className="block text-xs font-medium text-[#d4af37]">
                    Full Name or Family Office *
                  </label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="Enter collector name"
                    className="w-full px-4 py-2.5 rounded-lg bg-[#0a0a0a] border border-white/15 focus:border-[#d4af37] focus:outline-none text-sm text-[#f5f3ef]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-medium text-[#d4af37]">
                    Direct Email, Phone, or @Telegram *
                  </label>
                  <input
                    type="text"
                    required
                    value={clientContact}
                    onChange={(e) => setClientContact(e.target.value)}
                    placeholder="+41 22 000 0000 or @handle"
                    className="w-full px-4 py-2.5 rounded-lg bg-[#0a0a0a] border border-white/15 focus:border-[#d4af37] focus:outline-none text-sm text-[#f5f3ef]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-medium text-[#c5a059]">
                    Commission Notes
                  </label>
                  <textarea
                    rows={3}
                    value={clientNotes}
                    onChange={(e) => setClientNotes(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg bg-[#0a0a0a] border border-white/15 focus:border-[#d4af37] focus:outline-none text-xs text-[#f5f3ef]"
                  />
                </div>

                <div className="pt-2 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 text-xs text-[#c5a059]">
                    <a
                      href="https://t.me/adilovmotors_vip"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline inline-flex items-center gap-1"
                    >
                      <Send className="w-3.5 h-3.5" /> Telegram
                    </a>
                    <a
                      href="https://instagram.com/adilov.motors"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline inline-flex items-center gap-1"
                    >
                      <Instagram className="w-3.5 h-3.5" /> Instagram
                    </a>
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-lg bg-[#d4af37] hover:bg-[#e2be46] text-[#0a0a0a] font-semibold text-xs cursor-pointer whitespace-nowrap"
                  >
                    Confirm VIP Booking
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* SLIDE-OVER DRAWER: PRIVATE ALLOCATION DOSSIER */}
      {isDossierOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Private Collector Dossier"
          className="fixed inset-0 z-50 flex justify-end bg-black/75 backdrop-blur-sm"
        >
          <div className="w-full max-w-md bg-[#101010] border-l border-white/10 h-full p-6 flex flex-col justify-between">
            <div className="space-y-6 overflow-y-auto pr-1">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <p className="text-xs text-[#d4af37] font-mono-num">PRIVATE SELECTION</p>
                  <h3 className="font-display text-xl font-bold text-[#f5f3ef]">
                    Collector Dossier ({dossierItems.length})
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsDossierOpen(false)}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-[#cfcac0] cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {dossierItems.length === 0 ? (
                <div className="py-12 text-center space-y-3">
                  <Bookmark className="w-8 h-8 text-[#d4af37]/50 mx-auto" />
                  <p className="text-sm text-[#a39e93]">
                    Your Private Dossier is currently empty. Bookmark commissions from the showcase
                    to compare specifications.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {dossierItems.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 rounded-lg bg-[#161616] border border-white/[0.08] flex items-center justify-between gap-3"
                    >
                      <div className="space-y-1">
                        <span className="text-xs text-[#c5a059]">{item.category}</span>
                        <h4 className="text-sm font-semibold text-[#f5f3ef]">{item.title}</h4>
                        <p className="font-mono-num text-xs text-[#d4af37]">
                          {item.priceFormatted} · {item.powerSpec}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => toggleDossierItem(item.id)}
                        className="text-xs text-[#8e8980] hover:text-red-400 px-2 py-1 cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {dossierItems.length > 0 && (
              <div className="pt-4 border-t border-white/10 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#a39e93]">Total Portfolio Value</span>
                  <span className="font-mono-num text-base font-bold text-[#d4af37]">
                    ${dossierItems.reduce((acc, i) => acc + i.price, 0).toLocaleString()}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const titles = dossierItems.map((d) => d.title).join(', ');
                    setIsDossierOpen(false);
                    setBookingSourceNote(`Portfolio Dossier Inquiry: ${titles}`);
                    setClientNotes(`Requesting private viewing for: ${titles}`);
                    setBookingConfirmedId(null);
                    setIsBookingModalOpen(true);
                  }}
                  className="w-full py-3 rounded-lg bg-[#d4af37] text-[#0a0a0a] font-semibold text-xs hover:bg-[#e2be46] transition-colors cursor-pointer"
                >
                  Request Portfolio Consultation
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* MODAL 3: STANDALONE SINGLE-FILE HTML EXPORT */}
      {isHtmlExportOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Single-File HTML Template Export"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
        >
          <div className="w-full max-w-2xl rounded-xl glass-panel-gold p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-[#d4af37] font-mono-num">PORTABLE TEMPLATE EXPORT</p>
                <h3 className="font-display text-lg font-bold text-[#f5f3ef]">
                  Standalone Single-File HTML Starter
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsHtmlExportOpen(false)}
                className="p-2 rounded-lg bg-white/5 text-[#cfcac0] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <pre className="p-4 rounded-lg bg-[#080808] border border-white/10 text-xs font-mono-num text-[#cfcac0] overflow-x-auto max-h-80">
              {standaloneHtmlTemplate}
            </pre>
            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard?.writeText(standaloneHtmlTemplate);
                  setCopiedHtml(true);
                  setTimeout(() => setCopiedHtml(false), 2000);
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#d4af37] text-[#0a0a0a] text-xs font-semibold cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{copiedHtml ? 'Copied HTML' : 'Copy Single-File HTML'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
