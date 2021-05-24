let params = {
  speed: 1,
  density: 2,
  starting: 5,
};

let suffix = {
  speed: " hz",
  density: "x",
  starting: "%",
};

document.querySelectorAll("input[type=range]").forEach((slider) => {
  slider.oninput = function () {
    params[this.id] = +this.value;
    console.log(params);
    updateParams();
  };
});

function updateParams() {
  for (const param in params) {
    document.querySelector(`form.${param} small`).innerText =
      params[param] + suffix[param];
    document.querySelector(`form.${param} input`).value = params[param];
  }
}

updateParams();
