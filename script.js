(function () {
  var S = window.SITE || {};
  var p = S.profile || {};

  function esc(v) {
    return String(v == null ? "" : v).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  // Text where *word* marks the accent-colored part.
  function em(v) { return esc(v).replace(/\*(.+?)\*/g, "<em>$1</em>"); }
  // Only allow safe link targets.
  function href(u) {
    u = String(u || "").trim();
    return /^(https?:|mailto:|assets\/|\.\/|#)/i.test(u) ? esc(u) : "";
  }
  function isExt(u) { return /^https?:/i.test(u); }
  function link(label, u, cls) {
    var h = href(u);
    if (!h) return "";
    return "<a" + (cls ? ' class="' + cls + '"' : "") + ' href="' + h + '"' +
      (isExt(u) ? ' target="_blank" rel="noopener"' : "") + ">" + esc(label) + "</a>";
  }
  function tags(list) {
    if (!has(list)) return "";
    return '<ul class="tags">' + list.map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("") + "</ul>";
  }
  function bullets(list) {
    return has(list) ? "<ul>" + list.map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("") + "</ul>" : "";
  }
  function has(a) { return Array.isArray(a) && a.length > 0; }
  function pad(n) { return (n < 10 ? "0" : "") + n; }
  function urlOf(label) {
    var m = (p.links || []).filter(function (l) { return l.label === label; })[0];
    return m ? m.url : "";
  }

  /* ---------- Artwork ---------- */
  // Hero card: aquifer layers under a land surface, monitoring wells, and a satellite pass.
  function heroArt() {
    var W = 520, H = 480, s = "", fills = ["#1b7f86", "#17727c", "#135f6d", "#104e5f", "#0d3f52", "#0b3247"];
    function wave(y, k) {
      var d = "M0 " + H + "L0 " + y;
      for (var x = 0; x <= W; x += 13) {
        d += "L" + x + " " + (y + 13 * Math.sin(x / 74 + k * 1.25) + 6 * Math.sin(x / 31 + k * 2.1)).toFixed(1);
      }
      return d + "L" + W + " " + H + "Z";
    }
    for (var j = 0; j < fills.length; j++) {
      s += '<path d="' + wave(188 + j * 48, j) + '" fill="' + fills[j] + '"/>';
      s += '<path d="' + wave(188 + j * 48, j).replace(/^M0 \d+L/, "M").replace(/L\d+ \d+Z$/, "") +
        '" fill="none" stroke="#bff0e6" stroke-opacity=".34" stroke-width="1.4"/>';
    }
    [[112, 318], [262, 366], [408, 292]].forEach(function (w) {
      s += '<line x1="' + w[0] + '" y1="176" x2="' + w[0] + '" y2="' + w[1] + '" stroke="#eafff8" stroke-width="2.2" stroke-linecap="round"/>' +
        '<circle cx="' + w[0] + '" cy="' + w[1] + '" r="8" fill="#0b2233" stroke="#eafff8" stroke-width="3"/>' +
        '<rect x="' + (w[0] - 8) + '" y="168" width="16" height="8" rx="2" fill="#eafff8"/>';
    });
    s += '<path d="M-20 150 Q260 20 540 118" fill="none" stroke="#eafff8" stroke-opacity=".55" stroke-width="1.6" stroke-dasharray="3 9" stroke-linecap="round"/>' +
      '<g transform="translate(326 76) rotate(14)"><rect x="-9" y="-6" width="18" height="12" rx="2" fill="#eafff8"/>' +
      '<rect x="-30" y="-4" width="17" height="8" fill="#7fd6cf"/><rect x="13" y="-4" width="17" height="8" fill="#7fd6cf"/></g>' +
      '<path d="M326 92 L296 176 M326 92 L356 176" stroke="#eafff8" stroke-opacity=".28" stroke-width="1.2"/>';
    return '<svg viewBox="0 0 ' + W + " " + H + '" preserveAspectRatio="xMidYMid slice" aria-hidden="true">' +
      '<defs><linearGradient id="sky" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#1f8f8f"/><stop offset="1" stop-color="#0f5a66"/></linearGradient></defs>' +
      '<rect width="' + W + '" height="' + H + '" fill="url(#sky)"/>' + s + "</svg>";
  }
  // Project banners: flowing lines on a colored field, a different palette per card.
  var BANNERS = [["#12305c", "#2a5fa8"], ["#0f5257", "#2a8f86"], ["#7a3413", "#b8622c"], ["#3d2a66", "#6d4fb0"],
    ["#1f4d2e", "#4c8a55"], ["#0d3f52", "#2f7f9e"], ["#5a2140", "#a04a72"], ["#2b3d4f", "#56728c"]];
  function banner(i, label) {
    var c = BANNERS[i % BANNERS.length], s = "";
    for (var k = 0; k < 7; k++) {
      var d = "";
      for (var x = -10; x <= 610; x += 20) {
        d += (x === -10 ? "M" : "L") + x + " " + (28 + k * 24 + 13 * Math.sin(x / 62 + k * 0.9 + i * 1.7) + 6 * Math.sin(x / 23 + i)).toFixed(1);
      }
      s += '<path d="' + d + '" fill="none" stroke="#fff" stroke-opacity="' + (0.16 + (k % 3) * 0.1) + '" stroke-width="1.5"/>';
    }
    return '<div class="banner"><svg viewBox="0 0 600 190" preserveAspectRatio="none" aria-hidden="true">' +
      '<defs><linearGradient id="b' + i + '" x1="0" y1="0" x2="1" y2="1"><stop stop-color="' + c[0] + '"/><stop offset="1" stop-color="' + c[1] + '"/></linearGradient></defs>' +
      '<rect width="600" height="190" fill="url(#b' + i + ')"/>' + s + "</svg>" +
      (label ? "<span>" + esc(label) + "</span>" : "") + "</div>";
  }
  var ICONS = [
    '<path d="M3 9c3-3 5 3 8 0s5 3 8 0M3 15c3-3 5 3 8 0s5 3 8 0"/>',
    '<path d="M2 13h4l2-7 3 13 3-9 2 3h6"/>',
    '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/>',
    '<path d="M4 12a8 8 0 0 1 14-5l2-2v6h-6l2-2a5 5 0 1 0 1 6"/>',
    '<path d="M12 3l8 3v6c0 5-3.500 8-8 9-4.500-1-8-4-8-9V6z"/><path d="M8.500 12l2.500 2.500 4.500-5"/>',
    '<circle cx="12" cy="5" r="2"/><path d="M12 8v6M8 11l4-2 4 2M9 21l3-7 3 7"/>'
  ];
  var CARD_COLORS = ["c-navy", "c-teal", "c-rust", "c-plum", "c-forest", "c-slate"];

  /* ---------- Header ---------- */
  document.title = p.name || document.title;
  var nameParts = String(p.name || "").split(" ");
  var last = nameParts.length > 1 ? nameParts.pop() : "";
  document.getElementById("brand").innerHTML =
    '<span class="mono">' + esc(p.initials || "") + "</span><span>" + esc(nameParts.join(" ")) +
    (last ? " <b>" + esc(last) + "</b>" : "") + "</span>";

  /* ---------- Hero ---------- */
  var cred = p.credential || {};
  var stats = has(p.stats) ? '<ul class="stats">' + p.stats.map(function (s) {
    return "<li><b>" + esc(s.value) + "</b><span>" + esc(s.label) + "</span></li>";
  }).join("") + "</ul>" : "";

  document.getElementById("top").innerHTML =
    '<div class="wrap hero-grid">' +
    '<div class="hero-text">' +
    (p.kicker ? '<span class="pill">' + esc(p.kicker) + "</span>" : "") +
    '<p class="hello">Hello, I’m ' + esc(p.name) + ".</p>" +
    "<h1>" + em(p.tagline || p.headline) + "</h1>" +
    (p.summary ? '<p class="summary">' + esc(p.summary) + "</p>" : "") +
    '<div class="actions">' +
    '<a class="btn primary" href="#research">Explore my research ↗</a>' +
    '<a class="btn" href="#publications">View publications →</a>' +
    (p.resume ? link("Download CV ↓", p.resume, "btn") : "") +
    "</div>" +
    (cred.title ? '<div class="cred"><b>' + esc(cred.title) + "</b><span>" + esc(cred.sub || "") + "</span></div>" : "") +
    "</div>" +
    '<figure class="hero-card">' +
    (href(p.photo) ? '<img src="' + href(p.photo) + '" alt="Portrait of ' + esc(p.name) + '">' : heroArt()) +
    (href(p.photo) ? "" : '<figcaption class="top">Groundwater · Satellites · AI</figcaption>' +
      '<figcaption class="bottom"><small>Sparse wells, satellite signals</small><strong>One continuous picture</strong></figcaption>') +
    "</figure>" +
    "</div>" +
    (stats ? '<div class="wrap">' + stats + "</div>" : "");

  /* ---------- Sections ---------- */
  var sections = [];
  function add(o) { sections.push(o); }

  if (has(S.about)) {
    var quick = link("Hydroinformatics Lab ↗", urlOf("Hydroinformatics Lab")) + link("LinkedIn ↗", urlOf("LinkedIn")) +
      link("GitHub ↗", urlOf("GitHub")) + link("Google Scholar ↗", urlOf("Google Scholar")) + '<a href="#contact">Contact me ↗</a>';
    add({
      id: "about", nav: "About", kicker: "About", title: "Engineer first. *AI researcher* now.", split: true,
      html: '<p class="lead">' + esc(S.about[0]) + "</p>" +
        S.about.slice(1).map(function (t) { return "<p>" + esc(t) + "</p>"; }).join("") +
        (has(p.affiliations) ? '<div class="box"><h3>Affiliations</h3><dl>' + p.affiliations.map(function (a) {
          return "<div><dt>" + esc(a.short) + "</dt><dd>" + esc(a.name) + "</dd></div>";
        }).join("") + "</dl></div>" : "") +
        '<div class="quick">' + quick + "</div>"
    });
  }

  if (has(S.interests)) {
    add({
      id: "research", nav: "Research", kicker: "Research", title: "Research *interests.*", tint: true,
      blurb: "Where neural networks meet hydrology, Earth observation, and the infrastructure people rely on.",
      html: '<div class="color-grid">' + S.interests.map(function (i, n) {
        return '<article class="color-card ' + CARD_COLORS[n % CARD_COLORS.length] + ' reveal"><span class="num">' + pad(n + 1) + "</span>" +
          '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true">' + ICONS[n % ICONS.length] + "</svg>" +
          "<h3>" + esc(i.title) + "</h3><p>" + esc(i.text) + "</p></article>";
      }).join("") + "</div>"
    });
  }

  if (has(S.projects)) {
    add({
      id: "projects", nav: "Projects", kicker: "Selected work", title: "Featured *projects.*",
      blurb: "Research software and tools. Links are shown where the code or a live version is public.",
      html: '<div class="project-grid">' + S.projects.map(function (x, n) {
        var links = link("View project ↗", x.link) + link("Source code ↗", x.repo);
        return '<article class="project reveal">' + banner(n, x.period) + '<div class="project-body">' +
          (has(x.tags) ? '<span class="eyebrow">' + x.tags.map(esc).join(" · ") + "</span>" : "") +
          "<h3>" + esc(x.title) + "</h3><p>" + esc(x.description) + "</p>" + bullets(x.points) +
          (links ? '<div class="card-links">' + links + "</div>" : "") +
          "</div></article>";
      }).join("") + "</div>" +
        '<p class="note">Card artwork is decorative, not measured data or scientific results.</p>'
    });
  }

  function entries(list) {
    return '<div class="entries">' + list.map(function (e) {
      return '<div class="entry reveal"><div class="when">' + esc(e.period) + "</div><div>" +
        "<h4>" + esc(e.role) + "</h4>" +
        (e.org ? '<div class="org">' + (link(e.org + " ↗", e.url) || esc(e.org)) + "</div>" : "") +
        (e.text ? "<p>" + esc(e.text) + "</p>" : "") +
        bullets(e.points) + "</div></div>";
    }).join("") + "</div>";
  }
  if (has(S.experience) || has(S.education)) {
    add({
      id: "experience", nav: "Experience", kicker: "Background", title: "Experience & *education.*", tint: true,
      blurb: "From designing dams and irrigation schemes in Ethiopia to AI research in the United States and Europe.",
      html: (has(S.experience) ? '<h3 class="sub">Experience</h3>' + entries(S.experience) : "") +
        (has(S.education) ? '<h3 class="sub">Education</h3>' + entries(S.education) : "")
    });
  }

  if (has(S.publications)) {
    var me = new RegExp("(" + esc(p.citeAs || "Teklu, H.").replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + ")");
    add({
      id: "publications", nav: "Publications", kicker: "Publications", title: "Published *research.*",
      blurb: "Journal articles, conference papers, preprints and presentations.",
      html: S.publications.map(function (g) {
        return '<h3 class="sub">' + esc(g.group) + '</h3><ol class="pubs">' + g.items.map(function (x) {
          var y = String(x.year || "");
          var label = /arxiv/i.test(x.link || "") ? "arXiv ↗" : /doi\.org/i.test(x.link || "") ? "DOI ↗" : "Read ↗";
          return '<li class="reveal"><span class="year' + (/^\d{4}$/.test(y) ? "" : " small") + '">' + esc(y) + "</span><div>" +
            "<strong>" + esc(x.title) + "</strong>" +
            '<div class="cite">' + esc(x.authors).replace(me, "<b>$1</b>") +
            (x.venue ? " · <em>" + esc(x.venue) + "</em>" : "") + "</div></div>" +
            (link(label, x.link, "chip") || "<span></span>") + "</li>";
        }).join("") + "</ol>";
      }).join("")
    });
  }

  if (has(S.skills)) {
    add({
      id: "skills", nav: "Skills", kicker: "Toolkit", title: "Tools & *methods.*", tint: true,
      html: '<div class="skills">' + S.skills.map(function (g) {
        return '<div class="skill-row reveal"><h3>' + esc(g.group) + "</h3>" + tags(g.items) + "</div>";
      }).join("") + "</div>"
    });
  }

  function tiles(list, linkLabel) {
    return '<div class="tiles">' + list.map(function (c) {
      var foot = (c.date ? '<span class="date">' + esc(c.date) + "</span>" : "<span></span>") + link(linkLabel, c.link);
      return '<div class="tile reveal"><h3>' + esc(c.title) + "</h3>" +
        (c.issuer ? '<div class="issuer">' + esc(c.issuer) + "</div>" : "") +
        (has(c.links) ? '<div class="sublinks">' + c.links.map(function (l) { return link(l.label, l.url); }).join("") + "</div>" : "") +
        (c.date || href(c.link) ? '<div class="foot">' + foot + "</div>" : "") +
        "</div>";
    }).join("") + "</div>";
  }
  if (has(S.awards) || has(S.certificates) || has(S.training)) {
    var html = "";
    if (has(S.awards)) html += '<h3 class="sub">Awards &amp; honors</h3>' + tiles(S.awards, "Details ↗");
    if (has(S.training)) html += '<h3 class="sub">Training</h3>' + tiles(S.training, "Details ↗");
    if (has(S.certificates)) {
      var first = S.certificates.slice(0, 6), rest = S.certificates.slice(6);
      html += '<h3 class="sub">Certificates</h3>' + tiles(first, "View credential ↗") +
        (rest.length ? '<details class="more"><summary>Show all ' + S.certificates.length +
          " certificates</summary>" + tiles(rest, "View credential ↗") + "</details>" : "");
    }
    add({
      id: "credentials", nav: "Credentials", kicker: "Credentials", title: "Awards, training & *certificates.*",
      html: html
    });
  }

  var c = S.contact || {};
  var contactHtml = "";
  if (c.text || c.email) {
    var others = (p.links || []).filter(function (l) { return !/^mailto:/i.test(l.url || ""); })
      .map(function (l) { return link(l.label + " ↗", l.url, "btn ghost"); }).join("");
    contactHtml = '<section class="contact" id="contact"><div class="wrap">' +
      '<span class="kicker">' + pad(sections.length + 1) + " / Contact</span>" +
      "<h2>" + em(c.heading || "Let’s work on *water and AI* together.") + "</h2>" +
      (c.text ? "<p>" + esc(c.text) + "</p>" : "") +
      '<div class="actions">' + (c.email ? link(c.email + " ↗", "mailto:" + c.email, "btn light") : "") + others + "</div>" +
      "</div></section>";
  }

  document.getElementById("sections").innerHTML = sections.map(function (s, i) {
    var head = '<span class="kicker">' + pad(i + 1) + " / " + esc(s.kicker) + "</span>";
    if (s.split) {
      return '<section class="section" id="' + s.id + '"><div class="wrap split">' +
        "<div>" + head + "<h2>" + em(s.title) + "</h2></div>" +
        '<div class="prose">' + s.html + "</div></div></section>";
    }
    return '<section class="section' + (s.tint ? " tint" : "") + '" id="' + s.id + '"><div class="wrap">' +
      '<header class="sec-head"><div>' + head + "<h2>" + em(s.title) + "</h2></div>" +
      (s.blurb ? "<p>" + esc(s.blurb) + "</p>" : "") + "</header>" + s.html + "</div></section>";
  }).join("") + contactHtml;

  document.getElementById("nav-links").innerHTML = sections.map(function (s) {
    return '<a href="#' + s.id + '">' + esc(s.nav) + "</a>";
  }).join("") + (contactHtml ? '<a class="cta" href="#contact">Contact ↗</a>' : "");

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
    document.querySelectorAll(".section, .contact").forEach(function (el) { io.observe(el); });

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
})();
