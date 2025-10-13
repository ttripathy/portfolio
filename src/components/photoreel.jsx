// src/components/PhotoReel.jsx
const STOCK = [
  "../../photos/output.webp",
  "../../photos/output.webp",
  "../../photos/output.webp",
  "../../photos/output.webp",
  "../../photos/output.webp",
  "../../photos/output.webp"
];

export default function PhotoReel({
  images = STOCK,
  speedMs = 35000,           // higher = slower
  height = 560 ,              // px height of each frame
  width = 380,               // px width of each frame
  overlapPx = 0.00001,             // how much neighbors overlap (for blending)
  pauseOnHover = true,
}) {
  const laneStyle = {
    animation: `reel ${speedMs}ms linear infinite`,
  };

  return (
    <section className="relative overflow-hidden py-6">
      {/* moving lane (rendered twice for seamless loop) */}
      <div
        className={`reel-lane flex w-[200%]`}
        style={laneStyle}
        {...(pauseOnHover ? { className: `reel-lane flex w-[200%] group ${''}` } : {})}
      >
        {/* first set */}
        <Strip images={images} height={height} width={width} overlapPx={overlapPx} />
        {/* second set (duplicate) */}
        <Strip images={images} height={height} width={width} overlapPx={overlapPx} />
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
