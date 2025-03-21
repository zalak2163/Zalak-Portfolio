// JavaScript for dynamic text change on the hero section (Web Developer changing)
document.addEventListener("DOMContentLoaded", function () {
  let webDevText = document.getElementById("web-dev-text");
  let texts = [
    "Web Developer",
    "Web Designer",
    "Fruntend Developer",
    "Backend Developer",
  ];
  let i = 0;

  setInterval(function () {
    webDevText.textContent = texts[i];
    i = (i + 1) % texts.length;
  }, 3000); // Change every 3 seconds
});

document.querySelector(".menu-icon").addEventListener("click", function () {
  const navLinks = document.querySelector("nav ul");
  navLinks.classList.toggle("show");
});
