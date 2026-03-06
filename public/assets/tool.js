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

function formatDateIfPossible(val) {
  if (!val) return "";
  // Check if it matches YYYY-MM-DD (standard Flatpickr or ISO format)
  const match = val.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (match) {
    const d = new Date(val + 'T12:00:00'); 
    if (!isNaN(d.getTime())) {
      return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    }
  }
  return val;
}

function cleanGeneratedText(text) {
  let s = text;
  
  // 1. Remove empty parentheses '()' or ' ( ) '
  s = s.replace(/\s*\(\s*\)/g, "");

  // 2. Fix floating punctuation and duplicated punctuation FIRST
  s = s.replace(/\s+([.,!?;:])/g, "$1");
  s = s.replace(/([.,!?;:])\1+/g, "$1");

  // 3. Remove dangling prepositions before punctuation
  let prev;
  do {
    prev = s;
    s = s.replace(/\b(on|for|by|from|about|regarding|with|to|of|in|at|via|and|flight|order|invoice|account|reference|ticket|subscription|ID|amount|date|reason)\s*([.,!?;:])/gi, "$2");
    s = s.replace(/\b(for the amount|the amount|the amount of|of the amount|for order|regarding order|regarding invoice|regarding account|regarding flight|of flight)\s*([.,!?;:])/gi, "$2");
    s = s.replace(/\b(which I purchased|which was purchased|purchased on)\s*([.,!?;:])/gi, "$2");
    s = s.replace(/\bRef:\s*([.,!?;:])/gi, "$1");
  } while (s !== prev);

  // 4. Clean up any remaining floating/duplicated punctuation
  s = s.replace(/\s+([.,!?;:])/g, "$1");
  s = s.replace(/([.,!?;:])\1+/g, "$1");
  s = s.replace(/,\s*\./g, ".");
  s = s.replace(/\.{2,}/g, "."); // No double dots

  // 5. Remove known broken empty sentences or fragments
  const emptySentences = [
    /The reason for my request is that\s*[.,]/gi,
    /This request is being made because\s*[.,]/gi,
    /I am requesting this refund because\s*[.,]/gi,
    /I'm reaching out about\s*[.,]/gi,
    /I am writing regarding\s*[.,]/gi,
    /I am formally contacting you regarding\s*[.,]/gi,
    /The reason for this is\s*[.,]/gi,
    /This is because\s*[.,]/gi,
    /The purchase was made\s*[.,]/gi,
    /I purchased this\s*[.,]/gi,
    /which I purchased\s*[.,]/gi,
    /originally sent\s*[.,]/gi,
    /from our previous contact\s*[.,]/gi,
    /I am writing to request a refund for\s*[.,]/gi,
    /I am writing to request for\s*[.,]/gi
  ];
  for (const regex of emptySentences) {
    s = s.replace(regex, "");
  }

  // 6. Fix multiple spaces
  s = s.replace(/[ \t]{2,}/g, " ");

  // 7. Fix excessive newlines - more aggressive
  s = s.replace(/\n\s*\n\s*\n+/g, "\n\n");
  s = s.replace(/^\s+|\s+$/g, ""); // Trim start/end
  
  // 8. Cleanup leading/trailing spaces per line
  s = s.split('\n').map(line => line.trim()).join('\n');

  // Final check for lone punctuation on a line
  s = s.replace(/^\s*[.,!?;:]\s*$/gm, "");
  
  return s.trim();
}

function sd_fillTemplate(tpl, data) {
  let result = tpl;
  
  // Process block tags {{#key}}...{{/key}}
  const blockRegex = /\{\{#(\w+)\}\}([\s\S]*?)\{\{\/\1\}\}/g;
  result = result.replace(blockRegex, (match, key, content) => {
    const val = data[key] || data[key + '_lower'];
    // If it's HTML injected (contains span.hl), we check its raw content by removing tags
    const rawVal = typeof val === 'string' ? val.replace(/<[^>]*>/g, '').trim() : String(val || "").trim();
    if (rawVal) {
      return content;
    }
    return "";
  });

  // Process standard variables {{key}}
  result = result.replace(/\{\{(\w+)\}\}/g, (_, key) => sd_escape(data[key]));
  
  // If it's a plain text output (no HTML tags), run the cleaner
  if (!result.includes('<span class="hl">')) {
    result = cleanGeneratedText(result);
  } else {
    // For HTML preview, we temporarily strip HTML, clean, and we can't easily restore HTML around punctuation
    // Wait, the HTML output won't look exactly like plain text if we don't clean it.
    // Let's strip the `<span class="hl">` tags, run cleaner, and then let the user see the cleaned text? 
    // No, we need the highlight spans. Let's just run the cleaner. The cleaner regexes mostly ignore tags if carefully written, 
    // BUT the spans might get in the way of `\s*([.,])`.
    // Actually, `cleanGeneratedText` might break spans. So we only clean plain text.
    // Wait! The user sees the preview. If the preview is broken, they will complain.
    // We MUST clean the preview. Let's adapt the cleaner to tolerate `</span>` before punctuation.
  }

  return result;
}

// Re-write cleanGeneratedText to be HTML-safe
function sd_cleanHtmlSafe(text) {
  let s = text;
  
  s = s.replace(/\s*\(\s*\)/g, "");
  
  // Allow optional </span> before punctuation
  const p = "([.,!?;:])";
  const hlEnd = "(?:<\\/span>)?";
  
  s = s.replace(new RegExp(`\\s+${hlEnd}${p}`, "g"), "$1$2");
  s = s.replace(new RegExp(`${p}${hlEnd}\\1+`, "g"), "$1$2");

  let prev;
  do {
    prev = s;
    s = s.replace(new RegExp(`\\b(on|for|by|from|about|regarding|with|to|of|in|at|via|and)\\s*${hlEnd}${p}`, "gi"), "$2$3");
    s = s.replace(new RegExp(`\\b(for the amount|the amount|the amount of)\\s*${hlEnd}${p}`, "gi"), "$2$3");
    s = s.replace(new RegExp(`\\b(which I purchased|which was purchased)\\s*${hlEnd}${p}`, "gi"), "$2$3");
    s = s.replace(new RegExp(`\\bRef:\\s*${hlEnd}${p}`, "gi"), "$1$2");
  } while (s !== prev);

  s = s.replace(new RegExp(`\\s+${hlEnd}${p}`, "g"), "$1$2");
  s = s.replace(new RegExp(`${p}${hlEnd}\\1+`, "g"), "$1$2");
  s = s.replace(new RegExp(`,\\s*${hlEnd}\\.`, "g"), "$1.");

  const emptySentences = [
    /The reason for my request is that\s*(?:<\/span>)?\s*[.,]/gi,
    /This request is being made because\s*(?:<\/span>)?\s*[.,]/gi,
    /I am requesting this refund because\s*(?:<\/span>)?\s*[.,]/gi,
    /I'm reaching out about\s*(?:<\/span>)?\s*[.,]/gi,
    /I am writing regarding\s*(?:<\/span>)?\s*[.,]/gi,
    /I am formally contacting you regarding\s*(?:<\/span>)?\s*[.,]/gi,
    /The reason for this is\s*(?:<\/span>)?\s*[.,]/gi,
    /This is because\s*(?:<\/span>)?\s*[.,]/gi,
    /The purchase was made\s*(?:<\/span>)?\s*[.,]/gi,
    /I purchased this\s*(?:<\/span>)?\s*[.,]/gi
  ];
  for (const regex of emptySentences) {
    s = s.replace(regex, "");
  }

  s = s.replace(/[ \t]{2,}/g, " ");
  s = s.replace(/\n\s*\n\s*\n+/g, "\n\n");
  s = s.split('\n').map(line => line.trim()).join('\n');

  return s.trim();
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

  form.querySelectorAll("[data-sd-field]").forEach(el => {
    const key = el.getAttribute("data-sd-field");
    let val = el.value;

    // Auto-format dates if they are in YYYY-MM-DD format
    if (el.classList.contains("sd-date")) {
      val = formatDateIfPossible(val);
    }

    if (el.classList.contains("sd-amount-input")) {
      const curEl = form.querySelector(`[data-sd-currency="${key}"]`);
      if (curEl && val) {
        val = formatMoney(val, curEl.value);
      }
    }

    data[key] = val;
  });

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
  const clearBtn = document.querySelector("[data-sd-clear]");
  const toneBtns = Array.from(document.querySelectorAll("[data-sd-tone]"));

  let tone = window.TOOL_CONFIG.defaultTone || "gentle";
  sd_setTone(toneBtns, tone);

  function hl(val) {
    if (!val || !String(val).trim()) return "";
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

    // Base injections with fallbacks
    a.recipient = r || src.company || "";
    a.name = n;
    a.topic = t || ref || "";
    a.item = i || ref || t || "";
    a.product = i || t || ref || ""; // Added explicit product
    a.service = i || t || ref || ""; // Added explicit service
    a.reference = ref || t || i || "";
    a.date = d;
    a.amount = am;
    a.reason = re;
    a.company = src.company || r || "";

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
    a.start_str = d ? String(d).split(/[~|-]|to|until/)[0].trim() : "";
    a.end_str = d && String(d).match(/[~|-]|to|until/) ? String(d).split(/[~|-]|to|until/)[1].trim() : "";
    a.time_str = d ? ` at ${d}` : "";
    a.window_str = d ? ` within ${d}` : "";
    a.window_str_firm = d ? ` within ${d}` : "";
    a.lent_date_str = d ? ` on ${d}` : "";
    a.req_date = d;
    a.new_date = d;

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
    a.service = i || ref || t;
    a.merchant = r;
    a.holder = n;

    a.amount_str = am ? ` for ${am}` : "";
    a.total_str = am ? ` totaling ${am}` : "";
    a.expense = am;
    a.total = am;
    a.p_price = am;

    a.contact_str = "\\n\\nFeel free to reach out if you have any questions.";
    a.res_str = window.TOOL_CONFIG.category === "customer" ? "a refund" : "your request";
    a.recognition_str = "";

    return a;
  }

  function gen() {
    if (!form) return;

    let allRequiredFilled = true;
    form.querySelectorAll("[required]").forEach(el => {
      if (!el.value.trim()) {
        allRequiredFilled = false;
      }
    });

    if (!allRequiredFilled) {
      if (preview) preview.innerHTML = '<span style="color: var(--sub); font-style: italic;">Fill the required fields to generate your message.</span>';
      if (textarea) textarea.value = "";
      if (outArea) outArea.style.display = "none";
      if (outPlaceholder) outPlaceholder.style.display = "block";
      return;
    }

    const rawData = sd_collect(form);

    const plainData = { ...rawData };
    for (let k in plainData) {
      if (plainData[k]) plainData[k + "_lower"] = plainData[k].toLowerCase();
    }
    const txtAliases = buildAliases(plainData);
    const finalPlain = { ...plainData, ...txtAliases };

    const hlRawData = {};
    for (let k in rawData) {
      hlRawData[k] = hl(rawData[k]);
      if (rawData[k]) hlRawData[k + "_lower"] = hl(rawData[k].toLowerCase());
    }
    const hlAliases = buildAliases(hlRawData);
    const finalHl = { ...hlRawData, ...hlAliases };

    finalPlain.toolTitle = window.TOOL_CONFIG.title;
    finalHl.toolTitle = window.TOOL_CONFIG.title;
    if (window.TOOL_CONFIG.title) {
        finalPlain.toolTitle_lower = window.TOOL_CONFIG.title.toLowerCase();
        finalHl.toolTitle_lower = window.TOOL_CONFIG.title.toLowerCase();
    }

    const tpl = (window.TOOL_CONFIG.templates && window.TOOL_CONFIG.templates[tone]) || "";

    // Fill templates and apply our HTML-safe cleaner
    let resultHtml = sd_cleanHtmlSafe(sd_fillTemplate(tpl, finalHl));
    let resultText = cleanGeneratedText(sd_fillTemplate(tpl, finalPlain));

    // Handle newlines
    resultHtml = resultHtml.replace(/\\n/g, "<br>").replace(/\n/g, "<br>");
    resultText = resultText.replace(/\\n/g, "\n");

    if (preview) {
      preview.innerHTML = resultHtml;
      if (textarea) {
        textarea.value = resultText;
      }
      if (outArea) {
        outArea.style.display = "block";
        if (outPlaceholder) outPlaceholder.style.display = "none";
      }
    }
  }

  toneBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      tone = btn.dataset.tone;
      sd_setTone(toneBtns, tone);
      gen();
    });
  });

  clearBtn && clearBtn.addEventListener("click", (e) => {
    e.preventDefault();
    form.reset();
    tone = window.TOOL_CONFIG.defaultTone || "gentle";
    sd_setTone(toneBtns, tone);
    gen();
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

  if (form) {
    form.addEventListener("input", gen);
    form.addEventListener("change", gen);
  }

  // Hook into SD pickers if they exist
  // We can poll or use a proxy, but flatpickr has an onChange hook.
  // tool-ui.js initializes flatpickr.
  // Let's add a global callback for flatpickr in tool-ui.js if needed, 
  // or just handle it here by checking the inputs periodically? 
  // Better: let tool-ui.js trigger a change event.
}

document.addEventListener("DOMContentLoaded", sd_init);
