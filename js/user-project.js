const logoutElement = document.querySelector("#l-log-out");
const missionList = document.querySelector("#tbody");

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

function renderData() {
  const filterMission = missionLocal.filter(
    (mission) => mission.chargeEmail === loggedAccount
  );

  missionList.innerHTML = "";

  filterMission.forEach((mission) => {
    const html = 
    `
    <tr>
      <td>${mission.name}</td>
      <td class="priority"><span class="pr-l">${mission.prioritize}</span></td>
      <td class="status">
        ${mission.status}<i class="fa-solid fa-pen-to-square"></i>
      </td>
      <td class="date">${mission.start}</td>
      <td class="date">${mission.end}</td>
      <td class="progress">
        <span class="prg-t">${mission.progress}</span>
      </td>
    </tr>
    `;
    missionList.innerHTML += html;
  });
}

renderData();
