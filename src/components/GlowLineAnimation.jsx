import { useEffect } from "react";
import { gsap } from "gsap";

export default function GlowScan() {
  useEffect(() => {
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.8 });

    const finalWidth = 60;
    const startX = 0;
    const endX = 1440 - finalWidth;
    const y = 1;

    // Fase 1: aparición lenta
    tl.fromTo(
      "#glow-scan",
      { attr: { d: `M${startX} ${y} L${startX} ${y}` } },
      {
        attr: { d: `M${startX} ${y} L${startX + finalWidth} ${y}` },
        duration: 1,
        ease: "power2.out",
      }
    );

    // Fase 2: movimiento acelerado
    tl.to("#glow-scan", {
      onUpdate: function () {
        const progress = this.progress();
        const currentX = startX + (endX - startX) * progress;
        const path = `M${currentX} ${y} L${currentX + finalWidth} ${y}`;
        gsap.set("#glow-scan", { attr: { d: path } });
      },
      duration: 2.2,
      ease: "power4.in",
    });

    // ✅ Fase 3: desvanecimiento sin rebote
    tl.to("#glow-scan", {
      onUpdate: function () {
        const progress = this.progress();
        const end = endX + finalWidth;
        const currentWidth = finalWidth * (1 - progress);
        const path = `M${end - currentWidth} ${y} L${end} ${y}`;
        gsap.set("#glow-scan", { attr: { d: path } });
      },
      onComplete: function () {
        // Reseteo final para evitar residuos en el próximo loop
        gsap.set("#glow-scan", { attr: { d: `M0 ${y} L0 ${y}` } });
      },
      duration: 0.6,
      ease: "power1.inOut",
    });
  }, []);

  return null;
}
