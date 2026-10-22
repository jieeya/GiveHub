
/* ===== SELECT PAGE ELEMENTS ===== */

const statusFilter = document.getElementById("statusFilter");
const donationCards = document.querySelectorAll(".donation-card");
const emptyMessage = document.getElementById("emptyMessage");

/* ===== FILTER DONATIONS ===== */

function filterDonations() {
    // Get the status selected by the user.
    const selectedStatus = statusFilter.value;

    // Count the donations that match the selected filter.
    let visibleCount = 0;

    donationCards.forEach(function (card) {
        const donationStatus = card.dataset.status;

        // Show every card when "All Donations" is selected.
        // Otherwise, show only matching statuses.
        if (
            selectedStatus === "All" ||
            donationStatus === selectedStatus
        ) {
            card.style.display = "flex";
            visibleCount++;
        } else {
            card.style.display = "none";
        }
    });

    // Show a message if no donations match the filter.
    if (visibleCount === 0) {
        emptyMessage.hidden = false;
    } else {
        emptyMessage.hidden = true;
    }
}

/* Run the filter whenever the selection changes. */
statusFilter.addEventListener("change", filterDonations);

/* ===== CALCULATE DONATION STATISTICS ===== */

// Count the sample donation cards.
const totalCount = donationCards.length;

let progressCount = 0;
let deliveredCount = 0;

donationCards.forEach(function (card) {
    const status = card.dataset.status;

    if (status === "Delivered") {
        deliveredCount++;
    } else {
        progressCount++;
    }
});

// Display the calculated totals.
document.getElementById("totalCount").textContent = totalCount;
document.getElementById("progressCount").textContent = progressCount;
document.getElementById("deliveredCount").textContent = deliveredCount;
