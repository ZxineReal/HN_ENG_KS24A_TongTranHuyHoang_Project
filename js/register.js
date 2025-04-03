const usernameElement = document.querySelector("#fullname");
const emailElement = document.querySelector("#email");
const passwordElement = document.querySelector("#password");
const confirmPasswordElement = document.querySelector("#confirm-password");
const formElement = document.querySelector("#form");

const nameNone = document.querySelector("#name-none");
const emailNone = document.querySelector("#email-none");
const invalidEmail = document.querySelector("#invalid-email");
const passwordNone = document.querySelector("#password-none");
const confirmNone = document.querySelector("#cf-password-none");

function showError(error, element) {
  error.style.display = "block";
  element.classList.add("input-er");
}

function removeError(error, element) {
  error.style.display = "none";
  element.classList.remove("input-er");
}

function validateEmail(email) {
  if (
    (email.endsWith(".com") || email.endsWith(".vn")) &&
    email.includes("@")
  ) {
    
  }
}

formElement.addEventListener("submit", function (event) {
  event.preventDefault();
  let valid = 1;

  const usernameValue = usernameElement.value.trim();
  if (!usernameValue) {
    showError(nameNone, usernameElement);
    valid = 0;
    return;
  } else {
    removeError(nameNone, usernameElement);
    valid = 1;
  }

  const emailValue = emailElement.value.trim();
  if (!emailValue) {
    showError(emailNone, emailElement);
    valid = 0;
    return;
  } else {
    removeError(emailNone, emailElement);
    valid = 1;
  }

  if (
    (emailValue.endsWith(".com") || emailValue.endsWith(".vn")) &&
    emailValue.includes("@")
  ) {
    valid = 1;
  } else {
    showError(invalidEmail, emailElement);
    valid = 0;
    return;
  }

  const passwordValue = passwordElement.value.trim();
  if (!passwordValue) {
    showError(passwordNone, passwordElement);
    valid = 0;
    return;
  } else {
    removeError(passwordNone, passwordElement);
    valid = 1;
  }

  const confirmPasswordValue = confirmPasswordElement.value.trim();
  if (!confirmPasswordValue) {
    showError(confirmNone, confirmPasswordElement);
    valid = 0;
    return;
  } else {
    removeError(confirmNone, confirmPasswordElement);
    valid = 1;
  }

  window.location.href = "../pages/login.html";
});
