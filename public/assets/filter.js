document.addEventListener("DOMContentLoaded", () => {
  const input = document.querySelector("[data-filter-input]");
  const sortSelect = document.querySelector("[data-filter-sort]");
  const countDisplay = document.querySelector("[data-filter-count]");
  const itemsContainer = document.querySelector("[data-filter-list]");
  
  if (!itemsContainer) return;
  
  const originalItems = Array.from(itemsContainer.children);

  function update() {
    const query = input ? input.value.toLowerCase() : "";
    const sortVal = sortSelect ? sortSelect.value : "a-z";

    let filtered = originalItems.filter(item => {
      const title = (item.getAttribute("data-tool-title") || "").toLowerCase();
      const intent = (item.getAttribute("data-tool-intent") || "").toLowerCase();
      const keywords = (item.getAttribute("data-tool-keywords") || "").toLowerCase();
      return title.includes(query) || intent.includes(query) || keywords.includes(query);
    });

    // Sort
    filtered.sort((a, b) => {
      const titleA = (a.getAttribute("data-tool-title") || "").toLowerCase();
      const titleB = (b.getAttribute("data-tool-title") || "").toLowerCase();
      if (sortVal === "a-z") return titleA.localeCompare(titleB);
      if (sortVal === "z-a") return titleB.localeCompare(titleA);
      return 0;
    });

    // DOM Update
    itemsContainer.innerHTML = "";
    filtered.forEach(item => {
      item.style.display = "";
      itemsContainer.appendChild(item);
    });

    // Update count
    if (countDisplay) {
      countDisplay.textContent = `Showing ${filtered.length} tool${filtered.length === 1 ? "" : "s"}`;
    }
  }

  if (input) input.addEventListener("input", update);
  if (sortSelect) sortSelect.addEventListener("change", update);

  // Initial update to set count
  update();
});
