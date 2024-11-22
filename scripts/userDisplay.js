document.querySelector(".user img").addEventListener("click", () => {
  const userbox = document.querySelector(".userbox");
  if (userbox) {
    userbox.style.display = userbox.style.display === "block" ? "none" : "block";
  }
});

// Close the user box if clicking outside of it
document.addEventListener("click", (event) => {
  const userbox = document.querySelector(".userbox");
  const userIcon = document.querySelector(".user img");

  if (userbox && event.target !== userbox && !userbox.contains(event.target) && event.target !== userIcon) {
    userbox.style.display = "none";
  }
});

// DOM Content Loaded Event
document.addEventListener("DOMContentLoaded", () => {
  const username = localStorage.getItem("loggedInUser");

  if (username) {
    const usernameDisplay = document.querySelector(".signUpNameHeader");
    if (usernameDisplay) {
      usernameDisplay.textContent = username;
    }
  } else {
    // Redirect to login if the user is not logged in
    window.location.href = "index.html";
  }
});

// Function for logging out
function logout() {
  localStorage.removeItem("loggedInUser");
  window.location.href = "index.html"; // Redirect to login page after logout
}
