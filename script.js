document.addEventListener("DOMContentLoaded", () => {
  const fades = document.querySelectorAll(".fade");
  fades.forEach((el, i) => {
    el.style.animationDelay = `${i * 0.2}s`;
  });
});
