import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Marca1 from "@/components/assets/marca1.png";
import Marca2 from "@/components/assets/Logo2.png";

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
        {[
          Marca1,
          Marca2,
          Marca1,
          Marca2,
          Marca1,
          Marca2,
          Marca1,
          Marca2,
          Marca1,
          Marca2,
        ].map((marca, i) => {
          // Detectar si es Marca1 para darle un poco más de tamaño visual
          const isMarca1 = marca === Marca1;

          return (
            <div
              key={i}
              className="flex items-center justify-center bg-transparent  rounded-lg shrink-0
                     w-52 h-32 sm:w-60 sm:h-36 md:w-72 md:h-40 lg:w-80 lg:h-48"
            >
              <img
                src={marca.src}
                alt={`Marca ${i + 1}`}
                className={`object-contain 
              max-h-12 sm:max-h-14 md:max-h-16 lg:max-h-20 
              ${isMarca1 ? "scale-110" : ""} 
              max-w-[85%]`}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
