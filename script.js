document.addEventListener("DOMContentLoaded", () => {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const toggle = document.querySelector("[data-nav-toggle]");
  const links = document.querySelector("[data-nav-links]");
  if (toggle && links) {
    toggle.addEventListener("click", () => {
      const open = links.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    links.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        links.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
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
        "mailto:xrpbusinessx@gmail.com?subject=Project%20enquiry&body=" + body;
    });
  });

  if (reduce) return;

  const reveals = document.querySelectorAll(".reveal");
  reveals.forEach((el, index) => {
    el.style.animationDelay = Math.min(index * 0.08, 0.4) + "s";
  });

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
  if (heroArt) {
    const onScroll = () => {
      const y = Math.min(window.scrollY, 480);
      heroArt.style.transform = "translateY(" + y * 0.06 + "px)";
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }
});
