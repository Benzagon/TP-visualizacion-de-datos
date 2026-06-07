"use client";

import { type RefObject, useEffect } from "react";

const SCROLL_KEYS = new Set([
  "ArrowDown",
  "ArrowUp",
  "PageDown",
  "PageUp",
  " ",
  "End",
]);

function getMaxScroll(container: HTMLElement | null): number {
  if (!container) return 0;
  return Math.max(
    0,
    container.offsetTop + container.offsetHeight - window.innerHeight,
  );
}

/**
 * Keeps the page scrolled within `container` until `unlocked` is true.
 * Blocks wheel, touch, keyboard, and programmatic overscroll past the container.
 */
export function useScrollGate(
  containerRef: RefObject<HTMLElement | null>,
  unlocked: boolean,
) {
  useEffect(() => {
    if (unlocked) return;

    let lastTouchY = 0;

    const clampScroll = () => {
      const max = getMaxScroll(containerRef.current);
      if (window.scrollY > max) {
        window.scrollTo({ top: max, behavior: "auto" });
      }
    };

    const onWheel = (event: WheelEvent) => {
      const max = getMaxScroll(containerRef.current);
      if (window.scrollY >= max - 1 && event.deltaY > 0) {
        event.preventDefault();
      }
    };

    const onTouchStart = (event: TouchEvent) => {
      lastTouchY = event.touches[0]?.clientY ?? 0;
    };

    const onTouchMove = (event: TouchEvent) => {
      const touchY = event.touches[0]?.clientY ?? lastTouchY;
      const delta = lastTouchY - touchY;
      const max = getMaxScroll(containerRef.current);

      if (window.scrollY >= max - 1 && delta > 0) {
        event.preventDefault();
      }

      lastTouchY = touchY;
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (!SCROLL_KEYS.has(event.key)) return;

      const max = getMaxScroll(containerRef.current);
      const scrollingDown =
        event.key === "ArrowDown" ||
        event.key === "PageDown" ||
        event.key === " " ||
        event.key === "End";

      if (scrollingDown && window.scrollY >= max - 1) {
        event.preventDefault();
      }
    };

    clampScroll();

    window.addEventListener("scroll", clampScroll, { passive: true });
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("scroll", clampScroll);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [containerRef, unlocked]);
}
