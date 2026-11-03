/* EN / AR language switch shared by index.html, cv.html and case-studies.html.
   Both languages live in the HTML (.en / .ar), so search engines and no-JS visitors see all content.
   Choice order: ?lang=ar|en in the URL -> saved choice -> English. */
(function () {
  var KEY = "lang";
  var root = document.documentElement;

  function initial() {
    try {
      var q = new URLSearchParams(location.search).get("lang");
      if (q === "ar" || q === "en") return q;
    } catch (e) {}
    try {
      var s = localStorage.getItem(KEY);
      if (s === "ar" || s === "en") return s;
    } catch (e) {}
    return "en";
  }

  function paintButtons(lang) {
    var btns = document.querySelectorAll("[data-lang-btn]");
    for (var i = 0; i < btns.length; i++) {
      btns[i].textContent = lang === "ar" ? "EN" : "AR";
      btns[i].setAttribute(
        "aria-label",
        lang === "ar" ? "Switch to English" : "التبديل إلى العربية",
      );
    }
  }

  function apply(lang) {
    root.lang = lang;
    root.dir = lang === "ar" ? "rtl" : "ltr";
    var title = root.getAttribute("data-title-" + lang);
    if (title) document.title = title;
    var desc = root.getAttribute("data-desc-" + lang);
    var meta = document.querySelector('meta[name="description"]');
    if (meta && desc) meta.setAttribute("content", desc);
    paintButtons(lang);
  }

  window.setLang = function (lang) {
    try {
      localStorage.setItem(KEY, lang);
    } catch (e) {}
    apply(lang);
  };
  window.toggleLang = function () {
    window.setLang(root.lang === "ar" ? "en" : "ar");
  };

  apply(initial());
  document.addEventListener("DOMContentLoaded", function () {
    paintButtons(root.lang);
  });
})();
