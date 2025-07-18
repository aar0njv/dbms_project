function toggleForm() {
  const loginForm = document.getElementById("loginForm");
  const signupForm = document.getElementById("signupForm");

  // Toggle visibility
  if (loginForm.style.display === "none") {
    loginForm.style.display = "block";
    signupForm.style.display = "none";
  } else {
    loginForm.style.display = "none";
    signupForm.style.display = "block";
  }
 function validateCustomEmail(input) {
  const emailError = document.getElementById("emailError");
  const value = input.value.trim();

  // Regex: standard email with .com, no spaces
  const baseRegex = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9]+(\.[a-zA-Z]{2,})$";

  if (!baseRegex.test(value)) {
    emailError.style.display = "block";
    input.setCustomValidity("Invalid email format");
    return;
  }

  // Extract domain part (after @)
  const domain = value.split("@")[1];

  // Only allow EXACT domains (no subdomains)
  const allowedDomains = ["gmail.com", "ktu.com", "ezygo.com"];
  if (!allowedDomains.includes(domain)) {
    emailError.style.display = "block";
    input.setCustomValidity("Email domain not allowed");
  } else {
    emailError.style.display = "none";
    input.setCustomValidity("");
  }
}




}
