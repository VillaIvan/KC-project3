import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Marca1 from "@/components/assets/marca1.png";

gsap.registerPlugin(ScrollTrigger);

export default function BrandsLoop() {
  const containerRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;

    // Duplicar contenido para simular loop infinito
    track.innerHTML += track.innerHTML;

    const loop = gsap.to(track, {
      xPercent: -50,
      ease: "none",
      duration: 60,
      repeat: -1,
    });

    const st = ScrollTrigger.create({
      trigger: container,
      start: 0,
      end: "max",
      onUpdate: (self) => {
        loop.timeScale(self.direction === -1 ? -1 : 1);
      },
    });

    return () => {
      loop.kill();
      st.kill();
    };
  }, []);

  return (
    <div ref={containerRef} className="overflow-hidden w-full py-10">
      <div ref={trackRef} className="flex gap-10 w-max will-change-transform">
        <div class="w-1/4 h-80 border border-gray-200 rounded-lg flex items-center justify-center bg-lightwhite2">
          <img src={Marca1.src} alt="Marca 1" class="h-16 object-fit" />
        </div>
        <div class="w-1/4 h-80 border border-gray-200 rounded-lg flex items-center justify-center bg-lightwhite2">
          <img src={Marca1.src} alt="Marca 1" class="h-16 object-fit" />
        </div>
        <div class="w-1/4 h-80 border border-gray-200 rounded-lg flex items-center justify-center bg-lightwhite2">
          <img src={Marca1.src} alt="Marca 1" class="h-16 object-fit" />
        </div>
        <div class="w-1/4 h-80 border border-gray-200 rounded-lg flex items-center justify-center bg-lightwhite2">
          <img src={Marca1.src} alt="Marca 1" class="h-16 object-fit" />
        </div>
        <div class="w-1/4 h-80 border border-gray-200 rounded-lg flex items-center justify-center bg-lightwhite2">
          <img src={Marca1.src} alt="Marca 1" class="h-16 object-fit" />
        </div>
        <div class="w-1/4 h-80 border border-gray-200 rounded-lg flex items-center justify-center bg-lightwhite2">
          <img src={Marca1.src} alt="Marca 1" class="h-16 object-fit" />
        </div>
        <div class="w-1/4 h-80 border border-gray-200 rounded-lg flex items-center justify-center bg-lightwhite2">
          <img src={Marca1.src} alt="Marca 1" class="h-16 object-fit" />
        </div>
        <div class="w-1/4 h-80 border border-gray-200 rounded-lg flex items-center justify-center bg-lightwhite2">
          <img src={Marca1.src} alt="Marca 1" class="h-16 object-fit" />
        </div>
        <div class="w-1/4 h-80 border border-gray-200 rounded-lg flex items-center justify-center bg-lightwhite2">
          <img src={Marca1.src} alt="Marca 1" class="h-16 object-fit" />
        </div>
        <div class="w-1/4 h-80 border border-gray-200 rounded-lg flex items-center justify-center bg-lightwhite2">
          <img src={Marca1.src} alt="Marca 1" class="h-16 object-fit" />
        </div>
      </div>
    </div>
  );
}
