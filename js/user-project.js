const logoutElement = document.querySelector("#l-log-out");
const missionList = document.querySelector(".tbody");

let projectLocal = JSON.parse(localStorage.getItem("projects")) || [];
let loggedAccount = JSON.parse(localStorage.getItem("logged"));
let missionLocal = JSON.parse(localStorage.getItem("missions")) || [];

if (!loggedAccount) {
  window.location.href = "../pages/login.html";
}

logoutElement.addEventListener("click", function () {
  localStorage.removeItem("logged");
  localStorage.removeItem("projectID");
  window.location.href = "../pages/login.html";
});

function renderData() {
  const userMissions = missionLocal.filter(
    (mission) => mission.chargeEmail?.email === loggedAccount.email
  );

  missionList.innerHTML = "";

  const projectTasks = {};
  userMissions.forEach((mission) => {
    if (!projectTasks[mission.prjId]) {
      projectTasks[mission.prjId] = [];
    }
    projectTasks[mission.prjId].push(mission);
  });

  let htmls = [];

  for (const prjId in projectTasks) {
    const project = projectLocal.find((prj) => prj.id === prjId);
    if (project) {
      htmls.push(`
        <tr>
          <td class="category" colspan="6">
            <div class="category-content">
              <span class="triangle-down"></span>
              ${project.name}
            </div>
          </td>
        </tr>
      `);

      projectTasks[prjId].forEach((mission) => {
        const statusText =
          mission.status === "1"
            ? "To do"
            : mission.status === "2"
            ? "In Progress"
            : mission.status === "3"
            ? "Pending"
            : "Done";

        const editIcon = statusText === "Done" ? "" : '<i class="fa-solid fa-pen-to-square"></i>';

        htmls.push(`
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
              ${statusText}${editIcon}
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
        `);
      });
    }
  }

  missionList.innerHTML = htmls.join("");
}

renderData()