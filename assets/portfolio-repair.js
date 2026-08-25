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

  const refresh = () => requestAnimationFrame(activateTerritories);
  refresh();
  window.addEventListener("hashchange", refresh);

  new MutationObserver(refresh).observe(document.documentElement, {
    childList: true,
    subtree: true,
  });
})();
