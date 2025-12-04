/* ============================== typing animation ============================ */
var typed = new Typed(".typing", {
  strings: [
    "",
    "Web Designer",
    "Web Developer",
    "Graphic Designer",
    "Vibe Coder",
    "IT Support",
  ],
  typeSpeed: 100,
  BackSpeed: 60,
  loop: true,
});
/* ============================== Aside ============================ */
const nav = document.querySelector(".nav"),
  navList = nav.querySelectorAll("li"),
  totalNavList = navList.length,
  allSection = document.querySelectorAll(".section"),
  totalSection = allSection.length;
for (let i = 0; i < totalNavList; i++) {
  const a = navList[i].querySelector("a");
  a.addEventListener("click", function () {
    removeBackSection();
    for (let j = 0; j < totalNavList; j++) {
      if (navList[j].querySelector("a").classList.contains("active")) {
        addBackSection(j);
        // allSection[j].classList.add("back-section");
      }
      navList[j].querySelector("a").classList.remove("active");
    }
    this.classList.add("active");
    showSection(this);
    if (window.innerWidth < 1200) {
      asideSectionTogglerBtn();
    }
  });
}
function removeBackSection() {
  for (let i = 0; i < totalSection; i++) {
    allSection[i].classList.remove("back-section");
  }
}
function addBackSection(num) {
  allSection[num].classList.add("back-section");
}
function showSection(element) {
  for (let i = 0; i < totalSection; i++) {
    allSection[i].classList.remove("active");
  }
  const target = element.getAttribute("href").split("#")[1];
  document.querySelector("#" + target).classList.add("active");
}
function updateNav(element) {
  for (let i = 0; i < totalNavList; i++) {
    navList[i].querySelector("a").classList.remove("active");
    const target = element.getAttribute("href").split("#")[1];
    if (
      target ===
      navList[i].querySelector("a").getAttribute("href").split("#")[1]
    ) {
      navList[i].querySelector("a").classList.add("active");
    }
  }
}
document.querySelector(".hire-me").addEventListener("click", function () {
  const sectionIndex = this.getAttribute("data-section-index");
  //console.log(sectionIndex);
  showSection(this);
  updateNav(this);
  removeBackSection();
  addBackSection(sectionIndex);
});
const navTogglerBtn = document.querySelector(".nav-toggler"),
  aside = document.querySelector(".aside");
navTogglerBtn.addEventListener("click", () => {
  asideSectionTogglerBtn();
});
function asideSectionTogglerBtn() {
  aside.classList.toggle("open");
  navTogglerBtn.classList.toggle("open");
  for (let i = 0; i < totalSection; i++) {
    allSection[i].classList.toggle("open");
  }
}

/* ===== Project details modal ===== */
// create modal markup and append to body
const modalHtml = `
<div class="project-modal" id="project-modal" aria-hidden="true">
  <button class="modal-close" id="modal-close">✕</button>
  <div class="modal-card">
    <h3 id="modal-title"></h3>
    <p id="modal-body"></p>
  </div>
</div>`;
document.body.insertAdjacentHTML("beforeend", modalHtml);

const modal = document.getElementById("project-modal");
const modalTitle = document.getElementById("modal-title");
const modalBody = document.getElementById("modal-body");
const modalClose = document.getElementById("modal-close");

function openProjectModal(title, body) {
  modalTitle.textContent = title;
  modalBody.textContent = body;
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
}

function closeProjectModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
}

modalClose.addEventListener("click", closeProjectModal);
modal.addEventListener("click", function (e) {
  if (e.target === modal) closeProjectModal();
});
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && modal.classList.contains("open"))
    closeProjectModal();
});

// wire view-details buttons
document.addEventListener("click", function (e) {
  const btn = e.target.closest(".view-details");
  if (!btn) return;
  const desc = btn.closest(".portfolio-desc");
  if (!desc) return;
  const title =
    desc.getAttribute("data-title") ||
    desc.querySelector("h4")?.textContent ||
    "Project";
  const full =
    desc.getAttribute("data-full") ||
    desc.querySelector("p")?.textContent ||
    "";
  openProjectModal(title, full);
});
