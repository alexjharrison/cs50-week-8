import { Grid } from "./grid.js";

let params = {
  speed: 1,
  density: 30,
  starting: 30,
};

let suffix = {
  speed: " hz",
  density: "x",
  starting: "%",
};

/** @type {HTMLButtonElement} */
const resetButton = document.querySelector("#reset-btn");
resetButton.addEventListener("click", () => {
  resetButton.classList.add("visually-hidden");
  grid.reset(params);
});

/** @type {HTMLDivElement} */
const gridNode = document.querySelector("#grid");
const grid = new Grid(gridNode, params);

// debouncer for window resize
let timeout;
window.addEventListener("resize", () => {
  if (timeout) {
    clearTimeout(timeout);
  }
  timeout = setTimeout(() => {
    grid.reset(params);
    timeout = undefined;
  }, 50);
});

/** @type {NodeListOf<HTMLInputElement>} */
const sliders = document.querySelectorAll("input[type=range]");
sliders.forEach((slider) => {
  slider.addEventListener("input", function () {
    params[slider.id] = +slider.value;
    updateParams();

    if (slider.id === "density" || slider.id === "starting") {
      resetButton.classList.remove("visually-hidden");
    } else if (slider.id === "speed") {
      console.log("speed updated");
      grid.updateSpeed(params);
    }
  });
});

function updateParams() {
  for (const param in params) {
    /** @type {HTMLDivElement} */
    const label = document.querySelector(`form.${param} small`);
    label.innerText = params[param] + suffix[param];

    /** @type {HTMLInputElement} */
    const slider = document.querySelector(`form.${param} input`);
    slider.value = params[param];
  }
}

updateParams();
resetButton.classList.add("visually-hidden");
setTimeout(() => {
  grid.reset(params);
  gridNode.style.opacity = "1";
}, 0);
