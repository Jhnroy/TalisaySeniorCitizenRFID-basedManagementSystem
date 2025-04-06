function showAlert(message, type = "success") {
  const alertBox = document.getElementById("alertBox");
  alertBox.textContent = message;
  alertBox.className = `alert alert-${type} d-block`;

  // Optional: Auto-hide after 3 seconds
  setTimeout(() => {
      alertBox.className = "d-none";
  }, 3000);
}

function register() {
  const email = document.getElementById("registerEmail").value.trim();
  const password = document.getElementById("registerPassword").value.trim();

  if (!email || !password) {
      showAlert("Please fill out all registration fields.", "danger");
      return;
  }

  // Get existing admins from localStorage
  let admins = JSON.parse(localStorage.getItem("adminAccounts")) || [];

  // Check if email already exists
  const exists = admins.some(admin => admin.email === email);
  if (exists) {
      showAlert("This admin email is already registered.", "danger");
      return;
  }

  // Add new admin
  const newAdmin = { email, password, role: "admin" };
  admins.push(newAdmin);
  localStorage.setItem("adminAccounts", JSON.stringify(admins));

  showAlert("Admin registered successfully!", "success");
}

function login(event) {
  event.preventDefault();

  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value.trim();

  let admins = JSON.parse(localStorage.getItem("adminAccounts")) || [];

  const user = admins.find(admin => admin.email === email && admin.password === password);

  if (user && user.role === "admin") {
      showAlert("Welcome, Admin! Redirecting...", "success");

      // Optionally store session info
      sessionStorage.setItem("loggedInUser", JSON.stringify(user));

      setTimeout(() => {
          window.location.href = "/html/dashboard.html";
      }, 1000);
  } else {
      showAlert("Invalid admin credentials.", "danger");
  }
}
