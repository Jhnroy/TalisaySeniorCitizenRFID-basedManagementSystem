function showRegisterAlert(message, type = "success") {
    const alertBox = document.getElementById("registerAlert");
    alertBox.textContent = message;
    alertBox.className = `alert alert-${type} d-block`;
  
    // Auto-hide after 3 seconds
    setTimeout(() => {
      alertBox.className = "d-none";
    }, 3000);
  }
  
  function register(event) {
    event.preventDefault();
  
    const email = document.getElementById("registerEmail").value.trim();
    const password = document.getElementById("registerPassword").value.trim();
  
    if (!email || !password) {
      showRegisterAlert("Please fill out all registration fields.", "danger");
      return;
    }
  
    let admins = JSON.parse(localStorage.getItem("adminAccounts")) || [];
  
    const exists = admins.some(admin => admin.email === email);
    if (exists) {
      showRegisterAlert("This admin email is already registered.", "danger");
      return;
    }
  
    const newAdmin = { email, password, role: "admin" };
    admins.push(newAdmin);
    localStorage.setItem("adminAccounts", JSON.stringify(admins));
  
    showRegisterAlert("Admin registered successfully! Redirecting...", "success");
  
    setTimeout(() => {
      window.location.href = "../index.html";
    }, 2000);
  }
  