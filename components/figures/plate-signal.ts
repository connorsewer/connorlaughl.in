/**
 * The handshake between a plate and the things that may only run once it has
 * finished drawing itself.
 *
 * `Figure` owns the draw-on and is the only writer: when the last stroke lands
 * it stamps `PLATE_DRAWN_ATTR` on the `<svg>` and fires `PLATE_DRAWN_EVENT` on
 * it. Consumers check the attribute first, in case they mounted late, and
 * otherwise wait for the event once.
 *
 * Under reduced motion neither the attribute nor the event ever appears,
 * because neither draw runner registers, and that is exactly the behaviour the
 * consumers want: a plate that is already complete has nothing to release.
 *
 * Plain constants rather than a context so a plate's children can be
 * server-rendered and still find the signal at runtime.
 */

/** Stamped on the `<svg>` once the plate is fully drawn. */
export const PLATE_DRAWN_ATTR = "data-plate-drawn";

/** Fired on the `<svg>` at the same moment. Does not bubble. */
export const PLATE_DRAWN_EVENT = "plate:drawn";
