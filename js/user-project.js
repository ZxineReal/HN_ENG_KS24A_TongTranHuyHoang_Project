const logoutElement = document.querySelector("#l-log-out");

let projectLocal = JSON.parse(localStorage.getItem("projects")) || [];
let loggedAccount = JSON.parse(localStorage.getItem("logged"));
let missionLocal = JSON.parse(localStorage.getItem("missions")) || [];
let projectID = localStorage.getItem("projectID");
let projectMission = missionLocal.filter(
  (mission) => mission.prjId === projectID
);

if (!loggedAccount) {
  window.location.href = "../pages/login.html";
}

logoutElement.addEventListener("click", function () {
  localStorage.removeItem("logged");
  localStorage.removeItem("projectID");
});
console.log(projectLocal);
console.log(projectID);



const findProject = projectLocal.find((prj) => prj.id === projectID);
console.log(findProject);

// function renderData() {
//   const findMission = missionLocal.find(
//     (mission) => mission.chargeEmail === loggedAccount
//   );
//   findMission.forEach((mission) => {
//     const htmls = `
//     <tr>
//         <td>${mission.name}</td>
//         <td class="priority"><span class="${
//           mission.prioritize === "Thấp"
//             ? "pr-l"
//             : mission.prioritize === "Trung bình"
//             ? "pr-m"
//             : "pr-h"
//         }">${mission.prioritize}</span></td>
//         <td class="status">
//         ${mission.status}<i class="fa-solid fa-pen-to-square"></i>
//         </td>
//         <td class="date">${mission.start}</td>
//         <td class="date">${mission.end}</td>
//         <td class="progress">
//         <span class="${
//           mission.progress === "Đúng tiến độ"
//             ? "prg-t"
//             : mission.progress === "Trễ hẹn"
//             ? "prg-f"
//             : "prg-r"
//         }">${mission.progress}</span>
//         </td>
//     </tr>
//     `.join("");
//   });
// }
