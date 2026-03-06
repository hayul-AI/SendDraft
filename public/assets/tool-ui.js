(function () {
  function esc(s) { return String(s ?? ""); }

  function renderField(f) {
    const id = "f_" + f.key;
    const isRequired = f.required || (window.TOOL_CONFIG && window.TOOL_CONFIG.requiredFields && window.TOOL_CONFIG.requiredFields.includes(f.key));
    const requiredMark = isRequired ? ' <span class="sd-required-dot" aria-hidden="true"></span>' : '';

    let base =
      '<div class="field">' +
      '<label for="' + id + '">' + esc(f.label) + requiredMark + '</label>';

    // Strict amount rendering - only if explicitly typed as 'amount'
    if (f.type === "amount") {
      const currencies = ["USD", "EUR", "GBP", "CAD", "AUD", "NZD", "JPY", "KRW", "CNY", "HKD", "SGD", "INR", "BRL", "MXN", "CHF", "SEK", "NOK", "DKK", "PLN", "CZK", "HUF", "TRY", "ZAR", "AED", "SAR", "THB", "IDR", "PHP", "VND"];
      const opts = currencies.map(c => `<option value="${c}">${c}</option>`).join("");

      return base +
        '<div class="sd-amount-group">' +
        '<select class="sd-currency-select" data-sd-currency="' + esc(f.key) + '">' + opts + '</select>' +
        '<input id="' + id + '" data-sd-field="' + esc(f.key) + '" type="number" step="any" class="sd-amount-input" placeholder="' + esc(f.placeholder || "0.00") + '" ' + (isRequired ? 'required' : '') + '>' +
        '</div>' +
        '</div>';
    }

    if (f.type === "textarea") {
      return base +
        '<textarea id="' + id + '" data-sd-field="' + esc(f.key) + '" placeholder="' + esc(f.placeholder || "") + '" ' + (isRequired ? 'required' : '') + '></textarea>' +
        '</div>';
    }
    if (f.type === "select") {
      const opts = (f.options || []).map(o => '<option value="' + esc(o.value) + '">' + esc(o.label) + '</option>').join("");
      return base +
        '<select id="' + id + '" data-sd-field="' + esc(f.key) + '" ' + (isRequired ? 'required' : '') + '>' + opts + '</select>' +
        '</div>';
    }

    // Date/Time picker support detection
    let cls = '';
    const keyLower = f.key.toLowerCase();
    const phLower = (f.placeholder || "").toLowerCase();

    // Standardize to sd-date or sd-time
    if (f.type === "date" || keyLower.includes("date") || phLower.includes("date") || phLower.includes("yyyy-mm-dd")) {
      cls = 'class="sd-date"';
    } else if (f.type === "time" || keyLower.includes("time") || phLower.includes("hh:mm") || phLower.includes("time") || keyLower === 'time' || f.label.toLowerCase().includes("time")) {
      cls = 'class="sd-time"';
    }

    return base +
      '<input id="' + id + '" data-sd-field="' + esc(f.key) + '" type="text" ' + cls + ' placeholder="' + esc(f.placeholder || "") + '" ' + (isRequired ? 'required' : '') + '/>' +
      '</div>';
  }

  function initSdDatePickers() {
    const els = document.querySelectorAll(".sd-date:not([data-sd-picker])");
    if (!els.length) return;
    flatpickr(els, {
      dateFormat: "F j, Y",
      allowInput: true,
      disableMobile: true,
      onOpen: (s, d, i) => i.element.setAttribute("data-sd-picker", "1")
    });
  }

  function initSdTimePickers() {
    const els = document.querySelectorAll(".sd-time:not([data-sd-picker])");
    if (!els.length) return;
    flatpickr(els, {
      enableTime: true,
      noCalendar: true,
      dateFormat: "H:i",
      time_24hr: true,
      minuteIncrement: 1,
      allowInput: false,
      disableMobile: true,
      onOpen: (s, d, i) => i.element.setAttribute("data-sd-picker", "1")
    });
  }

  function initPickers() {
    if (typeof flatpickr === "undefined") {
      // Inject Flatpickr CSS
      if (!document.getElementById("flatpickr-css")) {
        const link = document.createElement("link");
        link.id = "flatpickr-css";
        link.rel = "stylesheet";
        link.href = "https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css";
        document.head.appendChild(link);
      }
      // Inject Flatpickr JS
      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/npm/flatpickr";
      script.onload = () => {
        initSdDatePickers();
        initSdTimePickers();
      };
      document.head.appendChild(script);
    } else {
      initSdDatePickers();
      initSdTimePickers();
    }
  }

  function initToolForm() {
    if (!window.TOOL_CONFIG) {
      console.warn("SendDraft: TOOL_CONFIG not found, retrying in 50ms...");
      setTimeout(initToolForm, 50);
      return;
    }

    const mount = document.querySelector("[data-sd-form-mount]");
    if (mount) {
      if (mount.getAttribute("data-sd-loaded")) return;

      let presetKey = window.TOOL_CONFIG.formPreset;
      if (!presetKey && window.SENDDRAFT_TOOLS) {
        const found = window.SENDDRAFT_TOOLS.find(t => t.slug === window.TOOL_CONFIG.slug);
        if (found) presetKey = found.formPreset;
      }

      presetKey = presetKey || "work_request";
      const preset = (window.SENDDRAFT_FORM_PRESETS && window.SENDDRAFT_FORM_PRESETS[presetKey]) || [];
      mount.innerHTML = preset.map(renderField).join("");
      mount.setAttribute("data-sd-loaded", "true");
      console.log("SendDraft: Form loaded for " + window.TOOL_CONFIG.slug + " with preset " + presetKey);
    }

    const hint = document.querySelector("[data-sd-form-hint]");
    if (hint) {
      hint.textContent = window.TOOL_CONFIG.formHint || "Fill a few details. Keep it short and factual for best results.";
    }

    initPickers();
  }

  window.sd_initPickers = initPickers;

  if (document.readyState === "complete" || document.readyState === "interactive") {
    initToolForm();
  } else {
    document.addEventListener("DOMContentLoaded", initToolForm);
  }
})();
