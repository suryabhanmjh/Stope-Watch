// Signup
const signupForm = document.getElementById("signupForm");
if (signupForm) {
  signupForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const username = document.getElementById("signupUsername").value;
    const password = document.getElementById("signupPassword").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];
    const userExists = users.find(user => user.username === username);
    
    if (userExists) {
      alert("User already exists!");
    } else {
      users.push({ username, password });
      localStorage.setItem("users", JSON.stringify(users));
      alert("Signup successful. Please login.");
      window.location.href = "index.html";
    }
  });
}

// Login
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];
    const validUser = users.find(user => user.username === username && user.password === password);
    
    if (validUser) {
      localStorage.setItem("currentUser", JSON.stringify(validUser));
      window.location.href = "dashboard.html";
    } else {
      alert("Invalid credentials!");
    }
  });
}
