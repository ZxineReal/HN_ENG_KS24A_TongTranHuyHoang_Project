const usernameElement = document.querySelector("#fullname");
const emailElement = document.querySelector("#email");
const passwordElement = document.querySelector("#password");
const confirmPasswordElement = document.querySelector("#confirm-password");
const formElement = document.querySelector("#form");

const nameNone = document.querySelector("#name-none");
const emailNone = document.querySelector("#email-none");
const invalidEmail = document.querySelector("#invalid-email");
const passwordNone = document.querySelector("#password-none");
const invalidPassword = document.querySelector("#invalid-password");
const confirmNone = document.querySelector("#cf-password-none");

function showError(error, element) {
  error.style.display = "block";
  element.classList.add("input-er");
}

function removeError(error, element) {
  error.style.display = "none";
  element.classList.remove("input-er");
}

function checkEmpty(value, element, error) {
  if (!value) {
    showError(error, element);
    return;
  } else {
    removeError(error, element);
  }
  return element;
}

function validateEmail(email, element) {
  if (!checkEmpty(email, element, emailNone)) {
    return;
  }
  if (
    (email.endsWith(".com") || email.endsWith(".vn")) &&
    email.includes("@")
  ) {
    removeError(invalidEmail, element);
  } else {
    showError(invalidEmail, element);
    return;
  }
  return email;
}

function validatePassword(password, element) {
  if (!checkEmpty(password, element, passwordNone)) {
    return;
  }
  if (password.length < 8) {
    showError(invalidPassword, element);
    return;
  } else {
    removeError(invalidPassword, element);
  }
}

function validateConfirmPassword(confirmPassword, element) {
  if(!checkEmpty(confirmPassword,element,confirmNone)) {
    return;
  }

}

formElement.addEventListener("submit", function (event) {
  event.preventDefault();
  let valid = 1;

  const usernameValue = usernameElement.value.trim();
  if (!checkEmpty(usernameValue, usernameElement, nameNone)) {
    valid = 0;
    return;
  }

  const emailValue = emailElement.value.trim();
  if (!validateEmail(emailValue, emailElement)) {
    valid = 0;
    return;
  }

  const passwordValue = passwordElement.value.trim();
  if (!validatePassword(passwordValue, passwordElement)) {
    valid = 0;
    return;
  }

  const confirmPasswordValue = confirmPasswordElement.value.trim();
  if(!validateConfirmPassword(confirmPasswordValue,confirmPasswordElement)) {
    valid = 0;
    return;
  }

  window.location.href = "../pages/login.html";
});
