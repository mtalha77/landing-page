"use client";

import { useEffect, useRef } from "react";

export function FitFrame({ children }: { children: React.ReactNode }) {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;

    const fit = () => {
      inner.style.transform = "none";
      const available = outer.clientHeight - 76 - 24;
      const needed = inner.offsetHeight;
      const scale = needed > 0 ? Math.min(1, available / needed) : 1;
      inner.style.transform = scale < 0.999 ? `scale(${scale})` : "none";
    };

    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(outer);
    window.addEventListener("resize", fit);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", fit);
    };
  }, []);

  return (
    <div
      ref={outerRef}
      className="flex h-full min-h-0 items-center justify-center overflow-hidden px-5 pt-[4.75rem] pb-6"
    >
      <div
        ref={innerRef}
        className="flex w-full max-w-[1080px] origin-center flex-col items-center text-center"
      >
        {children}
      </div>
    </div>
  );
}
