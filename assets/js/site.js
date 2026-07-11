/* Apex Gama Solutions — minimal progressive enhancement.
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

  // Contact form — compose an email to contact@apexgamasolutions.com.
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
        "mailto:contact@apexgamasolutions.com?subject=" +
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
