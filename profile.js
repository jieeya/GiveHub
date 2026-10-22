
const profileForm = document.getElementById("profileForm");

const editButton = document.getElementById("editButton");
const cancelButton = document.getElementById("cancelButton");
const formActions = document.getElementById("formActions");
const profileMessage = document.getElementById("profileMessage");

const fields = [
    "fullName",
    "email",
    "phone",
    "role",
    "location",
    "about"
];

function getProfile() {
    const savedProfile = localStorage.getItem("givehubProfile");

    if (savedProfile) {
        try {
            return JSON.parse(savedProfile);
        } catch (error) {
            console.error("Could not read saved profile.", error);
        }
    }

    return {
        fullName: "GiveHub User",
        email: "user@example.com",
        phone: "",
        role: "Donor",
        location: "",
        about: ""
    };
}

function displayProfile(profile) {
    fields.forEach(function (field) {
        document.getElementById(field).value = profile[field] || "";
    });

    document.getElementById("sidebarName").textContent =
        profile.fullName || "GiveHub User";

    document.getElementById("sidebarEmail").textContent =
        profile.email || "user@example.com";

    document.getElementById("sidebarRole").textContent =
        profile.role || "Donor";

    document.getElementById("accountRole").textContent =
        profile.role || "Donor";

    document.getElementById("avatar").textContent =
        (profile.fullName || "U").trim().charAt(0).toUpperCase() || "U";
}

function setEditing(isEditing) {
    fields.forEach(function (field) {
        document.getElementById(field).disabled = !isEditing;
    });

    formActions.hidden = !isEditing;
    editButton.hidden = isEditing;
}

function showMessage(message) {
    profileMessage.textContent = message;
}

function saveCurrentProfile() {
    const profile = {};

    fields.forEach(function (field) {
        profile[field] = document.getElementById(field).value.trim();
    });

    localStorage.setItem("givehubProfile", JSON.stringify(profile));

    return profile;
}

editButton.addEventListener("click", function () {
    showMessage("");
    displayProfile(getProfile());
    setEditing(true);
});

cancelButton.addEventListener("click", function () {
    displayProfile(getProfile());
    setEditing(false);
    showMessage("Changes cancelled.");
});

profileForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const phone = document.getElementById("phone").value.trim();

    if (phone && !/^[0-9]{10}$/.test(phone)) {
        showMessage("Please enter a valid 10-digit phone number.");
        return;
    }

    const profile = saveCurrentProfile();

    displayProfile(profile);
    setEditing(false);
    showMessage("Profile updated successfully on this browser!");
});

displayProfile(getProfile());
setEditing(false);
