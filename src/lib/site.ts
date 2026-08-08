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

/**
 * The purification chain, matching GENAQ's published sequence exactly:
 * G3 air pre-filtration, F7 air filtration, water treatment, mineral addition,
 * then UV. Order carries real information, so it is numbered.
 *
 * Condensation itself is not a stage here. It is the event these five stages
 * happen either side of, and it is drawn separately in the diagram.
 */
export const PROCESS = [
  {
    step: "Air pre-filtration",
    spec: "G3 filter",
    body: "Incoming air passes a G3 pre-filter that catches coarse dust and debris.",
    detail:
      "The first barrier protects everything downstream. Coarse particles are stopped at the inlet so they never reach the finer filter or the cooling coil, which is what keeps service intervals long in dusty conditions.",
  },
  {
    step: "Air filtration",
    spec: "F7 filter",
    body: "An F7 filter removes fine particulates before the air reaches the coil.",
    detail:
      "Fine airborne contaminants are captured at this stage. Nothing condenses that has not already been filtered twice, so the water is clean at the moment it forms rather than cleaned up afterwards.",
  },
  {
    step: "Water treatment",
    spec: "Filtration system",
    body: "The collected water passes through a multi-stage filtration system.",
    detail:
      "Sediment and activated carbon stages treat the condensate once it reaches the reservoir. The tank is kept in continuous circulation so nothing stands still long enough to spoil.",
  },
  {
    step: "Mineralisation",
    spec: "Minerals addition",
    body: "Balanced minerals are added back and pH is held at 7.",
    detail:
      "Condensed water is naturally mineral free, which leaves it flat to drink. A calibrated mineral stage restores calcium and magnesium to a consistent profile, so every glass tastes the same.",
  },
  {
    step: "Purification",
    spec: "UV technology",
    body: "Ultraviolet treatment is the final stage before the water is dispensed.",
    detail:
      "UV sterilisation runs on the treated, mineralised water as the last step in the chain, keeping the stored supply safe right up to the point it is poured.",
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
