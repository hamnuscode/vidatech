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
  address: "Plot 298, Street 3, Industrial Area, I-9/3, Islamabad, Pakistan",
  phone: "+92 300 000 0000",
  phoneHref: "tel:+923000000000",
  whatsapp: "+92 300 000 0000",
  whatsappHref: "https://wa.me/923000000000",
  email: "hello@vidatech.pk",
  emailHref: "mailto:hello@vidatech.pk",
  hours: "Monday to Saturday, 9:00 to 18:00 PKT",
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
    body: "Water anywhere humidity allows, with no upstream installation.",
  },
] as const;

/** The five-step process. Order carries real information, so it is numbered. */
export const PROCESS = [
  {
    step: "Intake",
    body: "Ambient air is drawn into the unit through the inlet system.",
    detail:
      "Fans move outside air across the intake at a controlled rate. Warmer, more humid air carries more water, so output rises and falls with local conditions.",
  },
  {
    step: "Air filtration",
    body: "Multi-stage filters remove dust, particulates and airborne contaminants.",
    detail:
      "Every cubic metre of air is cleaned before it reaches the cooling coil. Nothing condenses that has not already passed through filtration, which is what keeps the collected water clean at source.",
  },
  {
    step: "Condensation",
    body: "The cooled coil brings air below its dew point and water forms.",
    detail:
      "Vapour turns to liquid on the coil surface and drains into a sealed stainless reservoir. This is the step the whole machine is built around.",
  },
  {
    step: "Purification",
    body: "Sediment, carbon and UV stages treat the water to drinking standard.",
    detail:
      "Water passes through sediment and activated carbon filtration, then ultraviolet sterilisation. The reservoir is kept in continuous circulation so nothing sits still long enough to spoil.",
  },
  {
    step: "Mineralisation",
    body: "Balanced minerals are reintroduced and pH is held at 7.",
    detail:
      "Condensed water is naturally mineral free, which leaves it flat to drink. A calibrated mineral stage restores calcium and magnesium to a consistent profile and holds pH at 7, so every glass tastes the same.",
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
