import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const getRatio = (el) =>
  window.innerHeight / (window.innerHeight + el.offsetHeight);

export default function ParallaxBackground() {
  useEffect(() => {
    document.querySelectorAll(".parallax-section").forEach((section) => {
      const bg = section.querySelector(".bg");
      if (!bg) return;
      bg.style.backgroundImage = `url(/assets/manos.webp)`; // asegúrate de que esté en /public/assets/

      gsap.fromTo(
        bg,
        {
          backgroundPosition: `50% ${
            -window.innerHeight * getRatio(section)
          }px`,
        },
        {
          backgroundPosition: `50% ${
            window.innerHeight * (1 - getRatio(section))
          }px`,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
            invalidateOnRefresh: true,
          },
        }
      );
    });
  }, []);

  return null;
}
