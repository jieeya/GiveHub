
// ======================================
// GIVEHUB - ADMIN DASHBOARD
// ======================================


// Find the HTML elements.
const recordsTableBody = document.getElementById("recordsTableBody");
const searchInput = document.getElementById("searchInput");
const typeFilter = document.getElementById("typeFilter");
const statusFilter = document.getElementById("statusFilter");
const recordCount = document.getElementById("recordCount");
const noRecords = document.getElementById("noRecords");
const resetFiltersBtn = document.getElementById("resetFiltersBtn");


// ======================================
// SAMPLE DATA
// These records are for demonstration.
// ======================================

let records = [
    {
        id: "GH-D101",
        type: "donation",
        item: "Fresh Food Packages",
        person: "Sunrise Restaurant",
        category: "Food",
        status: "pending"
    },
    {
        id: "GH-R102",
        type: "request",
        item: "School Books",
        person: "Aarav Sharma",
        category: "Books",
        status: "pending"
    },
    {
        id: "GH-D103",
        type: "donation",
        item: "Winter Clothes",
        person: "Community Donor",
        category: "Clothes",
        status: "matched"
    },
    {
        id: "GH-R104",
        type: "request",
        item: "Study Supplies",
        person: "Learning Support Centre",
        category: "Other",
        status: "approved"
    },
    {
        id: "GH-D105",
        type: "donation",
        item: "Used Laptops",
        person: "Tech Solutions",
        category: "Electronics",
        status: "delivered"
    },
    {
        id: "GH-R106",
        type: "request",
        item: "Food Assistance",
        person: "Community Shelter",
        category: "Food",
        status: "rejected"
    },
    {
        id: "GH-D107",
        type: "donation",
        item: "Story Books",
        person: "Individual Donor",
        category: "Books",
        status: "pending"
    },
    {
        id: "GH-R108",
        type: "request",
        item: "Clothing Assistance",
        person: "Neha Verma",
        category: "Clothes",
        status: "pending"
    }
];


// ======================================
// DISPLAY STATUS LABELS
// ======================================

function formatStatus(status) {

    return status.charAt(0).toUpperCase() + status.slice(1);
}


// ======================================
// DISPLAY TABLE RECORDS
// ======================================

function displayRecords() {

    // Start with all records.
    let filteredRecords = records;


    // Apply the type filter.
    if (typeFilter.value !== "all") {

        filteredRecords = filteredRecords.filter(function (record) {
            return record.type === typeFilter.value;
        });
    }


    // Apply the status filter.
    if (statusFilter.value !== "all") {

        filteredRecords = filteredRecords.filter(function (record) {
            return record.status === statusFilter.value;
        });
    }


    // Apply the search box.
    const searchText = searchInput.value.trim().toLowerCase();

    if (searchText !== "") {

        filteredRecords = filteredRecords.filter(function (record) {

            return (
                record.id.toLowerCase().includes(searchText) ||
                record.item.toLowerCase().includes(searchText) ||
                record.person.toLowerCase().includes(searchText) ||
                record.category.toLowerCase().includes(searchText)
            );
        });
    }


    // Remove old table rows.
    recordsTableBody.innerHTML = "";


    // Update the number of displayed records.
    recordCount.textContent =
        filteredRecords.length +
        (filteredRecords.length === 1 ? " record" : " records");


    // Show the empty message if no records match.
    noRecords.hidden = filteredRecords.length !== 0;


    // Create one table row for each record.
    filteredRecords.forEach(function (record) {

        const row = document.createElement("tr");


        // Choose the correct status class.
        const statusClass = "status-" + record.status;


        // Only pending requests can be approved or rejected.
        let actionHTML = "";

        if (record.type === "request" && record.status === "pending") {

            actionHTML = `
                <div class="action-group">

                    <button type="button"
                            class="action-btn approve-btn"
                            data-action="approve"
                            data-id="${record.id}">
                        Approve
                    </button>

                    <button type="button"
                            class="action-btn reject-btn"
                            data-action="reject"
                            data-id="${record.id}">
                        Reject
                    </button>

                </div>
            `;

        } else {

            actionHTML = `
                <span class="view-label">View record</span>
            `;
        }


        // Build the table row.
        row.innerHTML = `
            <td>
                <span class="record-id">${record.id}</span>
            </td>

            <td>
                <span class="record-name">${record.item}</span>
                <span class="record-type">
                    ${formatStatus(record.type)}
                </span>
            </td>

            <td>${record.person}</td>

            <td>${record.category}</td>

            <td>
                <span class="status-badge ${statusClass}">
                    ${formatStatus(record.status)}
                </span>
            </td>

            <td>${actionHTML}</td>
        `;


        // Add the row to the table.
        recordsTableBody.appendChild(row);
    });


    // Refresh the dashboard summary cards.
    updateDashboardStatistics();
}


// ======================================
// UPDATE DASHBOARD STATISTICS
// ======================================

function updateDashboardStatistics() {

    // Count donation records.
    const donations = records.filter(function (record) {
        return record.type === "donation";
    });


    // Count request records.
    const requests = records.filter(function (record) {
        return record.type === "request";
    });


    // Count donations by status.
    const pendingDonations = donations.filter(function (record) {
        return record.status === "pending";
    }).length;

    const matchedDonations = donations.filter(function (record) {
        return record.status === "matched";
    }).length;

    const deliveredDonations = donations.filter(function (record) {
        return record.status === "delivered";
    }).length;


    // Count requests by status.
    const pendingRequestsList = requests.filter(function (record) {
        return record.status === "pending";
    });

    const approvedRequests = requests.filter(function (record) {
        return record.status === "approved";
    }).length;

    const rejectedRequests = requests.filter(function (record) {
        return record.status === "rejected";
    }).length;


    // These are illustrative dashboard totals.
    // User records will come from the database later.
    document.getElementById("totalUsers").textContent = 24;

    document.getElementById("totalDonations").textContent =
        donations.length;

    document.getElementById("pendingRequests").textContent =
        pendingRequestsList.length;

    document.getElementById("totalVolunteers").textContent = 8;


    // Donation overview.
    document.getElementById("donationPending").textContent =
        pendingDonations;

    document.getElementById("donationMatched").textContent =
        matchedDonations;

    document.getElementById("donationDelivered").textContent =
        deliveredDonations;


    // Request overview.
    document.getElementById("requestPending").textContent =
        pendingRequestsList.length;

    document.getElementById("requestApproved").textContent =
        approvedRequests;

    document.getElementById("requestRejected").textContent =
        rejectedRequests;
}


// ======================================
// SEARCH AND FILTER EVENTS
// ======================================

// Refresh results when the search text changes.
searchInput.addEventListener("input", displayRecords);


// Refresh results when a dropdown changes.
typeFilter.addEventListener("change", displayRecords);
statusFilter.addEventListener("change", displayRecords);


// ======================================
// APPROVE OR REJECT A REQUEST
// ======================================

recordsTableBody.addEventListener("click", function (event) {

    // Find the clicked button.
    const clickedButton = event.target.closest("button");

    if (!clickedButton) {
        return;
    }


    const action = clickedButton.dataset.action;
    const recordId = clickedButton.dataset.id;


    // Find the selected record.
    const selectedRecord = records.find(function (record) {
        return record.id === recordId;
    });


    // Stop if the record does not exist
    // or is not a pending request.
    if (
        !selectedRecord ||
        selectedRecord.type !== "request" ||
        selectedRecord.status !== "pending"
    ) {
        return;
    }


    // Approve the selected request.
    if (action === "approve") {

        const confirmed = confirm(
            "Approve this resource request?\n\n" +
            selectedRecord.item +
            "\nSubmitted by: " +
            selectedRecord.person
        );

        if (!confirmed) {
            return;
        }

        selectedRecord.status = "approved";

        alert("Request approved in this demo.");


    // Reject the selected request.
    } else if (action === "reject") {

        const confirmed = confirm(
            "Reject this resource request?\n\n" +
            selectedRecord.item +
            "\nSubmitted by: " +
            selectedRecord.person
        );

        if (!confirmed) {
            return;
        }

        selectedRecord.status = "rejected";

        alert("Request rejected in this demo.");

    } else {
        return;
    }


    // Refresh the table and all statistics.
    displayRecords();
});


// ======================================
// RESET SEARCH AND FILTERS
// ======================================

resetFiltersBtn.addEventListener("click", function () {

    searchInput.value = "";
    typeFilter.value = "all";
    statusFilter.value = "all";

    displayRecords();
});


// ======================================
// INITIAL PAGE DISPLAY
// ======================================

displayRecords();
