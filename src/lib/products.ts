/**
 * Product catalogue.
 *
 * Entries with `confirmed: true` are real models taken from vidatech.pk, with
 * the manufacturer's own photography. The rest are realistic placeholders based
 * on GENAQ's public ranges. Replace them with VidaTech's exact catalogue
 * figures before launch, and drop `confirmed` once every entry is verified.
 *
 * `capacity` drives the water-level fill in every card, so keep it numeric.
 */

export type RangeId = "stratus" | "nimbus" | "cumulus" | "custom";

export type Range = {
  id: RangeId;
  name: string;
  blurb: string;
};

export const RANGES: Range[] = [
  {
    id: "stratus",
    name: "Stratus",
    blurb: "Dispensers for homes, offices & hospitality",
  },
  {
    id: "nimbus",
    name: "Nimbus",
    blurb: "Industrial & remote-site generation",
  },
  {
    id: "cumulus",
    name: "Cumulus",
    blurb: "Compact to containerised, 50 to 5,000 L/day",
  },
  {
    id: "custom",
    name: "Custom",
    blurb: "Bespoke systems & add-ons",
  },
];

export type Product = {
  slug: string;
  name: string;
  range: RangeId;
  kicker: string;
  /** Litres per day. Null where output depends on configuration. */
  capacity: number | null;
  capacityLabel: string;
  /** Manufacturer photograph, where one exists. Drawn schematic otherwise. */
  image?: string;
  /** False where the model is a placeholder pending VidaTech's catalogue. */
  confirmed: boolean;
  benefit: string;
  body: string;
  bestFor: string;
  specs: { label: string; value: string }[];
  useCases: string[];
};

/** Largest capacity in the catalogue. Reference for every fill level. */
export const MAX_CAPACITY = 5000;

export const PRODUCTS: Product[] = [
  {
    slug: "stratus-s50",
    name: "Stratus S50",
    range: "stratus",
    kicker: "Home & small office",
    capacity: 50,
    capacityLabel: "50 L/day",
    image: "/products/stratus-s50.webp",
    confirmed: true,
    benefit: "Plug it in, pour a glass. No delivery, no bottles.",
    body: "A dispenser-format generator sized for a household or a small team. It sits where a water cooler sits, draws from the room's own humidity, and refills itself. Nothing to reorder, nothing to carry up the stairs.",
    bestFor: "Households and teams ready to drop bottled water",
    specs: [
      { label: "Capacity", value: "50 L/day" },
      { label: "Format", value: "Floor-standing dispenser" },
      { label: "Footprint", value: "0.4 × 0.5 m" },
      { label: "Dispense", value: "Cold & ambient" },
    ],
    useCases: ["Residential", "Small office"],
  },
  {
    slug: "stratus-s200",
    name: "Stratus S200",
    range: "stratus",
    kicker: "Commercial dispenser",
    capacity: 200,
    capacityLabel: "200 L/day",
    image: "/products/stratus-s200.webp",
    confirmed: true,
    benefit: "A steady, self-refilling supply for rooms full of people.",
    body: "Four times the output in a footprint that still fits a lobby or a break room. Built for hotels, restaurants, clinics, and offices where demand is continuous and running out is not an option.",
    bestFor: "Hotels, restaurants, clinics, busy offices",
    specs: [
      { label: "Capacity", value: "200 L/day" },
      { label: "Format", value: "Commercial dispenser" },
      { label: "Footprint", value: "0.6 × 0.7 m" },
      { label: "Dispense", value: "Cold, ambient & hot" },
    ],
    useCases: ["Hospitality", "Healthcare", "Commercial"],
  },
  {
    slug: "nimbus-n500",
    name: "Nimbus N500",
    range: "nimbus",
    kicker: "Industrial",
    capacity: 500,
    capacityLabel: "500 L/day",
    image: "/products/nimbus-n500.webp",
    confirmed: true,
    benefit: "Half a tonne of drinking water a day, with no logistics behind it.",
    body: "Built for factories, power plants, mines, oil rigs, and construction sites. No upstream installation, no tanker contract, no bottled-water store room. The unit arrives, connects to power, and starts producing.",
    bestFor: "Factories, mines, rigs, construction",
    specs: [
      { label: "Capacity", value: "500 L/day" },
      { label: "Format", value: "Industrial skid" },
      { label: "Footprint", value: "1.8 × 1.1 m" },
      { label: "Operation", value: "Unattended, continuous" },
    ],
    useCases: ["Industry", "Remote sites", "Construction"],
  },
  {
    slug: "nimbus-n4500",
    name: "Nimbus N4500",
    range: "nimbus",
    kicker: "Heavy industrial",
    capacity: 4500,
    capacityLabel: "4,500 L/day",
    image: "/products/nimbus-n4500.webp",
    confirmed: true,
    benefit: "Supply for an entire site, generated on the site itself.",
    body: "The top of the Nimbus range: a walk-in machine that covers the drinking water of a full industrial facility, a large society, or a plant with a substantial workforce. Sized for continuous duty, with service access on every face.",
    bestFor: "Large facilities, plants, and housing schemes",
    specs: [
      { label: "Capacity", value: "4,500 L/day" },
      { label: "Format", value: "Walk-in industrial unit" },
      { label: "Footprint", value: "Multi-bay, service access all sides" },
      { label: "Operation", value: "Continuous duty" },
    ],
    useCases: ["Industry", "Community", "Construction"],
  },
  {
    slug: "cumulus-c50",
    name: "Cumulus C50",
    range: "cumulus",
    kicker: "Compact",
    capacity: 50,
    capacityLabel: "50 L/day",
    confirmed: false,
    benefit: "Full generation in the smallest footprint we build.",
    body: "The entry point to the Cumulus range. Sized for a household, a small clinic, or a site office that needs its own supply without a plant room to put it in.",
    bestFor: "Households, small clinics and site offices",
    specs: [
      { label: "Capacity", value: "50 L/day" },
      { label: "Format", value: "Compact standalone" },
      { label: "Installation", value: "Plug in and run" },
      { label: "Operation", value: "Continuous" },
    ],
    useCases: ["Residential", "Small office", "Healthcare"],
  },
  {
    slug: "cumulus-c500",
    name: "Cumulus C500",
    range: "cumulus",
    kicker: "Mid-range",
    capacity: 500,
    capacityLabel: "500 L/day",
    confirmed: false,
    benefit: "Half a tonne of drinking water a day, generated on site.",
    body: "Built for offices, schools, clinics and light industry where demand is steady and running out is not an option. Runs unattended and needs no upstream connection.",
    bestFor: "Offices, schools, clinics and light industry",
    specs: [
      { label: "Capacity", value: "500 L/day" },
      { label: "Format", value: "Freestanding unit" },
      { label: "Installation", value: "Indoor or sheltered outdoor" },
      { label: "Operation", value: "Unattended, continuous" },
    ],
    useCases: ["Commercial", "Healthcare", "Industry"],
  },
  {
    slug: "cumulus-c5000",
    name: "Cumulus C5000",
    range: "cumulus",
    kicker: "Containerised",
    capacity: 5000,
    capacityLabel: "5,000 L/day",
    confirmed: false,
    benefit: "Rapid deployment where the infrastructure is gone.",
    body: "The largest unit in the range, hardened for disaster response, humanitarian aid, field hospitals and military camps. It assumes nothing about the site it lands on: no mains water, no treatment plant, no supply route.",
    bestFor: "Disaster response, aid, field hospitals, military",
    specs: [
      { label: "Capacity", value: "5,000 L/day" },
      { label: "Format", value: "Containerised" },
      { label: "Footprint", value: "6.1 × 2.4 m (20 ft)" },
      { label: "Deployment", value: "Rapid, self-contained" },
    ],
    useCases: ["Emergency", "Military", "Healthcare"],
  },
  {
    slug: "vidatech-agriflow",
    name: "VidaTech AgriFlow",
    range: "custom",
    kicker: "Agriculture & bespoke",
    capacity: null,
    capacityLabel: "Configurable",
    confirmed: false,
    benefit: "Engineered around your site, not the other way round.",
    body: "Multiple units configured as one high-volume system for farms, large housing societies, and sites whose demand curve does not match any standard model. We size it from your daily requirement, local humidity, and available power.",
    bestFor: "Farms, large societies, site-specific demand",
    specs: [
      { label: "Capacity", value: "Sized to requirement" },
      { label: "Format", value: "Multi-unit array" },
      { label: "Footprint", value: "Site-dependent" },
      { label: "Design", value: "Survey-led" },
    ],
    useCases: ["Agriculture", "Community", "Industry"],
  },
  {
    slug: "mineral-plus",
    name: "Mineral+ Treatment & Monitoring",
    range: "custom",
    kicker: "Add-on",
    capacity: null,
    capacityLabel: "Pairs with any unit",
    confirmed: false,
    benefit: "Know the quality of every litre, from anywhere.",
    body: "Advanced filtration, sterilisation, and mineralisation, plus remote water-quality monitoring that reports on the unit's output continuously. Fits any generator in the range and turns water quality from an assumption into a reading.",
    bestFor: "Any deployment needing verified water quality",
    specs: [
      { label: "Scope", value: "Filtration, UV, mineralisation" },
      { label: "Monitoring", value: "Remote, continuous" },
      { label: "Reporting", value: "pH, TDS, flow, uptime" },
      { label: "Fit", value: "All VidaTech units" },
    ],
    useCases: ["Healthcare", "Industry", "Community"],
  },
];

export const USE_CASES = Array.from(
  new Set(PRODUCTS.flatMap((p) => p.useCases))
).sort();

export function productsByRange(range: RangeId) {
  return PRODUCTS.filter((p) => p.range === range);
}
