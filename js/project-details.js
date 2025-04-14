// Khai báo các phần tử 
const btnAddMission = document.querySelector("#btn-mission-add");
const modalAddElement = document.querySelector("#modal-add");
const missionElement = document.querySelector("#mission");
const btnSaveElement = document.querySelector("#btn-add-save");
const chargePerson = document.getElementById("charge");
const chargeNone = document.querySelector("#charge-none");
const statusElement = document.querySelector("#status");
const date = document.querySelector("#date");
const deadline = document.querySelector("#deadline");
const prioritize = document.querySelector("#prioritize");
const progress = document.querySelector("#progress");
const missionList = document.querySelector(".tbody");
const todoListElemment = document.querySelector("#todoList");
const inprogressListElemment = document.querySelector("#inprogressList");
const pendingListElemment = document.querySelector("#pendingList");
const doneListElemment = document.querySelector("#doneList");
const logoutElement = document.querySelector("#l-log-out");
const btnAddMember = document.querySelector("#btn-add-member");
const modalAddMember = document.querySelector("#modal-add-member");
const formClose = document.querySelector("#md-a-m-close");
const btnFormClose = document.querySelector("#btn-add-member-cancel");
const btnSaveMember = document.querySelector("#btn-add-member-save");
const emailElement = document.querySelector("#email");
const roleElement = document.querySelector("#role");
const memberList = document.querySelector("#member-list");
const moreMember = document.querySelector("#more-member");
const modalMemberList = document.querySelector("#modal-member-list");
const memberListEl = document.querySelector("#member-list");
const memberModalList = document.querySelector("#member-md-list");
const modalMemberClose = document.querySelector("#btn-members-cancel");
const modalMemberCloseIcon = document.querySelector("#md-mb-close");
const btnAddCancel = document.querySelector("#btn-add-cancel");
const btnAddCancelIcon = document.querySelector("#add-icon-close");
const optionMemberList = document.querySelector(".option-member-list");
const modalDel = document.querySelector("#modal-add-del");
const modalDelElement = document.querySelector("#modal-del");
const modalDelCancel = document.querySelector("#md-del-cancel");
const modalDelDel = document.querySelector("#md-del-del");
const modalDelIcon = document.querySelector("#md-del-icon");
const memberSave = document.querySelector("#btn-members-save");
const toggleTodo = document.querySelector("#toggleTodo");
const toggleInprg = document.querySelector("#toggleInprg");
const togglePending = document.querySelector("#togglePending");
const toggleDone = document.querySelector("#toggleDone");
const missionFindElement = document.querySelector("#mission-find");
const prjContent = document.querySelector("#prj-content");

// Khai báo các phần tử lỗi 
const missionNameNone = document.querySelector("#mission-name-none");
const missionNameExist = document.querySelector("#mission-name-exist");
const statusNone = document.querySelector("#status-none");
const startNone = document.querySelector("#start-none");
const endNone = document.querySelector("#end-none");
const priNone = document.querySelector("#pri-none");
const progNone = document.querySelector("#prog-none");
const invalidDate = document.querySelector("#invalid-date");
const invalidDateline = document.querySelector("#invalid-dateline");
const emailNone = document.querySelector("#email-none");
const emailExist = document.querySelector("#email-exist");
const roleNone = document.querySelector("#role-none");
const invalidEmail = document.querySelector("#invalid-email");
const emailNotExist = document.querySelector("#email-not-exist");

// Khai báo các phần tử local
let accountLocal = JSON.parse(localStorage.getItem("accounts")) || [];
let projectLocal = JSON.parse(localStorage.getItem("projects")) || [];
let loggedAccount = JSON.parse(localStorage.getItem("logged"));
let missionLocal = JSON.parse(localStorage.getItem("missions")) || [];
let memberLocal = JSON.parse(localStorage.getItem("members")) || [];
let projectID = localStorage.getItem("projectID");

// Tìm projectID 
let projectMission = missionLocal.filter(
  (mission) => mission.prjId === projectID
);

// Kiểm tra đăng nhập
if (!loggedAccount) {
  window.location.href = "../pages/login.html";
}

// Biến thể loại (thêm/sửa)
let type = "";

// Đăng xuất
logoutElement.addEventListener("click", function () {
  localStorage.removeItem("logged");
  localStorage.removeItem("projectID");
});

/**
 * Hàm kiểm tra biến rỗng
 * @param {*} value Giá trị của biến (giá trị trong ô input)
 * @param {*} element Biến (Biến input)
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
 * Hàm thông báo lỗi
 * @param {*} error Lỗi
 * @param {*} element Biến (Biến input)
 */
function showError(error, element) {
  error.classList.remove("hidden");
  element.classList.add("input-er");
}

/**
 * Hàm loại bỏ thông báo lỗi
 * @param {*} error Lỗi
 * @param {*} element Biến (Biến input)
 */
function removeError(error, element) {
  error.classList.add("hidden");
  element.classList.remove("input-er");
}

function validateMissionName(name, element) {
  if (!checkEmpty(name, element, missionNameNone)) {
    return;
  }
  return name;
}

/**
 * Hàm kiểm tra lựa chọn
 * @param {*} value Giá trị trong ô select
 * @param {*} element Biến select
 * @param {*} error Lỗi
 * @returns 
 */
function checkEmptySelect(value, element, error) {
  if (value === "0") {
    showError(error, element);
    return false;
  } else {
    removeError(error, element);
    return true;
  }
}

btnAddMission.addEventListener("click", function () {
  type = "add";
  modalAddElement.classList.remove("hidden");
});

btnSaveElement.addEventListener("click", function (event) {
  event.preventDefault();

  const missionValue = missionElement.value.trim();
  if (!validateMissionName(missionValue, missionElement)) {
    return;
  }

  const chargePersonValue = chargePerson.value;
  if (!checkEmptySelect(chargePersonValue, chargePerson, chargeNone)) {
    return;
  }

  const selectedMember = memberLocal.find(
    (member) => member.name === chargePersonValue
  );

  const statusValue = statusElement.value;
  if (!checkEmptySelect(statusValue, statusElement, statusNone)) {
    return;
  }

  const dateValue = date.value;
  if (!checkEmpty(dateValue, date, startNone)) {
    return;
  }

  let curentDate = new Date();
  let curentDay = curentDate.getDate();
  let curentMonth = curentDate.getMonth();
  let curentYear = curentDate.getFullYear();

  let startdate = new Date(dateValue);
  let startDay = startdate.getDate();
  if (startDay > 0 && startDay < 10) {
    startDay = `0${startDay}`;
  }
  let startMonth = startdate.getMonth() + 1;
  if (startMonth > 0 && startMonth < 10) {
    startMonth = `0${startMonth}`;
  }
  let startYear = startdate.getFullYear();

  const deadlineValue = deadline.value;
  if (!checkEmpty(deadlineValue, deadline, endNone)) {
    return;
  }

  let enddate = new Date(deadlineValue);
  let endDay = enddate.getDate();
  if (endDay > 0 && endDay < 10) {
    endDay = `0${endDay}`;
  }
  let endMonth = enddate.getMonth() + 1;
  if (endMonth > 0 && endMonth < 10) {
    endMonth = `0${endMonth}`;
  }
  let endYear = enddate.getFullYear();

  if (
    startYear > endYear ||
    (startYear === endYear && startMonth > endMonth) ||
    (startYear === endYear && startMonth === endMonth && startDay > endDay)
  ) {
    showError(invalidDate, date);
    showError(invalidDateline, deadline);
    return;
  } else {
    removeError(invalidDate, date);
    removeError(invalidDateline, deadline);
  }

  if (
    startYear < curentYear ||
    (startYear === curentYear && startMonth < curentMonth) ||
    (startYear === curentYear &&
      startMonth === curentMonth &&
      startDay < curentDay)
  ) {
    showError(invalidDate, date);
    return;
  } else {
    removeError(invalidDate, date);
  }

  const prioritizeValue = prioritize.value;
  if (!checkEmptySelect(prioritizeValue, prioritize, priNone)) {
    return;
  }

  const progressValue = progress.value;
  if (!checkEmptySelect(progressValue, progress, progNone)) {
    return;
  }
  if (type === "add") {
    missionElement.value = "";
    chargePerson.value = "0";
    statusElement.value = "0";
    date.value = "";
    deadline.value = "";
    prioritize.value = "0";
    progress.value = "0";
    const newMission = {
      id: Math.ceil(Math.random() * 10000),
      prjId: projectID,
      name: missionValue,
      status: statusValue,
      charge: chargePersonValue,
      prioritize: prioritizeValue,
      start: `${startDay} - ${startMonth}`,
      end: `${endDay} - ${endMonth}`,
      progress: progressValue,
      date: dateValue,
      deadline: deadlineValue,
      chargeEmail: selectedMember.email,
    };
    missionLocal.push(newMission);
  } else if (type === "edit") {
    let findMission = missionLocal.find((mission) => mission.id === idEdit);
    findMission.name = missionValue;
    findMission.charge = chargePersonValue;
    findMission.status = statusValue;
    findMission.start = `${startDay} - ${startMonth}`;
    findMission.end = `${endDay} - ${endMonth}`;
    findMission.prioritize = prioritizeValue;
    findMission.progress = progressValue;
    findMission.chargeEmail = selectedMember.email;
    findMission.date = dateValue;
    findMission.deadline = deadlineValue;
  }

  localStorage.setItem("missions", JSON.stringify(missionLocal));
  missionElement.value = "";
  chargePerson.value = "0";
  statusElement.value = "0";
  date.value = "";
  deadline.value = "";
  prioritize.value = "0";
  progress.value = "0";
  modalAddElement.classList.add("hidden");
  type = "";
  renderData(missionLocal);
});

btnAddCancel.addEventListener("click", function () {
  closeModal(modalAddElement);
});

btnAddCancelIcon.addEventListener("click", function () {
  closeModal(modalAddElement);
});

/**
 * Hàm render dữ liệu
 * @param {*} data Dữ liệu để render ra màn hình
 */
function renderData(data) {
  const projectMission = data.filter((mission) => mission.prjId === projectID);

  todoListElemment.innerHTML = "";
  inprogressListElemment.innerHTML = "";
  pendingListElemment.innerHTML = "";
  doneListElemment.innerHTML = "";

  projectMission.forEach((mission) => {
    const html = `
      <tr>
        <td>${mission.name}</td>
        <td>${mission.charge}</td>
        <td class="priority"><span class="${
          mission.prioritize === "Thấp"
            ? "pr-l"
            : mission.prioritize === "Trung bình"
            ? "pr-m"
            : "pr-h"
        }">${mission.prioritize}</span></td>
        <td class="date">${mission.start}</td>
        <td class="date">${mission.end}</td>
        <td class="progress">
          <span class="${
            mission.progress === "Đúng tiến độ"
              ? "prg-t"
              : mission.progress === "Trễ hẹn"
              ? "prg-f"
              : "prg-r"
          }">${mission.progress}</span>
        </td>
        <td>
          <button onclick="handleEdit(${
            mission.id
          })" class="btn-edit">Sửa</button>
          <button onclick="delMission(${
            mission.id
          })" class="btn-delete">Xóa</button>
        </td>
      </tr>
    `;

    if (mission.status === "1") {
      todoListElemment.innerHTML += html;
    } else if (mission.status === "2") {
      inprogressListElemment.innerHTML += html;
    } else if (mission.status === "3") {
      pendingListElemment.innerHTML += html;
    } else if (mission.status === "4") {
      doneListElemment.innerHTML += html;
    }
  });
}

let idEdit;
function handleEdit(id) {
  modalAddElement.classList.remove("hidden");
  idEdit = id;
  type = "edit";
  let findMission = missionLocal.find((mission) => mission.id === idEdit);
  missionElement.value = findMission.name;
  chargePerson.value = findMission.charge;
  statusElement.value = findMission.status;
  date.value = findMission.date;
  deadline.value = findMission.deadline;
  prioritize.value = findMission.prioritize;
  progress.value = findMission.progress;
}

let idDelete;
function delMission(id) {
  modalDelElement.classList.remove("hidden");
  idDelete = id;
}

modalDelDel.addEventListener("click", function () {
  const index = missionLocal.findIndex((mission) => mission.id === idDelete);
  missionLocal.splice(index, 1);
  localStorage.setItem("missions", JSON.stringify(missionLocal));
  renderData(missionLocal);
  modalDelElement.classList.add("hidden");
});

modalDelCancel.addEventListener("click", function () {
  closeModal(modalDelElement);
});

modalDelIcon.addEventListener("click", function () {
  closeModal(modalDelElement);
});

btnAddMember.addEventListener("click", function (event) {
  event.preventDefault();
  modalAddMember.classList.remove("hidden");
});

function closeModal(modal) {
  modal.classList.add("hidden");
}

formClose.addEventListener("click", function () {
  closeModal(modalAddMember);
});

btnFormClose.addEventListener("click", function () {
  closeModal(modalAddMember);
});

btnSaveMember.addEventListener("click", function (event) {
  event.preventDefault();

  const emailValue = emailElement.value.trim();
  const findAccount = accountLocal.find((acc) => acc.email === emailValue);

  if (!emailValue) {
    showError(emailNone, emailElement);
    return;
  } else {
    removeError(emailNone, emailElement);
  }

  if (
    emailValue.includes("@") &&
    (emailValue.endsWith(".com") || emailValue.endsWith(".vn"))
  ) {
    removeError(invalidEmail, emailElement);
  } else {
    showError(invalidEmail, emailElement);
    return;
  }

  const findEmail = memberLocal.find(
    (mem) => mem.email === emailValue && mem.projID == projectID
  );
  if (findEmail) {
    showError(emailExist, emailElement);
    return;
  } else {
    removeError(emailExist, emailElement);
  }

  if (!findAccount) {
    showError(emailNotExist, emailElement);
    return;
  } else {
    removeError(emailNotExist, emailElement);
  }

  const roleValue = roleElement.value.trim();
  if (!roleValue) {
    showError(roleNone, roleElement);
    return;
  } else {
    removeError(roleNone, roleElement);
  }

  const newMember = {
    projID: projectID,
    id: findAccount.id,
    name: findAccount.name,
    email: emailValue,
    role: roleValue,
  };
  memberLocal.push(newMember);
  localStorage.setItem("members", JSON.stringify(memberLocal));

  emailElement.value = "";
  roleElement.value = "";

  modalAddMember.classList.add("hidden");
  renderMember();
});

function renderMember() {
  const filteredMembers = memberLocal.filter((mem) => mem.projID == projectID);

  // Chỉ hiển thị ra duy nhất 2 thành viên
  const memList = filteredMembers.slice(0, 2);

  memberListEl.innerHTML = memList
    .map(
      (mem) => `
    <div class="member">
      <div class="user-avt"></div>
      <div class member-add-info>
        <p class="member-name">${mem.name}</p>
        <p class="member-role">${mem.role}</p>
      </div>
    </div>
  `
    )
    .join("");

  memberModalList.innerHTML = filteredMembers
    .map(
      (mem) => `
   <div class="modal-member">
    <div class="member-info">
      <div class="user-avt"></div>
      <div class="info">
        <h4>${mem.name}</h4>
        <p>${mem.email}</p>
      </div>
    </div>
    <div class="member-role">
      <input
        value="${mem.role}"
        type="text"
        name="member-role"
        id="member-role"
      />
      <span class="icon-del"><i onclick="memberDelete(${mem.id})" class="fa-solid fa-trash"></i></span>
    </div>
  </div>
    `
    )
    .join("");

  optionMemberList.innerHTML = filteredMembers
    .map(
      (mem) =>
        `
  <option value="${mem.name}">${mem.name}</option>
    `
    )
    .join("");
}

let memberDelID;
let isDelete = false;
function memberDelete(id) {
  memberDelID = id;
  isDelete = true;
}

memberSave.addEventListener("click", function () {
  if (isDelete) {
    const index = memberLocal.findIndex((mem) => mem.id === memberDelID);
    memberLocal.splice(index, 1);
  }

  const roleInputs = document.querySelectorAll(
    "#member-md-list input[name='member-role']"
  );
  const filteredMembers = memberLocal.filter((mem) => mem.projID === projectID);
  roleInputs.forEach((input, index) => {
    const member = filteredMembers[index];
    if (member) {
      const newRole = input.value.trim();
      if (newRole) {
        member.role = newRole;
      }
    }
  });

  localStorage.setItem("members", JSON.stringify(memberLocal));
  renderMember();
  closeModal(modalMemberList);
  isDelete = false;
});

moreMember.addEventListener("click", function (event) {
  event.preventDefault();
  modalMemberList.classList.remove("hidden");
});

modalMemberClose.addEventListener("click", function () {
  closeModal(modalMemberList);
});

modalMemberCloseIcon.addEventListener("click", function () {
  closeModal(modalMemberList);
});

toggleTodo.addEventListener("click", function () {
  todoListElemment.classList.toggle("hidden");
  toggleTodo.classList.toggle("list-active");
});

toggleInprg.addEventListener("click", function () {
  inprogressListElemment.classList.toggle("hidden");
  toggleInprg.classList.toggle("list-active");
});

togglePending.addEventListener("click", function () {
  pendingListElemment.classList.toggle("hidden");
  togglePending.classList.toggle("list-active");
});

toggleDone.addEventListener("click", function () {
  doneListElemment.classList.toggle("hidden");
  toggleDone.classList.toggle("list-active");
});

missionFindElement.addEventListener("keyup", function (event) {
  event.preventDefault();

  const findMissison = missionFindElement.value.trim();
  if (findMissison) {
    const filterMission = missionLocal.filter((mission) =>
      mission.name.includes(missionFindElement.value)
    );
    renderData(filterMission);
  } else {
    renderData(missionLocal);
  }
});

function renderPrjContent() {
  const findProject = projectLocal.find((prj) => prj.id == projectID);
  const html = `
    <h2>${findProject.name}</h2>
    <p>${findProject.description}</p>
  `;
  prjContent.innerHTML = html;
}

renderPrjContent();
renderMember();
renderData(missionLocal);
