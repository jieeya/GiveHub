
// GiveHub - My Requests Page

const statusFilter = document.getElementById("statusFilter");
const requestCards = document.querySelectorAll(".request-card");
const emptyState = document.getElementById("emptyState");
const resetFilter = document.getElementById("resetFilter");

// Summary counters
const totalCount = document.getElementById("totalCount");
const pendingCount = document.getElementById("pendingCount");
const approvedCount = document.getElementById("approvedCount");
const completedCount = document.getElementById("completedCount");

// Popup elements
const requestModal = document.getElementById("requestModal");
const closeModal = document.getElementById("closeModal");

// Calculate the summary numbers from the displayed sample requests.
function updateStatistics() {
    let pending = 0;
    let approved = 0;
    let completed = 0;

    requestCards.forEach(function (card) {
        const status = card.dataset.status;

        if (status === "pending") {
            pending++;
        } else if (status === "approved") {
            approved++;
        } else if (status === "completed") {
            completed++;
        }
    });

    totalCount.textContent = requestCards.length;
    pendingCount.textContent = pending;
    approvedCount.textContent = approved;
    completedCount.textContent = completed;
}

// Filter request cards by status.
function filterRequests() {
    const selectedStatus = statusFilter.value;
    let visibleCount = 0;

    requestCards.forEach(function (card) {
        const matches =
            selectedStatus === "all" ||
            card.dataset.status === selectedStatus;

        card.style.display = matches ? "grid" : "none";

        if (matches) {
            visibleCount++;
        }
    });

    emptyState.hidden = visibleCount !== 0;
}

// Listen for changes in the dropdown.
statusFilter.addEventListener("change", filterRequests);

// Reset the filter to show all requests.
resetFilter.addEventListener("click", function () {
    statusFilter.value = "all";
    filterRequests();
});

// Open a popup containing the selected request's information.
document.querySelectorAll(".view-button").forEach(function (button) {
    button.addEventListener("click", function () {
        document.getElementById("modalTitle").textContent =
            button.dataset.title;

        document.getElementById("modalId").textContent =
            button.dataset.id;

        document.getElementById("modalCategory").textContent =
            button.dataset.category;

        document.getElementById("modalQuantity").textContent =
            button.dataset.quantity;

        document.getElementById("modalLocation").textContent =
            button.dataset.location;

        document.getElementById("modalStatus").textContent =
            button.dataset.status;

        document.getElementById("modalDate").textContent =
            button.dataset.date;

        requestModal.hidden = false;
    });
});

// Close the popup using the close button.
closeModal.addEventListener("click", function () {
    requestModal.hidden = true;
});

// Close the popup when the dark background is clicked.
requestModal.addEventListener("click", function (event) {
    if (event.target === requestModal) {
        requestModal.hidden = true;
    }
});

// Close the popup using the Escape key.
document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        requestModal.hidden = true;
    }
});

// Initialize the page.
updateStatistics();
filterRequests();
