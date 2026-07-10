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

  // Current year in footer
  var y = document.querySelectorAll("[data-year]");
  var year = new Date().getFullYear();
  for (var i = 0; i < y.length; i++) { y[i].textContent = year; }
})();
