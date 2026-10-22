
// GiveHub - Browse Donations Page

// Get the search box and filter dropdowns.
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const urgencyFilter = document.getElementById("urgencyFilter");

// Get the donation cards and result messages.
const donationCards = document.querySelectorAll(".donation-card");
const resultsCount = document.getElementById("resultsCount");
const noResults = document.getElementById("noResults");
const donationGrid = document.getElementById("donationGrid");
const resetFilters = document.getElementById("resetFilters");

// Get the donation details popup.
const detailsModal = document.getElementById("detailsModal");
const closeModal = document.getElementById("closeModal");

// Filter donations based on the user's search and selections.
function filterDonations() {
    const searchText = searchInput.value.toLowerCase().trim();
    const selectedCategory = categoryFilter.value;
    const selectedUrgency = urgencyFilter.value;

    let visibleCount = 0;

    donationCards.forEach(function (card) {
        const category = card.dataset.category;
        const urgency = card.dataset.urgency;
        const searchableText = card.dataset.search.toLowerCase();

        // Check whether the card matches the search text.
        const matchesSearch =
            searchableText.includes(searchText) ||
            card.textContent.toLowerCase().includes(searchText);

        // Check the selected category.
        const matchesCategory =
            selectedCategory === "all" ||
            category === selectedCategory;

        // Check the selected urgency.
        const matchesUrgency =
            selectedUrgency === "all" ||
            urgency === selectedUrgency;

        // Show the card only when all filters match.
        if (matchesSearch && matchesCategory && matchesUrgency) {
            card.style.display = "";
            visibleCount++;
        } else {
            card.style.display = "none";
        }
    });

    // Update the result count.
    resultsCount.textContent =
        "Showing " + visibleCount + " donation" +
        (visibleCount === 1 ? "" : "s");

    // Show a helpful message if no cards match.
    noResults.hidden = visibleCount !== 0;
    donationGrid.style.display = visibleCount === 0 ? "none" : "grid";
}

// Run the filters whenever the user changes a search or filter.
searchInput.addEventListener("input", filterDonations);
categoryFilter.addEventListener("change", filterDonations);
urgencyFilter.addEventListener("change", filterDonations);

// Reset the filters.
resetFilters.addEventListener("click", function () {
    searchInput.value = "";
    categoryFilter.value = "all";
    urgencyFilter.value = "all";

    filterDonations();
});

// Open the details popup when a View Details button is clicked.
document.querySelectorAll(".details-button").forEach(function (button) {
    button.addEventListener("click", function () {
        document.getElementById("modalTitle").textContent =
            button.dataset.title;

        document.getElementById("modalDescription").textContent =
            button.dataset.description;

        document.getElementById("modalCategory").textContent =
            button.dataset.category;

        document.getElementById("modalQuantity").textContent =
            button.dataset.quantity;

        document.getElementById("modalLocation").textContent =
            button.dataset.location;

        document.getElementById("modalUrgency").textContent =
            button.dataset.urgency;

        detailsModal.hidden = false;
    });
});

// Close the popup with the close button.
closeModal.addEventListener("click", function () {
    detailsModal.hidden = true;
});

// Close the popup if the user clicks the dark background.
detailsModal.addEventListener("click", function (event) {
    if (event.target === detailsModal) {
        detailsModal.hidden = true;
    }
});

// Close the popup when the Escape key is pressed.
document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        detailsModal.hidden = true;
    }
});

// Display the initial list count.
filterDonations();
