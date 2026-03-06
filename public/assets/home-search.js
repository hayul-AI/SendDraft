(function(){
  function ready(fn){
    if(document.readyState==="loading") document.addEventListener("DOMContentLoaded", fn);
    else fn();
  }

  ready(function(){
    const input = document.querySelector("[data-home-search]");
    const results = document.querySelector("[data-home-results]");
    if(!input || !results) return;

    // Use SENDDRAFT_TOOLS from tools-data.js
    const tools = window.SENDDRAFT_TOOLS || [];

    input.addEventListener("input", function(){
      const q = input.value.toLowerCase().trim();
      if(!q){
        results.innerHTML = "";
        results.style.display = "none";
        return;
      }

      const matches = tools.filter(t => {
        return t.title.toLowerCase().includes(q) || 
               t.intent.toLowerCase().includes(q) ||
               (t.category && t.category.toLowerCase().includes(q));
      }).slice(0, 8);

      if(matches.length > 0){
        results.innerHTML = matches.map(t => `
          <a href="/tools/${t.slug}/" class="search-result-item">
            <div class="search-result-item__title">${t.title}</div>
            <div class="search-result-item__meta">${t.category}</div>
          </a>
        `).join("");
        results.style.display = "block";
      } else {
        results.innerHTML = `<div class="search-result-none">No templates found for "${q}"</div>`;
        results.style.display = "block";
      }
    });

    // Close results when clicking outside
    document.addEventListener("click", function(e){
      if(!input.contains(e.target) && !results.contains(e.target)){
        results.style.display = "none";
      }
    });
  });
})();
