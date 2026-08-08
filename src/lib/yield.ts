/**
 * Yield model.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * WHAT THIS IS, AND WHAT IT IS NOT
 *
 * An atmospheric water generator condenses the moisture already in the air, so
 * its output tracks how much water the air is actually holding. That quantity —
 * absolute humidity — rises steeply with temperature and linearly with relative
 * humidity. This module models that relationship and reports the result as a
 * PERCENTAGE OF A UNIT'S RATED OUTPUT.
 *
 * NOTHING IT PRODUCES IS EVER DISPLAYED AS A NUMBER. The output drives a
 * qualitative band and the shape of a curve, so the site can show that output
 * rises with heat and humidity without publishing a performance figure that
 * would need re-checking every time the range changes.
 *
 * The saturation curve is the Magnus–Tetens approximation, which is a standard,
 * well-documented fit — not a guess. What is approximate is the machine model
 * layered on top of it (the rating point and the dew-point floor), and that is
 * stated on screen wherever a number appears.
 * ─────────────────────────────────────────────────────────────────────────────
 */

/** Conditions a unit's rated capacity is quoted at. Industry convention. */
export const RATING_POINT = { tempC: 30, rh: 80 } as const;

export const TEMP_RANGE = { min: 10, max: 45 } as const;
/**
 * The units generate down to 10% relative humidity, so the axis starts there
 * rather than pretending the low end does not exist.
 *
 * TODO: replace `relativeYield` with GENAQ's published performance data when
 * the brochure arrives. The curve shape at the dry end is the part most likely
 * to move.
 */
export const RH_RANGE = { min: 10, max: 95 } as const;

/**
 * Saturation vapour pressure in hectopascals (Magnus–Tetens).
 * Valid across the ambient range this instrument covers.
 */
function saturationPressure(tempC: number): number {
  return 6.112 * Math.exp((17.67 * tempC) / (tempC + 243.5));
}

/**
 * Absolute humidity — grams of water per cubic metre of air. This is the
 * quantity a generator is actually harvesting.
 */
export function absoluteHumidity(tempC: number, rh: number): number {
  const vapourPressure = saturationPressure(tempC) * (rh / 100);
  return (2.1674 * vapourPressure * 100) / (273.15 + tempC);
}

/**
 * A machine cannot exceed its own refrigeration capacity however wet the air
 * gets, so yield saturates toward a ceiling instead of climbing forever.
 */
const CAPACITY_CEILING = 1.25;

/**
 * Output as a fraction of rated capacity.
 *
 * Three effects, all real:
 *  1. Yield scales with available moisture, relative to the rating point.
 *  2. Below roughly 10 °C dew point the coil cannot condense efficiently, so
 *     output falls away faster than moisture alone would suggest.
 *  3. Above the rating point, output compresses smoothly toward the machine's
 *     capacity ceiling.
 *
 * The compression is deliberately smooth rather than a clamp: a hard cap makes
 * every hot, humid condition report the same stuck number, and the instrument's
 * whole job is showing that conditions matter.
 */
export function relativeYield(tempC: number, rh: number): number {
  const available = absoluteHumidity(tempC, rh);
  const rated = absoluteHumidity(RATING_POINT.tempC, RATING_POINT.rh);

  let fraction = available / rated;

  // Dew-point penalty. Cold air gives its moisture up reluctantly; this is why
  // winter output disappoints.
  const dew = dewPoint(tempC, rh);
  if (dew < 10) {
    fraction *= Math.max(0, 1 - (10 - dew) / 18);
  }

  // Soft knee at the rating point: identity below it, asymptotic above. Chosen
  // so the curve stays strictly monotonic and the gradient is continuous at
  // exactly 1.0 — the slider must never feel like it has stalled.
  if (fraction > 1) {
    const headroom = CAPACITY_CEILING - 1;
    fraction = 1 + headroom * Math.tanh((fraction - 1) / headroom);
  }

  return Math.max(0, fraction);
}

/** Dew point in °C (Magnus–Tetens inverse). */
export function dewPoint(tempC: number, rh: number): number {
  const clamped = Math.max(1, rh);
  const gamma =
    Math.log(clamped / 100) + (17.67 * tempC) / (tempC + 243.5);
  return (243.5 * gamma) / (17.67 - gamma);
}

/** The curve for one temperature, sampled across the humidity range. */
export function yieldCurve(tempC: number, samples = 40) {
  const points: { rh: number; value: number }[] = [];
  for (let i = 0; i <= samples; i++) {
    const rh = RH_RANGE.min + ((RH_RANGE.max - RH_RANGE.min) * i) / samples;
    points.push({ rh, value: relativeYield(tempC, rh) });
  }
  return points;
}

/**
 * How the current conditions read in words.
 *
 * Deliberately qualitative. The site states the *relationship* between weather
 * and output, never a number: a figure that is accurate today drifts as the
 * range changes, and a stale performance claim is worse than no claim.
 */
export function outputLabel(fraction: number): string {
  if (fraction >= 0.9) return "Very high";
  if (fraction >= 0.68) return "High";
  if (fraction >= 0.42) return "Moderate";
  if (fraction >= 0.18) return "Low";
  return "Minimal";
}

/**
 * Representative Pakistani conditions, for the presets. These position the
 * sliders; the values themselves are never shown.
 */
export const PRESETS = [
  { label: "Karachi, July", tempC: 33, rh: 78 },
  { label: "Lahore, monsoon", tempC: 31, rh: 72 },
  { label: "Islamabad, spring", tempC: 26, rh: 55 },
  { label: "Lahore, January", tempC: 14, rh: 62 },
] as const;
