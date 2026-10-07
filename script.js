/* =====================================================
   ELEMENTS
===================================================== */

const menu = document.querySelector(".menu-btn");
const nav = document.querySelector(".nav");
const themeBtn = document.querySelector(".theme-btn");


/* =====================================================
   MENU
===================================================== */

function openMenu() {

  if (!menu || !nav) {
    return;
  }

  nav.classList.add("open");

  menu.setAttribute(
    "aria-expanded",
    "true"
  );

  menu.setAttribute(
    "aria-label",
    "Close menu"
  );
}


function closeMenu() {

  if (!menu || !nav) {
    return;
  }

  nav.classList.remove("open");

  menu.setAttribute(
    "aria-expanded",
    "false"
  );

  menu.setAttribute(
    "aria-label",
    "Open menu"
  );
}


/* =====================================================
   MENU BUTTON — ☰ / X
===================================================== */

if (menu && nav) {

  menu.addEventListener("click", (event) => {

    // Prevent the document click event
    // from reopening/affecting the menu.
    event.stopPropagation();

    const isOpen =
      nav.classList.contains("open");

    if (isOpen) {

      // X → CLOSE
      closeMenu();

    } else {

      // ☰ → OPEN
      openMenu();

    }

  });


  /* ===================================================
     NAVIGATION LINKS
  =================================================== */

  document
    .querySelectorAll(".nav a")
    .forEach((link) => {

      link.addEventListener("click", () => {

        closeMenu();

      });

    });


  /* ===================================================
     CLICK INSIDE MENU
  =================================================== */

  nav.addEventListener("click", (event) => {

    // Keep the menu open when clicking
    // the theme button or other menu areas.
    event.stopPropagation();

  });


  /* ===================================================
     CLICK OUTSIDE MENU
  =================================================== */

  document.addEventListener("click", () => {

    if (nav.classList.contains("open")) {

      closeMenu();

    }

  });


  /* ===================================================
     ESC KEY
  =================================================== */

  document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {

      closeMenu();

    }

  });

}


/* =====================================================
   THEME BUTTON
===================================================== */

function updateThemeButton(isDark) {

  if (!themeBtn) {
    return;
  }


  if (isDark) {

    themeBtn.innerHTML = `
      <i class="fa-solid fa-sun"></i>
      <span>Theme</span>
    `;

    themeBtn.setAttribute(
      "aria-label",
      "Switch to light mode"
    );

    themeBtn.setAttribute(
      "title",
      "Switch to light mode"
    );

  } else {

    themeBtn.innerHTML = `
      <i class="fa-solid fa-moon"></i>
      <span>Theme</span>
    `;

    themeBtn.setAttribute(
      "aria-label",
      "Switch to dark mode"
    );

    themeBtn.setAttribute(
      "title",
      "Switch to dark mode"
    );

  }

}


/* =====================================================
   BROWSER THEME COLOR
===================================================== */

function updateBrowserThemeColor(isDark) {

  const themeColor =
    document.querySelector(
      'meta[name="theme-color"]'
    );


  if (!themeColor) {
    return;
  }


  themeColor.setAttribute(
    "content",
    isDark
      ? "#080e17"
      : "#f5f3ed"
  );

}


/* =====================================================
   SET THEME
===================================================== */

function setTheme(theme) {

  const isDark =
    theme === "dark";


  document.body.classList.toggle(
    "dark-mode",
    isDark
  );


  document.body.classList.toggle(
    "light-mode",
    !isDark
  );


  updateThemeButton(
    isDark
  );


  updateBrowserThemeColor(
    isDark
  );


  localStorage.setItem(
    "theme",
    isDark
      ? "dark"
      : "light"
  );

}


/* =====================================================
   LOAD SAVED THEME
===================================================== */

const savedTheme =
  localStorage.getItem("theme");


if (savedTheme === "light") {

  setTheme("light");

} else {

  // Dark mode is the default.
  setTheme("dark");

}


/* =====================================================
   THEME CLICK
===================================================== */

if (themeBtn) {

  themeBtn.addEventListener(
    "click",
    (event) => {

      /*
        IMPORTANT:

        Stop the click from reaching the
        document click handler.

        This keeps the menu OPEN.
      */
      event.stopPropagation();


      const isDark =
        document.body.classList.contains(
          "dark-mode"
        );


      setTheme(
        isDark
          ? "light"
          : "dark"
      );


      /*
        IMPORTANT:

        There is NO closeMenu() here.

        Therefore:

        ☀️ → 🌙
        changes the theme but keeps
        the menu exactly where it is.
      */

    }
  );

}