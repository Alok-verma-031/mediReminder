// Get data from localStorage or create empty array
let medicines = JSON.parse(localStorage.getItem("medicines")) || [];

// ================== SAVE MEDICINE ==================
function saveMedicine() {

    let name = document.getElementById("name").value;
    let time = document.getElementById("time").value;

    if (name === "" || time === "") {
        alert("Please fill all fields!");
        return;
    }

    let med = {
        name: name,
        time: time
    };

    medicines.push(med);

    localStorage.setItem("medicines", JSON.stringify(medicines));

    alert("Medicine Saved!");

    // Clear fields
    document.getElementById("name").value = "";
    document.getElementById("time").value = "";
}

// ================== SHOW DATA ==================
function showMedicines() {

    let table = document.getElementById("tableBody");
    if (!table) return;

    table.innerHTML = "";

    medicines.forEach((med, index) => {

        let row = `
            <tr>
                <td>${med.name}</td>
                <td>${med.time}</td>
                <td>
                    <button class="btn btn-danger btn-sm" onclick="deleteMedicine(${index})">
                        Delete
                    </button>
                </td>
            </tr>
        `;

        table.innerHTML += row;
    });
}

// ================== DELETE ==================
function deleteMedicine(index) {

    medicines.splice(index, 1);

    localStorage.setItem("medicines", JSON.stringify(medicines));

    showMedicines();
}

// ================== REMINDER ==================
function checkReminder() {

    let now = new Date();
    let currentTime = now.toTimeString().slice(0,5); // HH:MM

    medicines.forEach((med) => {

        if (med.time === currentTime) {
            alert("⏰ Time to take: " + med.name);
        }

    });
}

// Run every minute
setInterval(checkReminder, 60000);

// Load data when page opens
showMedicines();