import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import { FreeMode, Pagination } from "swiper/modules";

import Swipe1 from "@/components/assets/heroimg.webp";

export const ServiceData = [
  {
    title: "ART",
    content:
      "El objetivo principal del sistema de riesgos del trabajo es la prevención de riesgos laborales...",
    image: Swipe1.src,
  },
  {
    title: "AUTOMOTOR",
    content: "Te protegemos a vos y tu vehículo en la compañía...",
    image: Swipe1.src,
  },
  {
    title: "COMERCIOS",
    content:
      "Respaldamos tu principal fuente de ingresos adaptándonos al tamaño de tu negocio...",
    image: Swipe1.src,
  },
  {
    title: "HOGAR",
    content:
      "La mejor forma de resguardar tu casa y bienes con coberturas en función de la propiedad...",
    image: Swipe1.src,
  },
  {
    title: "MOTOVEHÍCULOS",
    content: "Si te gusta disfrutar de la libertad y los paisajes...",
    image: Swipe1.src,
  },
  {
    title: "RESPONSABILIDAD CIVIL",
    content:
      "Te amparamos frente a reclamos de terceros que se deriven de la realización de tu actividad profesional...",
    image: Swipe1.src,
  },
];

const ActiveSlider = () => {
  const [activeIdx, setActiveIdx] = useState(null);
  const containerRef = useRef(null);

  // Cerrar overlay si clickeás afuera
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setActiveIdx(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <section className="text-white py-16 px-4 md:px-8 lg:px-16 overflow-hidden">
      <div ref={containerRef} className="max-w-7xl mx-auto">
        <Swiper
          spaceBetween={24}
          slidesPerView="auto"
          freeMode={true}
          pagination={{ clickable: true }}
          modules={[FreeMode, Pagination]}
          onSlideChange={() => setActiveIdx(null)} // cerrar si cambiás de slide
          className="w-full !overflow-visible"
        >
          {ServiceData.map((item, idx) => {
            const isActive = activeIdx === idx;
            return (
              <SwiperSlide key={item.title + idx} style={{ width: "auto" }}>
                <div
                  onClick={() => setActiveIdx(idx)}
                  className="relative w-[280px] sm:w-[300px] md:w-[320px] lg:w-[350px] h-[400px] sm:h-[420px] md:h-[440px] lg:h-[450px] rounded-lg overflow-hidden transition-all duration-300 cursor-pointer"
                >
                  {/* Overlay controlado por estado */}
                  <div
                    className={`absolute inset-0 bg-black/50 z-10 flex items-center justify-center p-6 text-center transition-all duration-300 ${
                      isActive ? "opacity-100" : "opacity-0 pointer-events-none"
                    }`}
                  >
                    <span
                      className={`text-white text-lg font-regular leading-snug transform transition-all duration-300 ${
                        isActive
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-4"
                      }`}
                    >
                      {item.content}
                    </span>
                  </div>

                  {/* Badge */}
                  <div className="absolute top-6 left-6 z-20">
                    <span className="bg-white text-[#121a1f] px-4 py-2 rounded-full text-sm font-bold">
                      {item.title}
                    </span>
                  </div>

                  {/* Imagen */}
                  <div className="w-full h-full overflow-hidden">
                    <img
                      src={item.image}
                      alt={`${item.title} industry`}
                      className={`w-full h-full object-cover transition-transform duration-500 ${
                        isActive ? "scale-110" : ""
                      }`}
                    />
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
};

export default ActiveSlider;
