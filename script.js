const burgerBtn = document.querySelector(".navigation__mobile-burger-icon");
const mobileMenu = document.querySelector(".navigation__mobile-links");
const exitBtn = document.querySelector(".navigation__mobile-link--exit-btn");

const mobileMenuHandler = () => {
  mobileMenu.classList.toggle("off");
};

burgerBtn.addEventListener("click", mobileMenuHandler);
exitBtn.addEventListener("click", mobileMenuHandler);
