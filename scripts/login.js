// Function to toggle forms and handle local storage operations
export function switchForms() {
  document.addEventListener("DOMContentLoaded", () => {
    let mainForm = document.querySelector(".mainForm");
    let signUpForm = document.querySelector(".signUpForm");
    let mainDiv = document.querySelector(".mainDiv");
    let secDiv = document.querySelector(".secDiv");

    // Grabbing the buttons
    const buttonSignUp = document.querySelector(".signUpButton");
    const buttonSignIn = document.querySelector(".signInButton");

    // Ensure buttons exist before adding event listeners
    if (buttonSignUp && buttonSignIn) {
      // Event Listener for the Sign-Up button
      buttonSignUp.addEventListener("click", () => {
        if (mainForm && signUpForm && mainDiv && secDiv) {
          mainForm.style.display = "none";
          signUpForm.style.display = "block";
          mainDiv.style.display = "none";
          secDiv.style.display = "block";
        }
      });

      // Event Listener for the Sign-In button
      buttonSignIn.addEventListener("click", () => {
        if (mainForm && signUpForm && mainDiv && secDiv) {
          mainForm.style.display = "block";
          signUpForm.style.display = "none";
          mainDiv.style.display = "block";
          secDiv.style.display = "none";
        }
      });
    }

    // Handle Registration
    const signUpFormElement = document.querySelector(".signUpForm form");
    if (signUpFormElement) {
      signUpFormElement.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("signUpName").value;
        const email = document.getElementById("signUpEmail").value;
        const password = document.getElementById("signUpPassword").value;
        const rePassword = document.getElementById("rePassword").value;

        if (password === rePassword) {
          // Store user details in local storage
          localStorage.setItem("user", JSON.stringify({ name, email, password }));
          alert("Registration successful! You can now log in.");
          signUpForm.style.display = "none";
          mainForm.style.display = "block";
          mainDiv.style.display = "block";
          secDiv.style.display = "none";
        } else {
          alert("Passwords do not match. Please try again.");
        }
      });
    }

    // Handle Login
    const signInFormElement = document.querySelector(".signInForm");
    signInFormElement.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("signInEmail").value;
      const password = document.getElementById("signInPassword").value;

      const storedUser = JSON.parse(localStorage.getItem("user"));

      if (storedUser && storedUser.email === email && storedUser.password === password) {
        // Store username in localStorage for use on home.html
        localStorage.setItem("loggedInUser", storedUser.name);
        alert("Login successful!");

        // Redirect to home.html
        console.log("Redirecting to home.html");
        window.location.href = "home.html";
      } else {
        alert("Invalid email or password. Please try again.");
        console.log("Failed login attempt with email:", email);
      }
    });
  });
}

// Call the function
switchForms();
