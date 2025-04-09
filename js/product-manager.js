const btnAddElement = document.querySelector("#btn-add");
const modalAddElement = document.querySelector("#modal-add");
const projectNameElement = document.querySelector("#project-name");
const btnSaveElement = document.querySelector("#btn-add-save");
const descriptionElement = document.querySelector("#description");
const logoutElement = document.querySelector("#l-log-out");
const projectLinkElement = document.querySelector("#l-projects");
const projectList = document.querySelector("tbody");
const modalDelElement = document.querySelector("#modal-del");
const btnDelElement = document.querySelector("#btn-del-del");
const formElement = document.querySelector("#modal-add-form");
const findPrjElement = document.querySelector("#prj-find");
const mainFormElement = document.querySelector("#main-form");

const projectNameNone = document.querySelector("#prj-name-none");
const projectNameExist = document.querySelector("#exist-prj");
const descriptionNone = document.querySelector("#des-none");

let projectLocal = JSON.parse(localStorage.getItem("projects")) || [];
let loggedAccount = JSON.parse(localStorage.getItem("logged"));
let projectDetail = JSON.parse(localStorage.getItem("projectID"));

projectLinkElement.addEventListener("click", function () {
  localStorage.removeItem("projectID");
});

let userProjects = projectLocal.filter(
  (project) => project.owner === loggedAccount
);

if (!loggedAccount) {
  window.location.href = "../pages/login.html";
}

logoutElement.addEventListener("click", function () {
  localStorage.removeItem("projectID");
  localStorage.removeItem("logged");
});

function closeModal(modal) {
  modal.classList.add("hidden");
}

let type = "";

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

function renderData(value) {
  userProjects = value.filter((project) => project.owner === loggedAccount);

  const projectHtmls = userProjects.map((project) => {
    return `
    <tr>
      <td>${project.id}</td>
      <td>${project.name}</td>
      <td class="btn-container">
        <button onclick = "handleEdit(${project.id})" id="btn-edit">Sửa</button>
        <button onclick = "handleDelete(${project.id})" id="btn-delete">Xóa</button>
        <button onclick = "showDetail(${project.id})" id="btn-detail">Chi tiết</button>
      </td>
    </tr>
    `;
  });
  projectList.innerHTML = projectHtmls.join("");
}

let idDelete = "";
function handleDelete(id) {
  idDelete = id;
  modalDelElement.classList.remove("hidden");
}

btnDelElement.addEventListener("click", function () {
  const index = projectLocal.findIndex((prj) => prj.id === idDelete);
  projectLocal.splice(index, 1);
  localStorage.setItem("projects", JSON.stringify(projectLocal));
  renderData(projectLocal);
  closeModal(modalDelElement);
});

let idEdit = "";
function handleEdit(id) {
  idEdit = id;
  modalAddElement.classList.remove("hidden");
  type = "edit";
  const prjEdit = projectLocal.find((prj) => prj.id === idEdit);
  projectNameElement.value = prjEdit.name;
  descriptionElement.value = prjEdit.description;
}

let idDetails = "";
function showDetail(id) {
  idDetails = id;
  const prjDetail = projectLocal.find((prj) => prj.id === idDetails);
  localStorage.setItem("projectID", JSON.stringify(prjDetail.id));
  window.location.href = "../pages/project-details.html";
}

btnAddElement.addEventListener("click", function (event) {
  event.preventDefault();
  modalAddElement.classList.remove("hidden");
  type = "add";
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

  if (type === "add") {
    projectNameElement.value = "";
    descriptionElement.value = "";
    const newProject = {
      id: Math.ceil(Math.random() * 10000),
      name: projectNameValue,
      description: descriptionValue,
      owner: loggedAccount,
    };
    projectLocal.push(newProject);
  } else if (type === "edit") {
    const projEdit = projectLocal.find((prj) => prj.id === idEdit);
    projEdit.name = projectNameValue;
    projEdit.description = descriptionValue;
  }

  localStorage.setItem("projects", JSON.stringify(projectLocal));

  projectNameElement.value = "";
  descriptionElement.value = "";

  closeModal(modalAddElement);
  renderData(projectLocal);
  type = "";
});
renderData(projectLocal);

formElement.addEventListener("submit", function (event) {
  event.preventDefault();
});

mainFormElement.addEventListener("submit", function (event) {
  event.preventDefault();

  const findPrjValue = findPrjElement.value.trim();
  if (findPrjValue) {
    const filterPrj = projectLocal.filter((prj) =>
      prj.name.includes(findPrjValue)
    );
    renderData(filterPrj);
  } else {
    renderData(projectLocal);
  }
});
