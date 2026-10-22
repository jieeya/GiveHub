
// ================= ROLE SELECTION =================

// Find all three role buttons.
const roleCards = document.querySelectorAll(".role-card");

// Store the selected role in the hidden form field.
const selectedRole = document.getElementById("selectedRole");

// Run this when a user selects Donor, Recipient, or Volunteer.
roleCards.forEach(function (card) {
    card.addEventListener("click", function () {

        // Remove the selected appearance from every role.
        roleCards.forEach(function (otherCard) {
            otherCard.classList.remove("selected");
            otherCard.setAttribute("aria-pressed", "false");
        });

        // Highlight the selected role.
        card.classList.add("selected");
        card.setAttribute("aria-pressed", "true");

        // Save the selected role for the form.
        selectedRole.value = card.dataset.role;
    });
});


// ================= SHOW OR HIDE PASSWORD =================

const newPassword = document.getElementById("newPassword");
const togglePassword = document.getElementById("togglePassword");

togglePassword.addEventListener("click", function () {

    // Switch between hidden and visible password.
    if (newPassword.type === "password") {
        newPassword.type = "text";
        togglePassword.textContent = "Hide";
    } else {
        newPassword.type = "password";
        togglePassword.textContent = "Show";
    }
});


// ================= REGISTRATION FORM =================

const registerForm = document.getElementById("registerForm");
const registerMessage = document.getElementById("registerMessage");

registerForm.addEventListener("submit", function (event) {

    // Prevent the page from refreshing.
    event.preventDefault();

    // Read both password fields.
    const password = newPassword.value;
    const confirmPassword =
        document.getElementById("confirmPassword").value;

    // Check whether the passwords match.
    if (password !== confirmPassword) {
        registerMessage.textContent = "Passwords do not match. Please try again.";
        registerMessage.style.color = "#d93025";
        return;
    }

    // The browser checks required fields before this code runs.
    // The account will be saved when we connect Flask and MySQL.
    registerMessage.textContent =
        "Registration form is working! Account creation will be enabled after backend integration.";

    registerMessage.style.color = "#267447";

    // Display the selected role in the browser console for testing.
    console.log("Selected role:", selectedRole.value);
});
