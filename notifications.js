
// ======================================
// GIVEHUB - NOTIFICATIONS PAGE
// ======================================

// Find the HTML elements we need to control.
const notificationList = document.getElementById("notificationList");
const unreadCount = document.getElementById("unreadCount");
const totalCount = document.getElementById("totalCount");
const emptyState = document.getElementById("emptyState");
const markAllReadBtn = document.getElementById("markAllReadBtn");
const resetFilterBtn = document.getElementById("resetFilterBtn");
const filterButtons = document.querySelectorAll(".filter-btn");


// ======================================
// SAMPLE NOTIFICATIONS
// These are demo records for now.
// Later, Flask and MySQL can provide
// real notifications.
// ======================================

let notifications = [
    {
        id: 1,
        type: "requests",
        icon: "📩",
        iconClass: "icon-request",
        title: "Your request has been approved!",
        message: "Your request for books has been approved. Please check your request details for the next steps.",
        time: "10 minutes ago",
        unread: true
    },
    {
        id: 2,
        type: "donations",
        icon: "🍱",
        iconClass: "icon-donation",
        title: "A new donation may match your needs",
        message: "A food donation has been listed nearby. Open Browse Donations to explore available items.",
        time: "35 minutes ago",
        unread: true
    },
    {
        id: 3,
        type: "delivery",
        icon: "🚚",
        iconClass: "icon-delivery",
        title: "Pickup update",
        message: "A sample donation tracking record has been updated. View the tracking page for its progress.",
        time: "1 hour ago",
        unread: true
    },
    {
        id: 4,
        type: "requests",
        icon: "📝",
        iconClass: "icon-request",
        title: "Request submitted successfully",
        message: "Your resource request has been recorded in this demo. You can review sample requests on My Requests.",
        time: "3 hours ago",
        unread: false
    },
    {
        id: 5,
        type: "donations",
        icon: "📚",
        iconClass: "icon-donation",
        title: "Books are available",
        message: "Books have been added to the sample donation listings. Browse the available resources.",
        time: "Yesterday",
        unread: false
    },
    {
        id: 6,
        type: "delivery",
        icon: "📍",
        iconClass: "icon-delivery",
        title: "Delivery progress updated",
        message: "Check the Donation Tracking page to see the demonstration delivery timeline.",
        time: "Yesterday",
        unread: false
    },
    {
        id: 7,
        type: "requests",
        icon: "💬",
        iconClass: "icon-alert",
        title: "Remember to check your requests",
        message: "Review your requests to see their current sample statuses and details.",
        time: "2 days ago",
        unread: false
    }
];


// Current selected filter.
let currentFilter = "all";


// ======================================
// DISPLAY NOTIFICATIONS
// ======================================

function displayNotifications() {

    // Clear the previous list.
    notificationList.innerHTML = "";

    // Show only notifications matching
    // the selected filter.
    const filteredNotifications = notifications.filter(function (item) {

        if (currentFilter === "all") {
            return true;
        }

        return item.type === currentFilter;
    });


    // Update the total number of
    // notifications shown.
    totalCount.textContent =
        filteredNotifications.length +
        (filteredNotifications.length === 1 ? " update" : " updates");


    // Show an empty message if no
    // notifications match the filter.
    if (filteredNotifications.length === 0) {
        emptyState.hidden = false;
    } else {
        emptyState.hidden = true;
    }


    // Create each notification item.
    filteredNotifications.forEach(function (item) {

        const notification = document.createElement("article");

        notification.className = "notification-item";

        if (item.unread) {
            notification.classList.add("unread");
        }


        // Build the notification layout.
        notification.innerHTML = `
            <div class="notification-icon ${item.iconClass}">
                ${item.icon}
            </div>

            <div class="notification-content">

                <div class="notification-title-row">
                    <h3 class="notification-title">
                        ${item.title}
                    </h3>

                    ${item.unread
                        ? '<span class="unread-dot" title="Unread"></span>'
                        : ''
                    }
                </div>

                <p class="notification-message">
                    ${item.message}
                </p>

                <span class="notification-time">
                    ${item.time}
                </span>

            </div>

            <div class="notification-actions">

                ${
                    item.unread
                    ? `<button type="button"
                               class="read-btn"
                               data-action="read"
                               data-id="${item.id}">
                           Mark read
                       </button>`
                    : ""
                }

                <button type="button"
                        class="delete-btn"
                        data-action="delete"
                        data-id="${item.id}">
                    Delete
                </button>

            </div>
        `;


        // Add the item to the notification list.
        notificationList.appendChild(notification);
    });


    // Update the unread counter.
    updateUnreadCount();
}


// ======================================
// UPDATE UNREAD COUNTER
// ======================================

function updateUnreadCount() {

    const unreadTotal = notifications.filter(function (item) {
        return item.unread;
    }).length;

    unreadCount.textContent =
        unreadTotal +
        (unreadTotal === 1
            ? " unread notification"
            : " unread notifications");


    // Disable the button when everything
    // has already been marked as read.
    markAllReadBtn.disabled = unreadTotal === 0;

    if (unreadTotal === 0) {
        markAllReadBtn.style.opacity = "0.6";
        markAllReadBtn.style.cursor = "default";
    } else {
        markAllReadBtn.style.opacity = "1";
        markAllReadBtn.style.cursor = "pointer";
    }
}


// ======================================
// FILTER BUTTONS
// All, Requests, Donations, Delivery
// ======================================

filterButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        // Store the selected filter.
        currentFilter = button.dataset.filter;

        // Highlight the selected button.
        filterButtons.forEach(function (filterButton) {
            filterButton.classList.remove("active");
        });

        button.classList.add("active");

        // Refresh the displayed notifications.
        displayNotifications();
    });
});


// ======================================
// MARK ONE NOTIFICATION AS READ
// AND DELETE A NOTIFICATION
// ======================================

notificationList.addEventListener("click", function (event) {

    const clickedButton = event.target.closest("button");

    // Ignore clicks that are not on a button.
    if (!clickedButton) {
        return;
    }

    const action = clickedButton.dataset.action;
    const notificationId = Number(clickedButton.dataset.id);


    if (action === "read") {

        // Find the selected notification.
        const selectedNotification = notifications.find(
            function (item) {
                return item.id === notificationId;
            }
        );

        // Mark it as read.
        if (selectedNotification) {
            selectedNotification.unread = false;
        }

    } else if (action === "delete") {

        // Remove the selected notification.
        notifications = notifications.filter(
            function (item) {
                return item.id !== notificationId;
            }
        );
    }

    // Refresh the list and unread count.
    displayNotifications();
});


// ======================================
// MARK ALL NOTIFICATIONS AS READ
// ======================================

markAllReadBtn.addEventListener("click", function () {

    notifications.forEach(function (item) {
        item.unread = false;
    });

    displayNotifications();
});


// ======================================
// RESET FILTER
// ======================================

resetFilterBtn.addEventListener("click", function () {

    currentFilter = "all";

    filterButtons.forEach(function (button) {
        button.classList.remove("active");
    });

    document.querySelector('[data-filter="all"]')
        .classList.add("active");

    displayNotifications();
});


// ======================================
// INITIAL PAGE DISPLAY
// ======================================

displayNotifications();
