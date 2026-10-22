
/* Select all request cards */
const requestCards = document.querySelectorAll(".request-card");

/* Count the sample requests by their current status */
let matchedRequests = 0;
let receivedRequests = 0;

requestCards.forEach(function (card) {
    const status = card.dataset.status;

    if (status === "Matched") {
        matchedRequests++;
    }

    if (status === "Received") {
        receivedRequests++;
    }
});

/* Update dashboard statistics from the displayed sample records */
document.getElementById("requestCount").textContent =
    requestCards.length;

document.getElementById("matchedCount").textContent =
    matchedRequests;

document.getElementById("receivedCount").textContent =
    receivedRequests;
