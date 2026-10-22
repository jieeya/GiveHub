
// =====================================================
// GIVEHUB HOME PAGE JAVASCRIPT
// This file adds interactive behaviour to the website.
// =====================================================


// ---------- 1. SELECT THE MENU ELEMENTS ----------

// Finds the mobile menu button in the HTML.
const menuToggle = document.getElementById("menuToggle");

// Finds the navigation bar containing the page links.
const navbar = document.getElementById("navbar");


// ---------- 2. MOBILE MENU INTERACTION ----------

// Checks that both elements exist before adding events.
if (menuToggle && navbar) {

    // Runs when the user clicks the mobile menu button.
    menuToggle.addEventListener("click", function () {

        // Adds the menu class if closed, or removes it if open.
        const isMenuOpen = navbar.classList.toggle("show-menu");

        // Updates the accessibility state of the button.
        menuToggle.setAttribute("aria-expanded", isMenuOpen);

        // Changes the symbol to show the current menu state.
        menuToggle.textContent = isMenuOpen ? "✕" : "☰";

        // Updates the accessible label for the next interaction.
        menuToggle.setAttribute(
            "aria-label",
            isMenuOpen ? "Close navigation menu" : "Open navigation menu"
        );
    });


    // Closes the mobile menu after a navigation link is clicked.
    navbar.querySelectorAll("a").forEach(function (link) {

        // Adds a click event to each navigation link.
        link.addEventListener("click", function () {

            // Hides the menu on mobile.
            navbar.classList.remove("show-menu");

            // Resets the button's accessibility state.
            menuToggle.setAttribute("aria-expanded", "false");

            // Restores the menu icon.
            menuToggle.textContent = "☰";

            // Restores the button label.
            menuToggle.setAttribute(
                "aria-label",
                "Open navigation menu"
            );
        });
    });
}
