import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Swipe1 from "@/components/assets/heroimg.webp";

const industries = [
  { title: "AGRICULTURE", image: Swipe1.src, link: "#agriculture" },
  { title: "AUTOMOTIVE", image: Swipe1.src, link: "#automotive" },
  { title: "AVIATION", image: Swipe1.src, link: "#aviation" },
  { title: "CONSTRUCTION", image: Swipe1.src, link: "#construction" },
  { title: "MINING", image: Swipe1.src, link: "#mining" },
  { title: "ENERGY", image: Swipe1.src, link: "#energy" },
];

export default function IndustryCarousel() {
  const trackRef = useRef(null);
  const cardRefs = useRef([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);
  const [maxIndex, setMaxIndex] = useState(0);
  const dragStartX = useRef(0);
  const dragOffsetX = useRef(0);
  const isDragging = useRef(false);
  const [isClient, setIsClient] = useState(false);

  // Este useEffect solo se ejecuta en el cliente
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return; // Evitar ejecución en el servidor

    const updateSizes = () => {
      const cardEl = cardRefs.current[0];
      if (!cardEl || !trackRef.current) return;

      const fullCardWidth = cardEl.offsetWidth + 24; // Incluye el `gap` entre las tarjetas
      const containerWidth = trackRef.current.parentElement.offsetWidth;
      const visibleCards = Math.floor(containerWidth / fullCardWidth);

      setCardWidth(fullCardWidth);
      setMaxIndex(Math.max(0, industries.length - visibleCards));
    };

    updateSizes();
    window.addEventListener("resize", updateSizes);
    return () => window.removeEventListener("resize", updateSizes);
  }, [isClient]);

  useEffect(() => {
    if (!isClient) return; // Evitar ejecución en el servidor
    if (cardWidth === 0) return; // Evitar que GSAP se ejecute con un `cardWidth` de 0

    gsap.to(trackRef.current, {
      x: -currentIndex * cardWidth,
      duration: 0.3,
      ease: "power2.out",
    });
  }, [currentIndex, cardWidth, isClient]);

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const handleNext = () => {
    if (currentIndex < maxIndex) setCurrentIndex(currentIndex + 1);
  };

  // 👇 DRAG HANDLERS
  const handlePointerDown = (e) => {
    isDragging.current = true;
    dragStartX.current = e.clientX || e.touches?.[0]?.clientX || 0;
    trackRef.current.style.cursor = "grabbing";
  };

  const handlePointerMove = (e) => {
    if (!isDragging.current) return;

    const x = e.clientX || e.touches?.[0]?.clientX || 0;
    dragOffsetX.current = x - dragStartX.current;
    gsap.set(trackRef.current, {
      x: -currentIndex * cardWidth + dragOffsetX.current,
    });
  };

  const handlePointerUp = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    trackRef.current.style.cursor = "grab";

    if (Math.abs(dragOffsetX.current) > cardWidth / 4) {
      if (dragOffsetX.current > 0 && currentIndex > 0) {
        setCurrentIndex((i) => i - 1);
      } else if (dragOffsetX.current < 0 && currentIndex < maxIndex) {
        setCurrentIndex((i) => i + 1);
      }
    } else {
      gsap.to(trackRef.current, {
        x: -currentIndex * cardWidth,
        duration: 0.3,
        ease: "power2.out",
      });
    }

    dragOffsetX.current = 0;
  };

  return (
    <section className="text-white py-16 px-4 md:px-8 lg:px-16 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-center items-center mb-12">
          <div className="flex gap-4">
            <button
              onClick={handlePrev}
              className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center transition-colors duration-300 hover:bg-white/10"
              aria-label="Previous slide"
              disabled={currentIndex === 0}
              style={{ opacity: currentIndex === 0 ? 0.5 : 1 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>
            <button
              onClick={handleNext}
              className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center transition-colors duration-300 hover:bg-white/10"
              aria-label="Next slide"
              disabled={currentIndex === maxIndex}
              style={{ opacity: currentIndex === maxIndex ? 0.5 : 1 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>

        <div className="carousel-container">
          <div
            ref={trackRef}
            className="flex gap-6 transition-transform duration-500 cursor-grab select-none touch-none"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
            onTouchStart={handlePointerDown}
            onTouchMove={handlePointerMove}
            onTouchEnd={handlePointerUp}
          >
            {industries.map((industry, idx) => (
              <a
                key={industry.title + idx}
                ref={(el) => (cardRefs.current[idx] = el)}
                className="industry-card relative min-w-[300px] md:min-w-[350px] h-[450px] rounded-lg overflow-hidden group"
              >
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center">
                  <span className="text-white text-xl font-semibold transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    Explore {industry.title}
                  </span>
                </div>
                <div className="absolute top-6 left-6 z-20">
                  <span className="bg-white text-[#121a1f] px-4 py-2 rounded-full text-sm font-bold">
                    {industry.title}
                  </span>
                </div>
                <div className="w-full h-full overflow-hidden">
                  <img
                    src={industry.image}
                    alt={`${industry.title} industry`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
