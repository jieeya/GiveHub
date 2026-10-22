
/* GiveHub - Donation Tracking Page */

// Sample tracking record for demonstration.
// Later, Flask and MySQL will supply actual tracking records.

const trackingRecords = {
    "GH-T001": {
        name: "Food Donation Package",
        item: "Food Packets",
        destination: "Jaipur, Rajasthan",
        partner: "Volunteer",
        deliveryDate: "24 October 2026",
        status: "In Transit",
        progress: 75,
        progressTitle: "On its way to the recipient",
        stages: [
            {
                title: "Request Submitted",
                description: "The recipient's request has been received by the platform.",
                date: "22 October 2026 · 10:00 AM",
                status: "Completed"
            },
            {
                title: "Request Approved",
                description: "The donation has been matched with the recipient's request.",
                date: "22 October 2026 · 11:30 AM",
                status: "Completed"
            },
            {
                title: "Donation Picked Up",
                description: "The assigned delivery volunteer has collected the donation.",
                date: "23 October 2026 · 09:00 AM",
                status: "Completed"
            },
            {
                title: "Out for Delivery",
                description: "The donation is on its way to the recipient's destination.",
                date: "Awaiting delivery confirmation",
                status: "In Progress"
            },
            {
                title: "Successfully Delivered",
                description: "Delivery will be marked complete once the recipient receives the items.",
                date: "Awaiting confirmation",
                status: "Upcoming"
            }
        ]
    }
};

const trackingForm = document.getElementById("trackingForm");
const trackingInput = document.getElementById("trackingInput");
const searchMessage = document.getElementById("searchMessage");
const trackingContent = document.getElementById("trackingContent");
const notFound = document.getElementById("notFound");

// Display a tracking record on the page.
function displayTrackingRecord(id) {
    const record = trackingRecords[id];

    if (!record) {
        trackingContent.hidden = true;
        notFound.hidden = false;

        searchMessage.textContent =
            "We couldn't find that tracking ID. Try GH-T001.";

        searchMessage.classList.add("error");
        return;
    }

    trackingContent.hidden = false;
    notFound.hidden = true;

    searchMessage.textContent = "Tracking record found.";
    searchMessage.classList.remove("error");

    document.getElementById("donationName").textContent = record.name;
    document.getElementById("trackingId").textContent = id;
    document.getElementById("itemName").textContent = record.item;
    document.getElementById("destination").textContent = record.destination;
    document.getElementById("deliveryPartner").textContent = record.partner;
    document.getElementById("deliveryDate").textContent = record.deliveryDate;
    document.getElementById("progressTitle").textContent = record.progressTitle;
    document.getElementById("progressPercentage").textContent =
        record.progress + "%";

    const progressBar = document.getElementById("progressBar");
    progressBar.style.width = record.progress + "%";

    const overallStatus = document.getElementById("overallStatus");
    overallStatus.textContent = record.status;
    overallStatus.className = "status-badge";

    if (record.status === "Delivered") {
        overallStatus.classList.add("delivered");
    } else {
        overallStatus.classList.add("in-transit");
    }

    // Update the timeline using the record's stages.
    const timeline = document.querySelector(".timeline");
    timeline.replaceChildren();

    record.stages.forEach(function (stage, index) {
        const item = document.createElement("article");
        item.className = "timeline-item";

        if (stage.status === "Completed") {
            item.classList.add("completed-step");
        } else if (stage.status === "In Progress") {
            item.classList.add("active-step");
        } else {
            item.classList.add("upcoming-step");
        }

        const marker = document.createElement("div");
        marker.className = "timeline-marker";
        marker.textContent =
            stage.status === "Completed" ? "✓" : String(index + 1);

        const content = document.createElement("div");
        content.className = "timeline-content";

        const titleRow = document.createElement("div");
        titleRow.className = "timeline-title";

        const title = document.createElement("h3");
        title.textContent = stage.title;

        const status = document.createElement("span");
        status.textContent = stage.status;

        const description = document.createElement("p");
        description.textContent = stage.description;

        const date = document.createElement("small");
        date.textContent = stage.date;

        titleRow.append(title, status);
        content.append(titleRow, description, date);
        item.append(marker, content);
        timeline.appendChild(item);
    });
}

// Search for a tracking ID.
trackingForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const id = trackingInput.value.trim().toUpperCase();

    if (!id) {
        searchMessage.textContent = "Please enter a tracking ID.";
        searchMessage.classList.add("error");
        return;
    }

    displayTrackingRecord(id);
});

// Load the example record when the page opens.
trackingInput.value = "GH-T001";
displayTrackingRecord("GH-T001");
