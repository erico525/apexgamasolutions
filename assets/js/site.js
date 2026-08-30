/* Apex Gama Defense Solutions — minimal progressive enhancement.
   The site is fully functional without JS; this only improves the mobile nav
   and stamps the current year. No framework, no dependencies. */
(function () {
  "use strict";

  // Mobile navigation disclosure
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("primary-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.getAttribute("data-open") === "true";
      nav.setAttribute("data-open", String(!open));
      toggle.setAttribute("aria-expanded", String(!open));
    });
    // Close the menu when a link is chosen or when returning to desktop width
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        nav.setAttribute("data-open", "false");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
    var mq = window.matchMedia("(min-width: 861px)");
    (mq.addEventListener ? mq.addEventListener.bind(mq, "change") : mq.addListener.bind(mq))(function () {
      nav.setAttribute("data-open", "false");
      toggle.setAttribute("aria-expanded", "false");
    });
  }

  // Resources dropdown
  var drop = document.querySelector(".nav-dropdown");
  if (drop) {
    var dToggle = drop.querySelector(".nav-dropdown__toggle");
    var dMenu = drop.querySelector(".nav-dropdown__menu");
    var closeDrop = function () {
      dMenu.hidden = true;
      dToggle.setAttribute("aria-expanded", "false");
    };
    dToggle.addEventListener("click", function (e) {
      e.stopPropagation();
      var open = dToggle.getAttribute("aria-expanded") === "true";
      dMenu.hidden = open;
      dToggle.setAttribute("aria-expanded", String(!open));
    });
    document.addEventListener("click", function (e) {
      if (!drop.contains(e.target)) closeDrop();
    });
    document.addEventListener("keydown", function (e) {
      if ((e.key === "Escape" || e.keyCode === 27) && dToggle.getAttribute("aria-expanded") === "true") {
        closeDrop();
        dToggle.focus();
      }
    });
  }

  // Contact form — compose an email to contact@apexgamadefense.com.
  // No backend: submitting opens the visitor's mail client, pre-filled.
  var form = document.querySelector("form.form");
  if (form && (form.getAttribute("action") || "").indexOf("mailto:") === 0) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var val = function (id) {
        var el = document.getElementById(id);
        return el ? String(el.value).trim() : "";
      };
      var topic = val("topic") || "Website inquiry";
      var subject = "Website inquiry — " + topic;
      var lines = [
        "Name: " + val("name"),
        "Organization: " + val("org"),
        "Email: " + val("email"),
        "Phone: " + val("phone"),
        "Reason: " + topic,
        "",
        "Message:",
        val("message")
      ];
      window.location.href =
        "mailto:contact@apexgamadefense.com?subject=" +
        encodeURIComponent(subject) +
        "&body=" +
        encodeURIComponent(lines.join("\n"));
    });
  }

  // Current year in footer
  var y = document.querySelectorAll("[data-year]");
  var year = new Date().getFullYear();
  for (var i = 0; i < y.length; i++) { y[i].textContent = year; }
})();

/* ---- Dark-forward atmosphere: grain, vignette, bathymetric field, reveal --- */
(function () {
  "use strict";
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;

  // fixed overlays
  ["fx-vignette", "fx-grain"].forEach(function (c) {
    var d = document.createElement("div"); d.className = c; d.setAttribute("aria-hidden", "true");
    document.body.appendChild(d);
  });

  // live bathymetric contour field behind hero + page-header
  function field(host) {
    var c = document.createElement("canvas"); c.className = "fx-field"; c.setAttribute("aria-hidden", "true");
    host.insertBefore(c, host.firstChild);
    var x = c.getContext("2d"), w, h, dpr, t = 0;
    function size() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = host.clientWidth; h = host.clientHeight;
      c.width = w * dpr; c.height = h * dpr; x.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    function line(y0, phase, amp, alpha, amber) {
      x.beginPath();
      for (var px = 0; px <= w; px += 8) {
        var n = Math.sin(px * 0.006 + phase) + 0.5 * Math.sin(px * 0.013 - phase * 0.7) + 0.3 * Math.sin(px * 0.021 + phase * 1.3);
        var y = y0 + n * amp;
        px === 0 ? x.moveTo(px, y) : x.lineTo(px, y);
      }
      var g = x.createLinearGradient(0, 0, w, 0), col = amber ? "230,162,76" : "120,150,170";
      g.addColorStop(0, "rgba(" + col + ",0)");
      g.addColorStop(0.45, "rgba(" + col + "," + (alpha * 0.35) + ")");
      g.addColorStop(1, "rgba(" + col + "," + alpha + ")");
      x.strokeStyle = g; x.lineWidth = 1; x.stroke();
    }
    function draw() {
      x.clearRect(0, 0, w, h);
      var rows = 24, gap = h / rows;
      for (var i = 0; i < rows; i++) {
        var amber = (i % 9 === 0);
        line(i * gap + gap * 0.5, t * 0.35 + i * 0.28, 9 + (i / rows) * 20, amber ? 0.15 : 0.085, amber);
      }
      t += 0.006;
      if (!reduce) requestAnimationFrame(draw);
    }
    size(); draw();
    window.addEventListener("resize", function () { size(); if (reduce) draw(); });
  }
  document.querySelectorAll(".hero, .page-header").forEach(field);

  // scroll reveal on top-level sections
  var secs = [].slice.call(document.querySelectorAll("main > section"));
  secs.forEach(function (s) { s.classList.add("reveal"); });
  if (reduce || !("IntersectionObserver" in window)) {
    secs.forEach(function (s) { s.classList.add("in"); });
  } else {
    var io = new IntersectionObserver(function (en) {
      en.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { threshold: 0.08, rootMargin: "0px 0px -8% 0px" });
    secs.forEach(function (s) { io.observe(s); });
    // first paint: reveal anything already in view
    requestAnimationFrame(function () {
      secs.forEach(function (s) { if (s.getBoundingClientRect().top < innerHeight * 0.92) s.classList.add("in"); });
    });
  }
})();
