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
  function ext(u) {
    return /^https?:/i.test(u) ? ' target="_blank" rel="noopener"' : "";
  }
  function link(label, u, cls) {
    var h = href(u);
    return h ? '<a' + (cls ? ' class="' + cls + '"' : "") + ' href="' + h + '"' + ext(u) + ">" + esc(label) + "</a>" : "";
  }
  function tags(list) {
    if (!list || !list.length) return "";
    return '<ul class="tags">' + list.map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("") + "</ul>";
  }
  function has(a) { return Array.isArray(a) && a.length > 0; }

  /* ---------- Hero ---------- */
  document.title = p.name || document.title;
  document.getElementById("brand").textContent = p.name || "";

  var avatar = href(p.photo)
    ? '<img class="avatar" src="' + href(p.photo) + '" alt="Portrait of ' + esc(p.name) + '">'
    : '<div class="avatar" aria-hidden="true">' + esc(p.initials || "") + "</div>";

  var actions = (p.resume ? link("Download CV", p.resume, "btn primary") : "") +
    (p.links || []).map(function (l) { return link(l.label, l.url, "btn"); }).join("");

  document.getElementById("top").innerHTML =
    avatar +
    "<div>" +
    "<h1>" + esc(p.name) + "</h1>" +
    (p.headline ? '<p class="headline">' + esc(p.headline) + "</p>" : "") +
    (p.subline ? '<p class="subline">' + esc(p.subline) + "</p>" : "") +
    (p.location ? '<p class="location">' + esc(p.location) + "</p>" : "") +
    (p.summary ? '<p class="summary">' + esc(p.summary) + "</p>" : "") +
    (actions ? '<div class="actions">' + actions + "</div>" : "") +
    "</div>";

  /* ---------- Sections ---------- */
  var sections = [];
  function add(id, title, html) { sections.push({ id: id, title: title, html: html }); }

  if (has(S.about)) {
    add("about", "About", '<div class="prose">' +
      S.about.map(function (t) { return "<p>" + esc(t) + "</p>"; }).join("") + "</div>");
  }

  if (has(S.interests)) {
    add("interests", "Interests", '<div class="grid">' + S.interests.map(function (i) {
      return '<article class="card"><h3>' + esc(i.title) + "</h3><p>" + esc(i.text) + "</p></article>";
    }).join("") + "</div>");
  }

  if (has(S.skills)) {
    add("skills", "Skills", S.skills.map(function (g) {
      return '<div class="skill-row"><h3>' + esc(g.group) + "</h3>" + tags(g.items) + "</div>";
    }).join(""));
  }

  if (has(S.projects)) {
    add("projects", "Projects", '<div class="grid">' + S.projects.map(function (x) {
      var links = link("View project →", x.link) + link("Source code", x.repo);
      return '<article class="card">' +
        (x.period ? '<span class="meta">' + esc(x.period) + "</span>" : "") +
        "<h3>" + esc(x.title) + "</h3><p>" + esc(x.description) + "</p>" + tags(x.tags) +
        (links ? '<div class="card-links">' + links + "</div>" : "") +
        "</article>";
    }).join("") + "</div>");
  }

  function entries(list) {
    return list.map(function (e) {
      return '<div class="entry"><span class="meta">' + esc(e.period) + "</span><div>" +
        "<h4>" + esc(e.role) + "</h4>" +
        (e.org ? '<div class="org">' + esc(e.org) + "</div>" : "") +
        (e.text ? "<p>" + esc(e.text) + "</p>" : "") +
        (has(e.points) ? "<ul>" + e.points.map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("") + "</ul>" : "") +
        "</div></div>";
    }).join("");
  }
  if (has(S.experience) || has(S.education)) {
    add("background", "Background", '<div class="timeline">' +
      (has(S.experience) ? '<h3 class="sub">Experience</h3>' + entries(S.experience) : "") +
      (has(S.education) ? '<h3 class="sub">Education</h3>' + entries(S.education) : "") +
      "</div>");
  }

  if (has(S.publications)) {
    add("publications", "Publications", '<div class="timeline">' + S.publications.map(function (g) {
      return '<h3 class="sub">' + esc(g.group) + '</h3><ol class="pubs">' + g.items.map(function (x) {
        return "<li><strong>" + esc(x.title) + "</strong>" +
          '<div class="org">' + esc(x.authors) + " (" + esc(x.year) + ")</div>" +
          (x.venue ? '<div class="org"><em>' + esc(x.venue) + "</em>" +
            (href(x.link) ? " · " + link("Read →", x.link) : "") + "</div>" : "") + "</li>";
      }).join("") + "</ol>";
    }).join("") + "</div>");
  }

  function rows(list, linkLabel) {
    return list.map(function (c) {
      return '<div class="cert"><div><h3>' + esc(c.title) + '</h3><div class="issuer">' + esc(c.issuer) + "</div></div>" +
        '<div class="right"><span class="meta">' + esc(c.date) + "</span>" +
        (href(c.link) ? "<br>" + link(linkLabel, c.link) : "") + "</div></div>";
    }).join("");
  }
  if (has(S.awards)) add("awards", "Awards", rows(S.awards, "Details →"));
  if (has(S.certificates)) {
    var first = S.certificates.slice(0, 8), rest = S.certificates.slice(8);
    add("certificates", "Certificates", rows(first, "View credential →") +
      (rest.length ? '<details class="more"><summary>Show all ' + S.certificates.length +
        " certificates</summary>" + rows(rest, "View credential →") + "</details>" : ""));
  }

  var c = S.contact || {};
  if (c.text || c.email) {
    add("contact", "Contact", '<div class="prose">' +
      (c.text ? "<p>" + esc(c.text) + "</p>" : "") +
      (c.email ? "<p>" + link(c.email, "mailto:" + c.email, "btn primary") + "</p>" : "") + "</div>");
  }

  document.getElementById("sections").innerHTML = sections.map(function (s) {
    return '<section class="section" id="' + s.id + '"><div class="wrap"><h2>' + s.title + "</h2>" + s.html + "</div></section>";
  }).join("");

  document.getElementById("nav-links").innerHTML = sections.map(function (s) {
    return '<a href="#' + s.id + '">' + s.title + "</a>";
  }).join("");

  document.getElementById("footer-text").textContent =
    "© " + new Date().getFullYear() + " " + (p.name || "");

  /* ---------- Active nav link ---------- */
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
  }

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
