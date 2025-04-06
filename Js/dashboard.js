document.getElementById("registrationForm").addEventListener("submit", function(event) {
    event.preventDefault();
    let name = document.getElementById("name").value;
    let age = document.getElementById("age").value;
    let barangay = document.getElementById("barangay").value;
    
    let seniors = JSON.parse(localStorage.getItem("seniors")) || [];
    seniors.push({ name, age, barangay, pension: "Pending" });
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
        
        let pensionCell = row.insertCell(3);
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
        
        let actionsCell = row.insertCell(4);
        let editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.onclick = function() { editSenior(index); };
        
        let deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.style.marginLeft = "10px";
        deleteButton.onclick = function() { deleteSenior(index); };
        
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
    
    if (newName && newAge && newBarangay) {
        seniors[index] = { name: newName, age: newAge, barangay: newBarangay, pension: senior.pension };
        localStorage.setItem("seniors", JSON.stringify(seniors));
        loadSeniors();
    }
}

function deleteSenior(index) {
    let seniors = JSON.parse(localStorage.getItem("seniors")) || [];
    seniors.splice(index, 1);
    localStorage.setItem("seniors", JSON.stringify(seniors));
    loadSeniors();
}

function generateReport() {
    let seniors = JSON.parse(localStorage.getItem("seniors")) || [];
    let reportContent = "Name, Age, Barangay, Pension Status\n";
    seniors.forEach(senior => {
        reportContent += `${senior.name}, ${senior.age}, ${senior.barangay}, ${senior.pension}\n`;
    });
    let blob = new Blob([reportContent], { type: "text/csv" });
    let a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "senior_citizen_report.csv";
    a.click();
}

document.addEventListener("DOMContentLoaded", loadSeniors);