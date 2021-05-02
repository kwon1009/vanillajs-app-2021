const clockContainer = document.querySelector(".js-clock"),
  clockTitle = clockContainer.querySelector("h1");

function getTime() {
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  if (seconds % 2 == 0) {
    clockContainer.innerHTML = `${
      hours < 10 ? `0${hours}` : hours
    }<span></span>${minutes < 10 ? `0${minutes}` : minutes}`;
  } else {
    clockContainer.innerHTML = `${
      hours < 10 ? `0${hours}` : hours
    }<span>:</span>${minutes < 10 ? `0${minutes}` : minutes}`;
  }
}

function init() {
  getTime();
  setInterval(getTime, 1000);
}

init();
