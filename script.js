/* ======================================================
   HUMZAH ASADULLAH — PORTFOLIO JS
   GSAP + ScrollTrigger + Lenis Smooth Scroll
   ====================================================== */

gsap.registerPlugin(ScrollTrigger);
const reduceMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

/* ---------------- LENIS SMOOTH SCROLL ---------------- */
let lenis;
if (!reduceMotion) {
  lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);
}

/* ---------------- PRELOADER ---------------- */
window.addEventListener("load", () => {
  const counterEl = document.getElementById("preloadCounter");
  const bar = document.getElementById("preloadBar");
  let count = { val: 0 };
  gsap.to(count, {
    val: 100,
    duration: 2.2,
    ease: "power2.inOut",
    onUpdate: () => {
      counterEl.textContent = Math.floor(count.val) + "%";
      bar.style.width = count.val + "%";
    },
    onComplete: () => {
      const tl = gsap.timeline();
      tl.to("#preloader", {
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
          document.getElementById("preloader").style.display = "none";
        },
      })
        .to("#curtain", { y: "0%", duration: 0.01 }, "<")
        .to("#curtain", { y: "-100%", duration: 0.8, ease: "power4.inOut" })
        .call(() => initHeroAnim());
    },
  });
});

/* ---------------- HERO TEXT REVEAL ---------------- */
function initHeroAnim() {
  gsap.to(".hero h1 .char", {
    y: "0%",
    duration: 1.1,
    stagger: 0.08,
    ease: "power4.out",
  });
  gsap.fromTo(
    ".hero-tag",
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.8, delay: 0.3 },
  );
  gsap.fromTo(
    ".hero-sub",
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.8, delay: 0.6 },
  );
  gsap.fromTo(
    ".hero-actions",
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.8, delay: 0.8 },
  );
  gsap.fromTo(
    ".hero-role",
    { opacity: 0 },
    { opacity: 1, duration: 0.8, delay: 1 },
  );
}

/* ---------------- ROTATING ROLE TEXT ---------------- */
const roles = [
  "Full-Stack Developer",
  "Digital Marketer",
  "Graphic Designer",
  "Shopify Expert",
];
let roleIdx = 0;
const roleEl = document.getElementById("roleText");
setInterval(() => {
  gsap.to(roleEl, {
    y: -20,
    opacity: 0,
    duration: 0.4,
    onComplete: () => {
      roleIdx = (roleIdx + 1) % roles.length;
      roleEl.textContent = roles[roleIdx];
      gsap.fromTo(
        roleEl,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4 },
      );
    },
  });
}, 2600);

/* ---------------- CUSTOM CURSOR ---------------- */
const cursorDot = document.getElementById("cursorDot");
const cursorRing = document.getElementById("cursorRing");
let mouseX = 0,
  mouseY = 0,
  ringX = 0,
  ringY = 0;
window.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursorDot.style.left = mouseX + "px";
  cursorDot.style.top = mouseY + "px";
});
gsap.ticker.add(() => {
  ringX += (mouseX - ringX) * 0.15;
  ringY += (mouseY - ringY) * 0.15;
  cursorRing.style.left = ringX + "px";
  cursorRing.style.top = ringY + "px";
});
document
  .querySelectorAll("a, button, .tilt-card, .service-card")
  .forEach((el) => {
    el.addEventListener("mouseenter", () => cursorRing.classList.add("hover"));
    el.addEventListener("mouseleave", () =>
      cursorRing.classList.remove("hover"),
    );
  });
document.querySelectorAll(".tilt-card").forEach((el) => {
  el.addEventListener(
    "mouseenter",
    () => (cursorRing.querySelector("span").textContent = "VIEW"),
  );
});

/* Magnetic buttons */
document.querySelectorAll(".magnetic").forEach((el) => {
  el.addEventListener("mousemove", (e) => {
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;
    gsap.to(el, { x: x * 0.3, y: y * 0.3, duration: 0.4 });
  });
  el.addEventListener("mouseleave", () =>
    gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1,0.4)" }),
  );
});

/* ---------------- SCROLL PROGRESS ---------------- */
const progressBar = document.getElementById("scrollProgress");
window.addEventListener("scroll", () => {
  const h = document.documentElement;
  const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
  progressBar.style.width = pct + "%";
});

/* ---------------- NAVBAR SHOW/HIDE + ACTIVE LINK ---------------- */
const navbar = document.getElementById("navbar");
let lastScroll = 0;
window.addEventListener("scroll", () => {
  const cur = window.scrollY;
  navbar.classList.toggle("scrolled", cur > 60);
  if (cur > lastScroll && cur > 200) {
    navbar.classList.add("hide-nav");
  } else {
    navbar.classList.remove("hide-nav");
  }
  lastScroll = cur;
});
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("section[id]");
window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((sec) => {
    const top = sec.offsetTop - 140;
    if (window.scrollY >= top) current = sec.getAttribute("id");
  });
  navLinks.forEach((a) => {
    a.classList.toggle("active", a.getAttribute("href") === "#" + current);
  });
});

/* ---------------- MOBILE MENU ---------------- */
const hamburger = document.getElementById("hamburger");
const mobileOverlay = document.getElementById("mobileOverlay");
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("open");
  mobileOverlay.classList.toggle("open");
});
document.querySelectorAll(".mnav").forEach((a) => {
  a.addEventListener("click", () => {
    hamburger.classList.remove("open");
    mobileOverlay.classList.remove("open");
  });
});

/* ---------------- TEXT SCRAMBLE ON NAV HOVER ---------------- */
const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
navLinks.forEach((link) => {
  const original = link.getAttribute("data-text") || link.textContent;
  link.addEventListener("mouseenter", () => {
    let iteration = 0;
    clearInterval(link.scrambleInterval);
    link.scrambleInterval = setInterval(() => {
      link.textContent = original
        .split("")
        .map((l, i) => {
          if (i < iteration) return original[i];
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join("");
      if (iteration >= original.length) clearInterval(link.scrambleInterval);
      iteration += 1 / 2;
    }, 30);
  });
});

/* ---------------- RIPPLE EFFECT ---------------- */
document.querySelectorAll(".btn").forEach((btn) => {
  btn.addEventListener("click", function (e) {
    const rect = this.getBoundingClientRect();
    const ripple = document.createElement("span");
    ripple.className = "ripple";
    ripple.style.left = e.clientX - rect.left + "px";
    ripple.style.top = e.clientY - rect.top + "px";
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
});

/* ---------------- SCROLL REVEALS (fade-up) ---------------- */
gsap.utils.toArray(".fade-up").forEach((el) => {
  gsap.to(el, {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: { trigger: el, start: "top 88%" },
  });
});

/* ---------------- MARQUEE ---------------- */
const marqueeTrack = document.getElementById("marqueeTrack");
let marqueeTween = gsap.to(marqueeTrack, {
  xPercent: -50,
  repeat: -1,
  duration: 18,
  ease: "linear",
});
let lastDir = 1;
window.addEventListener("wheel", (e) => {
  const dir = e.deltaY > 0 ? 1 : -1;
  if (dir !== lastDir) {
    marqueeTween.timeScale(dir > 0 ? 1 : -1);
    lastDir = dir;
  }
});

/* ---------------- SKILLS BARS + COUNTERS ---------------- */
document.querySelectorAll(".skill-item").forEach((item) => {
  const fill = item.querySelector(".skill-fill");
  const pct = item.getAttribute("data-pct");
  ScrollTrigger.create({
    trigger: item,
    start: "top 85%",
    onEnter: () => {
      fill.style.width = pct + "%";
    },
  });
});
document.querySelectorAll("[data-count]").forEach((el) => {
  const target = +el.getAttribute("data-count");
  ScrollTrigger.create({
    trigger: el,
    start: "top 90%",
    onEnter: () => {
      let obj = { val: 0 };
      gsap.to(obj, {
        val: target,
        duration: 1.8,
        ease: "power2.out",
        onUpdate: () => {
          el.textContent = Math.floor(obj.val);
        },
      });
    },
  });
});

/* ---------------- TILT EFFECT ON PROJECT CARDS ---------------- */
document.querySelectorAll(".tilt-card").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    gsap.to(card, {
      rotateX: -y * 4,
      rotateY: x * 4,
      transformPerspective: 900,
      duration: 0.4,
      ease: "power2.out",
    });
  });
  card.addEventListener("mouseleave", () =>
    gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.5 }),
  );
});

/* ---------------- PROJECT MODALS ---------------- */
const projectData = {
  p1: {
    title: "Serenova Treatments",
    desc: "Full details about Serenova Treatments project go here.",
    desc2: "Results and outcomes go here." /* EDIT HERE */,
  },
  p2: {
    title: "RealKeyper",
    desc: "Full details about RealKeyper project go here.",
    desc2: "Results and outcomes go here." /* EDIT HERE */,
  },
  p3: {
    title: "Hulii (Shopify)",
    desc: "Full details about Hulii Shopify project go here.",
    desc2: "Results and outcomes go here." /* EDIT HERE */,
  },
  p4: {
    title: "Phifinds (Shopify)",
    desc: "Full details about Phifinds Shopify project go here.",
    desc2: "Results and outcomes go here." /* EDIT HERE */,
  },
  p5: {
    title: "OWS Iraq (Shopify)",
    desc: "Full details about OWS Iraq Shopify project go here.",
    desc2: "Results and outcomes go here." /* EDIT HERE */,
  },
};
const modalOverlay = document.getElementById("modalOverlay");
document.querySelectorAll("[data-modal]").forEach((card) => {
  card.addEventListener("click", () => {
    const data = projectData[card.getAttribute("data-modal")];
    document.getElementById("modalTitle").textContent = data.title;
    document.getElementById("modalDesc").textContent = data.desc;
    document.getElementById("modalDesc2").textContent = data.desc2;
    modalOverlay.classList.add("active");
  });
});
document
  .getElementById("modalClose")
  .addEventListener("click", () => modalOverlay.classList.remove("active"));
modalOverlay.addEventListener("click", (e) => {
  if (e.target === modalOverlay) modalOverlay.classList.remove("active");
});

/* ---------------- TIMELINE SVG DRAW ---------------- */
const timelinePath = document.getElementById("timelinePath");
const pathLength = timelinePath.getTotalLength();
timelinePath.style.strokeDasharray = pathLength;
timelinePath.style.strokeDashoffset = pathLength;
timelinePath.classList.add("draw");
ScrollTrigger.create({
  trigger: ".timeline",
  start: "top 70%",
  end: "bottom 80%",
  scrub: 1,
  onUpdate: (self) => {
    timelinePath.style.strokeDashoffset =
      pathLength - pathLength * self.progress;
  },
});

/* ---------------- TESTIMONIALS CAROUSEL ---------------- */
const slides = document.querySelectorAll(".t-slide");
const dots = document.querySelectorAll("#tDots button");
let tIndex = 0;
function showSlide(i) {
  slides.forEach((s) => s.classList.remove("active"));
  dots.forEach((d) => d.classList.remove("active"));
  slides[i].classList.add("active");
  dots[i].classList.add("active");
}
dots.forEach((d, i) =>
  d.addEventListener("click", () => {
    tIndex = i;
    showSlide(tIndex);
  }),
);
setInterval(() => {
  tIndex = (tIndex + 1) % slides.length;
  showSlide(tIndex);
}, 5000);

/* ---------------- CONTACT FORM ---------------- */
const contactForm = document.getElementById("contactForm");
contactForm.addEventListener("submit", function (e) {
  // Using Formspree/EmailJS action - placeholder allows normal submission.
  // EDIT HERE: Add EmailJS logic if preferred.
  showToast("Message sent successfully!");
});

/* ---------------- COPY EMAIL TOAST ---------------- */
const emailCopy = document.getElementById("emailCopy");
emailCopy.addEventListener("click", function (e) {
  e.preventDefault();
  navigator.clipboard.writeText("humzahasad04@gmail.com"); /* EDIT HERE */
  showToast("Email copied to clipboard!");
});
function showToast(msg) {
  const toast = document.getElementById("toast");
  toast.textContent = msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2500);
}

/* ---------------- FOOTER TEXT FILL ON SCROLL ---------------- */
gsap.to("#footerBig", {
  backgroundSize: "100% 100%",
  scrollTrigger: {
    trigger: ".footer",
    start: "top 90%",
    end: "bottom bottom",
    scrub: 1,
  },
});

/* ---------------- HERO PARALLAX ---------------- */
window.addEventListener("mousemove", (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 30;
  const y = (e.clientY / window.innerHeight - 0.5) * 30;
  gsap.to(".orb1", { x: x, y: y, duration: 1 });
  gsap.to(".orb2", { x: -x, y: -y, duration: 1 });
});

/* Refresh ScrollTrigger after everything loads */
window.addEventListener("load", () => ScrollTrigger.refresh());
