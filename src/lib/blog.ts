export const CATEGORIES = [
  "Water Scarcity",
  "Technology",
  "Sustainability",
  "Case Studies",
  "News",
] as const;

export type Category = (typeof CATEGORIES)[number];

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "quote"; text: string; attribution?: string }
  | { type: "list"; items: string[] };

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: Category;
  date: string;
  readTime: number;
  author: string;
  /** Two brand hues that build this post's card gradient, in place of stock photography. */
  hues: [string, string];
  body: Block[];
};

export const POSTS: Post[] = [
  {
    slug: "humidity-is-a-reservoir",
    title: "Humidity is a reservoir nobody is drawing from",
    excerpt:
      "There is more fresh water in the atmosphere above Pakistan than in many of its rivers. Here is why that number matters, and what it takes to reach it.",
    category: "Water Scarcity",
    date: "2026-07-18",
    readTime: 6,
    author: "VidaTech",
    hues: ["#0790a3", "#a9c9d2"],
    body: [
      {
        type: "p",
        text: "Every water source Pakistan currently relies on has an address. A river has a course, an aquifer has a depth, a tanker has a route. The atmosphere has none of these, which is exactly why it has been ignored, and exactly why it is worth reconsidering.",
      },
      {
        type: "h2",
        text: "The water above the well",
      },
      {
        type: "p",
        text: "Air holds water. Warm air holds a great deal of it. In most Pakistani cities, relative humidity sits comfortably in the range where condensation is not merely possible but efficient. That water is renewed continuously by evaporation, it is not owned by anyone upstream, and pulling it out of the air does not lower a water table.",
      },
      {
        type: "quote",
        text: "Groundwater is a balance you draw down. Atmospheric humidity is a flow you intercept.",
      },
      {
        type: "p",
        text: "The distinction matters more each year. Pakistan's groundwater is being withdrawn faster than it is recharged in much of the country, and the quality of what remains is falling as agricultural and industrial contamination works its way down. A source that does not deplete is not a marginal improvement on that picture. It is a different picture.",
      },
      {
        type: "h2",
        text: "What it actually takes",
      },
      {
        type: "p",
        text: "Condensing water from air is not difficult. Doing it efficiently, at volume, and producing something you would want to drink is the engineering problem. Three things have to be right:",
      },
      {
        type: "list",
        items: [
          "Air handling that filters before it condenses, so what you collect is vapour and not particulate.",
          "A cooling stage matched to local conditions, because the energy cost per litre changes with temperature and humidity.",
          "Treatment and mineralisation, because pure condensate is flat, aggressive to pipework, and tastes of nothing.",
        ],
      },
      {
        type: "p",
        text: "GENAQ has spent since 2008 on exactly these three problems, across more than thirty-five countries and a wide spread of climates. What VidaTech brings is the local half: knowing which unit suits a Lahore summer versus a Karachi one, and what happens to output in February.",
      },
      {
        type: "h2",
        text: "The honest limits",
      },
      {
        type: "p",
        text: "Atmospheric water generation is not free water. It uses electricity, and output falls when the air is dry and cold. Anyone who tells you otherwise is selling something. What it does offer is water independence: supply that does not depend on a pipeline being maintained, a well still reaching, or a tanker turning up.",
      },
      {
        type: "p",
        text: "For a household, that is convenience. For a hospital, a factory, or a relief camp, it is the difference between operating and not.",
      },
    ],
  },
  {
    slug: "what-condensate-tastes-like",
    title: "Why pure water tastes wrong, and what we add back",
    excerpt:
      "Condensate leaves the coil almost perfectly pure, and almost undrinkable. The mineral stage is the least discussed and most important part of the process.",
    category: "Technology",
    date: "2026-06-30",
    readTime: 5,
    author: "VidaTech",
    hues: ["#4bb6c4", "#e4eff2"],
    body: [
      {
        type: "p",
        text: "Ask someone to describe pure water and they will say it tastes clean. Give them genuinely pure water and they will say it tastes wrong. Both are true, and the gap between them is the reason every VidaTech unit ends with a mineralisation stage.",
      },
      {
        type: "h2",
        text: "Distilled by accident",
      },
      {
        type: "p",
        text: "Condensation is distillation. When vapour cools on a coil, dissolved solids stay behind in the air, and what collects below is close to laboratory-grade pure. No calcium, no magnesium, no bicarbonate. Nothing for your palate to register.",
      },
      {
        type: "quote",
        text: "What we call the taste of water is almost entirely the taste of what is dissolved in it.",
      },
      {
        type: "p",
        text: "Pure water is also mildly aggressive. With nothing dissolved in it, it readily takes up whatever it touches, which is a consideration for storage and plumbing, not just for flavour.",
      },
      {
        type: "h2",
        text: "The mineral stage",
      },
      {
        type: "p",
        text: "After purification and UV sterilisation, water passes through a calibrated mineral cartridge that reintroduces a balanced salt profile and holds pH at 7. The target is not maximum mineral content. It is the profile people recognise as good drinking water, delivered consistently, batch after batch.",
      },
      {
        type: "list",
        items: [
          "pH held at 7, neither aggressive nor alkaline.",
          "A balanced calcium and magnesium profile for taste and mouthfeel.",
          "Consistency across units, so water from a Stratus tastes like water from a Cumulus.",
        ],
      },
      {
        type: "p",
        text: "It is the last step in the process and the first one anybody notices.",
      },
    ],
  },
  {
    slug: "off-grid-supply-for-a-field-hospital",
    title: "Standing up water for a field hospital in 36 hours",
    excerpt:
      "What deployment looks like when there is no mains supply, no treatment plant, and no road for a tanker, and what we learned about siting units in dust.",
    category: "Case Studies",
    date: "2026-06-11",
    readTime: 7,
    author: "VidaTech",
    hues: ["#092140", "#0790a3"],
    body: [
      {
        type: "p",
        text: "Relief deployments are where assumptions get tested. A unit that performs to spec in a commissioning bay meets dust, unstable power, and a site chosen for reasons that have nothing to do with airflow.",
      },
      {
        type: "h2",
        text: "The constraint was never capacity",
      },
      {
        type: "p",
        text: "A Cumulus C5000 covers a field hospital's drinking water comfortably. The constraints that actually shaped the deployment were where the unit could stand, what it could draw power from, and how quickly the intake filters would load up in ambient dust.",
      },
      {
        type: "quote",
        text: "Capacity is what you specify. Siting is what determines whether you get it.",
        attribution: "Field deployment notes",
      },
      {
        type: "h2",
        text: "What we changed",
      },
      {
        type: "list",
        items: [
          "Moved the intake face away from the vehicle approach, which halved the filter service interval.",
          "Raised the unit off grade to keep the intake out of the dust layer kicked up at ground level.",
          "Scheduled generation to the humid overnight window, where output per kilowatt-hour was materially better.",
        ],
      },
      {
        type: "p",
        text: "None of these are exotic. All of them now appear in the siting checklist we hand over with every field-range unit.",
      },
    ],
  },
  {
    slug: "the-plastic-arithmetic",
    title: "The plastic arithmetic of a 200-person office",
    excerpt:
      "Nineteen-litre bottles, a delivery van, and a year. We ran the numbers on what a single commercial dispenser displaces.",
    category: "Sustainability",
    date: "2026-05-22",
    readTime: 4,
    author: "VidaTech",
    hues: ["#1b4570", "#82aeba"],
    body: [
      {
        type: "p",
        text: "Sustainability claims are easy to make and hard to check. So here is one worth checking, with the arithmetic shown.",
      },
      {
        type: "h2",
        text: "Setting up the sum",
      },
      {
        type: "p",
        text: "Take an office of two hundred people drinking two litres each on a working day. That is four hundred litres a day, or roughly twenty-one nineteen-litre bottles. Across a working year, it is somewhere near five thousand bottle-fills, every one of which arrives on a van and leaves on one.",
      },
      {
        type: "quote",
        text: "The bottle is only half the footprint. The other half is the round trip it makes.",
      },
      {
        type: "p",
        text: "A Stratus S200 covers half that demand on its own and two of them cover all of it, drawing from the air in the building's own environment. The bottles stop arriving, the van stops coming, and the store room goes back to being a store room.",
      },
      {
        type: "h2",
        text: "The part worth being careful about",
      },
      {
        type: "p",
        text: "Generation uses electricity, and on a grid that is not fully renewable that carries its own footprint. The honest comparison is generation against delivery, counting production, transport, collection and reprocessing, rather than generation against nothing. On that comparison the case holds. We would rather show the working than round it in our favour.",
      },
    ],
  },
  {
    slug: "vidatech-named-exclusive-genaq-partner",
    title: "VidaTech named exclusive GENAQ partner in Pakistan",
    excerpt:
      "The full GENAQ range is now available in Pakistan with local specification, installation, and service.",
    category: "News",
    date: "2026-04-09",
    readTime: 3,
    author: "VidaTech",
    hues: ["#0d2e56", "#4bb6c4"],
    body: [
      {
        type: "p",
        text: "VidaTech is now the exclusive Pakistani partner of GENAQ, the Spanish manufacturer that has been engineering atmospheric water generators since 2008 and now operates in more than thirty-five countries across five continents.",
      },
      {
        type: "h2",
        text: "What the partnership covers",
      },
      {
        type: "list",
        items: [
          "The full GENAQ range, from residential dispensers to containerised emergency units.",
          "Local specification: sizing against your daily requirement, site humidity, and available power.",
          "Installation, commissioning, and ongoing service by a Pakistan-based team.",
          "Parts and consumables held locally, so a filter change is not an import.",
        ],
      },
      {
        type: "p",
        text: "The technology has been proven across a wide range of climates. What has been missing in Pakistan is someone to specify it correctly for local conditions and stand behind it afterwards. That is the gap VidaTech exists to close.",
      },
      {
        type: "p",
        text: "If you are weighing atmospheric water generation for a home, a facility, or a community, tell us your daily requirement and location and we will recommend the right unit.",
      },
    ],
  },
  {
    slug: "reading-a-capacity-figure",
    title: "How to read a capacity figure without being misled",
    excerpt:
      "Every AWG is quoted at some set of conditions. Knowing which ones is the difference between a unit that meets your needs and one that disappoints in winter.",
    category: "Technology",
    date: "2026-03-14",
    readTime: 6,
    author: "VidaTech",
    hues: ["#82aeba", "#0790a3"],
    body: [
      {
        type: "p",
        text: "A capacity figure on its own means very little. Output from any atmospheric water generator is a function of temperature and relative humidity, and a number quoted at 30°C and 80% humidity will not be the number you see in February.",
      },
      {
        type: "h2",
        text: "Ask for the conditions",
      },
      {
        type: "p",
        text: "The first question to ask about any quoted capacity is what conditions it assumes. The second is what the output curve looks like across the range your site actually experiences. A unit specified honestly comes with both.",
      },
      {
        type: "quote",
        text: "A capacity without conditions attached is a marketing number, not an engineering one.",
      },
      {
        type: "h2",
        text: "Size for your worst month",
      },
      {
        type: "p",
        text: "The practical approach is to size against the month when conditions are least favourable and demand still has to be met, then treat the summer surplus as headroom rather than the baseline. That is a more conservative specification and it is the one that keeps working.",
      },
      {
        type: "list",
        items: [
          "Establish your daily requirement in litres, not in people.",
          "Check local humidity and temperature across the full year, not the annual average.",
          "Specify against the difficult months; store the surplus from the easy ones.",
        ],
      },
      {
        type: "p",
        text: "When we quote a VidaTech unit, we run this for your location before recommending a model. It occasionally means proposing a larger unit than you expected, and it consistently means the unit meets its brief.",
      },
    ],
  },
];

export function getPost(slug: string) {
  return POSTS.find((p) => p.slug === slug);
}

export function relatedPosts(slug: string, limit = 3) {
  const post = getPost(slug);
  if (!post) return [];
  const sameCategory = POSTS.filter(
    (p) => p.slug !== slug && p.category === post.category
  );
  const rest = POSTS.filter(
    (p) => p.slug !== slug && p.category !== post.category
  );
  return [...sameCategory, ...rest].slice(0, limit);
}

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
