// Phạm vi truy cập các phần tử trong DOM
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
const btnPagesElement = document.querySelector("#btn-pages");
const btnPrevElement = document.querySelector("#btn-prev");
const btnNextElement = document.querySelector("#btn-next");

// Các biến để hiển thị lỗi
const projectNameNone = document.querySelector("#prj-name-none");
const projectNameExist = document.querySelector("#exist-prj");
const descriptionNone = document.querySelector("#des-none");

// Các biến toàn cục
let projectLocal = JSON.parse(localStorage.getItem("projects")) || [];
let loggedAccount = JSON.parse(localStorage.getItem("logged"));
let projectDetail = JSON.parse(localStorage.getItem("projectID"));
let accountLocal = JSON.parse(localStorage.getItem("accounts")) || [];
let memberLocal = JSON.parse(localStorage.getItem("members")) || [];

// Biến phục vụ phân trang
let curentPage = 1;
const totalPerPage = 9;
let totalPage = Math.ceil(
  projectLocal.filter((p) => p.owner === loggedAccount).length / totalPerPage
);

// Biến thể loại (Thêm / sửa)
let type = "";

// Tìm ra account nào đang đăng nhập
let userProjects = projectLocal.filter(
  (project) => project.owner === loggedAccount
);

// Đăng xuất
projectLinkElement.addEventListener("click", function () {
  localStorage.removeItem("projectID");
});

if (!loggedAccount) {
  window.location.href = "../pages/login.html";
}

logoutElement.addEventListener("click", function () {
  localStorage.removeItem("projectID");
  localStorage.removeItem("logged");
});

/**
 * Hàm render trang
 * @param {*} data trang
 */
function renderPages(data) {
  userProjects = data.filter((prj) => prj.owner === loggedAccount);
  totalPage = Math.ceil(userProjects.length / totalPerPage);

  btnPagesElement.textContent = "";

  // Hiển thị ra danh sách nút
  for (let i = 1; i <= totalPage; i++) {
    const pageElement = document.createElement("button");

    pageElement.textContent = i;

    // Gắn class active cho nút được ấn vào
    if (curentPage === i) {
      pageElement.classList.add("active");
    }

    // Nếu page hiện tại = 1 thì không thể ấn nút trang trước
    if (curentPage === 1) {
      btnPrevElement.classList.add("none");
    } else {
      btnPrevElement.classList.remove("none");
    }

    // Nếu trang hiện tại là trang cuối thì không thể ấn nút chuyển tiếp trang
    if (curentPage === totalPage) {
      btnNextElement.classList.add("none");
    } else {
      btnNextElement.classList.remove("none");
    }

    // Gắn trang hiện tại cho nút được ấn vào và render nội dung trong trang
    pageElement.addEventListener("click", function () {
      curentPage = i;
      renderPages(data);
      renderData(data);
    });

    btnPagesElement.appendChild(pageElement);
  }
}

// Sự kiện chuyển về trang trước
btnPrevElement.addEventListener("click", function () {
  if (curentPage > 1) {
    curentPage--;
    renderPages(projectLocal);
    renderData(projectLocal);
  }
});

// Sự kiện chuyển tiếp trang
btnNextElement.addEventListener("click", function () {
  if (curentPage < totalPage) {
    curentPage++;
    renderPages(projectLocal);
    renderData(projectLocal);
  }
});

renderPages(projectLocal);

/**
 * Hàm đóng modal
 * @param {*} modal modal
 */
function closeModal(modal) {
  modal.classList.add("hidden");
}

/**
 * Hàm kiểm tra nội dung rỗng
 * @param {*} value Nội dung
 * @param {*} element Biến input chứa nội dung
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
 * Hàm hiển thị lỗi
 * @param {*} error Lỗi
 * @param {*} element Biến chứa lỗi
 */
function showError(error, element) {
  error.classList.remove("hidden");
  element.classList.add("input-er");
}

/**
 * Hàm xóa lỗi
 * @param {*} error Lỗi
 * @param {*} element Biến chứa lỗi
 */
function removeError(error, element) {
  error.classList.add("hidden");
  element.classList.remove("input-er");
}

/**
 * Hàm validate dữ liệu cho project name
 * @param {*} name Project name
 * @param {*} element Biến project
 * @returns
 */
function validatePrjName(name, element) {
  if (!checkEmpty(name, element, projectNameNone)) {
    return;
  }

  const isExists = userProjects.find((prj) => prj.name === name);
  if (isExists) {
    showError(projectNameExist, element);
    return;
  } else {
    removeError(projectNameExist, element);
  }

  return name;
}

/**
 * Hàm render data
 * @param {*} value Dữ liệu cần render
 */
function renderData(value) {
  userProjects = value.filter((project) => project.owner === loggedAccount);

  const start = (curentPage - 1) * totalPerPage;
  const end = curentPage * totalPerPage;

  const pagiProjects = userProjects.slice(start, end);

  const projectHtmls = pagiProjects.map((project) => {
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
  renderPages(value);
}

// Xóa dự án
let idDelete = "";
function handleDelete(id) {
  idDelete = id;
  modalDelElement.classList.remove("hidden");
}

// Xác nhận xóa
btnDelElement.addEventListener("click", function () {
  const index = projectLocal.findIndex((prj) => prj.id === idDelete);
  projectLocal.splice(index, 1);
  localStorage.setItem("projects", JSON.stringify(projectLocal));
  renderData(projectLocal);
  closeModal(modalDelElement);
});

// Sửa dự án
let idEdit = "";
function handleEdit(id) {
  idEdit = id;
  modalAddElement.classList.remove("hidden");
  type = "edit";
  const prjEdit = projectLocal.find((prj) => prj.id === idEdit);
  projectNameElement.value = prjEdit.name;
  descriptionElement.value = prjEdit.description;
}

// Chi tiết dự án
let idDetails = "";
function showDetail(id) {
  idDetails = id;
  const prjDetail = projectLocal.find((prj) => prj.id === idDetails);
  localStorage.setItem("projectID", JSON.stringify(prjDetail.id));
  window.location.href = "../pages/project-details.html";
}

// Thêm dự án
btnAddElement.addEventListener("click", function (event) {
  event.preventDefault();
  modalAddElement.classList.remove("hidden");
  type = "add";
});

// Lưu dự án
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
  // Nếu thêm
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

    const findAccount = accountLocal.find((acc) => acc.email == loggedAccount);
    console.log(findAccount);

    const ownerMember = {
      projID: String(newProject.id),
      name: findAccount.name,
      email: findAccount.email,
      role: "Owner",
    };
    console.log(ownerMember);

    memberLocal.push(ownerMember);
    localStorage.setItem("members", JSON.stringify(memberLocal));
  } else if (type === "edit") {
    /* Nếu sửa */ const projEdit = projectLocal.find(
      (prj) => prj.id === idEdit
    );
    projEdit.name = projectNameValue;
    projEdit.description = descriptionValue;
  }

  // Lưu dự án lên local
  localStorage.setItem("projects", JSON.stringify(projectLocal));

  projectNameElement.value = "";
  descriptionElement.value = "";

  // Đóng modal thêm dự án và render dữ liệu, đặt lại biến thể loại
  closeModal(modalAddElement);
  renderData(projectLocal);
  type = "";
});
renderData(projectLocal);

formElement.addEventListener("submit", function (event) {
  event.preventDefault();
});

// Tìm kiếm dự án
mainFormElement.addEventListener("keyup", function (event) {
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
