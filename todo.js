const setSection = document.querySelector(".js-setSection"),
  toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoAdd = toDoForm.querySelector("button"),
  toDoList = document.querySelector(".js-toDoList");

// 0: today, 1: finish
const TODOS_LS = ["today", "finish", "study", "health", "etc"];

let toDos = [];

function saveToDos(index) {
  localStorage.setItem(TODOS_LS[index], JSON.stringify(toDos[index].list));
}

function getSectionIndex(section) {
  for (index = 0; index < TODOS_LS.length; index++) {
    if (section.classList.contains(TODOS_LS[index])) {
      return index;
    }
  }
}

function deleteToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  const section = li.parentNode;
  section.removeChild(li);

  const index = getSectionIndex(section);
  console.log(toDos[index].list);
  const cleanToDos = toDos[index].list.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
  });
  toDos[index].list = cleanToDos;
  saveToDos(index);
}

function moveToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  const section = li.parentNode;
  const index = getSectionIndex(section);

  if (index > 1) {
    const text = TODOS_LS[index] + ": " + li.firstChild.innerText;
    paintToDo(text, 1);
  } else if (index === 0) {
    const text = li.firstChild.innerText;
    paintToDo(text, 1);
  } else if (index === 1) {
    const text = li.firstChild.innerText;
    paintToDo(text, 0);
  }

  deleteToDo(event);
}

function moveFinish(event) {
  const btn = event.target;
  const li = btn.parentNode;
  const text = li.firstChild.innerText;

  paintToDo(text, 1);
  deleteToDo(event);
}

function paintToDo(text, index) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = toDos[index].list.length + 1;

  const toDoObj = {
    id: newId,
    text: text,
  };

  delBtn.innerText = "X";
  delBtn.classList.add("delBtn");
  delBtn.addEventListener("click", deleteToDo);
  span.innerText = text;
  li.id = newId;

  const moveBtn = document.createElement("button");
  if (index === 0) {
    moveBtn.innerText = "F";
    moveBtn.classList.add("finishBtn");
    moveBtn.addEventListener("click", moveToDo);
  } else if (index === 1) {
    moveBtn.innerText = "T";
    moveBtn.classList.add("todayBtn");
    moveBtn.addEventListener("click", moveToDo);
  } else {
    moveBtn.innerText = "<<";
    moveBtn.classList.add("moveBtn");
    moveBtn.addEventListener("click", moveToDo);
  }

  const htmlList = toDoList.querySelector("." + TODOS_LS[index]);
  htmlList.appendChild(li);

  li.appendChild(span);
  li.appendChild(moveBtn);
  li.appendChild(delBtn);

  toDos[index].list.push(toDoObj);
  saveToDos(index);
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  const index = TODOS_LS.indexOf(setSection.value);
  if (currentValue !== "") {
    paintToDo(currentValue, index);
    toDoInput.value = "";
  }
}

function loadToDos(index) {
  const loadedToDos = localStorage.getItem(TODOS_LS[index]);
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function (toDo) {
      paintToDo(toDo.text, index);
    });
  }
}

function initSection() {
  for (index = 0; index < TODOS_LS.length; index++) {
    const sectionName = TODOS_LS[index];
    const div = document.createElement("div");

    toDoList.appendChild(div);
    div.classList.add(sectionName);
    div.classList.add("todo");
    div.innerHTML = `<h3>${sectionName}</h3>`;

    const sectionObj = {
      name: TODOS_LS[index],
      list: [],
    };

    toDos.push(sectionObj);

    if (index > 1) {
      const option = document.createElement("option");
      setSection.appendChild(option);
      option.value = sectionName;
      option.innerText = sectionName;
    }
  }
}

function init() {
  initSection();
  for (index = 0; index < TODOS_LS.length; index++) {
    loadToDos(index);
  }
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
