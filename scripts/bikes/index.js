const bike = document.querySelector("#bike");
let prevY = 0;

window.onscroll = function () {
  // get page position and size
  const y = window.scrollY;
  const windowWidth = window.innerWidth;

  // calculate where in section the bike is
  const isForwards = y % 1600 > 800;
  let percent = (y % 800) / 800;

  // set bike direction and page position
  let px = 0;
  if (isForwards) {
    bike.classList.remove("reverse");
    px = windowWidth * percent;
  } else {
    bike.classList.add("reverse");
    px = windowWidth - windowWidth * percent;
  }

  // reverse direction if scrolling up
  if (prevY > y) {
    bike.classList.toggle("reverse");
  }

  // set page position
  bike.style.left = Math.min(windowWidth - 80, px) + "px";

  prevY = y;
};
