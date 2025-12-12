//Mouse

const cursor = document.querySelector(".second-layer");

// Mouse move
document.addEventListener("mousemove", (e) => {
  const absoluteY = e.clientY + window.scrollY;

  gsap.to(cursor, {
    "--x": e.clientX + "px",
    "--y": absoluteY + "px",
    duration: 0.5,
    ease: "elastic.out(1,0.3)",
  });
});

// Handle scrolling (keep cursor stable during scroll)
document.addEventListener("scroll", () => {
  const rect = cursor.getBoundingClientRect();
  const currentAbsoluteY = rect.top + window.scrollY;

  gsap.set(cursor, {
    "--y": currentAbsoluteY + "px"
  });
});

// Bigger element hover effect
const biggerItems = document.querySelectorAll(".bigger");

biggerItems.forEach((el) => {
  el.addEventListener("mouseenter", () => {
    gsap.to(cursor, {
      "--size": "300px",
      duration: 0.4,
      ease: "power3.out"
    });
  });

  el.addEventListener("mouseleave", () => {
    gsap.to(cursor, {
      "--size": "35px",
      duration: 0.4,
      ease: "power3.out"
    });
  });
});

const noCursor = document.querySelectorAll(".no-cursor");

noCursor.forEach((el) => {
  el.addEventListener("mouseenter", () => {
    gsap.to(cursor, {
      "--size": "0px",
      duration: 0.4,
      ease: "power3.out"
    });
  });

  el.addEventListener("mouseleave", () => {
    gsap.to(cursor, {
      "--size": "35px",
      duration: 0.4,
      ease: "power3.out"
    });
  });
});

//Text Animation

gsap.registerPlugin(SplitText, ScrollTrigger);

const textElements = document.querySelectorAll(".text-change");

textElements.forEach((el) => {
  
  const split = new SplitText(el, {
    type: "chars",
    charsClass: "letter"
  });

  gsap.set(split.chars, { opacity: 0.2 });

  // Create ScrollTrigger animation for each element
  gsap.to(split.chars, {
    opacity: 1,
    stagger: 0.5,          
    ease: "power2.out",
    scrollTrigger: {
      trigger: el,
      start: "top 90%",     
      end: "bottom 75%",    
      scrub: true,          
    }
  });
});

//Smooth Scroll

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

// create the smooth scroller FIRST!
let smoother = ScrollSmoother.create({
  smooth: 2,
  effects: true,
  normalizeScroll: true,
  smoothTouch: 0.1
});
