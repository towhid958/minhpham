//Mouse

const cursor = document.querySelector(".second-layer");

// Mouse move
document.addEventListener("mousemove", (e) => {
  const absoluteY = e.clientY + window.scrollY;

  gsap.to(cursor, {
    "--x": e.clientX + "px",
    "--y": absoluteY + "px",
    duration: 0.8,
    ease: "circ.out",
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

// Handle scrolling (keep cursor stable during scroll)
// document.addEventListener("scroll", () => {
//   const rect = cursor.getBoundingClientRect();
//   const currentAbsoluteY = rect.top + window.scrollY;

//   console.log(currentAbsoluteY);

//   gsap.set(cursor, {
//     "--y": currentAbsoluteY + "px"
//   });
// });

document.addEventListener("scroll", () => {
  const rect = cursor.getBoundingClientRect();
  const smoothY = smoother.scrollTop(); // instead of window.scrollY

  const currentAbsoluteY = Math.abs(rect.top) + smoothY;

  console.log(rect.top, smoothY, currentAbsoluteY);

  gsap.set(cursor, {
    "--y": currentAbsoluteY + "px"
  });
});



// Bigger element hover effect
const biggerItems = document.querySelectorAll(".bigger");

biggerItems.forEach((el) => {
  el.addEventListener("mouseenter", () => {
    gsap.to(cursor, {
      "--size": "250px",
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

