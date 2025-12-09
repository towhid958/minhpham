//Mouse

const cursor = document.querySelector(".second-layer");

// Mouse move
document.addEventListener("mousemove", (e) => {
  const absoluteY = e.clientY + window.scrollY;

  gsap.to(cursor, {
    "--x": e.clientX + "px",
    "--y": absoluteY + "px",
    duration: 0.2,
    ease: "power3.out"
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
      "--size": "px",
      duration: 0.4,
      ease: "power3.out"
    });
  });
});



//Double Layer


// layer1.addEventListener("mouseenter", (e) => {
//   e.stopPropagation();
//   gsap.to(circle, {
//     scale: 5,
//   })
// });

// layer1.addEventListener("mouseleave", (e) => {
//   e.stopPropagation();
//   gsap.to(circle, {
//     scale: 1,
//   })
// });

//Smooth Scroll

function init() {
  new SmoothScroll(document, 120, 12); // (target,speed,smooth)
}

function SmoothScroll(target, speed, smooth) {
  if (target === document)
    target =
      document.scrollingElement ||
      document.documentElement ||
      document.body.parentNode ||
      document.body; // cross browser support for document scrolling

  var moving = false;
  var pos = target.scrollTop;
  var frame =
    target === document.body && document.documentElement
      ? document.documentElement
      : target; // safari is the new IE

  target.addEventListener("mousewheel", scrolled, { passive: false });
  target.addEventListener("DOMMouseScroll", scrolled, { passive: false });

  function scrolled(e) {
    e.preventDefault(); // disable default scrolling

    var delta = normalizeWheelDelta(e);

    pos += -delta * speed;
    pos = Math.max(0, Math.min(pos, target.scrollHeight - frame.clientHeight)); // limit scrolling

    if (!moving) update();
  }

  function normalizeWheelDelta(e) {
    if (e.detail) {
      if (e.wheelDelta)
        return (e.wheelDelta / e.detail / 40) * (e.detail > 0 ? 1 : -1);
      // Opera
      else return -e.detail / 3; // Firefox
    } else return e.wheelDelta / 120; // IE,Safari,Chrome
  }

  function update() {
    moving = true;

    var delta = (pos - target.scrollTop) / smooth;

    target.scrollTop += delta;

    if (Math.abs(delta) > 0.5) requestFrame(update);
    else moving = false;
  }

  var requestFrame = (function () {
    // requestAnimationFrame cross browser
    return (
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function (func) {
        window.setTimeout(func, 1000 / 50);
      }
    );
  })();
}

init();
