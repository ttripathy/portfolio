// src/components/PhotoReel.jsx
const STOCK = [
  "../../photos/output.webp",
  "../../photos/DSC04545.webp",
  "../../photos/DSC04640.webp",
  "../../photos/DSC04883-2.webp",
  "../../photos/DSC05532.webp",
  "../../photos/DSC02728-HDR.webp",
  "../../photos/DSC03418.webp",
  "../../photos/DSC09936.webp"
];

export default function PhotoReel({
  images = STOCK,
  speedMs = 25000,           // higher = slower
  height = 260 ,              // px height of each frame
  width = 180,               // px width of each frame
  overlapPx = 0.00001,             // how much neighbors overlap (for blending)
  pauseOnHover = true,
}) {
  const laneStyle = {
    animation: `reel ${speedMs}ms linear infinite`,
  };

  return (
    <section className="relative overflow-hidden py-3">
      {/* moving lane (rendered twice for seamless loop) */}
      <div
        className={`reel-lane flex w-[100%]`}
        style={laneStyle}
        {...(pauseOnHover ? { className: `reel-lane flex w-[100%] group ${''}` } : {})}
      >
        {/* first set */}
        <Strip images={images} height={height} width={width} overlapPx={overlapPx} />
        {/* second set (duplicate) */}
      </div>

      {/* edge fades so the strip blends into the page */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black to-transparent" />
    </section>
  );
}

function Strip({ images, height, width, overlapPx }) {
  return (
    <div className="flex items-center">
      {images.map((src, i) => (
        <Frame
          key={i}
          src={src}
          height={height}
          width={width}
          overlapPx={overlapPx}
          isFirst={i === 0}
        />
      ))}
    </div>
  );
}

function Frame({ src, height, width, overlapPx, isFirst }) {
  return (
    <div
      className="flex-none overflow-hidden"
      style={{
        height: `${height}px`,
        width: `${width}px`,
        /* overlap neighbors slightly to hide seams */
        marginLeft: isFirst ? 0 : `${overlapPx}px`,
      }}
    >
      <img
        src={src}
        alt=""
        loading="lazy"
        className="reel-img w-full h-full object-cover"
        draggable={false}
      />
    </div>
  );
}
