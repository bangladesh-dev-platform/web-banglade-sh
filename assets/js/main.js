(function () {
  "use strict";

  var CONFIG = {
    whatsapp: "8801324229999",
    email: "web@banglade.sh",
    ga4: "G-GD6MTYS28E",
    metaPixel: ""
  };

  var WA_NUM = CONFIG.whatsapp;
  var STORE_LANG = "wb-lang";
  var STORE_UTM = "wb-utm";

  var INTRO = {
    bn: "আসসালামু আলাইকুম। আমার ব্যবসার জন্য একটি ওয়েবসাইট/অ্যাপ নিয়ে কথা বলতে চাই।",
    en: "Hello. I'd like to talk about a website/app for my business."
  };

  function waLink(text) {
    return "https://wa.me/" + WA_NUM + (text ? "?text=" + encodeURIComponent(text) : "");
  }

  /* ---------- analytics ---------- */
  function track(name, params) {
    if (typeof window.gtag === "function") window.gtag("event", name, params || {});
  }
  function fbTrack(name, params) {
    if (typeof window.fbq === "function") window.fbq("track", name, params || {});
  }
  function initPixel() {
    var id = CONFIG.metaPixel;
    if (!id || window.fbq) return;
    !(function (f, b, e, v, n, t, s) {
      if (f.fbq) return;
      n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); };
      if (!f._fbq) f._fbq = n;
      n.push = n; n.loaded = !0; n.version = "2.0"; n.queue = [];
      t = b.createElement(e); t.async = !0; t.src = v;
      s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
    })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
    window.fbq("init", id);
    window.fbq("track", "PageView");
  }

  /* ---------- UTM ---------- */
  function readUtm() {
    var params = new URLSearchParams(window.location.search);
    var keys = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "fbclid"];
    var found = {};
    keys.forEach(function (k) { var v = params.get(k); if (v) found[k] = v; });
    if (Object.keys(found).length) {
      try { sessionStorage.setItem(STORE_UTM, JSON.stringify(found)); } catch (e) {}
      return found;
    }
    try { return JSON.parse(sessionStorage.getItem(STORE_UTM) || "{}"); } catch (e) { return {}; }
  }
  function utmSummary(utm) {
    var parts = [];
    if (utm.utm_source) parts.push(utm.utm_source);
    if (utm.utm_medium) parts.push(utm.utm_medium);
    if (utm.utm_campaign) parts.push(utm.utm_campaign);
    if (!parts.length && utm.fbclid) parts.push("facebook");
    return parts.join(" / ");
  }

  /* ---------- i18n ---------- */
  var defaults = {};
  function captureDefaults() {
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      defaults[el.getAttribute("data-i18n")] = el.textContent;
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) {
      defaults["ph:" + el.getAttribute("data-i18n-placeholder")] = el.getAttribute("placeholder") || "";
    });
    defaults["__title"] = document.title;
    var md = document.querySelector('meta[name="description"]');
    defaults["__desc"] = md ? md.getAttribute("content") : "";
  }
  function currentLang() {
    var q = new URLSearchParams(window.location.search).get("lang");
    if (q === "en" || q === "bn") return q;
    try { return localStorage.getItem(STORE_LANG) || "bn"; } catch (e) { return "bn"; }
  }
  var lang = "bn";
  function applyLang(next) {
    lang = next;
    var dict = (window.WB_I18N && window.WB_I18N.en) || {};
    var useEn = next === "en";
    document.documentElement.lang = useEn ? "en" : "bn";

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      el.textContent = useEn && dict[key] != null ? dict[key] : (defaults[key] || "");
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-placeholder");
      var fallback = defaults["ph:" + key] || "";
      el.setAttribute("placeholder", useEn && dict[key] != null ? dict[key] : fallback);
    });

    document.title = useEn && dict["meta.title"] ? dict["meta.title"] : defaults["__title"];
    var md = document.querySelector('meta[name="description"]');
    if (md) md.setAttribute("content", useEn && dict["meta.desc"] ? dict["meta.desc"] : defaults["__desc"]);

    var btn = document.querySelector("[data-lang-toggle]");
    if (btn) btn.querySelector("span").textContent = useEn ? "বাংলা" : "EN";

    refreshWaLinks();
    try { localStorage.setItem(STORE_LANG, next); } catch (e) {}
  }

  /* ---------- whatsapp links ---------- */
  function refreshWaLinks() {
    document.querySelectorAll("[data-wa]").forEach(function (el) {
      var kind = el.getAttribute("data-wa");
      var text = kind === "fab" || kind === "contact" ? "" : INTRO[lang];
      if (kind === "contact") text = "";
      el.setAttribute("href", waLink(text));
      el.setAttribute("target", "_blank");
      el.setAttribute("rel", "noopener");
    });
  }

  /* ---------- quote form ---------- */
  function buildOrderMessage() {
    var services = [];
    document.querySelectorAll('input[name="service"]:checked').forEach(function (input) {
      var txt = input.closest(".chip").querySelector(".txt");
      if (txt) services.push(txt.textContent.trim());
    });
    var budgetSel = document.getElementById("f-budget");
    var budget = budgetSel && budgetSel.selectedIndex > 0 ? budgetSel.options[budgetSel.selectedIndex].textContent.trim() : "";
    var details = (document.getElementById("f-message") || {}).value || "";
    details = details.trim();

    var utm = readUtm();
    var src = utmSummary(utm);
    var L = lang === "en"
      ? { head: "New enquiry — Web Bangladesh", svc: "Services", budget: "Budget", details: "Details", src: "Source" }
      : { head: "নতুন ইনকোয়ারি — Web Bangladesh", svc: "সেবা", budget: "বাজেট", details: "বিস্তারিত", src: "সোর্স" };

    var lines = ["*" + L.head + "*", ""];
    lines.push(L.svc + ": " + services.join(", "));
    if (budget) lines.push(L.budget + ": " + budget);
    if (details) lines.push(L.details + ": " + details);
    if (src) { lines.push(""); lines.push(L.src + ": " + src); }
    return lines.join("\n");
  }

  function initForm() {
    var form = document.getElementById("quote-form");
    if (!form) return;
    var status = document.getElementById("form-status");

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var services = form.querySelectorAll('input[name="service"]:checked');
      if (!services.length) {
        if (status) {
          status.className = "form-status err show";
          status.textContent = (window.WB_I18N.en && lang === "en")
            ? window.WB_I18N.en["form.err.services"]
            : "অনুগ্রহ করে অন্তত একটি সেবা নির্বাচন করুন।";
        }
        return;
      }
      if (status) { status.className = "form-status"; status.textContent = ""; }

      var message = buildOrderMessage();
      var value = 0;
      track("generate_lead", { method: "whatsapp_form", services: services.length });
      fbTrack("Lead", { content_name: "Quote form", value: value, currency: "BDT" });

      window.open(waLink(message), "_blank", "noopener");
      if (status) {
        status.className = "form-status ok show";
        status.textContent = lang === "en"
          ? "Opening WhatsApp… send the message there to confirm."
          : "WhatsApp খোলা হচ্ছে… সেখানে পাঠিয়ে নিশ্চিত করুন।";
      }
    });
  }

  /* ---------- ui ---------- */
  function initNav() {
    var burger = document.querySelector("[data-burger]");
    var nav = document.getElementById("nav");
    if (burger && nav) {
      burger.addEventListener("click", function () {
        var open = nav.classList.toggle("is-open");
        burger.setAttribute("aria-expanded", open ? "true" : "false");
      });
      nav.querySelectorAll("a").forEach(function (a) {
        a.addEventListener("click", function () {
          nav.classList.remove("is-open");
          burger.setAttribute("aria-expanded", "false");
        });
      });
    }
    var header = document.querySelector(".site-header");
    var onScroll = function () {
      if (header) header.classList.toggle("is-stuck", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  function initReveal() {
    var els = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      els.forEach(function (el) { el.classList.add("in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add("in"); io.unobserve(entry.target); }
      });
    }, { threshold: 0.12 });
    els.forEach(function (el) { io.observe(el); });
  }

  function initTrackingClicks() {
    document.querySelectorAll("[data-wa]").forEach(function (el) {
      el.addEventListener("click", function () {
        var kind = el.getAttribute("data-wa") || "link";
        track("contact_whatsapp", { location: kind });
        fbTrack("Contact", { content_name: kind });
      });
    });
  }

  function init() {
    captureDefaults();
    initPixel();
    applyLang(currentLang());
    initNav();
    initForm();
    initReveal();
    initTrackingClicks();

    var yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    var toggle = document.querySelector("[data-lang-toggle]");
    if (toggle) {
      toggle.addEventListener("click", function () {
        applyLang(lang === "en" ? "bn" : "en");
      });
    }

    fbTrack("ViewContent", { content_name: "Landing" });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
