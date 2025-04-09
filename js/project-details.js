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

const missionNameNone = document.querySelector("#mission-name-none");
const missionNameExist = document.querySelector("#mission-name-exist");
const statusNone = document.querySelector("#status-none");
const startNone = document.querySelector("#start-none");
const endNone = document.querySelector("#end-none");
const priNone = document.querySelector("#pri-none");
const progNone = document.querySelector("#prog-none");

let projectLocal = JSON.parse(localStorage.getItem("projects")) || [];
let loggedAccount = JSON.parse(localStorage.getItem("logged"));
let missionLocal = JSON.parse(localStorage.getItem("missions")) || [];
let projectID = localStorage.getItem("projectID");
let projectMission = missionLocal.filter((mission) => mission.prjId === projectID);

let style = "";

if (!loggedAccount) {
  window.location.href = "../pages/login.html";
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

function validateMissionName(name, element) {
  if (!checkEmpty(name, element, missionNameNone)) {
    return;
  }
  return name;
}

function checkEmptySelect(value, element, error) {
  if (value === "0") {
    showError(error, element);
  } else {
    removeError(error, element);
  }
  return value;
}

btnAddMission.addEventListener("click", function () {
  style = "add";
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

  const statusValue = statusElement.value;
  if (!checkEmptySelect(statusValue, statusElement, statusNone)) {
    return;
  }

  const dateValue = date.value;
  if (!checkEmpty(dateValue, date, startNone)) {
    return;
  }

  const deadlineValue = deadline.value;
  if (!checkEmpty(deadlineValue, deadline, endNone)) {
    return;
  }

  const prioritizeValue = prioritize.value;
  if (!checkEmptySelect(prioritizeValue, prioritize, priNone)) {
    return;
  }

  const progressValue = progress.value;
  if (!checkEmptySelect(progressValue, progress, progNone)) {
    return;
  }

  const newMission = {
    id: Math.ceil(Math.random()*10000),
    prjId: projectID,
    name: missionValue,
    status: statusValue,
    charge: chargePersonValue,
    prioritize: prioritizeValue,
    start: dateValue,
    end: deadlineValue,
    progress: progressValue,
  };
  missionLocal.push(newMission);
  localStorage.setItem("missions", JSON.stringify(missionLocal));
  modalAddElement.classList.add("hidden");
  renderData(missionLocal);
});

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
          <button class="btn-edit">Sửa</button>
          <button class="btn-delete">Xóa</button>
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


renderData(missionLocal);
