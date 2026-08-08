/**
 * Industry sectors, each stated as a water problem and the answer to it.
 *
 * A list of sectors tells a buyer nothing. What converts is seeing their own
 * constraint written down accurately, so every entry names the specific way
 * water fails in that industry before it says what the machine does about it.
 *
 * `core` marks the eight sectors VidaTech named directly. The rest were added
 * because they share the same failure mode and are large in Pakistan.
 */

export type Industry = {
  id: string;
  name: string;
  /** One line on how water actually fails in this sector. */
  problem: string;
  /** What on-site generation changes about it. */
  answer: string;
  core: boolean;
};

export const INDUSTRIES: Industry[] = [
  {
    id: "construction",
    name: "Construction",
    problem:
      "Sites are occupied long before mains water reaches them, so drinking water for the crew arrives by tanker on somebody else's schedule.",
    answer:
      "A unit runs off site power from the first week, then moves to the next project when this one finishes. No standing contract, no delivery to miss.",
    core: true,
  },
  {
    id: "steel",
    name: "Steel",
    problem:
      "Mills run hot and continuously. Hydration is a safety obligation, and process water is nowhere near potable.",
    answer:
      "Generation keeps drinking water completely separate from process supply, and keeps producing through shift patterns that never stop.",
    core: true,
  },
  {
    id: "cement",
    name: "Cement",
    problem:
      "Plants sit outside municipal networks, usually in dry terrain where what groundwater exists is hard and heavily mineralised.",
    answer:
      "Air-source water skips the aquifer entirely. It arrives already treated and mineral-balanced, whatever the local water table is doing.",
    core: true,
  },
  {
    id: "housing-societies",
    name: "Housing societies",
    problem:
      "Shared boreholes draw the water table down year on year, and a single contaminated tank affects every household at once.",
    answer:
      "A society-scale unit adds supply without deepening the borehole, and treats every litre at the point it is made rather than in bulk storage.",
    core: true,
  },
  {
    id: "ngo",
    name: "NGO & humanitarian",
    problem:
      "Response sites have no infrastructure and no time to build any. Trucked water is the first thing to fail when roads do.",
    answer:
      "Containerised units deploy within hours and assume nothing about the site: no pipeline, no treatment plant, no supply route.",
    core: true,
  },
  {
    id: "government",
    name: "Government & public sector",
    problem:
      "Public buildings, camps and remote posts still need dependable drinking water where the network does not reach.",
    answer:
      "Output is metered and auditable, and the supply does not depend on a tanker contract being honoured or a pipeline being maintained.",
    core: true,
  },
  {
    id: "pharma",
    name: "Pharmaceutical",
    problem:
      "Input water quality is a compliance matter, and groundwater that varies by season is a compliance risk.",
    answer:
      "Condensate begins free of groundwater contaminants and is treated to a consistent, monitorable profile that does not drift with the season.",
    core: true,
  },
  {
    id: "hospitals",
    name: "Hospitals & healthcare",
    problem:
      "An interrupted or contaminated supply is a clinical risk, not an inconvenience, and it arrives without warning.",
    answer:
      "On-site generation with UV treatment and continuous circulation gives a supply that holds when the mains does not.",
    core: true,
  },
  {
    id: "textiles",
    name: "Textiles & garments",
    problem:
      "Pakistan's largest export sector is also among its thirstiest, and it clusters in districts where groundwater is already over-drawn.",
    answer:
      "Covering staff drinking water from the air leaves the extracted supply for process use, in the places where that margin matters most.",
    core: false,
  },
  {
    id: "food-beverage",
    name: "Food & beverage",
    problem:
      "Water that touches product is a food-safety control point, and bought-in supply has to be verified batch after batch.",
    answer:
      "Generated water is produced and treated on site to one repeatable specification, with quality readable rather than assumed.",
    core: false,
  },
  {
    id: "energy-mining",
    name: "Energy, mining & resources",
    problem:
      "Rigs, mines and power plants are remote by definition. Every litre of drinking water is a logistics line item.",
    answer:
      "A self-contained unit removes that line item entirely and keeps producing when the access road is closed.",
    core: false,
  },
  {
    id: "hospitality",
    name: "Hospitality & tourism",
    problem:
      "Hotels and resorts are judged on water quality by every guest, and the scenic locations are the ones furthest from a network.",
    answer:
      "Self-refilling supply at guest-facing quality, with the bottled-water contract and its plastic removed from the operation.",
    core: false,
  },
  {
    id: "education",
    name: "Education",
    problem:
      "Schools and campuses concentrate a lot of people around a small number of taps, often on ageing plumbing.",
    answer:
      "Units placed where students actually drink, producing treated water continuously rather than storing it between deliveries.",
    core: false,
  },
  {
    id: "defence",
    name: "Military & defence",
    problem:
      "Forward positions and field camps cannot rely on a supply route, and water convoys are exposed.",
    answer:
      "Rugged, rapid-deploy generation that makes the position self-sufficient for drinking water and takes the convoy off the map.",
    core: false,
  },
  {
    id: "agriculture",
    name: "Agriculture & dairy",
    problem:
      "Farms sit on the water table they are depleting, and livestock and staff still need clean water from somewhere else.",
    answer:
      "Configurable high-volume systems sized from the daily requirement, adding supply without taking more from the ground.",
    core: false,
  },
  {
    id: "telecom",
    name: "Telecom & remote sites",
    problem:
      "Tower sites and relay stations are unstaffed for weeks, then need water the moment a crew arrives.",
    answer:
      "Small units run unattended and have water ready on arrival, with no delivery to schedule around the visit.",
    core: false,
  },
];

export const CORE_INDUSTRIES = INDUSTRIES.filter((i) => i.core);
