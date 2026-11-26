(function () {
  var S = window.SITE || {};
  var p = S.profile || {};

  function esc(v) {
    return String(v == null ? "" : v).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  // Only allow safe link targets.
  function href(u) {
    u = String(u || "").trim();
    return /^(https?:|mailto:|assets\/|\.\/|#)/i.test(u) ? esc(u) : "";
  }
  function isExt(u) { return /^https?:/i.test(u); }
  function link(label, u, cls) {
    var h = href(u);
    if (!h) return "";
    var c = [cls || "", cls && isExt(u) ? "ext" : ""].join(" ").trim();
    return "<a" + (c ? ' class="' + c + '"' : "") + ' href="' + h + '"' +
      (isExt(u) ? ' target="_blank" rel="noopener"' : "") + ">" + esc(label) + "</a>";
  }
  function tags(list) {
    if (!list || !list.length) return "";
    return '<ul class="tags">' + list.map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("") + "</ul>";
  }
  function bullets(list) {
    return has(list) ? "<ul>" + list.map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("") + "</ul>" : "";
  }
  function has(a) { return Array.isArray(a) && a.length > 0; }
  function pad(n) { return (n < 10 ? "0" : "") + n; }

  /* ---------- Decorative contour lines (a nod to terrain and water) ---------- */
  function contours() {
    var out = "", cx = 380, cy = 380, N = 15;
    for (var k = 1; k <= N; k++) {
      var r = 22 + k * 23, d = "";
      for (var i = 0; i <= 120; i++) {
        var a = (i / 120) * Math.PI * 2;
        var w = 1 + 0.085 * Math.sin(3 * a + k * 0.55) + 0.06 * Math.sin(5 * a - k * 0.4) + 0.04 * Math.sin(2 * a + 1.3);
        var x = cx + Math.cos(a) * r * w * 1.06, y = cy + Math.sin(a) * r * w * 0.92;
        d += (i ? "L" : "M") + x.toFixed(1) + " " + y.toFixed(1);
      }
      out += '<path d="' + d + 'Z" fill="none" stroke="currentColor" stroke-width="' + (k % 5 === 0 ? 1.4 : 0.8) +
        '" opacity="' + (k % 5 === 0 ? 0.5 : 0.28) + '"/>';
    }
    return '<svg class="contours" viewBox="0 0 760 760" aria-hidden="true">' + out + "</svg>";
  }

  /* ---------- Hero ---------- */
  document.title = p.name || document.title;
  document.getElementById("brand").textContent = p.name || "";

  var actions = (p.resume ? link("Download CV", p.resume, "btn primary") : "") +
    (p.links || []).map(function (l, i) {
      return link(l.label, l.url, "btn" + (!p.resume && i === 0 ? " primary" : ""));
    }).join("");

  var stats = has(p.stats) ? '<ul class="stats">' + p.stats.map(function (s) {
    return "<li><b>" + esc(s.value) + "</b><span>" + esc(s.label) + "</span></li>";
  }).join("") + "</ul>" : "";

  document.getElementById("top").innerHTML =
    contours() +
    '<div class="wrap hero-inner">' +
    '<div class="hero-top">' +
    (href(p.photo) ? '<img class="avatar" src="' + href(p.photo) + '" alt="Portrait of ' + esc(p.name) + '">' : "") +
    (p.location ? '<span class="eyebrow">' + esc(p.location) + "</span>" : "") +
    "</div>" +
    "<h1>" + esc(p.name) + "</h1>" +
    (p.headline ? '<p class="headline">' + esc(p.headline) + "</p>" : "") +
    (p.subline ? '<p class="subline">' + esc(p.subline) + "</p>" : "") +
    (p.summary ? '<p class="summary">' + esc(p.summary) + "</p>" : "") +
    (actions ? '<div class="actions">' + actions + "</div>" : "") +
    stats +
    "</div>";

  /* ---------- Sections ---------- */
  var sections = [];
  function add(id, title, html, nav) { sections.push({ id: id, title: title, html: html, nav: nav || title }); }

  if (has(S.about)) {
    add("about", "About", '<div class="prose">' +
      S.about.map(function (t) { return "<p>" + esc(t) + "</p>"; }).join("") + "</div>");
  }

  if (has(S.interests)) {
    add("interests", "Interests", '<div class="grid">' + S.interests.map(function (i, n) {
      return '<article class="card interest reveal"><span class="idx">' + pad(n + 1) + "</span><h3>" +
        esc(i.title) + "</h3><p>" + esc(i.text) + "</p></article>";
    }).join("") + "</div>");
  }

  if (has(S.skills)) {
    add("skills", "Skills", S.skills.map(function (g) {
      return '<div class="skill-row reveal"><h3>' + esc(g.group) + "</h3>" + tags(g.items) + "</div>";
    }).join(""));
  }

  if (has(S.projects)) {
    add("projects", "Projects", '<div class="grid">' + S.projects.map(function (x) {
      var links = link("View project ↗", x.link) + link("Source code ↗", x.repo);
      return '<article class="card reveal' + (x.featured ? " featured" : "") + '">' +
        (x.period ? '<span class="meta">' + esc(x.period) + "</span>" : "") +
        "<h3>" + esc(x.title) + "</h3><p>" + esc(x.description) + "</p>" +
        bullets(x.points) + tags(x.tags) +
        (links ? '<div class="card-links">' + links + "</div>" : "") +
        "</article>";
    }).join("") + "</div>");
  }

  function entries(list) {
    return '<div class="entries">' + list.map(function (e) {
      return '<div class="entry reveal"><span class="meta">' + esc(e.period) + "</span>" +
        "<h4>" + esc(e.role) + "</h4>" +
        (e.org ? '<div class="org">' + (link(e.org + " ↗", e.url) || esc(e.org)) + "</div>" : "") +
        (e.text ? "<p>" + esc(e.text) + "</p>" : "") +
        bullets(e.points) + "</div>";
    }).join("") + "</div>";
  }
  if (has(S.experience) || has(S.education)) {
    add("background", "Background",
      (has(S.experience) ? '<h3 class="sub">Experience</h3>' + entries(S.experience) : "") +
      (has(S.education) ? '<h3 class="sub">Education</h3>' + entries(S.education) : ""));
  }

  if (has(S.publications)) {
    add("publications", "Publications", S.publications.map(function (g) {
      return '<h3 class="sub">' + esc(g.group) + '</h3><ol class="pubs">' + g.items.map(function (x) {
        var y = String(x.year || "");
        return '<li class="reveal"><span class="year' + (/^\d{4}$/.test(y) ? "" : " small") + '">' + esc(y) + "</span><div>" +
          "<strong>" + esc(x.title) + "</strong>" +
          '<div class="org">' + esc(x.authors) + "</div>" +
          (x.venue ? '<div class="org"><em>' + esc(x.venue) + "</em>" +
            (href(x.link) ? " · " + link("Read ↗", x.link) : "") + "</div>" : "") + "</div></li>";
      }).join("") + "</ol>";
    }).join(""));
  }

  function tiles(list, linkLabel) {
    return '<div class="tiles">' + list.map(function (c) {
      var foot = (c.date ? '<span class="meta">' + esc(c.date) + "</span>" : "<span></span>") + link(linkLabel, c.link);
      return '<div class="tile reveal"><h3>' + esc(c.title) + "</h3>" +
        (c.issuer ? '<div class="issuer">' + esc(c.issuer) + "</div>" : "") +
        (has(c.links) ? '<div class="sublinks">' + c.links.map(function (l) { return link(l.label, l.url); }).join("") + "</div>" : "") +
        (has(c.modules) ? '<details class="modules"><summary>Show ' + c.modules.length + " modules</summary><ul>" +
          c.modules.map(function (m) { return "<li>" + (link(m.label, m.url) || esc(m.label)) + "</li>"; }).join("") + "</ul></details>" : "") +
        (c.date || href(c.link) ? '<div class="foot">' + foot + "</div>" : "") +
        "</div>";
    }).join("") + "</div>";
  }
  if (has(S.awards)) add("awards", "Awards", tiles(S.awards, "Details ↗"));
  if (has(S.certificates) || has(S.training)) {
    var both = has(S.certificates) && has(S.training);
    var html = "";
    if (has(S.training)) {
      html += (both ? '<h3 class="sub">Training</h3>' : "") + tiles(S.training, "Details ↗");
    }
    if (has(S.certificates)) {
      var first = S.certificates.slice(0, 8), rest = S.certificates.slice(8);
      html += (both ? '<h3 class="sub">Certificates</h3>' : "") + tiles(first, "View credential ↗") +
        (rest.length ? '<details class="more"><summary>Show all ' + S.certificates.length +
          " certificates</summary>" + tiles(rest, "View credential ↗") + "</details>" : "");
    }
    add("certificates", both ? "Certificates &amp; Training" : "Certificates", html, "Certificates");
  }

  var c = S.contact || {};
  if (c.text || c.email) {
    var others = (p.links || []).filter(function (l) { return !/^mailto:/i.test(l.url || ""); })
      .map(function (l) { return link(l.label, l.url, "btn"); }).join("");
    add("contact", "Contact", '<div class="contact-panel reveal">' +
      '<p class="big">' + esc(c.heading || "Let's work on water and AI together.") + "</p>" +
      (c.text ? "<p>" + esc(c.text) + "</p>" : "") +
      '<div class="actions">' + (c.email ? link(c.email, "mailto:" + c.email, "btn primary") : "") + others + "</div></div>");
  }

  document.getElementById("sections").innerHTML = sections.map(function (s, i) {
    return '<section class="section" id="' + s.id + '"><div class="wrap sec">' +
      '<header class="sec-head"><span class="num">' + pad(i + 1) + "</span><h2>" + s.title + "</h2></header>" +
      '<div class="sec-body">' + s.html + "</div></div></section>";
  }).join("");

  document.getElementById("nav-links").innerHTML = sections.map(function (s) {
    return '<a href="#' + s.id + '">' + s.nav + "</a>";
  }).join("");

  document.getElementById("footer-text").textContent =
    "© " + new Date().getFullYear() + " " + (p.name || "");

  // Sections are built after load, so honor a #section link now.
  if (location.hash.length > 1) {
    var target = document.getElementById(location.hash.slice(1));
    if (target) target.scrollIntoView();
  }

  /* ---------- Scroll effects ---------- */
  if ("IntersectionObserver" in window) {
    var navLinks = document.querySelectorAll("#nav-links a");
    var io = new IntersectionObserver(function (items) {
      items.forEach(function (it) {
        if (!it.isIntersecting) return;
        navLinks.forEach(function (a) {
          a.classList.toggle("active", a.getAttribute("href") === "#" + it.target.id);
        });
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    document.querySelectorAll(".section").forEach(function (el) { io.observe(el); });

    document.documentElement.classList.add("js-anim");
    var ro = new IntersectionObserver(function (items) {
      items.forEach(function (it) {
        if (it.isIntersecting) { it.target.classList.add("in"); ro.unobserve(it.target); }
      });
    }, { rootMargin: "0px 0px -6% 0px" });
    document.querySelectorAll(".reveal").forEach(function (el) { ro.observe(el); });
    // Items inside a collapsed list are revealed when it is opened.
    document.querySelectorAll("details").forEach(function (d) {
      d.addEventListener("toggle", function () {
        d.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("in"); });
      });
    });
  }

  var bar = document.getElementById("progress"), nav = document.querySelector(".nav"), ticking = false;
  function onScroll() {
    ticking = false;
    var max = document.documentElement.scrollHeight - window.innerHeight;
    if (bar) bar.style.transform = "scaleX(" + (max > 0 ? Math.min(1, window.scrollY / max) : 0) + ")";
    if (nav) nav.classList.toggle("scrolled", window.scrollY > 8);
  }
  window.addEventListener("scroll", function () {
    if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
  }, { passive: true });
  onScroll();

  /* ---------- Theme toggle ---------- */
  document.getElementById("theme-btn").addEventListener("click", function () {
    var root = document.documentElement;
    var current = root.getAttribute("data-theme") ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    var next = current === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("theme", next); } catch (e) {}
  });
})();
