/* =========================================================
   ELEMENTS
========================================================= */

const menu = document.querySelector(".menu-btn");
const nav = document.querySelector(".nav");
const themeBtn = document.querySelector(".theme-btn");


/* =========================================================
   MOBILE NAVIGATION
========================================================= */

if (menu && nav) {

  menu.addEventListener("click", () => {

    const isOpen = nav.classList.toggle("open");

    menu.setAttribute(
      "aria-expanded",
      String(isOpen)
    );

  });


  // Close menu after clicking a navigation link
  document.querySelectorAll(".nav a").forEach((link) => {

    link.addEventListener("click", () => {

      nav.classList.remove("open");

      menu.setAttribute(
        "aria-expanded",
        "false"
      );

    });

  });

}


/* =========================================================
   DARK / LIGHT MODE
========================================================= */

function updateThemeButton(isDark) {

  if (!themeBtn) return;

  themeBtn.innerHTML = isDark
    ? '<i class="fa-solid fa-sun"></i>'
    : '<i class="fa-solid fa-moon"></i>';

  themeBtn.setAttribute(
    "aria-label",
    isDark
      ? "Switch to light mode"
      : "Switch to dark mode"
  );

  themeBtn.setAttribute(
    "title",
    isDark
      ? "Switch to light mode"
      : "Switch to dark mode"
  );
}


function setTheme(theme) {

  const isDark = theme === "dark";

  document.body.classList.toggle(
    "dark-mode",
    isDark
  );

  updateThemeButton(isDark);

  localStorage.setItem(
    "theme",
    isDark ? "dark" : "light"
  );

}


/* Load saved theme */

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {

  setTheme("dark");

} else {

  setTheme("light");

}


/* Toggle theme */

if (themeBtn) {

  themeBtn.addEventListener("click", () => {

    const isDark =
      document.body.classList.contains("dark-mode");

    setTheme(
      isDark ? "light" : "dark"
    );

  });

}


/* =========================================================
   CLOSE MOBILE MENU WHEN CLICKING OUTSIDE
========================================================= */

document.addEventListener("click", (event) => {

  if (!menu || !nav) return;

  const clickedInsideMenu =
    menu.contains(event.target);

  const clickedInsideNav =
    nav.contains(event.target);

  if (
    !clickedInsideMenu &&
    !clickedInsideNav
  ) {

    nav.classList.remove("open");

    menu.setAttribute(
      "aria-expanded",
      "false"
    );

  }

});


/* =========================================================
   ESCAPE KEY
========================================================= */

document.addEventListener("keydown", (event) => {

  if (event.key !== "Escape") return;

  if (!nav || !menu) return;

  nav.classList.remove("open");

  menu.setAttribute(
    "aria-expanded",
    "false"
  );

});


/* =========================================================
   UPDATE BROWSER THEME COLOR
========================================================= */

function updateBrowserThemeColor(isDark) {

  const themeColor = document.querySelector(
    'meta[name="theme-color"]'
  );

  if (!themeColor) return;

  themeColor.setAttribute(
    "content",
    isDark ? "#0d1210" : "#f5f3ed"
  );

}


/* Keep browser UI color in sync */

if (themeBtn) {

  const observer = new MutationObserver(() => {

    const isDark =
      document.body.classList.contains("dark-mode");

    updateBrowserThemeColor(isDark);

  });

  observer.observe(document.body, {
    attributes: true,
    attributeFilter: ["class"]
  });

}


/* =========================================================
   CV DOWNLOAD
========================================================= */

function downloadCV(event) {

  if (event) {
    event.preventDefault();
  }

  const link = document.createElement("a");

  link.href = "./chhlav-phirom-cv-2.pdf";
  link.download = "chhlav-phirom-cv-2.pdf";

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);

}