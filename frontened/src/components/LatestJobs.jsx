import { useEffect, useRef } from "react";
import gsap from "gsap";
import SplitText from "gsap/SplitText";
import LatestJobCards from "./LatestJobCards";

gsap.registerPlugin(SplitText);
const randomJobs = [1, 2, 3, 4, 5, 6, 7, 8];

export default function LatestJobs() {
  const headingRef = useRef(null); // reference to the h1

  useEffect(() => {
    if (!headingRef.current) return;

    // Split the text into words and characters
    const split = new SplitText(headingRef.current, { type: "words, chars" });

    // Animate characters in a staggered fashion
    gsap.from(split.chars, {
      duration: 1,
      y: 50, // animate from 100px below
      autoAlpha: 0, // fade in from opacity: 0
      stagger: 0.05,
      ease: "power3.out",
    });

    // Optional cleanup if component unmounts
    return () => {
      split.revert(); // restores the original text
    };
  }, []);

  return (
    <div className="relative">
      <h1
        ref={headingRef} // attach ref here
        className="text-center text-5xl md:text-6xl font-bold split mb-15" // "split" class for reference (optional)
      >
        <span>Latest & Top </span>
        <span className="text-[#ffdf20]">Job Openings</span>
      </h1>
      <div className="relative z-10 m-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {randomJobs.slice(0, 6).map((item, index) => (
          <LatestJobCards key={index} />
        ))}
      </div>
    </div>
  );
}
