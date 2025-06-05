import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import ReactDialog from "@/components/ReactDialog";
import slider1 from "@/components/assets/respaldo.webp";
import slider2 from "@/components/assets/potenciarte.webp";
import slider3 from "@/components/assets/acompañamiento.webp";

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
    title: "Te entendemos, te acompañamos.",
    description:
      "Brindamos soluciones reales para tu día a día como Productor.",
    image: slider3.src,
  },
];

export default function HeroCarouselSwiper() {
  return (
    <section className="relative w-full overflow-hidden bg-gray-900 z-3">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 10000, disableOnInteraction: false }}
        loop={true}
        effect="fade"
        className="relative h-screen custom-swiper-nav"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-full w-full">
              <img
                src={slide.image}
                alt={slide.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="container px-4 md:px-6">
                  <div className="max-w-2xl space-y-4 text-center text-white flex flex-col items-center mx-auto">
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
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
