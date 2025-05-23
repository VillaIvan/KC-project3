import { useEffect } from "react";
import gsap from "gsap";

export default function BlurBackgroundAnimation() {
  useEffect(() => {
    const random = (min, max) => {
      const delta = max - min;
      return (direction = 1) => (min + delta * Math.random()) * direction;
    };

    const randomX = random(-400, 400);
    const randomY = random(-200, 200);
    const randomTime = random(2, 4);
    const randomTime2 = random(5, 6);
    const randomAngle = random(-30, 150);

    const blurs = document.querySelectorAll(".blur");

    blurs.forEach((blur) => {
      gsap.set(blur, {
        x: randomX(-1),
        y: randomY(1),
        rotation: randomAngle(-1),
      });

      moveX(blur, 1);
      moveY(blur, -1);
      rotate(blur, 1);
    });

    function rotate(target, direction) {
      gsap.to(target, {
        duration: randomTime2(),
        rotation: randomAngle(direction),
        ease: "sine.inOut",
        onComplete: () => rotate(target, direction * -1),
      });
    }

    function moveX(target, direction) {
      gsap.to(target, {
        duration: randomTime(),
        x: randomX(direction),
        ease: "sine.inOut",
        onComplete: () => moveX(target, direction * -1),
      });
    }

    function moveY(target, direction) {
      gsap.to(target, {
        duration: randomTime(),
        y: randomY(direction),
        ease: "sine.inOut",
        onComplete: () => moveY(target, direction * -1),
      });
    }
  }, []);

  return null;
}
