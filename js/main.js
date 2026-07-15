/* ============================================
   WolfeTech Devs - main.js  (v2)
   All interactive behaviour lives here
   ============================================ */

/* ── 1. ACTIVE NAV LINK ON SCROLL ─────────────
   Watches which section is on screen and
   highlights the matching nav link           */

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav ul a");

const observerOptions = {
  root: null,
  rootMargin: "-40% 0px -40% 0px",
  threshold: 0,
};

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      navLinks.forEach((link) => link.classList.remove("active"));
      const active = document.querySelector(
        `nav ul a[href="#${entry.target.id}"]`,
      );
      if (active) active.classList.add("active");
    }
  });
}, observerOptions);

sections.forEach((section) => sectionObserver.observe(section));

/* ── 2. FADE-IN ON SCROLL ─────────────────────
   Elements with class .fade-in animate in
   as they enter the viewport                */

const fadeEls = document.querySelectorAll(".fade-in");

const fadeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        fadeObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 },
);

fadeEls.forEach((el) => fadeObserver.observe(el));

/* ── 3. NAVBAR SCROLL SHADOW ──────────────────
   Adds a stronger shadow to nav once
   user scrolls past 80px                    */

const nav = document.querySelector("nav");

window.addEventListener("scroll", () => {
  if (window.scrollY > 80) {
    nav.style.boxShadow = "0 4px 30px rgba(0,212,255,0.08)";
  } else {
    nav.style.boxShadow = "none";
  }
});

/* ── 4. SMOOTH SCROLL FOR NAV LINKS ───────────
   Extra fallback in case CSS scroll-behavior
   isn't supported by the browser.
   Only intercepts PURE same-page hash links (e.g. "#about").
   Cross-page links like "index.html#about" (used on projects.html)
   are left alone so the browser navigates normally — previously
   these were being preventDefault()'d and going nowhere. */

navLinks.forEach((link) => {
  const href = link.getAttribute("href");
  if (!href || !href.startsWith("#"))
    return; /* not a same-page hash — let it navigate normally */

  link.addEventListener("click", (e) => {
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

/* ── 5. ABOUT PHOTO CAROUSEL ──────────────────
   Cross-fades between two photos every 5s.
   Dot indicators are clickable for manual nav.
   New suit photo shows first, rosa photo second. */

/* Generalized so it runs on EVERY .carousel on the page — the About
   photo slider, the AHICP dashboard slider on the home page, and any
   project card carousels on projects.html — each with its own
   independent timer and dot state. */
(function initAllCarousels() {
  const carousels = document.querySelectorAll(".carousel");

  carousels.forEach((carousel) => {
    const slides = carousel.querySelectorAll(".carousel-slide");
    const dots = carousel.querySelectorAll(".dot");
    if (slides.length === 0) return;

    let current = 0;
    let timer = null;

    function goTo(index) {
      slides[current].classList.remove("active");
      if (dots[current]) dots[current].classList.remove("active");
      current = index;
      slides[current].classList.add("active");
      if (dots[current]) dots[current].classList.add("active");
    }

    function advance() {
      goTo((current + 1) % slides.length);
    }

    function startTimer() {
      clearInterval(timer);
      timer = setInterval(advance, 5000);
    }

    dots.forEach((dot, i) => {
      dot.addEventListener("click", () => {
        goTo(i);
        startTimer();
      });
    });

    startTimer();
  });
})();

/* ── 6. SHOWCASE LIGHTBOX ─────────────────────
   Clicking any .showcase-item opens a full-screen
   lightbox with the image or video.
   Prev / Next buttons cycle through all items.
   Closes on ✕ button, backdrop click, or Escape. */

(function initLightbox() {
  const showcaseItems = document.querySelectorAll(".showcase-item");
  const lightbox = document.getElementById("lightbox");
  const lbContent = document.getElementById("lb-content");
  const lbClose = document.getElementById("lb-close");
  const lbPrev = document.getElementById("lb-prev");
  const lbNext = document.getElementById("lb-next");
  const lbCounter = document.getElementById("lb-counter");

  if (!lightbox || showcaseItems.length === 0) return;

  /* Build media list from the DOM so it stays in sync with HTML */
  const mediaData = [];

  showcaseItems.forEach((item) => {
    const type = item.dataset.type; /* "image" or "video" */
    const img = item.querySelector("img");
    const video = item.querySelector("video source");

    if (type === "image" && img) {
      mediaData.push({ type: "image", src: img.src, alt: img.alt });
    } else if (type === "video" && video) {
      mediaData.push({ type: "video", src: video.src });
    }
  });

  let lbIndex = 0;

  /* Render the current media item inside the lightbox */
  function renderMedia() {
    const item = mediaData[lbIndex];
    lbCounter.textContent = `${lbIndex + 1} / ${mediaData.length}`;

    if (item.type === "image") {
      lbContent.innerHTML = `<img src="${item.src}" alt="${item.alt || ""}">`;
    } else {
      /* Video: autoplay in lightbox, controls visible */
      lbContent.innerHTML = `
        <video controls autoplay playsinline>
          <source src="${item.src}" type="video/mp4">
        </video>`;
    }
  }

  /* Open lightbox at a given index */
  function openLightbox(index) {
    lbIndex = index;
    renderMedia();
    lightbox.classList.add("open");
    document.body.style.overflow =
      "hidden"; /* prevent page scroll behind modal */
  }

  /* Close lightbox and release scroll lock */
  function closeLightbox() {
    lightbox.classList.remove("open");
    document.body.style.overflow = "";
    lbContent.innerHTML = ""; /* stop any playing video */
  }

  /* Wire up showcase item clicks */
  showcaseItems.forEach((item, i) => {
    item.addEventListener("click", () => openLightbox(i));
  });

  /* Close button */
  lbClose.addEventListener("click", closeLightbox);

  /* Previous */
  lbPrev.addEventListener("click", () => {
    lbIndex = (lbIndex - 1 + mediaData.length) % mediaData.length;
    renderMedia();
  });

  /* Next */
  lbNext.addEventListener("click", () => {
    lbIndex = (lbIndex + 1) % mediaData.length;
    renderMedia();
  });

  /* Click on the dark backdrop (not on media) closes lightbox */
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  /* Keyboard: Escape closes, arrow keys navigate */
  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("open")) return;
    if (e.key === "Escape") {
      closeLightbox();
    } else if (e.key === "ArrowLeft") {
      lbIndex = (lbIndex - 1 + mediaData.length) % mediaData.length;
      renderMedia();
    } else if (e.key === "ArrowRight") {
      lbIndex = (lbIndex + 1) % mediaData.length;
      renderMedia();
    }
  });
})();

/* ── 7. PROJECTS PAGE — CATEGORY FILTER ───────────────────────
   Only runs if .category-pill elements exist (projects.html).
   Each project card carries data-category (space-separated if it
   belongs to more than one). Clicking a pill shows only matching
   cards; "All" shows everything. */

(function initCategoryFilter() {
  const pills = document.querySelectorAll(".category-pill");
  const cards = document.querySelectorAll("[data-category]");
  if (pills.length === 0) return;

  function applyFilter(category) {
    cards.forEach((card) => {
      const cats = card.dataset.category.split(" ");
      const match = category === "all" || cats.includes(category);
      card.classList.toggle("show", match);
    });
  }

  pills.forEach((pill) => {
    pill.addEventListener("click", () => {
      pills.forEach((p) => p.classList.remove("active"));
      pill.classList.add("active");
      applyFilter(pill.dataset.category);
    });
  });

  /* Default: show everything */
  applyFilter("all");
})();
