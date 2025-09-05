"use strict";

// LEARN MORE SMOOTH SCROLL
const btnScroll = document.querySelector(".btn--scroll");
const section1 = document.getElementById("section--1");

btnScroll.addEventListener("click", function (e) {
  section1.scrollIntoView({ behavior: "smooth" });
});

//PAGE NAVIGATION SMOOTH

document.querySelector(".nav-links").addEventListener("click", function (e) {
  e.preventDefault();
  console.log(e.target);
  if (e.target.classList.contains("nav_link")) {
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

// TAB COMPONENET

const tabsContainer = document.querySelector(".features__tab-container");
const featuresContent = document.querySelectorAll(".features__content");
const tabs = document.querySelectorAll(".features__tab");
tabsContainer.addEventListener("click", function (e) {
  const clicked = e.target.closest(".features__tab");
  if (!clicked) return;
  tabs.forEach((t) => t.classList.remove("features__tab--active"));
  featuresContent.forEach((tc) =>
    tc.classList.remove("features__content--active")
  );
  clicked.classList.add("features__tab--active");
  document
    .querySelector(`.features__content--${clicked.dataset.tab}`)
    .classList.add("features__content--active");
  // console.log(
  //   document.querySelector(`features__tab--${e.target.dataset.tab}`)
  // );
});

// tabsContainer.addEventListener("click", function (e) {
//   if (e.target.classList.contains("features__tab")) {
//     console.log("clicked");
//     tabs.forEach((t) => t.classList.remove("features__tab--active"));
//     featuresContent.forEach((tc) =>
//       tc.classList.remove("features__content--active")
//     );
//     e.target.classList.add("features__tab--active");
//     document
//       .querySelector(`.features__content--${e.target.dataset.tab}`)
//       .classList.add("features__content--active");
//   }
// });

// opening modal
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelector(".btn--open-modal");

function openModal() {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
}
function closeModal() {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
}

const handleHover = function (e) {
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
  }
};

btnsOpenModal.addEventListener("click", openModal);
btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});
