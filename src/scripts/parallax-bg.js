import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const getRatio = (el) =>
  window.innerHeight / (window.innerHeight + el.offsetHeight);

document.querySelectorAll(".parallax-section").forEach((section, i) => {
  const bg = section.querySelector(".bg");
  bg.style.backgroundImage = `url(/assets/manos.webp)`; // reemplazar por tus imágenes reales

  gsap.fromTo(
    bg,
    {
      backgroundPosition: `50% ${-window.innerHeight * getRatio(section)}px`,
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
