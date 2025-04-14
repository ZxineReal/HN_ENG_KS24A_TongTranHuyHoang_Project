// Phạm vi truy cập các phần tử trong DOM
const logoutElement = document.querySelector("#l-log-out");
const missionList = document.querySelector("#tbody");
const findElement = document.querySelector("#find");
const modalStatus = document.querySelector("#modal-status");
const formClose = document.querySelector("#form-close");
const cancelUpdate = document.querySelector("#cancel-update");
const confirmUpdate = document.querySelector("#confirm-update-status");

// Khai báo các biến toàn cục
let missionLocal = JSON.parse(localStorage.getItem("missions")) || [];
let loggedAccount = JSON.parse(localStorage.getItem("logged"));

// Kiểm tra đăng nhập
if (!loggedAccount) {
  window.location.href = "../pages/login.html";
}

// Đăng xuất
logoutElement.addEventListener("click", function () {
  localStorage.removeItem("logged");
  localStorage.removeItem("projectID");
  window.location.href = "../pages/login.html";
});

// Lọc ra các nhiệm vụ trong dự án
const filterMission = missionLocal.filter(
  (mission) => mission.chargeEmail === loggedAccount
);

/**
 * Hàm render dữ liệu
 * @param {*} missions Nhiệu vụ
 */
function renderData(missions) {
  missionList.innerHTML = "";

  missions.forEach((mission) => {
    const html = `
      <tr>
        <td>${mission.name}</td>
        <td class="priority"><span class="${
          mission.prioritize === "Thấp"
            ? "pr-l"
            : mission.prioritize === "Trung bình"
            ? "pr-m"
            : "pr-h"
        }">${mission.prioritize}</span></td>
        <td class="status">
          ${
            mission.status === "1"
              ? "To do"
              : mission.status === "2"
              ? "In progress"
              : mission.status === "3"
              ? "Pending"
              : "Done"
          }<i onclick="updateStatus(${mission.id})" id="${mission.id}" class="${
      mission.status !== "4" ? "fa-solid fa-pen-to-square" : ""
    }"></i>
        </td>
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
      </tr>
      `;
    missionList.innerHTML += html;
  });
}

// Tìm kiếm nhiệm vụ
findElement.addEventListener("keyup", function () {
  const keyword = findElement.value.trim().toLowerCase();

  if (keyword) {
    const filtered = filterMission.filter((mission) =>
      mission.name.toLowerCase().includes(keyword)
    );
    renderData(filtered);
  } else {
    renderData(filterMission);
  }
});

// Thay đổi trạng thái
// Lấy ra id trạng thái khi ấn vào icon và mở modal xác nhận
let statusID;
function updateStatus(id) {
  modalStatus.classList.remove("hidden");
  statusID = id;
}

// Xác nhận thay đổi trạng thái
confirmUpdate.addEventListener("click", function () {
  const findMission = missionLocal.find((mission) => mission.id == statusID);
  console.log(findMission);

  // Chuyển tiếp trạng thái
  if (findMission.status == "1") {
    findMission.status = "2";
  } else if (findMission.status == "2") {
    findMission.status = "3";
  } else if (findMission.status == "3") {
    findMission.status = "4";
  }
  // Lưu nhiệm vụ lên localStorage
  localStorage.setItem("missions", JSON.stringify(missionLocal));
  modalStatus.classList.add("hidden");
  renderData(filterMission);
});

// Đóng modal
formClose.addEventListener("click", function () {
  modalStatus.classList.add("hidden");
});

cancelUpdate.addEventListener("click", function () {
  modalStatus.classList.add("hidden");
});

// Render
renderData(filterMission);
