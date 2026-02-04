// src/components/PhotoReel.jsx
import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";

const STOCK = [
  "../../photos/output.webp",
  "../../photos/DSC04545.webp",
  "../../photos/DSC04640.webp",
  "../../photos/DSC04883-2.webp",
  "../../photos/DSC05532.webp",
  "../../photos/DSC02728-HDR.webp",
  "../../photos/DSC03418.webp",
  "../../photos/DSC09936.webp",
  "../../photos/beach (9).webp",
  "../../photos/DSC02563-HDR.webp",
  "../../photos/DSC05291-2.webp",
  "../../photos/DSC09788.webp",
];

export default function PhotoReel({
  images = STOCK,
  speedMs = 25000, // higher = slower
  height = 260,
  width = 180,
  gapPx = 0, // spacing between frames (use 0 for perfectly tight)
  pauseOnHover = true,
}) {
  const viewportRef = useRef(null);
  const stripMeasureRef = useRef(null);

  const [viewportW, setViewportW] = useState(0);
  const [stripW, setStripW] = useState(0);

  // Ensure we always have at least 1 image to avoid divide-by-zero
  const safeImages = useMemo(() => (images?.length ? images : STOCK), [images]);

  // Observe viewport resize
  useEffect(() => {
    if (!viewportRef.current) return;

    const el = viewportRef.current;
    const ro = new ResizeObserver(() => setViewportW(el.clientWidth));
    ro.observe(el);
    setViewportW(el.clientWidth);

    return () => ro.disconnect();
  }, []);

  // Measure one strip width (sum of frames)
  useLayoutEffect(() => {
    if (!stripMeasureRef.current) return;

    const measure = () => {
      const w = stripMeasureRef.current.scrollWidth;
      setStripW(w);
    };

    measure();

    const ro = new ResizeObserver(measure);
    ro.observe(stripMeasureRef.current);

    return () => ro.disconnect();
  }, [safeImages, height, width, gapPx]);

  // How many copies of the strip do we need to cover the viewport + buffer?
  const repeatCount = useMemo(() => {
    if (!stripW || !viewportW) return 3; // fallback while measuring
    return Math.max(3, Math.ceil(viewportW / stripW) + 2);
  }, [stripW, viewportW]);

  // CSS vars to drive animation distance + duration
  const laneStyle = useMemo(
    () => ({
      "--reel-duration": `${speedMs}ms`,
      "--reel-distance": `${stripW || 0}px`,
    }),
    [speedMs, stripW]
  );

  return (
    <section ref={viewportRef} className="relative overflow-hidden py-3">
      <div
        className={[
          "reel-lane flex w-max will-change-transform",
          pauseOnHover ? "reel-hover" : "",
        ].join(" ")}
        style={laneStyle}
      >
        {/* This hidden strip is only for measuring one full set width */}
        <div className="absolute -z-10 opacity-0 pointer-events-none">
          <Strip
            ref={stripMeasureRef}
            images={safeImages}
            height={height}
            width={width}
            gapPx={gapPx}
          />
        </div>

        {/* Render enough copies to guarantee no gaps */}
        {Array.from({ length: repeatCount }).map((_, idx) => (
          <Strip
            key={idx}
            images={safeImages}
            height={height}
            width={width}
            gapPx={gapPx}
          />
        ))}
      </div>

      {/* Edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black to-transparent" />

      {/* Scoped CSS (works in JSX files) */}
      <style>{`
        .reel-lane {
          animation: reel var(--reel-duration) linear infinite;
        }
        .reel-hover:hover {
          animation-play-state: paused;
        }
        @keyframes reel {
          from { transform: translateX(0); }
          to   { transform: translateX(calc(-1 * var(--reel-distance))); }
        }
      `}</style>
    </section>
  );
}

const Strip = React.forwardRef(function Strip({ images, height, width, gapPx }, ref) {
  return (
    <div ref={ref} className="flex items-center" style={{ gap: `${gapPx}px` }}>
      {images.map((src, i) => (
        <Frame key={`${src}-${i}`} src={src} height={height} width={width} />
      ))}
    </div>
  );
});

function Frame({ src, height, width }) {
  return (
    <div
      className="flex-none overflow-hidden"
      style={{ height: `${height}px`, width: `${width}px` }}
    >
      <img
        src={src}
        alt=""
        loading="lazy"
        className="w-full h-full object-cover select-none"
        draggable={false}
      />
    </div>
  );
}
