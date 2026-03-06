(function () {
  function esc(s) { return String(s ?? ""); }

  function renderField(f) {
    const id = "f_" + f.key;
    const isRequired = f.required || (window.TOOL_CONFIG && window.TOOL_CONFIG.requiredFields && window.TOOL_CONFIG.requiredFields.includes(f.key));
    const requiredMark = isRequired ? ' <span class="required-dot"></span>' : '';

    let base =
      '<div class="field">' +
      '<label for="' + id + '">' + esc(f.label) + requiredMark + '</label>';

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

    if (f.type === "time") {
      const times = ["09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00"];
      const btns = times.map(t => `<button type="button" class="timing-btn" data-sd-time-val="${t}">${t}</button>`).join("");
      return base +
        '<input type="hidden" id="' + id + '" data-sd-field="' + esc(f.key) + '" ' + (isRequired ? 'required' : '') + '>' +
        '<div class="timing-row" data-sd-time-group="' + esc(f.key) + '">' + btns + '</div>' +
        '</div>';
    }
    
    if (f.type === "select") {
      const opts = (f.options || []).map(o => '<option value="' + esc(o.value) + '">' + esc(o.label) + '</option>').join("");
      const emptyOpt = isRequired ? '<option value="" disabled selected>Select an option</option>' : '<option value="">(Optional)</option>';
      return base +
        '<select id="' + id + '" data-sd-field="' + esc(f.key) + '" ' + (isRequired ? 'required' : '') + '>' + emptyOpt + opts + '</select>' +
        '</div>';
    }

    let cls = '';
    const keyLower = f.key.toLowerCase();
    const phLower = (f.placeholder || "").toLowerCase();

    if (f.type === "date" || keyLower.includes("date") || phLower.includes("date") || phLower.includes("yyyy-mm-dd")) {
      return base +
        '<input id="' + id + '" data-sd-field="' + esc(f.key) + '" type="date" class="sd-date" ' + (isRequired ? 'required' : '') + '/>' +
        '</div>';
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
      onOpen: (s, d, i) => i.element.setAttribute("data-sd-picker", "1"),
      onChange: (selectedDates, dateStr, instance) => {
        instance.element.dispatchEvent(new Event('input', { bubbles: true }));
      }
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
      onOpen: (s, d, i) => i.element.setAttribute("data-sd-picker", "1"),
      onChange: (selectedDates, dateStr, instance) => {
        instance.element.dispatchEvent(new Event('input', { bubbles: true }));
      }
    });
  }

  function initPickers() {
    if (typeof flatpickr === "undefined") {
      if (!document.getElementById("flatpickr-css")) {
        const link = document.createElement("link");
        link.id = "flatpickr-css";
        link.rel = "stylesheet";
        link.href = "https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css";
        document.head.appendChild(link);
      }
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
      
      const reqFields = preset.filter(f => f.required);
      const optFields = preset.filter(f => !f.required);

      let html = '';
      if (reqFields.length) {
        html += reqFields.map(renderField).join("");
      }
      if (optFields.length) {
        html += '<div style="margin-top:24px; padding-top:16px; border-top:1px dashed var(--border);">';
        html += '<div class="section-title" style="font-size:14px; color:var(--sub); margin-bottom:16px;">Optional Details</div>';
        html += optFields.map(renderField).join("");
        html += '</div>';
      }

      mount.innerHTML = html;
      mount.setAttribute("data-sd-loaded", "true");

      // delegated listener for time buttons
      mount.addEventListener("click", e => {
        const btn = e.target.closest(".timing-btn");
        if (btn) {
          const group = btn.closest(".timing-row");
          const key = group.dataset.timeGroup;
          const val = btn.dataset.timeVal;
          const hiddenInput = document.querySelector(`#f_${key}`);
          
          if (hiddenInput) {
            hiddenInput.value = val;
            group.querySelectorAll(".timing-btn").forEach(b => b.setAttribute("aria-pressed", "false"));
            btn.setAttribute("aria-pressed", "true");
            hiddenInput.dispatchEvent(new Event('input', { bubbles: true }));
          }
        }
      });
    }

    const hint = document.querySelector("[data-sd-form-hint]");
    if (hint) {
      hint.textContent = window.TOOL_CONFIG.formHint || "Choose options to build your message. Quick and professional.";
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
