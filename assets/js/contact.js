/* Apex Gama Defense Solutions — contact form → Supabase.
   Submits an inquiry as a row in the `contact_submissions` table via the
   Supabase REST API. No framework, no build step.

   The anon key below is a PUBLIC key by design — it is safe to ship in the
   browser AS LONG AS Row Level Security is enabled on the table with an
   INSERT-only policy for the `anon` role (see docs/06-supabase-setup.md).
   Never put the service_role key here. */
(function () {
  "use strict";

  /* ---- CONFIG — fill these two values (Supabase → Project Settings → API) --- */
  var SUPABASE_URL = "<< PASTE SUPABASE PROJECT URL — e.g. https://abcd1234.supabase.co >>";
  var SUPABASE_ANON_KEY = "<< PASTE SUPABASE ANON PUBLIC KEY >>";
  var TABLE = "contact_submissions";
  /* -------------------------------------------------------------------------- */

  var form = document.getElementById("contact-form");
  if (!form) return;
  var statusEl = document.getElementById("form-status");
  var button = form.querySelector('button[type="submit"]');
  var configured = SUPABASE_URL.indexOf("http") === 0 && SUPABASE_ANON_KEY.indexOf("<<") !== 0;

  function val(id) {
    var el = document.getElementById(id);
    return el ? String(el.value).trim() : "";
  }
  function setStatus(state, msg) {
    if (!statusEl) return;
    statusEl.setAttribute("data-state", state);
    statusEl.textContent = msg;
  }
  function setBusy(on) {
    if (!button) return;
    button.setAttribute("aria-busy", String(on));
    button.disabled = on;
    button.textContent = on ? "Sending…" : (button.getAttribute("data-default-label") || "Send inquiry");
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Honeypot: bots fill hidden fields. Pretend success, save nothing.
    var hp = form.querySelector('[name="company_website"]');
    if (hp && hp.value) { setStatus("ok", "Thank you — your inquiry has been received."); form.reset(); return; }

    // Minimal validation
    if (!val("name") || !val("email") || !val("message")) {
      setStatus("error", "Please complete the name, email, and message fields.");
      return;
    }

    if (!configured) {
      setStatus("error", "The form is not connected yet. Please email contact@apexgamadefense.com.");
      return;
    }

    var payload = {
      name: val("name"),
      organization: val("org"),
      role: val("role"),
      agency: val("agency"),
      email: val("email"),
      phone: val("phone"),
      naics: val("naics"),
      needed: val("needed"),
      topic: val("topic"),
      message: val("message")
    };

    setBusy(true);
    setStatus("", "");

    fetch(SUPABASE_URL.replace(/\/+$/, "") + "/rest/v1/" + TABLE, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": SUPABASE_ANON_KEY,
        "Authorization": "Bearer " + SUPABASE_ANON_KEY,
        "Prefer": "return=minimal"
      },
      body: JSON.stringify(payload)
    }).then(function (r) {
      if (r.ok) {
        form.reset();
        setStatus("ok", "Thank you — your inquiry has been received. We will be in touch.");
      } else {
        setStatus("error", "Something went wrong sending your message. Please email contact@apexgamadefense.com.");
      }
    }).catch(function () {
      setStatus("error", "Network error. Please email contact@apexgamadefense.com.");
    }).then(function () {
      setBusy(false);
    });
  });
})();
