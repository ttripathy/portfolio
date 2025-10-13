import PhotoReel from "./components/PhotoReel.jsx";
import Hero from "./components/Hero.jsx";

export default function App() {
  return (
    <div
      className="
        min-h-screen
        bg-black text-neutral-200
        /* soft center spotlight */
        bg-[gradient(80%_60%_at_50%_20%,rgba(255,255,255,0.10),rgba(0,0,0,0)_60%)]
      "
    >
      <PhotoReel />
      <Hero />
    </div>
  );
}
