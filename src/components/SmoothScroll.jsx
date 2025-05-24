"use client";
import { useEffect } from "react";
import { gsap } from "gsap/all";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, ScrollToPlugin);

export default function SmoothScroll() {
  useEffect(() => {
    const smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 2.5,
      effects: true,
    });

    const OFFSET = 100;

    const links = document.querySelectorAll('a[href^="#"]:not([href="#"])');

    const handleClick = (e, link) => {
      e.preventDefault();
      const targetId = link.getAttribute("href")?.replace("#", "");
      const target = document.getElementById(targetId);
      if (target) {
        const targetY =
          target.getBoundingClientRect().top + smoother.scrollTop() - OFFSET;

        smoother.scrollTo(targetY, true);
      }
    };

    links.forEach((link) => {
      const clickHandler = (e) => handleClick(e, link);
      link.addEventListener("click", clickHandler);

      // Cleanup
      link._clickHandler = clickHandler;
    });

    return () => {
      links.forEach((link) => {
        if (link._clickHandler) {
          link.removeEventListener("click", link._clickHandler);
        }
      });
    };
  }, []);

  return null;
}
