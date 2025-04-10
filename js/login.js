const emailElement = document.querySelector("#email");
const passwordElement = document.querySelector("#password");
const formElement = document.querySelector("#form");

const emailNone = document.querySelector("#email-none");
const invalidEmail = document.querySelector("#invalid-email");
const emailError = document.querySelector("#email-er");
const passwordNone = document.querySelector("#password-none");
const passwordError = document.querySelector("#password-er");

const accountLocal = JSON.parse(localStorage.getItem("accounts")) || [];
const loggedAccount = JSON.parse(localStorage.getItem("logged"));

if (loggedAccount) {
  window.location.href = "../pages/project-manager.html";
}

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

  const findEmail = accountLocal.find((account) => account.email === email);
  if (!findEmail) {
    showError(emailError, element);
    return;
  } else {
    removeError(emailError, element);
  }

  return email;
}

function validatePassword(password, element, email) {
  if (!checkEmpty(password, element, passwordNone)) {
    return false;
  }

  const foundAccount = accountLocal.find(
    (acc) => acc.email.toLowerCase() === email.toLowerCase()
  );

  if (!foundAccount || foundAccount.password !== password) {
    showError(passwordError, element);
    return false;
  } else {
    removeError(passwordError, element);
  }

  return true;
}

formElement.addEventListener("submit", function (event) {
  event.preventDefault();

  const emailValue = emailElement.value.trim();
  const passwordValue = passwordElement.value.trim();

  if (!validateEmail(emailValue, emailElement)) {
    return;
  }

  if (!validatePassword(passwordValue, passwordElement, emailValue)) {
    return;
  }

  localStorage.setItem("logged", JSON.stringify(emailValue));

  window.location.href = "../pages/project-manager.html";
});
