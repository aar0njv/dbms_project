// Toggle between login and signup forms
function toggleForm() {
  const loginForm = document.getElementById("loginForm");
  const signupForm = document.getElementById("signupForm");

  if (loginForm.style.display === "none") {
    loginForm.style.display = "block";
    signupForm.style.display = "none";
  } else {
    loginForm.style.display = "none";
    signupForm.style.display = "block";
  }
}

// Validate username
function validateUsername(input) {
  const username = input.value;
  const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
  const errorSpan = document.getElementById("usernameError");

  if (!usernameRegex.test(username)) {
    errorSpan.style.display = "inline";
    errorSpan.textContent = "Username invalid";
  } else {
    errorSpan.style.display = "none";
  }
}

// Validate password
function validatePassword(input) {
  const password = input.value;
  const errorSpan = document.getElementById("passwordError");

  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,}$/;

  if (!passwordRegex.test(password)) {
    errorSpan.style.display = "inline";
    errorSpan.textContent = "Password must be at least 8 characters long and include a capital letter, a number, and a special character.";
  } else {
    errorSpan.style.display = "none";
  }

  // Also validate confirm password in real-time
  validateConfirmPassword();
}

// Validate confirm password
function validateConfirmPassword() {
  const password = document.getElementById("signup-password").value;
  const confirmPassword = document.getElementById("signup-confirm-password").value;
  const errorSpan = document.getElementById("confirmPasswordError");

  if (confirmPassword && confirmPassword !== password) {
    errorSpan.style.display = "inline";
  } else {
    errorSpan.style.display = "none";
  }
}

// Final form validation on submit
function validateSignupForm() {
  validateUsername(document.getElementById("signup-username"));
  validatePassword(document.getElementById("signup-password"));
  validateConfirmPassword();

  const passwordError = document.getElementById("passwordError").style.display;
  const confirmError = document.getElementById("confirmPasswordError").style.display;
  const usernameError = document.getElementById("usernameError").style.display;

  return passwordError === "none" && confirmError === "none" && usernameError === "none";
}
