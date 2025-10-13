import { useEffect, useState } from "react";

const ROLES = ["programmer", "videographer", "photographer", "gamer", "artist"];

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
    <header className="max-w-6xl mx-auto px-6 md:px-8 pt-28 pb-20">
      {/* Headline */}
       <h1
        className="
          text-white
          text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight
          leading-[1.15]         /* keep descenders (y, p) visible */
          pb-2                   /* tiny cushion below to avoid visual clip */
          antialiased            /* smoother edges */
          drop-shadow-[0_0_6px_rgba(255,255,255,0.65)]
          drop-shadow-[0_0_24px_rgba(255,255,255,0.35)]
          drop-shadow-[0_0_64px_rgba(255,255,255,0.18)]
          whitespace-nowrap      /* keep the name on one line */
        "
      >
        Tej Sri Tripathy
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
    </header>
  );
}
