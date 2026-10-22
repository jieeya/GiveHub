
// ================= DONOR DASHBOARD SIDEBAR =================

// Find the sidebar and its menu button.
const sidebar = document.getElementById("sidebar");
const menuToggle = document.getElementById("menuToggle");

// Open or close the sidebar on smaller screens.
if (sidebar && menuToggle) {
    menuToggle.addEventListener("click", function () {
        sidebar.classList.toggle("open");
    });
}
