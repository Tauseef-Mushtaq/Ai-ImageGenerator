const themeToggle  = document.querySelector(".theme-toggle");
const promptForm  = document.querySelector(".prompt-form");
const promptInput  = document.querySelector(".prompt-input");
const promptBtn  = document.querySelector(".prompt-btn");
const modelSelect  = document.getElementById("model-select");
const countSelect  = document.getElementById("count-select");
const ratioSelect  = document.getElementById("ratio-select");
const gridGallery  = document.querySelector(".gallery-grid");

const examplePrompts = [
  "A magic forest with glowing plants and fairy homes among giant mushrooms",
  "An old steampunk airship floating through golden clouds at sunset",
  "A future Mars colony with glass domes and gardens against red mountains",
  "A dragon sleeping on gold coins in a crystal cave",
  "An underwater kingdom with merpeople and glowing coral buildings",
  "A floating island with waterfalls pouring into clouds below",
  "A witch's cottage in fall with magic herbs in the garden",
  "A robot painting in a sunny studio with art supplies around it",
  "A magical library with floating glowing books and spiral staircases",
  "A Japanese shrine during cherry blossom season with lanterns and misty mountains",
  "A cosmic beach with glowing sand and an aurora in the night sky",
  "A medieval marketplace with colorful tents and street performers",
  "A cyberpunk city with neon signs and flying cars at night",
  "A peaceful bamboo forest with a hidden ancient temple",
  "A giant turtle carrying a village on its back in the ocean",
];

//Set theme based on saved preference or system setting
(() => {
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDarkTheme = savedTheme === "dark" || (savedTheme === null && systemPrefersDark);
    document.body.classList.toggle("dark-theme", isDarkTheme);
    themeToggle.querySelector("i").className = isDarkTheme? "fa-solid fa-sun" : "fa-solid fa-moon";

})

//Switch between light and dark themes
const toggleTheme = () => {
    const isDarkTheme = document.body.classList.toggle("dark-theme");
    localStorage.setItem("theme", isDarkTheme ? "dark" : "light");
    themeToggle.querySelector("i").className = isDarkTheme? "fa-solid fa-sun" : "fa-solid fa-moon";
}


//CREAte placeholder cards with loading spinners
const createImageCards = (selectedModel, imageCount, aspectRatio, promptText) => {
    gridGallery.innerHTML = ""; //Clear previous cards

    for(let i=0; i<imageCount; i++){
        gridGallery.innerHtml += `<div class="img-card loading" id="image-card-${i}" style="aspect-ratio: ${aspectRatio}">
                        <div class="status-container">
                            <i class="fa-solid fa-triangle-exclamation"></i>
                            <div class="spinner"></div>
                            <p class="status-text">Generating...</p>
                        </div>
                         <img src="./images/test.png" alt="" class="result-img" />
                         </div>`;
    }
}

//Handle form submission
const handleFromSubmit = (e) => {
    e.preventDefault();

    //get From values
    const selectModel = modelSelect.value;
    const imageCount = countSelect.value || 1;
    const aspectRatio = ratioSelect.value || "1/1";
    const promptText = promptInput.value.trim();

   createImageCards(selectModel, imageCount, aspectRatio, promptText);
};

//Fill prompt input with a random example prompt
promptBtn.addEventListener("click", () => {
    const prompt = examplePrompts[Math.floor(Math.random() * examplePrompts.length)];
    promptInput.value = prompt;
    promptInput.focus();
});

promptForm.addEventListener("submit", handleFromSubmit);
themeToggle.addEventListener("click", toggleTheme);