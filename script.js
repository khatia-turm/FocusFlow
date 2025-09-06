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

// menu fade animation

const navHover = function (e) {
  if (e.target.classList.contains("nav_link")) {
    const link = e.target;
    const siblings = link.closest(".nav").querySelectorAll(".nav_link");
    const logo = link.closest(".nav").querySelector(".logo");
    siblings.forEach((el) => {
      if (el !== link) el.style.opacity = this;
    });
    if (logo) logo.style.opacity = this;
  }
};

const nav = document.querySelector(".nav");
nav.addEventListener("mouseover", navHover.bind(0.5));
nav.addEventListener("mouseout", navHover.bind(1));

// revealing sections

const allSections = document.querySelectorAll(".section");

const revealSection = function (entries, observer) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.remove("section-hidden");
    observer.unobserve(entry.target);
  });
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach((section) => {
  sectionObserver.observe(section);
  section.classList.add("section-hidden");
});

// SLIDER

// sticky nav
const header = document.querySelector(".header");
const navHeight = nav.getBoundingClientRect().height;
const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

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
