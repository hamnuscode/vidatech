/**
 * Readiness signal between the hero robot and the loader.
 *
 * The loader must not lift until the robot is on screen, otherwise the hero
 * appears with an empty space on the right that fills in a second later. This
 * is the smallest thing that lets the two coordinate without either importing
 * the other.
 *
 * "Ready" also covers the cases where the robot is never going to appear at
 * all — reduced motion, a narrow viewport, a low-power device — because the
 * loader should not sit waiting for something that was deliberately skipped.
 */

let ready = false;
const waiting = new Set<() => void>();

export function markRobotReady() {
  if (ready) return;
  ready = true;
  for (const notify of waiting) notify();
  waiting.clear();
}

export function isRobotReady() {
  return ready;
}

/** Returns an unsubscribe function. Fires immediately if already ready. */
export function onRobotReady(notify: () => void) {
  if (ready) {
    notify();
    return () => {};
  }
  waiting.add(notify);
  return () => {
    waiting.delete(notify);
  };
}
