const background = document.querySelector(".background");

const IMG_NUMBER = 7;

function paintImage(imgNumber) {
  const image = new Image();
  image.src = `images/photo (${imgNumber + 1}).jpg`;
  image.classList.add("bgImage");
  background.prepend(image);
}

function genRandom() {
  const number = Math.floor(Math.random() * IMG_NUMBER);
  return number;
}

function init() {
  const randomNumber = genRandom();
  paintImage(randomNumber);
}

init();
