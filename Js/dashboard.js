document.getElementById("registrationForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let name = document.getElementById("name").value.trim();
    let age = document.getElementById("age").value.trim();
    let barangay = document.getElementById("barangay").value.trim();
    let cellphone = document.getElementById("cellphone").value.trim();

    if (!name || !age || !barangay || !cellphone) {
        alert("Please fill in all fields.");
        return;
    }

    let seniors = JSON.parse(localStorage.getItem("seniors")) || [];
    seniors.push({ name, age, barangay, cellphone, pension: "Pending" });
    localStorage.setItem("seniors", JSON.stringify(seniors));

    alert("Senior Registered Successfully!");
    this.reset();
    loadSeniors();
});

function loadSeniors() {
    let seniors = JSON.parse(localStorage.getItem("seniors")) || [];
    let seniorTable = document.getElementById("seniorTable");
    seniorTable.innerHTML = "";

    seniors.forEach((senior, index) => {
        let row = seniorTable.insertRow();

        row.insertCell(0).textContent = senior.name;
        row.insertCell(1).textContent = senior.age;
        row.insertCell(2).textContent = senior.barangay;
        row.insertCell(3).textContent = senior.cellphone;

        // Pension Status
        let pensionCell = row.insertCell(4);
        let pensionSelect = document.createElement("select");
        ["Pending", "Claimed", "Ineligible"].forEach(status => {
            let option = document.createElement("option");
            option.value = status;
            option.textContent = status;
            if (senior.pension === status) option.selected = true;
            pensionSelect.appendChild(option);
        });
        pensionSelect.onchange = function() {
            updatePensionStatus(index, this.value);
        };
        pensionCell.appendChild(pensionSelect);

        // Actions
        let actionsCell = row.insertCell(5);

        let editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.className = "btn btn-sm btn-warning";
        editButton.onclick = function() {
            editSenior(index);
        };

        let deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "btn btn-sm btn-danger ms-2";
        deleteButton.onclick = function() {
            deleteSenior(index);
        };

        actionsCell.appendChild(editButton);
        actionsCell.appendChild(deleteButton);
    });
}

function updatePensionStatus(index, status) {
    let seniors = JSON.parse(localStorage.getItem("seniors")) || [];
    seniors[index].pension = status;
    localStorage.setItem("seniors", JSON.stringify(seniors));
}

function editSenior(index) {
    let seniors = JSON.parse(localStorage.getItem("seniors")) || [];
    let senior = seniors[index];

    let newName = prompt("Edit Name:", senior.name);
    let newAge = prompt("Edit Age:", senior.age);
    let newBarangay = prompt("Edit Barangay:", senior.barangay);
    let newCellphone = prompt("Edit Cellphone Number:", senior.cellphone);

    if (newName && newAge && newBarangay && newCellphone) {
        seniors[index] = {
            name: newName.trim(),
            age: newAge.trim(),
            barangay: newBarangay.trim(),
            cellphone: newCellphone.trim(),
            pension: senior.pension
        };
        localStorage.setItem("seniors", JSON.stringify(seniors));
        loadSeniors();
    }
}

function deleteSenior(index) {
    if (confirm("Are you sure you want to delete this record?")) {
        let seniors = JSON.parse(localStorage.getItem("seniors")) || [];
        seniors.splice(index, 1);
        localStorage.setItem("seniors", JSON.stringify(seniors));
        loadSeniors();
    }
}

function generateReport() {
    let seniors = JSON.parse(localStorage.getItem("seniors")) || [];
    let reportContent = "Name,Age,Barangay,Cellphone,Pension Status\n";

    seniors.forEach(senior => {
        reportContent += `${senior.name},${senior.age},${senior.barangay},${senior.cellphone},${senior.pension}\n`;
    });

    let blob = new Blob([reportContent], { type: "text/csv" });
    let a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "senior_citizen_report.csv";
    a.click();
}

document.addEventListener("DOMContentLoaded", loadSeniors);
