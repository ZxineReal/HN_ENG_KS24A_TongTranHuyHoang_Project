const btnAddElement = document.querySelector("#btn-add");
const modalAddElement = document.querySelector("#modal-add");
const projectNameElement = document.querySelector("#project-name");
const btnSaveElement = document.querySelector("#btn-add-save");
const descriptionElement = document.querySelector("#description");
const logoutElement = document.querySelector("#l-log-out");
const projectList = document.querySelector("tbody");
const modalDelElement = document.querySelector("#modal-del");
const btnDelElement = document.querySelector("#btn-del-del");

const projectNameNone = document.querySelector("#prj-name-none");
const projectNameExist = document.querySelector("#exist-prj");
const descriptionNone = document.querySelector("#des-none");

let projectLocal = JSON.parse(localStorage.getItem("projects")) || [];
let loggedAccount = JSON.parse(localStorage.getItem("logged"));
let userProjects = projectLocal.filter(
  (project) => project.owner === loggedAccount
);

if (!loggedAccount) {
  window.location.href = "../pages/login.html";
}

logoutElement.addEventListener("click", function () {
  localStorage.removeItem("logged");
});

function closeModal(modal) {
  modal.classList.add("hidden");
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

function showError(error, element) {
  error.classList.remove("hidden");
  element.classList.add("input-er");
}

function removeError(error, element) {
  error.classList.add("hidden");
  element.classList.remove("input-er");
}

function validatePrjName(name, element) {
  if (!checkEmpty(name, element, projectNameNone)) {
    return;
  }

  const isExists = userProjects.find((prj) => prj.name === name);
  if (isExists) {
    showError(projectNameExist, element);
    return;
  } else [removeError(projectNameExist, element)];

  return name;
}

function renderData() {
  userProjects = projectLocal.filter(
    (project) => project.owner === loggedAccount
  );

  const projectHtmls = userProjects.map((project) => {
    return `
    <tr>
      <td>${project.id}</td>
      <td>${project.name}</td>
      <td class="btn-container">
        <button id="btn-edit">Sửa</button>
        <button onclick = "handleDelete(${project.id})" id="btn-delete">Xóa</button>
        <button id="btn-detail">Chi tiết</button>
      </td>
    </tr>
    `;
  });
  projectList.innerHTML = projectHtmls.join("");
}

function handleDelete(id) {
  const index = projectLocal.findIndex((prj) => prj.id === id);
  modalDelElement.classList.remove("hidden");
  btnDelElement.addEventListener("click", function () {
    projectLocal.splice(index, 1);
    localStorage.setItem("projects", JSON.stringify(projectLocal));
    renderData();
    closeModal(modalDelElement);
  });
}

btnAddElement.addEventListener("click", function (event) {
  event.preventDefault();
  modalAddElement.classList.remove("hidden");
});

btnSaveElement.addEventListener("click", function (event) {
  event.preventDefault();

  const projectNameValue = projectNameElement.value.trim();
  if (!validatePrjName(projectNameValue, projectNameElement)) {
    return;
  }

  const descriptionValue = descriptionElement.value.trim();
  if (!checkEmpty(descriptionValue, descriptionElement, descriptionNone)) {
    return;
  }

  const newProject = {
    id: Math.ceil(Math.random() * 10000),
    name: projectNameValue,
    description: descriptionValue,
    owner: loggedAccount,
  };

  projectLocal.push(newProject);
  localStorage.setItem("projects", JSON.stringify(projectLocal));

  projectNameElement.value = "";
  descriptionElement.value = "";

  closeModal(modalAddElement);
  renderData();
});
renderData();
