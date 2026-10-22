
// ================= SHOW OR HIDE PASSWORD =================

// Find the password input and its button.
const passwordInput = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");

// Change the password field between hidden and visible.
togglePassword.addEventListener("click", function () {
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        togglePassword.textContent = "Hide";
    } else {
        passwordInput.type = "password";
        togglePassword.textContent = "Show";
    }
});


// ================= LOGIN FORM VALIDATION =================

// Find the login form and message area.
const loginForm = document.getElementById("loginForm");
const formMessage = document.getElementById("formMessage");

// Run this code when the user submits the form.
loginForm.addEventListener("submit", function (event) {
    // Prevent the page from reloading.
    event.preventDefault();

    // Read the email and password entered by the user.
    const email = document.getElementById("email").value.trim();
    const password = passwordInput.value;

    // Check whether both fields contain information.
    if (email === "" || password === "") {
        formMessage.textContent = "Please fill in all required fields.";
        formMessage.style.color = "#d93025";
        return;
    }

    // The backend will verify the account later.
    formMessage.textContent =
        "Frontend ready! Account login will work after backend integration.";
    formMessage.style.color = "#267447";
});


// ================= FORGOT PASSWORD LINK =================

// This is a placeholder until a password-reset page is created.
document.getElementById("forgotPassword").addEventListener("click", function (event) {
    event.preventDefault();

    formMessage.textContent =
        "Password reset will be added during backend development.";
    formMessage.style.color = "#b56a28";
});
