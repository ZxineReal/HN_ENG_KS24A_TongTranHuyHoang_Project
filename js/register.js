// Phạm vi truy cập các phần tử trong DOM
const usernameElement = document.querySelector("#fullname");
const emailElement = document.querySelector("#email");
const passwordElement = document.querySelector("#password");
const confirmPasswordElement = document.querySelector("#confirm-password");
const formElement = document.querySelector("#form");

// Các biến lỗi
const nameNone = document.querySelector("#name-none");
const emailNone = document.querySelector("#email-none");
const invalidEmail = document.querySelector("#invalid-email");
const emailExist = document.querySelector("#exist-email");
const passwordNone = document.querySelector("#password-none");
const invalidPassword = document.querySelector("#invalid-password");
const confirmNone = document.querySelector("#cf-password-none");
const invalidCfPassword = document.querySelector("#invalid-cf-password");

// Các biến toàn cục
let accountLocal = JSON.parse(localStorage.getItem("accounts")) || [];
const loggedAccount = JSON.parse(localStorage.getItem("logged"));

// Kiểm tra đăng nhập
if (loggedAccount) {
  window.location.href = "../pages/project-manager.html";
}

/**
 * Hàm hiển thị lỗi
 * @param {*} error Lỗi
 * @param {*} element Biến chứa lỗi
 */
function showError(error, element) {
  error.style.display = "block";
  element.classList.add("input-er");
}

/**
 * Hàm xóa lỗi
 * @param {*} error Lỗi
 * @param {*} element Biến chứa lỗi
 */
function removeError(error, element) {
  error.style.display = "none";
  element.classList.remove("input-er");
}

/**
 * Hàm kiểm tra giá trị rỗng
 * @param {*} value Giá trị
 * @param {*} element Biến
 * @param {*} error Lỗi
 * @returns 
 */
function checkEmpty(value, element, error) {
  if (!value) {
    showError(error, element);
    return;
  } else {
    removeError(error, element);
  }
  return element;
}

/**
 * Hàm validate email
 * @param {*} email email
 * @param {*} element Biến email
 * @returns 
 */
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

  const isDuplicate = accountLocal.some(
    (account) => account.email.toLowerCase() === email.toLowerCase()
  );

  if (isDuplicate) {
    showError(emailExist, element);
    return;
  } else {
    removeError(emailExist, element);
  }

  return email;
}

/**
 * Hàm validate mật khẩu
 * @param {*} password Mật khẩu
 * @param {*} element Biến mật khẩu
 * @returns 
 */
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
  return password;
}

/**
 * Hàm validate xác nhận mật khẩu
 * @param {*} confirmPassword Xác nhận mật khẩu
 * @param {*} element Biến xác nhận mật khẩu
 * @param {*} passwordValue Mật khẩu
 * @returns 
 */
function validateConfirmPassword(confirmPassword, element, passwordValue) {
  if (!checkEmpty(confirmPassword, element, confirmNone)) {
    return;
  }
  if (confirmPassword !== passwordValue) {
    showError(invalidCfPassword, element);
    return;
  } else {
    removeError(invalidCfPassword, element);
  }
  return confirmPassword;
}

formElement.addEventListener("submit", function (event) {
  event.preventDefault();

  const usernameValue = usernameElement.value.trim();
  if (!checkEmpty(usernameValue, usernameElement, nameNone)) {
    return;
  }

  const emailValue = emailElement.value.trim();
  if (!validateEmail(emailValue, emailElement)) {
    return;
  }

  const passwordValue = passwordElement.value.trim();
  if (!validatePassword(passwordValue, passwordElement)) {
    return;
  }

  const confirmPasswordValue = confirmPasswordElement.value.trim();
  if (
    !validateConfirmPassword(
      confirmPasswordValue,
      confirmPasswordElement,
      passwordValue
    )
  ) {
    return;
  }

  const newAccount = {
    name: usernameValue,
    email: emailValue,
    password: passwordValue,
  };

  accountLocal.push(newAccount);
  localStorage.setItem("accounts", JSON.stringify(accountLocal));

  window.location.href = "../pages/login.html";
});
