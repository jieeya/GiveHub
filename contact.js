
const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const fullName = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const userRole = document.getElementById("userRole").value;
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!fullName || !email || !userRole || !subject || !message) {
        showMessage("Please fill in all the required fields.", "error");
        return;
    }

    if (message.length < 10) {
        showMessage("Please write a message of at least 10 characters.", "error");
        return;
    }

    showMessage(
        "Demo successful! Your form has been validated. Messages are not sent to a real email yet.",
        "success"
    );

    console.log("GiveHub Contact Form Demo:", {
        fullName,
        email,
        userRole,
        subject,
        message
    });

    contactForm.reset();
});

function showMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = "form-message " + type;
}
