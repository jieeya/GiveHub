
/* Select the donation form and message area */
const donationForm = document.getElementById("donationForm");
const formMessage = document.getElementById("formMessage");
const categoryInput = document.getElementById("category");
const expiryInput = document.getElementById("expiry");

/* Require an expiry date for food donations */
categoryInput.addEventListener("change", function () {
    if (categoryInput.value === "Food") {
        expiryInput.required = true;
    } else {
        expiryInput.required = false;
    }
});

/* Handle form submission */
donationForm.addEventListener("submit", function (event) {
    // Stop the browser from refreshing the page.
    event.preventDefault();

    // Read the information entered by the donor.
    const itemName = document.getElementById("itemName").value.trim();
    const category = categoryInput.value;
    const quantity = document.getElementById("quantity").value;
    const unit = document.getElementById("unit").value;
    const location = document.getElementById("location").value.trim();

    // Check that the required information is available.
    if (!itemName || !category || !quantity || !unit || !location) {
        formMessage.style.color = "#c0392b";
        formMessage.textContent = "Please complete all required fields.";
        return;
    }

    // Show a temporary confirmation message.
    formMessage.style.color = "#26734d";
    formMessage.textContent =
        "Your donation details are ready! Database submission will be added when we build the backend.";

    console.log("Donation details:", {
        itemName: itemName,
        category: category,
        quantity: quantity,
        unit: unit,
        description: document.getElementById("description").value,
        location: location,
        expiryDate: expiryInput.value,
        urgency: document.getElementById("urgency").value
    });
});

