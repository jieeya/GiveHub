
/* Select the form and message area */
const requestForm = document.getElementById("requestForm");
const formMessage = document.getElementById("formMessage");

/* Handle form submission */
requestForm.addEventListener("submit", function (event) {
    // Prevent the page from refreshing.
    event.preventDefault();

    // Read and clean the user's input.
    const name = document.getElementById("requesterName").value.trim();
    const requesterType = document.getElementById("requesterType").value;
    const category = document.getElementById("category").value;
    const quantity = Number(document.getElementById("quantity").value);
    const unit = document.getElementById("unit").value;
    const location = document.getElementById("location").value.trim();
    const contact = document.getElementById("contact").value.trim();

    // Check the required fields.
    if (
        !name ||
        !requesterType ||
        !category ||
        quantity < 1 ||
        !unit ||
        !location ||
        !contact
    ) {
        formMessage.style.color = "#c0392b";
        formMessage.textContent =
            "Please complete all required fields correctly.";
        return;
    }

    // Prepare the request details.
    const requestDetails = {
        name: name,
        requesterType: requesterType,
        category: category,
        quantity: quantity,
        unit: unit,
        description: document.getElementById("description").value.trim(),
        location: location,
        urgency: document.getElementById("urgency").value,
        neededBy: document.getElementById("neededBy").value,
        contact: contact
    };

    // Display a confirmation for this front-end demonstration.
    formMessage.style.color = "#26734d";
    formMessage.textContent =
        "Your request details are ready! Database submission will be added with the backend.";

    // Display the details in the browser's developer console.
    console.log("Resource request:", requestDetails);
});
