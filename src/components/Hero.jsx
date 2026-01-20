import { useEffect, useState } from "react";

const ROLES = ["programmer", "videographer", "photographer", "artist"];

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
      {/* Headline */}
      <h1
        style={{
          fontFamily: '"Clash Display", sans-serif',
          fontWeight: 500,          // thinner than before
          letterSpacing: "-0.015em",
          lineHeight: "1.05",
          background: "linear-gradient(90deg, #ffd1dc, #f2b6a0, #d4af37)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
        className="text-5xl md:text-7xl lg:text-8xl drop-shadow-[0_0_6px_rgba(255,255,255,0.35)]"
      >
        Tej Sri Tripathy
      </h1>
      
      <h1 className="flex items-center gap-1.5 pt-3"> 
        <img 
        src="/../../photos/17666308c801d30e96ae33b5180ce66a267d5a51_hq.gif"
        alt=""
        className="
        h-10 w-10 md:h-12 md:w-12
        pointer-events-none select-none
        floating-gif
        "
        />
        <img 
        src="../../../photos/ezgif-662835385431b4d8.gif"
        alt="" 
        className="
        h-20 w-20 md:h-22 md:w-22 
        pointer-events-none select-none
        floating-gif"
        />
      </h1> 


      {/* Subheadline with the typing role */}
      <p className="mt-6 text-xl md:text-2xl text-neutral-300">
        I am a{" "}
        <span className="font-semibold text-neutral-100">{displayText}</span>
        <span
          aria-hidden
          className="ml-1 inline-block w-[2px] h-[1.2em] align-[-0.15em] bg-neutral-200/80 animate-pulse"
        />
      </p>
      <p className = "fade-in-bio mt-3 text-neutral-300 max-w-2xl"> 
      Welcome to my website! You'll find anything and everything about me here. 
      From photos, coding projects, media reviews and even music videos, take 
      a few moments to step into my world! If you want to get in touch, some of 
      my contacts can be found at the bottom of the page. I hope you enjoy your visit!   
      </p>
      <p className = "fade-in-bio mt-3 text-neutral-300 max-w-2xl"> 
      Currently, I am working on <b>KaraYouKe</b> with my close friend Raghav Sinha. I am 
      also working alongside Professor Phil Conrad in research within CS Education,
      exploring ways to implement and expand PrairieLearn in a way that is fundamental 
      to the newly evolving landscape of education impacted by AI. 
      </p> 
    </header>
  );
}
