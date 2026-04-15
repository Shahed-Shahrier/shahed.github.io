document.addEventListener("DOMContentLoaded", () => {
  const yearNodes = document.querySelectorAll("[data-year]");
  const year = new Date().getFullYear();

  yearNodes.forEach((node) => {
    node.textContent = String(year);
  });
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("service-worker.js").catch(() => {
      // Silent fallback for unsupported or blocked registrations.
    });
  });
}