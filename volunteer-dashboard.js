
// ======================================
// GIVEHUB - VOLUNTEER DASHBOARD
// ======================================


// Find important HTML elements.
const tasksGrid = document.getElementById("tasksGrid");
const availableCount = document.getElementById("availableCount");
const activeCount = document.getElementById("activeCount");
const completedCount = document.getElementById("completedCount");
const pointsCount = document.getElementById("pointsCount");
const taskCounter = document.getElementById("taskCounter");
const emptyState = document.getElementById("emptyState");
const filterButtons = document.querySelectorAll(".filter-btn");
const showAllBtn = document.getElementById("showAllBtn");


// ======================================
// SAMPLE VOLUNTEER TASKS
// These are demonstration records.
// ======================================

let volunteerTasks = [
    {
        id: "VH-101",
        title: "Collect Food Donation",
        category: "Food Pickup",
        icon: "🍱",
        description: "Collect packaged food from a local restaurant and prepare it for handover.",
        pickup: "C-Scheme, Jaipur",
        drop: "Nearby community centre",
        distance: "Approx. 3 km",
        urgency: "High",
        points: 30,
        status: "available"
    },

    {
        id: "VH-102",
        title: "Deliver Books",
        category: "Book Delivery",
        icon: "📚",
        description: "Help transport a collection of donated books to a student support centre.",
        pickup: "Vaishali Nagar, Jaipur",
        drop: "Student support centre",
        distance: "Approx. 4 km",
        urgency: "Normal",
        points: 20,
        status: "available"
    },

    {
        id: "VH-103",
        title: "Clothes Collection",
        category: "Clothes Pickup",
        icon: "👕",
        description: "Collect donated clothes and take them to the designated collection point.",
        pickup: "Malviya Nagar, Jaipur",
        drop: "Community collection centre",
        distance: "Approx. 5 km",
        urgency: "Medium",
        points: 25,
        status: "active"
    },

    {
        id: "VH-104",
        title: "Deliver Study Supplies",
        category: "Supplies Delivery",
        icon: "🎒",
        description: "Help deliver donated stationery and study supplies to their destination.",
        pickup: "Mansarovar, Jaipur",
        drop: "Local learning centre",
        distance: "Approx. 2 km",
        urgency: "Normal",
        points: 15,
        status: "completed"
    }
];


// The selected filter when the page first opens.
let currentFilter = "all";


// ======================================
// DISPLAY TASK CARDS
// ======================================

function displayTasks() {

    // Clear the previous task cards.
    tasksGrid.innerHTML = "";


    // Filter tasks according to their status.
    let filteredTasks = volunteerTasks.filter(function (task) {

        if (currentFilter === "all") {
            return true;
        }

        return task.status === currentFilter;
    });


    // Update the number of visible tasks.
    taskCounter.textContent =
        filteredTasks.length +
        (filteredTasks.length === 1 ? " task" : " tasks");


    // Show or hide the empty message.
    emptyState.hidden = filteredTasks.length !== 0;


    // Create a card for each matching task.
    filteredTasks.forEach(function (task) {

        const card = document.createElement("article");
        card.className = "task-card";


        // Set the urgency colour.
        let urgencyClass = "urgency-normal";

        if (task.urgency === "High") {
            urgencyClass = "urgency-high";
        } else if (task.urgency === "Medium") {
            urgencyClass = "urgency-medium";
        }


        // Decide which button should appear.
        let buttonHTML = "";

        if (task.status === "available") {

            buttonHTML = `
                <button type="button"
                        class="task-action"
                        data-action="accept"
                        data-id="${task.id}">
                    Accept Task →
                </button>
            `;

        } else if (task.status === "active") {

            buttonHTML = `
                <button type="button"
                        class="task-action complete-btn"
                        data-action="complete"
                        data-id="${task.id}">
                    Mark Completed ✓
                </button>
            `;

        } else {

            buttonHTML = `
                <button type="button"
                        class="task-action"
                        disabled>
                    ✓ Completed
                </button>
            `;
        }


        // Build the task card.
        card.innerHTML = `
            <div class="task-card-top">

                <div class="task-category">

                    <div class="task-icon">
                        ${task.icon}
                    </div>

                    <div>
                        <h3>${task.title}</h3>
                        <span class="task-id">
                            Task ID: ${task.id}
                        </span>
                    </div>

                </div>

                <span class="urgency ${urgencyClass}">
                    ${task.urgency} Priority
                </span>

            </div>


            <p class="task-description">
                ${task.description}
            </p>


            <div class="task-details">

                <div class="task-detail">
                    <span class="detail-icon">📍</span>
                    <span><strong>Pickup:</strong> ${task.pickup}</span>
                </div>

                <div class="task-detail">
                    <span class="detail-icon">🏁</span>
                    <span><strong>Drop-off:</strong> ${task.drop}</span>
                </div>

                <div class="task-detail">
                    <span class="detail-icon">🛣️</span>
                    <span><strong>Distance:</strong> ${task.distance}</span>
                </div>

                <div class="task-detail">
                    <span class="detail-icon">📌</span>
                    <span><strong>Status:</strong> ${
                        task.status.charAt(0).toUpperCase() +
                        task.status.slice(1)
                    }</span>
                </div>

            </div>


            <div class="task-bottom">

                <div class="task-points">
                    ⭐ ${task.points} Impact Points
                    <small>Points earned after completion</small>
                </div>

                ${buttonHTML}

            </div>
        `;


        // Add the card to the page.
        tasksGrid.appendChild(card);
    });


    // Refresh dashboard statistics.
    updateStatistics();
}


// ======================================
// UPDATE DASHBOARD STATISTICS
// ======================================

function updateStatistics() {

    // Count tasks that have not been accepted.
    const availableTasks = volunteerTasks.filter(function (task) {
        return task.status === "available";
    });


    // Count accepted tasks that are not yet completed.
    const activeTasks = volunteerTasks.filter(function (task) {
        return task.status === "active";
    });


    // Count completed tasks.
    const completedTasks = volunteerTasks.filter(function (task) {
        return task.status === "completed";
    });


    // Calculate points from completed tasks only.
    const totalPoints = completedTasks.reduce(function (total, task) {
        return total + task.points;
    }, 0);


    // Display the updated values.
    availableCount.textContent = availableTasks.length;
    activeCount.textContent = activeTasks.length;
    completedCount.textContent = completedTasks.length;
    pointsCount.textContent = totalPoints;
}


// ======================================
// FILTER TASKS
// ======================================

filterButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        // Save the selected filter.
        currentFilter = button.dataset.filter;


        // Highlight the selected filter button.
        filterButtons.forEach(function (filterButton) {
            filterButton.classList.remove("active");
        });

        button.classList.add("active");


        // Refresh the displayed task cards.
        displayTasks();
    });
});


// ======================================
// ACCEPT OR COMPLETE A TASK
// ======================================

tasksGrid.addEventListener("click", function (event) {

    // Find the button that was clicked.
    const clickedButton = event.target.closest("button");

    if (!clickedButton) {
        return;
    }


    const action = clickedButton.dataset.action;
    const taskId = clickedButton.dataset.id;


    // Find the selected task.
    const selectedTask = volunteerTasks.find(function (task) {
        return task.id === taskId;
    });


    if (!selectedTask) {
        return;
    }


    // Accept an available task.
    if (action === "accept" && selectedTask.status === "available") {

        selectedTask.status = "active";

        alert(
            "Task accepted successfully!\n\n" +
            selectedTask.title +
            "\nTask ID: " +
            selectedTask.id
        );

    }


    // Complete a task that was accepted.
    else if (action === "complete" && selectedTask.status === "active") {

        const confirmCompletion = confirm(
            "Have you completed this task?\n\n" +
            selectedTask.title
        );

        if (!confirmCompletion) {
            return;
        }

        selectedTask.status = "completed";

        alert(
            "Task completed successfully!\n\n" +
            "You earned " +
            selectedTask.points +
            " impact points in this demo."
        );
    }


    // Refresh cards and statistics.
    displayTasks();
});


// ======================================
// SHOW ALL TASKS
// ======================================

showAllBtn.addEventListener("click", function () {

    currentFilter = "all";


    // Highlight the All Tasks button.
    filterButtons.forEach(function (button) {
        button.classList.remove("active");
    });

    document.querySelector('[data-filter="all"]')
        .classList.add("active");


    // Display every task again.
    displayTasks();
});


// ======================================
// INITIAL PAGE LOAD
// ======================================

displayTasks();
