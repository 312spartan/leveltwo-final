const hamburgerMenu = document.querySelector(".hamburger-menu");

const offMenu = document.querySelector(".off-menu");

hamburgerMenu.addEventListener("click", () => {
    hamburgerMenu.classList.toggle("active");
    offMenu.classList.toggle("active");
});