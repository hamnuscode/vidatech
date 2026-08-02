export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Technology", href: "/technology" },
  { label: "Products", href: "/products" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
] as const;

export const SITE = {
  name: "VidaTech",
  tagline: "Drinking water, made from thin air.",
  mission:
    "Atmospheric water generators for Pakistan. Exclusive partner of GENAQ.",
  address: "Lahore, Punjab, Pakistan",
  phone: "+92 300 000 0000",
  phoneHref: "tel:+923000000000",
  whatsapp: "+92 300 000 0000",
  whatsappHref: "https://wa.me/923000000000",
  email: "hello@vidatech.pk",
  emailHref: "mailto:hello@vidatech.pk",
  hours: "Monday – Saturday, 9:00 – 18:00 PKT",
} as const;

/** Who the technology serves. Ordered from smallest to largest deployment. */
export const APPLICATIONS = [
  {
    title: "Societies & residential",
    body: "Shared supply for housing schemes, or a single unit per home.",
  },
  {
    title: "Offices & hospitality",
    body: "Self-refilling drinking water for teams, hotels, and restaurants.",
  },
  {
    title: "Industry",
    body: "On-site generation for factories, mines, rigs, and power plants.",
  },
  {
    title: "Agriculture",
    body: "High-volume configurable systems for farms and growing operations.",
  },
  {
    title: "Hospitals & healthcare",
    body: "Sterilised, mineral-balanced water where quality is non-negotiable.",
  },
  {
    title: "Emergency & disaster relief",
    body: "Rapid-deploy units that need no pipeline, well, or tanker route.",
  },
  {
    title: "Military & field camps",
    body: "Rugged generation for forward positions and temporary bases.",
  },
  {
    title: "Remote & off-grid sites",
    body: "Water anywhere humidity allows — no upstream installation.",
  },
] as const;

/** The five-step process. Order carries real information, so it is numbered. */
export const PROCESS = [
  {
    step: "Intake",
    body: "Ambient air is drawn in through the inlet system.",
    detail:
      "Fans pull humid air across the intake at a controlled rate. Warmer, wetter air yields more water, which is why output tracks the weather.",
  },
  {
    step: "Filter",
    body: "Multi-stage air filters strip out dust and particles.",
    detail:
      "Air passes through progressive filtration before it ever touches the cooling coil, so what condenses is vapour, not the city.",
  },
  {
    step: "Condense",
    body: "Water vapour is cooled and condensed into liquid water.",
    detail:
      "The coil drops the air below its dew point. Vapour becomes liquid on the surface and collects in the reservoir below.",
  },
  {
    step: "Purify",
    body: "The water is re-filtered and sterilised to the highest standard.",
    detail:
      "Carbon and sediment stages plus UV sterilisation, with the reservoir kept in constant circulation rather than standing still.",
  },
  {
    step: "Mineralise",
    body: "Balanced salts and minerals are added for clean, great-tasting water at pH 7.",
    detail:
      "Condensate is naturally mineral-free. A calibrated mineral stage puts back what makes water taste like water, and holds pH at 7.",
  },
] as const;

export const VALUE_PROPS = [
  {
    title: "Sustainable by design",
    body: "No wells, no drilling, no tankers. Just air, water, and a lighter footprint.",
  },
  {
    title: "Independent & off-grid",
    body: "Generate your own water on-site, anywhere humidity allows.",
  },
  {
    title: "Genuinely pure",
    body: "Free from typical groundwater contaminants, sterilised and mineral-balanced.",
  },
  {
    title: "Backed by GENAQ",
    body: "Spanish-engineered technology, proven across 35+ countries, delivered locally by VidaTech.",
  },
] as const;
