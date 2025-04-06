function showAlert(message, type = "success") {
    const alertBox = document.getElementById("alertBox");
    alertBox.textContent = message;
    alertBox.className = `alert alert-${type} d-block`;
  }

  function register() {
    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;

    if (email && password) {
      const user = { email, password, role: "admin" };
      localStorage.setItem(email, JSON.stringify(user));
      showAlert("Admin registered successfully!", "success");
    } else {
      showAlert("Please fill out all registration fields.", "danger");
    }
  }

  function login(event) {
    event.preventDefault();
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;
    const user = JSON.parse(localStorage.getItem(email));

    if (user && user.password === password && user.role === "admin") {
      showAlert("Welcome, Admin! Redirecting...", "success");

      // Redirect after 1 second
      setTimeout(() => {
        window.location.href = "/html/dashboard.html";
      }, 1000);
    } else {
      showAlert("Invalid admin credentials.", "danger");
    }
  }