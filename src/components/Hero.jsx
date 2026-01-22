import { useEffect, useState } from "react";

const ROLES = ["programmer", "videographer", "photographer", "artist"];

const TIMELINE = [
  {
    date: "Ongoing...",
    title: "Research - Professor Phil Conrad",
    subtitle: "CS Education / Automation",
    details: [
      "Exploring ways to expand PrairieLearn and adapt education workflows in an AI era.",
    ],
    tags: ["Research", "CS Education"],
    active: true 
  },
  {
    date: "Summer 2025",
    title: "Software Engineering Intern — Index Engines",
    subtitle: "Platform & Backend Systems (BlueSky)",
    details: [
      "Returned to Index Engines to continue building and scaling backend services for BlueSky, a platform used to manage and license distributed data engines.",
      "Expanded the BlueSky Gateway into a production-grade API layer, focusing on authentication, authorization, and secure communication between browser-based UIs and remote agents.",
      "Worked primarily in Go and Python, collaborating closely with senior engineers and presenting system demos to leadership.",
    ],
    tags: ["Go", "Backend", "Distributed Systems", "Python", "FastAPI"],
  },
  {
    date: "Summer 2024",
    title: "Software Engineering Intern — Index Engines",
    subtitle: "Infrastructure & Tooling",
    details: [
      "Built internal services and automation tooling to support licensing, engine registration, and observability across Index Engines’ data management stack.",
      "Developed reproducible build and deployment workflows and improved logging pipelines to reduce noise and improve debugging in CI/CD and runtime environments.",
      "Gained hands-on experience working on production systems used by enterprise customers.",
    ],
    tags: ["Python", "CI/CD", "Infrastructure"],
  }
];

function Timeline() {
  return (
    <section className="mt-10 max-w-2xl">
      <h2 className="text-lg md:text-xl font-semibold text-neutral-100">
        Timeline
      </h2>
      <p className="mt-2 text-neutral-400">
        A quick snapshot of my professional experience. 
      </p>

      <ol className="relative mt-6 border-l border-neutral-800">
        {TIMELINE.map((item, idx) => (
          <li key={idx} className="ml-6 pb-10 last:pb-0">
            <span
              className={[
                "absolute -left-[7px] mt-1.5 h-3.5 w-3.5 rounded-full border",
                item.active
                  ? "bg-emerald-500 border-emerald-300"
                  : "bg-neutral-950 border-neutral-700",
              ].join(" ")}
              style={
                item.active
                  ? { boxShadow: "0 0 0 4px rgba(16,185,129,0.15)" }
                  : undefined
              }
            />

            <time className="text-sm text-neutral-500">{item.date}</time>

            <div
              className="
                mt-2 rounded-2xl border border-neutral-800
                bg-neutral-950/40 backdrop-blur
                px-5 py-4
              "
            >
              <div className="flex flex-col gap-1">
                <h3 className="text-base md:text-lg font-semibold text-neutral-100">
                  {item.title}
                </h3>
                <p className="text-sm md:text-base text-neutral-300">
                  {item.subtitle}
                </p>
              </div>

              {item.details?.length > 0 && (
                <ul className="mt-3 space-y-2 text-sm text-neutral-300">
                  {item.details.map((d, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-neutral-600" />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              )}

              {item.tags?.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {item.tags.map((t, i) => (
                    <span
                      key={i}
                      className="
                        rounded-full border border-neutral-800
                        bg-neutral-900/60 px-2.5 py-1
                        text-xs text-neutral-200
                      "
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const currentWord = ROLES[roleIndex];
    const TYPING_SPEED = 90;
    const DELETING_SPEED = 40;
    const PAUSE_AT_FULL = 800;
    const PAUSE_AT_EMPTY = 400;

    let id;
    if (!isDeleting && charIndex < currentWord.length) {
      id = setTimeout(() => {
        setDisplayText(currentWord.slice(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      }, TYPING_SPEED);
    } else if (!isDeleting && charIndex === currentWord.length) {
      id = setTimeout(() => setIsDeleting(true), PAUSE_AT_FULL);
    } else if (isDeleting && charIndex > 0) {
      id = setTimeout(() => {
        setDisplayText(currentWord.slice(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      }, DELETING_SPEED);
    } else if (isDeleting && charIndex === 0) {
      id = setTimeout(() => {
        setIsDeleting(false);
        setRoleIndex((roleIndex + 1) % ROLES.length);
      }, PAUSE_AT_EMPTY);
    }
    return () => clearTimeout(id);
  }, [charIndex, isDeleting, roleIndex]);

  return (
    <header className="max-w-6xl mx-auto px-6 md:px-8 pt-2 pb-20">
      {/* Name */}
      <h1
        style={{
          fontFamily: '"Clash Display", sans-serif',
          fontWeight: 500,
          letterSpacing: "-0.015em",
          lineHeight: "1.05",
          background:
            "linear-gradient(90deg, #ffd1dc, #f2b6a0, #d4af37)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
        className="text-5xl md:text-7xl lg:text-8xl drop-shadow-[0_0_6px_rgba(255,255,255,0.35)]"
      >
        Tej Sri Tripathy
      </h1>

      {/* GIF row (not another h1) */}
      <div className="flex items-center gap-1.5 pt-3">
        <img
          src="/../../photos/17666308c801d30e96ae33b5180ce66a267d5a51_hq.gif"
          alt=""
          className="h-10 w-10 md:h-12 md:w-12 pointer-events-none select-none floating-gif"
        />
        <img
          src="../../../photos/ezgif-662835385431b4d8.gif"
          alt=""
          className="h-20 w-20 md:h-22 md:w-22 pointer-events-none select-none floating-gif"
        />
      </div>

      {/* Typing role */}
      <p className="mt-6 text-xl md:text-2xl text-neutral-300">
        I am a{" "}
        <span className="font-semibold text-neutral-100">{displayText}</span>
        <span
          aria-hidden
          className="ml-1 inline-block w-[2px] h-[1.2em] align-[-0.15em] bg-neutral-200/80 animate-pulse"
        />
      </p>

      {/* Bio */}
      <p className="fade-in-bio mt-3 text-neutral-300 max-w-2xl">
        Welcome to my website! You'll find anything and everything about me here.
        From photos, coding projects, media reviews and even music videos, take a
        few moments to step into my world! If you want to get in touch, some of my
        contacts can be found at the bottom of the page. I hope you enjoy your visit!
      </p>

      <p className="fade-in-bio mt-3 text-neutral-300 max-w-2xl">
        Currently, I am working on <b>KaraYouKe</b> with my close friend Raghav Sinha. I recently
        finished GoldLens at SBHacks XII, a tool to help students enhance their course registration. I am
        also working alongside Professor Phil Conrad in research within CS Education,
        exploring ways to implement and expand PrairieLearn in a way that is fundamental
        to the newly evolving landscape of education impacted by AI.
      </p>

      {/* Timeline lives INSIDE the returned tree */}
      <Timeline />
    </header>
  );
}