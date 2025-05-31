const themeToggle  = document.querySelector(".theme-toggle");

const toggleTheme = () => {
    const isDarkTheme = document.body.classList.toggle("dark-theme");
    themeToggle.querySelector("i")
}

themeToggle.addEventListener("click", toggleTheme);