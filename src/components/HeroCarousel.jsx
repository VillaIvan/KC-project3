import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import slider1 from "@/components/assets/respaldo.jpg";
import slider2 from "@/components/assets/potenciarte.jpg";
import slider3 from "@/components/assets/acompañamiento.jpg";
import { ArrowRight } from "lucide-react";
import ReactDialog from "@/components/ReactDialog";

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      title: "¡Queremos potenciarte!",
      description: "Ayudamos a Productores a crecer con bases sólidas.",
      image: slider2.src,
    },
    {
      title: "Garantizamos tu respaldo.",
      description: "Te acompañamos con respaldo, experiencia y compromiso.",
      image: slider1.src,
    },
    {
      title: `Te entendemos, te acompañamos.`,
      description:
        "Brindamos soluciones reales para tu día a día como Productor.",
      image: slider3.src,
    },
  ];

  const slideRefs = useRef([]);
  const dotRefs = useRef([]);

  const goToSlide = (index) => {
    if (index === currentSlide) return;

    gsap.to(slideRefs.current[currentSlide], {
      opacity: 0,
      duration: 1,
      ease: "power2.out",
      onComplete: () => {
        slideRefs.current[currentSlide].style.zIndex = 0;
        slideRefs.current[index].style.zIndex = 10;
      },
    });
    gsap.to(slideRefs.current[index], {
      opacity: 1,
      duration: 1,
      ease: "power2.out",
    });

    setCurrentSlide(index);
  };

  const nextSlide = () => {
    const next = (currentSlide + 1) % slides.length;
    goToSlide(next);
  };

  const prevSlide = () => {
    const prev = (currentSlide - 1 + slides.length) % slides.length;
    goToSlide(prev);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentSlide]);

  return (
    <section className="relative w-full overflow-hidden bg-gray-900 z-3 ">
      <div className="relative h-[100vh]">
        {slides.map((slide, index) => (
          <div
            key={index}
            ref={(el) => (slideRefs.current[index] = el)}
            className="absolute inset-0 transition-opacity duration-1000"
            style={{
              opacity: index === 0 ? 1 : 0,
              zIndex: index === 0 ? 10 : 0,
            }}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="container px-4 md:px-6">
                <div className="max-w-2xl space-y-4 text-center text-white flex flex-col items-center">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                    {slide.title}
                  </h1>
                  <p className="mx-auto max-w-[700px] text-white/90 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    {slide.description}
                  </p>
                  <div className="mx-auto md:mx-0">
                    <ReactDialog />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Botones de navegación */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/30 text-white hover:bg-black/50"
          aria-label="Anterior"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/30 text-white hover:bg-black/50"
          aria-label="Siguiente"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>

        {/* Dots */}
        <div className="absolute bottom-10 left-1/2 z-20 flex -translate-x-1/2 space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              ref={(el) => (dotRefs.current[index] = el)}
              onClick={() => goToSlide(index)}
              className={`h-2 w-2 rounded-full transition-colors duration-300 ${
                currentSlide === index ? "bg-white" : "bg-white/50"
              }`}
              aria-label={`Ir al slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
