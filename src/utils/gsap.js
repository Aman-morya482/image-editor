import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export const animatePixelo = (refs, setShowCursor) => {
  const { blurDiv1, blurDiv2, gradientText } = refs;

  gsap.to(blurDiv1.current, {
    x: -150,
    y: 30,
    scale: 0.5,
    duration: 5,
    repeat: -1,
    yoyo: true,
    ease: "power1.inOut",
  });

  gsap.to(blurDiv2.current, {
    x: -150,
    y: 30,
    scale: 0.5,
    duration: 3,
    repeat: -1,
    yoyo: true,
    ease: "power1.inOut",
  });

  gsap.fromTo(gradientText.current, { y: "50%", opacity: 0 }, {
    y: "0%",
    opacity: 1,
    ease: "linear",
    scrollTrigger: {
      trigger: gradientText.current,
      start: "top 90%",
      end: "top 50%",
      scrub: true,
    }
  });

  const sections = ["rightBox1", "rightBox2", "leftBox1", "leftBox2"];
  sections.forEach((cls) => {
    gsap.fromTo(`.${cls}`, { opacity: 0, scale: 0.6 }, {
      opacity: 1,
      scale: 1,
      ease: "power2.inOut",
      duration: 1,
      scrollTrigger: {
        trigger: `.${cls}`,
        start: "top bottom",
        end: "bottom 50%",
      }
    });

    gsap.fromTo(`.${cls}`, { opacity: 1, scale: 1 }, {
      opacity: 0,
      scale: 0.8,
      ease: "power2.inOut",
      duration: 1,
      scrollTrigger: {
        trigger: `.${cls}`,
        start: "top top",
        end: "bottom top",
        scrub: true,
      }
    });
  });

  gsap.fromTo(".quick", { opacity: 0, scale: 0.8 }, {
    opacity: 1,
    scale: 1,
    ease: "power2.inOut",
    duration: 1,
    scrollTrigger: {
      trigger: ".quick",
      start: "top 90%",
      end: "bottom 70%",
    }
  });

  gsap.fromTo(".quick2", { opacity: 0, scale: 0.8 }, {
    opacity: 1,
    scale: 1,
    ease: "power2.inOut",
    duration: 0.9,
    scrollTrigger: {
      trigger: ".quick2",
      start: "top 90%",
      end: "bottom 70%",
    }
  });

  const cursorBlink = setInterval(() => {
    setShowCursor((prev) => !prev);
  }, 400);

  return () => clearInterval(cursorBlink);
};
