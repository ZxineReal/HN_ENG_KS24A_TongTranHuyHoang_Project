const logoutElement = document.querySelector("#l-log-out");
const missionList = document.querySelector("#tbody");
const findElement = document.querySelector("#find");

let missionLocal = JSON.parse(localStorage.getItem("missions")) || [];
let loggedAccount = JSON.parse(localStorage.getItem("logged"));

if (!loggedAccount) {
  window.location.href = "../pages/login.html";
}

logoutElement.addEventListener("click", function () {
  localStorage.removeItem("logged");
  localStorage.removeItem("projectID");
  window.location.href = "../pages/login.html";
});

const filterMission = missionLocal.filter(
  (mission) => mission.chargeEmail === loggedAccount
);

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
          }<i class="${
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

renderData(filterMission);
