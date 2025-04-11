const logoutElement = document.querySelector("#l-log-out");
const missionList = document.querySelector(".tbody"); // Lấy <tbody class="tbody">

let projectLocal = JSON.parse(localStorage.getItem("projects")) || [];
let loggedAccount = JSON.parse(localStorage.getItem("logged"));
let missionLocal = JSON.parse(localStorage.getItem("missions")) || [];
let projectID = localStorage.getItem("projectID");

// Kiểm tra đăng nhập
if (!loggedAccount) {
  window.location.href = "../pages/login.html";
}

// Xử lý đăng xuất
logoutElement.addEventListener("click", function () {
  localStorage.removeItem("logged");
  localStorage.removeItem("projectID");
  window.location.href = "../pages/login.html";
});

function renderData() {
  const userMissions = missionLocal.filter(
    (mission) => mission.chargeEmail?.email === loggedAccount.email
  );

  // Xóa nội dung cũ
  missionList.innerHTML = "";

  // Nhóm nhiệm vụ theo dự án
  const projectTasks = {};
  userMissions.forEach((mission) => {
    if (!projectTasks[mission.prjId]) {
      projectTasks[mission.prjId] = [];
    }
    projectTasks[mission.prjId].push(mission);
  });

  // Tạo HTML
  let htmls = [];

  // Duyệt qua từng dự án
  for (const prjId in projectTasks) {
    // Tìm thông tin dự án
    const project = projectLocal.find((prj) => prj.id === prjId);
    if (!project) continue; // Bỏ qua nếu không tìm thấy dự án

    // Thêm tiêu đề dự án (danh mục)
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

    // Thêm các nhiệm vụ của dự án
    projectTasks[prjId].forEach((mission) => {
      // Chuyển đổi trạng thái từ số sang văn bản
      const statusText =
        mission.status === "1"
          ? "To do"
          : mission.status === "2"
          ? "In Progress"
          : mission.status === "3"
          ? "Pending"
          : "Done";

      // Kiểm tra trạng thái để quyết định có hiển thị icon chỉnh sửa hay không
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

  // Gắn HTML vào tbody
  missionList.innerHTML = htmls.join("");
}

renderData()