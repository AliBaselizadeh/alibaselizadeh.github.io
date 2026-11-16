/* Small progressive enhancement for the static GitHub Pages build. */
(() => {
  const activateTerritories = () => {
    document.querySelectorAll(".areas-list .area-row").forEach((card) => {
      if (card.dataset.territoryReady === "true") return;

      const title = card.querySelector("h3")?.textContent?.trim() || "Research territory";
      card.dataset.territoryReady = "true";
      card.setAttribute("role", "link");
      card.setAttribute("tabindex", "0");
      card.setAttribute("aria-label", `Explore ${title} research`);

      const openResearch = () => {
        window.location.hash = "/research";
      };

      card.addEventListener("click", openResearch);
      card.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openResearch();
        }
      });
    });
  };

  const addCvSupplement = () => {
    if (!window.location.hash.includes("/cv")) return;
    if (document.querySelector('[data-philosophy-cv-link="true"]')) return;
    const identity = document.querySelector(".cv-identity");
    const primary = identity?.querySelector('a[href*="cv.pdf"]');
    if (!identity || !primary) return;

    const link = document.createElement("a");
    link.href = "/media/cv-philosophy.pdf";
    link.target = "_blank";
    link.rel = "noreferrer";
    link.dataset.philosophyCvLink = "true";
    link.className = primary.className;
    link.style.marginTop = "8px";
    link.textContent = "Download philosophy CV supplement ↗";
    primary.insertAdjacentElement("afterend", link);
  };

  const refresh = () => requestAnimationFrame(() => {
    activateTerritories();
    addCvSupplement();
  });
  refresh();
  window.addEventListener("hashchange", refresh);

  new MutationObserver(refresh).observe(document.documentElement, {
    childList: true,
    subtree: true,
  });
})();
