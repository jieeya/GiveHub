
// GiveHub - Donation Details Page

// Default sample donation information.
const sampleDonation = {
    title: "Fresh Vegetables",
    category: "Food",
    urgency: "Urgent",
    donor: "Community Food Donor",
    quantity: "8 kg",
    location: "Jaipur, Rajasthan",
    availability: "Available",
    expiry: "Check with donor",
    description:
        "Fresh seasonal vegetables available for families or community kitchens. Please confirm the quantity and collection arrangements before collecting.",
    image:
        "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1200&q=80"
};

// Read a donation ID from the page URL if one is supplied.
const pageParameters = new URLSearchParams(window.location.search);
const donationId = pageParameters.get("id");

// Later, Flask and MySQL will provide the actual donation
// information using this ID. For now, display sample data.
function displayDonation(donation) {
    document.getElementById("donationTitle").textContent =
        donation.title;

    document.getElementById("categoryBadge").textContent =
        donation.category;

    document.getElementById("urgencyBadge").textContent =
        donation.urgency;

    document.getElementById("donorName").textContent =
        donation.donor;

    document.getElementById("quantity").textContent =
        donation.quantity;

    document.getElementById("location").textContent =
        donation.location;

    document.getElementById("availability").textContent =
        donation.availability;

    document.getElementById("expiry").textContent =
        donation.expiry;

    document.getElementById("description").textContent =
        donation.description;

    document.getElementById("donationImage").src =
        donation.image;

    document.getElementById("donationImage").alt =
        donation.title;
}

// Display the sample listing.
displayDonation(sampleDonation);

// Remember: donationId is available for the future backend.
// At present, every page visit displays the sample donation.
console.log("Selected donation ID:", donationId);
