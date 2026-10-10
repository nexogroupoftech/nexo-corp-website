document.documentElement.classList.add("js");

document.addEventListener("DOMContentLoaded", () => {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const brand = document.querySelector("[data-brand]");
  if (brand) {
    let lastY = window.scrollY;
    let ticking = false;
    let compact = false;
    const setCompact = (value) => {
      if (value === compact) return;
      compact = value;
      brand.classList.toggle("is-compact", value);
    };
    const updateBrand = () => {
      ticking = false;
      const y = Math.max(0, window.scrollY);
      const dy = y - lastY;
      if (y <= 24) setCompact(false);
      else if (dy > 8 && y > 80) setCompact(true);
      else if (dy < -8) setCompact(false);
      if (Math.abs(dy) > 8 || y <= 24) lastY = y;
    };
    const onBrandScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(updateBrand);
    };
    window.addEventListener("scroll", onBrandScroll, { passive: true });
    window.addEventListener("pagehide", () => window.removeEventListener("scroll", onBrandScroll));
    updateBrand();
  }

  const toggle = document.querySelector("[data-nav-toggle]");
  const links = document.querySelector("[data-nav-links]");
  if (toggle && links) {
    const label = toggle.querySelector(".nav-toggle-text");
    const setOpen = (open) => {
      links.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      if (label) label.textContent = open ? "Close" : "Menu";
      document.body.classList.toggle("nav-open", open);
    };
    toggle.addEventListener("click", () => {
      const open = !links.classList.contains("is-open");
      setOpen(open);
      if (open) {
        const first = links.querySelector("a");
        if (first) first.focus();
      }
    });
    links.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => setOpen(false));
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && links.classList.contains("is-open")) {
        setOpen(false);
        toggle.focus();
      }
    });
    window.addEventListener("resize", () => {
      if (window.innerWidth > 760) setOpen(false);
    });
  }

  document.querySelectorAll("[data-contact]").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = new FormData(form);
      const name = String(data.get("name") || "").trim();
      const email = String(data.get("email") || "").trim();
      const message = String(data.get("message") || "").trim();
      const body = encodeURIComponent(
        (message || "") +
          (name ? "\n\n— " + name : "") +
          (email ? " (" + email + ")" : "")
      );
      window.location.href =
        "mailto:xrpbusinessx@gmail.com?subject=" +
        encodeURIComponent("XOPICX enquiry") +
        "&body=" +
        body;
    });
  });

  const reveals = document.querySelectorAll(".reveal");
  if (reduce || !("IntersectionObserver" in window)) {
    reveals.forEach((el) => el.classList.add("is-in"));
  } else {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -8% 0px" }
    );
    reveals.forEach((el) => observer.observe(el));
  }

  if (reduce) return;

  const drawings = document.querySelectorAll(".draw");
  if (drawings.length && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-drawn");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.35 }
    );
    drawings.forEach((path) => observer.observe(path));
  } else {
    drawings.forEach((path) => path.classList.add("is-drawn"));
  }

  const heroArt = document.querySelector("[data-parallax]");
  if (heroArt && window.innerWidth > 760) {
    const onScroll = () => {
      const y = Math.min(window.scrollY, 420);
      heroArt.style.transform = "translateY(" + y * 0.045 + "px)";
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }
});
