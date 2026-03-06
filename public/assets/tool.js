/*
SendDraft shared tool logic (static).
- No AI, no backend.
- Each tool page embeds a TOOL_CONFIG object with:
  title, description, placeholders, and templates by tone.
- This file wires up form -> output generation + copy.
*/

function sd_escape(v) {
  return String(v ?? "").trim();
}

function sd_fillTemplate(tpl, data) {
  return tpl.replace(/\{\{(\w+)\}\}/g, (_, key) => sd_escape(data[key]));
}

function formatMoney(amount, currencyCode) {
  if (!amount || isNaN(amount)) return "";
  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currencyCode,
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }).format(amount);
  } catch (e) {
    return currencyCode + " " + amount;
  }
}

function sd_collect(form) {
  const data = {};

  // Standard fields
  form.querySelectorAll("[data-sd-field]").forEach(el => {
    const key = el.getAttribute("data-sd-field");
    let val = el.value;

    // Check if this is an amount input
    if (el.classList.contains("sd-amount-input")) {
      const curEl = form.querySelector(`[data-sd-currency="${key}"]`);
      if (curEl && val) {
        val = formatMoney(val, curEl.value);
      }
    }

    data[key] = val;
  });

  // Radio groups or other custom types if needed
  form.querySelectorAll("input[type='radio']:checked").forEach(el => {
    const name = el.getAttribute("name");
    if (name) data[name] = el.value;
  });

  return data;
}

function sd_setTone(buttons, tone) {
  buttons.forEach(btn => {
    const isOn = btn.dataset.tone === tone;
    btn.setAttribute("aria-pressed", isOn ? "true" : "false");
  });
}

function sd_init() {
  if (!window.TOOL_CONFIG) { return; }

  // Unify Title and H1
  if (window.TOOL_CONFIG.title) {
    document.title = window.TOOL_CONFIG.title + " | SendDraft";
    const h1 = document.querySelector("h1");
    if (h1) h1.textContent = window.TOOL_CONFIG.title;
  }

  const form = document.querySelector("[data-sd-form]");
  const outArea = document.querySelector("[data-sd-output-area]");
  const outPlaceholder = document.querySelector("[data-sd-output-placeholder]");
  const preview = document.querySelector("[data-sd-preview]");
  const textarea = document.querySelector("[data-sd-result-textarea]");
  const copyBtn = document.querySelector("[data-sd-copy]");
  const genBtn = document.querySelector("[data-sd-generate]");
  const clearBtn = document.querySelector("[data-sd-clear]");
  const toneBtns = Array.from(document.querySelectorAll("[data-sd-tone]"));

  let tone = window.TOOL_CONFIG.defaultTone || "gentle";
  sd_setTone(toneBtns, tone);

  toneBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      tone = btn.dataset.tone;
      sd_setTone(toneBtns, tone);
      if (outArea && outArea.style.display !== "none") {
        gen();
      }
    });
  });

  function hl(val) {
    if (!val) return "";
    return `<span class="hl">${val}</span>`;
  }

  function buildAliases(src) {
    const a = {};
    const d = src.date || "";
    const n = src.name || "";
    const r = src.recipient || "";
    const t = src.topic || "";
    const i = src.item || "";
    const ref = src.reference || "";
    const am = src.amount || "";
    const re = src.reason || "";

    // Base injections
    a.recipient = r || src.company || "";
    a.name = n;
    a.topic = t;
    a.item = i || ref || "";
    a.reference = ref;
    a.date = d;
    a.amount = am;
    a.reason = re;
    a.company = src.company || r || "";

    // Dates
    a.date_str = d ? ` on ${d}` : "";
    a.date_str_firm = d ? ` on ${d}` : "";
    a.date_str_neutral = d ? ` on ${d}` : "";
    a.orig_date_str = d ? ` on ${d}` : "";
    a.orig_date_plain = d ? ` on ${d}` : "";
    a.orig_date_str_firm = d ? ` on ${d}` : "";
    a.deadline_str = d ? ` by ${d}` : "";
    a.deadline_plain = d ? ` by ${d}` : "";
    a.deadline_str_firm = d ? ` by ${d}` : "";
    a.pay_date_str = d ? ` by ${d}` : "";
    a.pay_date = d;
    a.start_str = d ? d.split(/[~|-]|to|until/)[0].trim() : "";
    a.end_str = d && d.match(/[~|-]|to|until/) ? d.split(/[~|-]|to|until/)[1].trim() : "";
    a.time_str = d ? ` at ${d}` : "";
    a.window_str = d ? ` within ${d}` : "";
    a.window_str_firm = d ? ` within ${d}` : "";
    a.lent_date_str = d ? ` on ${d}` : "";
    a.req_date = d;
    a.new_date = d;

    // Reasons / Context
    a.reason_str = re ? ` ${re}` : "";
    a.follow_up_str = re ? ` ${re}` : "";
    a.follow_up_plain = re ? ` ${re}` : "";
    a.follow_up_str_firm = re ? ` ${re}` : "";
    a.issue_str = re ? ` ${re}` : "";
    a.details_str = re ? ` ${re}` : "";
    a.action_str = re ? ` ${re}` : "";
    a.action_str_firm = re ? ` ${re}` : "";
    a.context_str = re ? ` ${re}` : "";
    a.explanation_str = re ? ` ${re}` : "";
    a.impact_str = re ? ` ${re}` : "";
    a.update_str = re ? ` ${re}` : "";
    a.status_str = re ? ` ${re}` : "";
    a.apology_str = re ? ` ${re}` : "";
    a.cause_str = re ? ` ${re}` : "";
    a.correct_str = re ? ` ${re}` : "";
    a.note_str = re ? ` ${re}` : "";
    a.urgency_str = "";
    a.urgent_str = "";
    a.addition_str = re ? ` ${re}` : "";
    a.additional_str = re ? ` ${re}` : "";

    // References / Modifiers
    a.ref_str = ref ? ` (Ref: ${ref})` : "";
    a.ref_str_firm = ref ? ` (Ref: ${ref})` : "";
    a.ref_str_neutral = ref ? ` (Ref: ${ref})` : "";
    a.method_ref_str = ref ? ` ending in ${ref}` : "";
    a.group_str = ref ? ` Group: ${ref}` : "";
    a.party_str = ref ? ` ${ref}` : "";
    a.docs_str = ref ? ` ${ref}` : "";
    a.device_str = ref ? ` on ${ref}` : "";
    a.location_str = ref ? ` at ${ref}` : "";
    a.area_str = ref ? ` regarding ${ref}` : "";
    a.area_str_firm = ref ? ` regarding ${ref}` : "";
    a.method_str = ref ? ` via ${ref}` : "";
    a.method_str_firm = ref ? ` via ${ref}` : "";
    a.method_str_neutral = ref ? ` via ${ref}` : "";
    a.method_type_str = ref ? ` ${ref}` : "";
    a.type_str = ref ? ` ${ref}` : "";
    a.store_str = ref ? ` at ${ref}` : "";
    a.project = ref || t || i;
    a.service = i || ref;
    a.merchant = r;
    a.holder = n;

    // Amounts
    a.amount_str = am ? ` for ${am}` : "";
    a.total_str = am ? ` totaling ${am}` : "";
    a.expense = am;
    a.total = am;
    a.p_price = am;

    // Other Defaults
    a.contact_str = "\\n\\nFeel free to reach out if you have any questions.";
    a.res_str = window.TOOL_CONFIG.category === "customer" ? "a refund" : "your request";
    a.recognition_str = "";

    return a;
  }

  function gen() {
    if (!form) return;

    // 0. Inline Validation without popups
    let isValid = true;
    form.querySelectorAll("[required]").forEach(el => {
      if (!el.value.trim()) {
        isValid = false;
        el.style.borderColor = "#dc2626";
        el.style.boxShadow = "0 0 0 3px rgba(220, 38, 38, 0.15)";
      } else {
        el.style.borderColor = "";
        el.style.boxShadow = "";
      }
    });

    if (!isValid) return;

    // 1. Collect raw data from fields
    const rawData = sd_collect(form);

    // 2. Build plain text data (clean strings)
    const plainData = { ...rawData };
    for (let k in plainData) {
      if (plainData[k]) plainData[k + "_lower"] = plainData[k].toLowerCase();
    }
    const txtAliases = buildAliases(plainData);
    const finalPlain = { ...plainData, ...txtAliases };

    // 3. Build HTML highlighted data (spans injected)
    const hlRawData = {};
    for (let k in rawData) {
      hlRawData[k] = hl(rawData[k]);
      if (rawData[k]) hlRawData[k + "_lower"] = hl(rawData[k].toLowerCase());
    }
    const hlAliases = buildAliases(hlRawData);
    const finalHl = { ...hlRawData, ...hlAliases };

    // Tool title available in template if needed
    finalPlain.toolTitle = window.TOOL_CONFIG.title;
    finalHl.toolTitle = window.TOOL_CONFIG.title;

    const tpl = (window.TOOL_CONFIG.templates && window.TOOL_CONFIG.templates[tone]) || "";

    // 4. Fill Templates
    // Replace newline markers from strings cleanly
    const resultHtml = sd_fillTemplate(tpl, finalHl).trim().replace(/\n/g, "<br>");
    const resultText = sd_fillTemplate(tpl, finalPlain).trim();

    // 5. Render Output
    if (preview) {
      preview.innerHTML = resultHtml || "Fill the fields to generate a draft.";
      if (textarea) {
        textarea.value = resultText;
      }
      if (outArea) {
        outArea.style.display = resultText ? "block" : "none";
        if (outPlaceholder) outPlaceholder.style.display = resultText ? "none" : "block";
      }
    }
  }

  genBtn && genBtn.addEventListener("click", (e) => { e.preventDefault(); gen(); });

  clearBtn && clearBtn.addEventListener("click", (e) => {
    e.preventDefault();
    form.reset();
    if (preview) preview.innerHTML = "";
    if (textarea) textarea.value = "";
    if (outArea) outArea.style.display = "none";
    if (outPlaceholder) outPlaceholder.style.display = "block";
    tone = window.TOOL_CONFIG.defaultTone || "gentle";
    sd_setTone(toneBtns, tone);
  });

  copyBtn && copyBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    const text = (textarea?.value || "").trim();
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      const originalText = copyBtn.textContent;
      copyBtn.textContent = "Copied!";
      setTimeout(() => copyBtn.textContent = originalText, 1500);
    } catch (err) {
      alert("Copy failed. Please select the text and copy manually.");
    }
  });

  if (window.TOOL_CONFIG.autoGenerate !== false) {
    form && form.addEventListener("input", (e) => {
      // Clear required validation outline if it was red and user typed
      if (e.target.hasAttribute("required") && e.target.value.trim()) {
        e.target.style.borderColor = "";
        e.target.style.boxShadow = "";
      }

      const rawData = sd_collect(form);
      const hasAny = Object.values(rawData).some(v => String(v || "").trim().length > 0);
      if (hasAny && outArea && outArea.style.display !== "none") gen();
    });
  } else {
    // If autoGenerate is false, still clear validation outline on input
    form && form.addEventListener("input", (e) => {
      if (e.target.hasAttribute("required") && e.target.value.trim()) {
        e.target.style.borderColor = "";
        e.target.style.boxShadow = "";
      }
    });
  }
}

document.addEventListener("DOMContentLoaded", sd_init);
