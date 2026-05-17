(function () {
  "use strict";
  const forms = document.querySelectorAll("form[novalidate]");
  forms.forEach(function (form) {
    form.addEventListener("submit", function (event) {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }
      form.classList.add("was-validated");
    });
  });
})();

window.addEventListener("scroll", function () {
  const nav = document.querySelector(".navbar-custom");
  if (nav) {
    if (window.scrollY > 50) {
      nav.style.boxShadow = "0 2px 12px rgba(0,0,0,0.06)";
    } else {
      nav.style.boxShadow = "none";
    }
  }
});
