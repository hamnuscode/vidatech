/**
 * Shared pointer state between the hero's DOM layer and the WebGL scene.
 *
 * The canvas sits behind the headline, so the scene can't rely on its own
 * raycast to know where the cursor is. The DOM layer writes normalised device
 * coordinates here; the scene reads them each frame and projects them onto the
 * water plane — which means the surface answers the cursor anywhere in the
 * hero, not only where the water happens to be drawn.
 */
export const heroPointer = {
  /** Normalised device coordinates, -1 to 1. */
  nx: 0,
  ny: -0.4,
  active: false,
  /** Bumped on every press so the scene can emit exactly one splash. */
  clickSeq: 0,
};

export function setHeroPointer(el: HTMLElement, clientX: number, clientY: number) {
  const rect = el.getBoundingClientRect();
  heroPointer.nx = ((clientX - rect.left) / rect.width) * 2 - 1;
  heroPointer.ny = -(((clientY - rect.top) / rect.height) * 2 - 1);
  heroPointer.active = true;
}
