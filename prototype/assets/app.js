/* Jottem prototype — gedeelde shell, mock-data en interacties (self-contained) */
(function () {
  "use strict";

  // ---------- Root path (pagina's zetten data-root op <body>) ----------
  var ROOT = (document.body.getAttribute("data-root") || ".").replace(/\/?$/, "/");
  function r(p) { return ROOT + p; }

  // ---------- Rollen voor de rol-switcher ----------
  var ROLES = [
    { key: "bezoeker", label: "Bezoeker", sub: "publieke website", href: "public/organisatie.html" },
    { key: "gebruiker", label: "Gebruiker", sub: "ingelogd account", href: "account/mijn-jottems.html" },
    { key: "uploader", label: "Uploader", sub: "materiaal toevoegen", href: "uploader/uploaden.html" },
    { key: "annoteerder", label: "Annoteerder", sub: "verrijken & annoteren", href: "annoteren/annoteren.html" },
    { key: "moderator", label: "Moderator", sub: "beoordelen & publiceren", href: "moderator/wachtrij.html" },
    { key: "organisatiebeheerder", label: "Organisatiebeheerder", sub: "moderators & collecties", href: "organisatiebeheer/moderators.html" },
    { key: "platformbeheerder", label: "Platformbeheerder", sub: "organisaties & beheerders", href: "platformbeheer/organisaties.html" },
    { key: "api", label: "API-gebruiker", sub: "hergebruik via API's", href: "api/api.html" }
  ];

  // ---------- Mock-dataset: Smaak van Gouda ----------
  var JOTTEMS = [
    { id: "ark:/27023/g8x2", titel: "Chinees-Indisch restaurant Lotus", genre: "foto", soort: "gevel", adres: "Markt 41", jaar: "1973", door: "Fotostudio Van Leeuwen", status: "goedgekeurd", annos: 7, seed: "lotus" },
    { id: "ark:/27023/k4m9", titel: "Menukaart Lotus", genre: "menukaart", soort: "menukaart", adres: "Markt 41", jaar: "1975", door: "onbekend", status: "goedgekeurd", annos: 3, seed: "lotusmenu" },
    { id: "ark:/27023/p1q7", titel: "Café De Zalm, terras", genre: "foto", soort: "interieur", adres: "Markt 34", jaar: "1962", door: "G. Okkerse", status: "goedgekeurd", annos: 12, seed: "zalm" },
    { id: "ark:/27023/w3r5", titel: "Advertentie IJssalon Talamini", genre: "advertentie", soort: "advertentie", adres: "Kleiweg 12", jaar: "1958", door: "Goudsche Courant", status: "goedgekeurd", annos: 2, seed: "talamini" },
    { id: "ark:/27023/t9b2", titel: "Shoarmazaak Antalya, personeel", genre: "foto", soort: "personeel", adres: "Wijdstraat 7", jaar: "1989", door: "familie Yılmaz", status: "goedgekeurd", annos: 5, seed: "antalya" },
    { id: "ark:/27023/n6v8", titel: "Snackbar 't Hoekje", genre: "foto", soort: "gevel", adres: "Nieuwe Markt 2", jaar: "1981", door: "onbekend", status: "goedgekeurd", annos: 4, seed: "hoekje" },
    { id: "ark:/27023/d2f4", titel: "Pizzeria Napoli, opening", genre: "krantenartikel", soort: "advertentie", adres: "Hoogstraat 19", jaar: "1984", door: "Goudsche Courant", status: "goedgekeurd", annos: 1, seed: "napoli" },
    { id: "ark:/27023/y7h3", titel: "Surinaams eethuis Paramaribo", genre: "foto", soort: "interieur", adres: "Vest 50", jaar: "1992", door: "R. Karijowidjojo", status: "goedgekeurd", annos: 6, seed: "para" }
  ];

  // mijn uploads (verschillende statussen)
  var MIJN = [
    { titel: "Lunchroom Centraal, interieur", genre: "foto", soort: "interieur", jaar: "1968", status: "goedgekeurd", annos: 9, ark: "ark:/27023/c1a0", seed: "centraal" },
    { titel: "Menukaart Grand Café Central", genre: "menukaart", soort: "menukaart", jaar: "1970", status: "nieuw", annos: 0, ark: "—", seed: "central" },
    { titel: "Automatiek De Munt", genre: "foto", soort: "gevel", jaar: "1979", status: "afgekeurd", annos: 0, ark: "—", seed: "munt", reden: "Recente, herkenbare personen zichtbaar — toestemming ontbreekt." }
  ];

  // panden met opvolgende vestigingen (voor kaart-tijdlijn)
  var PANDEN = [
    { adres: "Markt 41", x: 52, y: 46, vestigingen: [
        { jaar: "1931–1958", naam: "Koffiehuis Het Centrum", genre: "koffiehuis" },
        { jaar: "1958–1972", naam: "Cafetaria De Markt", genre: "cafetaria" },
        { jaar: "1973–1996", naam: "Chinees-Indisch restaurant Lotus", genre: "restaurant" },
        { jaar: "1997–heden", naam: "Lunchroom Bij Saar", genre: "lunchroom" } ] },
    { adres: "Kleiweg 12", x: 40, y: 33, vestigingen: [
        { jaar: "1949–1981", naam: "IJssalon Talamini", genre: "ijssalon" },
        { jaar: "1982–2004", naam: "Broodjeszaak Kleiweg", genre: "broodjeszaak" },
        { jaar: "2005–heden", naam: "Koffiebar Stadshart", genre: "koffiebar" } ] },
    { adres: "Wijdstraat 7", x: 60, y: 58, vestigingen: [
        { jaar: "1965–1988", naam: "Café De Drie Notenboomen", genre: "café" },
        { jaar: "1989–heden", naam: "Shoarmazaak Antalya", genre: "shoarmazaak" } ] },
    { adres: "Vest 50", x: 30, y: 64, vestigingen: [
        { jaar: "1950–1991", naam: "Melkinrichting De Vest", genre: "melkbar" },
        { jaar: "1992–2013", naam: "Surinaams eethuis Paramaribo", genre: "eethuis" },
        { jaar: "2014–heden", naam: "Poke & Bowl Gouda", genre: "wereldkeuken" } ] }
  ];

  var ANNOS = [
    { who: "Riet Bakker", init: "RB", when: "12 mrt 2026", txt: "Mijn ouders aten hier elke verjaardag. De babi pangang was beroemd in heel Gouda!", region: "Persoon: ober (rechts)", reply: { who: "Theo Lotus", init: "TL", when: "13 mrt 2026", txt: "Dat was mijn vader, hij begon het restaurant in 1973." } },
    { who: "Han de Vries", init: "HV", when: "3 feb 2026", txt: "Het pand ernaast was toen nog kapperszaak Van Dijk.", region: null, reply: null },
    { who: "Streekarchief MH", init: "SA", when: "28 jan 2026", txt: "Bouwvergunning uit 1972 bevestigt de verbouwing tot restaurant.", region: "Bron: archiefstuk 1972", reply: null }
  ];

  // expose
  window.JOTTEM = { JOTTEMS: JOTTEMS, MIJN: MIJN, PANDEN: PANDEN, ANNOS: ANNOS };

  // ---------- SVG foto-placeholder generator ----------
  function hash(s) { var h = 0; s = s || "x"; for (var i = 0; i < s.length; i++) { h = (h << 5) - h + s.charCodeAt(i); h |= 0; } return Math.abs(h); }
  var ICONS = {
    gevel: '<g stroke="#fff" stroke-width="3" fill="none" opacity=".9"><rect x="58" y="64" width="84" height="70"/><rect x="70" y="78" width="20" height="20"/><rect x="110" y="78" width="20" height="20"/><rect x="86" y="108" width="28" height="26"/><path d="M52 64 100 36 148 64"/></g>',
    interieur: '<g stroke="#fff" stroke-width="3" fill="none" opacity=".9"><circle cx="80" cy="92" r="16"/><circle cx="124" cy="92" r="16"/><path d="M64 118h72M100 76v-16"/></g>',
    menukaart: '<g stroke="#fff" stroke-width="3" fill="none" opacity=".92"><rect x="70" y="50" width="60" height="84" rx="4"/><path d="M82 70h36M82 84h36M82 98h24M82 112h30"/></g>',
    advertentie: '<g stroke="#fff" stroke-width="3" fill="none" opacity=".9"><rect x="58" y="58" width="84" height="64" rx="4"/><path d="M70 76h60M70 90h40M70 104h54"/></g>',
    personeel: '<g stroke="#fff" stroke-width="3" fill="none" opacity=".9"><circle cx="84" cy="80" r="13"/><circle cx="120" cy="84" r="11"/><path d="M64 124c2-16 14-24 24-24s22 8 24 24M104 124c2-12 9-18 18-18s15 6 16 16"/></g>'
  };
  function genPhoto(seed, kind) {
    var h = hash(seed), hue = h % 360, hue2 = (hue + 28) % 360;
    var c1 = "hsl(" + hue + ",42%,46%)", c2 = "hsl(" + hue2 + ",46%,34%)";
    var icon = ICONS[kind] || ICONS.gevel;
    return '<svg viewBox="0 0 200 150" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;display:block">' +
      '<defs><linearGradient id="g' + h + '" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="' + c1 + '"/><stop offset="1" stop-color="' + c2 + '"/></linearGradient></defs>' +
      '<rect width="200" height="150" fill="url(#g' + h + ')"/>' + icon + '</svg>';
  }
  window.genPhoto = genPhoto;

  // ---------- DOM helpers ----------
  function el(html) { var t = document.createElement("template"); t.innerHTML = html.trim(); return t.content.firstChild; }

  function buildTopbar() {
    var role = document.body.getAttribute("data-role") || "";
    var items = ROLES.map(function (x) {
      return '<a class="' + (x.key === role ? "current" : "") + '" href="' + r(x.href) + '"><b>' + x.label + '</b><span>' + x.sub + '</span></a>';
    }).join("");
    var bar = el(
      '<header class="topbar"><div class="inner">' +
        '<a class="brand" href="' + r("index.html") + '"><span class="logo">J</span>Jottem</a>' +
        '<span class="badge-proto">Prototype</span>' +
        '<span class="spacer"></span>' +
        '<nav><a href="' + r("index.html") + '">Rondleiding</a>' +
        '<a href="' + r("public/verkennen.html") + '">Verkennen</a>' +
        '<a href="' + r("public/kaart.html") + '">Kaart</a></nav>' +
        '<div class="role-switch"><button id="roleBtn">Rol: ' + (roleLabel(role) || "kies") + ' ▾</button>' +
        '<div class="role-menu" id="roleMenu">' + items + '</div></div>' +
      '</div></header>');
    document.body.insertBefore(bar, document.body.firstChild);
    var btn = bar.querySelector("#roleBtn"), menu = bar.querySelector("#roleMenu");
    btn.addEventListener("click", function (e) { e.stopPropagation(); menu.classList.toggle("open"); });
    document.addEventListener("click", function () { menu.classList.remove("open"); });
  }
  function roleLabel(k) { var f = ROLES.filter(function (x) { return x.key === k; })[0]; return f ? f.label : ""; }

  function buildFooter() {
    var f = el('<footer class="proto-foot">Jottem · klikbaar prototype voor de pilot <b>Smaak van Gouda</b> (Streekarchief Midden-Holland). ' +
      'Alle gegevens zijn fictieve voorbeelden; acties worden niet echt opgeslagen.</footer>');
    document.body.appendChild(f);
  }

  // ---------- Toasts ----------
  function toast(msg) {
    var holder = document.getElementById("toasts");
    if (!holder) { holder = el('<div id="toasts"></div>'); document.body.appendChild(holder); }
    var t = el('<div class="toast"><span class="ic">✓</span>' + msg + '</div>');
    holder.appendChild(t);
    requestAnimationFrame(function () { t.classList.add("show"); });
    setTimeout(function () { t.classList.remove("show"); setTimeout(function () { t.remove(); }, 250); }, 2600);
  }
  window.toast = toast;

  // ---------- Modals ----------
  function bindModals() {
    document.querySelectorAll("[data-open]").forEach(function (b) {
      b.addEventListener("click", function () { var m = document.getElementById(b.getAttribute("data-open")); if (m) m.classList.add("open"); });
    });
    document.querySelectorAll(".modal-back").forEach(function (back) {
      back.addEventListener("click", function (e) { if (e.target === back || e.target.hasAttribute("data-close")) back.classList.remove("open"); });
    });
  }

  // ---------- Tabs ----------
  function bindTabs() {
    document.querySelectorAll(".tabs").forEach(function (tabs) {
      tabs.querySelectorAll("button").forEach(function (btn) {
        btn.addEventListener("click", function () {
          var id = btn.getAttribute("data-tab");
          tabs.querySelectorAll("button").forEach(function (b) { b.classList.toggle("active", b === btn); });
          var scope = tabs.parentElement;
          scope.querySelectorAll(".tab-panel").forEach(function (p) { p.classList.toggle("active", p.id === id); });
        });
      });
    });
  }

  // ---------- Chips (filters, puur visueel) ----------
  function bindChips() {
    document.querySelectorAll(".chips").forEach(function (group) {
      group.querySelectorAll(".chip").forEach(function (c) {
        c.addEventListener("click", function () {
          if (group.hasAttribute("data-single")) group.querySelectorAll(".chip").forEach(function (x) { x.classList.remove("active"); });
          c.classList.toggle("active");
        });
      });
    });
  }

  // ---------- Favorites ----------
  function bindFavs() {
    document.addEventListener("click", function (e) {
      var f = e.target.closest(".fav"); if (!f) return;
      e.preventDefault();
      f.classList.toggle("on");
      f.textContent = f.classList.contains("on") ? "♥" : "♡";
      toast(f.classList.contains("on") ? "Toegevoegd aan favorieten" : "Verwijderd uit favorieten");
    });
  }

  // ---------- Demo-acties (knoppen/forms met data-demo) ----------
  function bindDemo() {
    document.querySelectorAll("form[data-demo]").forEach(function (form) {
      form.addEventListener("submit", function (e) { e.preventDefault(); toast(form.getAttribute("data-demo") || "Opgeslagen"); var m = form.closest(".modal-back"); if (m) m.classList.remove("open"); });
    });
    document.querySelectorAll("[data-demo]:not(form)").forEach(function (b) {
      b.addEventListener("click", function (e) {
        if (b.tagName === "A") e.preventDefault();
        toast(b.getAttribute("data-demo") || "Gedaan"); var m = b.closest(".modal-back"); if (m) m.classList.remove("open");
      });
    });
  }

  // ---------- Photo placeholders ----------
  function fillPhotos() {
    document.querySelectorAll(".ph[data-seed]").forEach(function (p) {
      if (p.getAttribute("data-done")) return;
      p.innerHTML = genPhoto(p.getAttribute("data-seed"), p.getAttribute("data-kind") || "gevel");
      p.setAttribute("data-done", "1");
    });
  }
  window.fillPhotos = fillPhotos;

  // ---------- Reusable thumb / render helpers ----------
  function thumbHTML(j, href) {
    return '<a class="thumb" href="' + (href || "#") + '">' +
      '<span class="ph" data-seed="' + j.seed + '" data-kind="' + (j.soort || "gevel") + '"></span>' +
      '<span class="genre tag green">' + j.genre + '</span>' +
      '<button class="fav" title="Favoriet" type="button">♡</button>' +
      '<span class="cap">' + j.titel + ' · ' + j.jaar + '</span></a>';
  }
  window.thumbHTML = thumbHTML;
  function renderThumbs(sel, list, href) {
    var box = document.querySelector(sel); if (!box) return;
    box.innerHTML = list.map(function (j) { return thumbHTML(j, href); }).join("");
    fillPhotos();
  }
  window.renderThumbs = renderThumbs;

  document.addEventListener("DOMContentLoaded", function () {
    buildTopbar();
    fillPhotos();
    bindModals(); bindTabs(); bindChips(); bindFavs(); bindDemo();
    buildFooter();
  });
})();
