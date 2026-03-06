(function(){
  function ready(fn){
    if(document.readyState==="loading") document.addEventListener("DOMContentLoaded", fn);
    else fn();
  }

  ready(function(){
    const input = document.querySelector("[data-home-search]");
    const chipWrap = document.querySelector("[data-home-search-chips]");
    if(!input || !chipWrap) return;

    chipWrap.addEventListener("click", function(e){
      const btn = e.target.closest("button[data-q]");
      if(!btn) return;
      const q = btn.getAttribute("data-q") || "";
      input.value = q;
      input.focus();
      // trigger the same search logic
      input.dispatchEvent(new Event("input", {bubbles:true}));
    });
  });
})();
