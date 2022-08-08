const addTodoInput = document.querySelector(".todo-input");
const addTodoBtn = document.createElement("button");
const pageListElement = document.querySelector(".page-list");

addTodoBtn.className = "add-todo-item-btn";
addTodoBtn.innerText = "add";

addTodoInput.addEventListener("keyup", (e) => {
  if (e.code === "Enter") {
    // https://stackoverflow.com/questions/67698860/javascript-call-addeventlistener-from-another-addeventlistener
    // Another way is using addTodoBtn.click()
    let event = new Event("click");
    addTodoBtn.dispatchEvent(event);
  }

  if (addTodoInput.value) {
    addTodoInput.parentElement.appendChild(addTodoBtn);
  } else if (
    !addTodoInput.value &&
    document.querySelector(".add-todo-item-btn")
  ) {
    addTodoInput.parentElement.removeChild(addTodoBtn);
  }
});

addTodoBtn.addEventListener("click", () => {
  if (!addTodoInput.value) return;

  const todoItem = { value: addTodoInput.value, id: Date.now() };
  todoArr.push(todoItem);

  reRenderToDoList(todoArr);

  addTodoInput.value = "";
  // TODO: from unknown reason somtimes this line causes "Uncaught TypeError: Cannot read properties of null (reading 'removeChild')" exeption.
  // possible workaround - using contitional access. Edit - doesnt helping!!
  // Seemed to happened when pressing the Enter and another key at the same time.
  //if (document.querySelector(".add-todo-item-btn")) return;

  addTodoBtn.parentElement.removeChild(addTodoBtn);
});

let todoArr = [];

const todoListBtn = document.querySelector(".todo-list-btn");
todoListBtn.addEventListener("click", () => {
  reRenderToDoList(todoArr);
});

const reRenderToDoList = (todoList) => {
  pageListElement.innerHTML = "";
  todoList.forEach((item) => {
    renderTodoItem(item);
  });
};

const renderTodoItem = (todoItem) => {
  const todoItemElement = document.createElement("div");
  todoItemElement.className = "todo-item";
  todoItemElement.innerText = todoItem.value;

  const itemBtnsContainer = document.createElement("div");
  itemBtnsContainer.className = "item-btns-container";

  const itemRemoveBtn = document.createElement("button");
  itemRemoveBtn.className = "item-remove-btn";
  itemRemoveBtn.innerText = "remove";

  const itemDoneBtn = document.createElement("button");
  itemDoneBtn.className = "item-done-btn";
  itemDoneBtn.innerText = "done";

  itemBtnsContainer.appendChild(itemRemoveBtn);
  itemBtnsContainer.appendChild(itemDoneBtn);
  todoItemElement.appendChild(itemBtnsContainer);
  pageListElement.appendChild(todoItemElement);

  addItemIsDoneListener(itemDoneBtn, todoItem.id, todoItemElement);
  addRemoveItemListener(itemRemoveBtn, todoItem.id);
};

let doneListArr = [];

const doneListBtn = document.querySelector(".done-list-btn");
doneListBtn.addEventListener("click", () => {
  reRenderDoneList(doneListArr);
});

const reRenderDoneList = (doneList) => {
  pageListElement.innerHTML = "";
  doneList.forEach((item) => {
    renderDoneItem(item);
  });
};

const renderDoneItem = (doneitem) => {
  const todoItemElement = document.createElement("div");
  todoItemElement.className = "todo-item";

  const itemBtnsContainer = document.createElement("div");
  itemBtnsContainer.className = "item-btns-container";

  const itemRemoveBtn = document.createElement("button");
  itemRemoveBtn.className = "item-remove-btn";
  itemRemoveBtn.innerText = "remove";

  const itemUndoneBtn = document.createElement("button");
  itemUndoneBtn.className = "item-undone-btn";
  itemUndoneBtn.innerText = "undone";

  todoItemElement.innerText = doneitem.value;
  itemBtnsContainer.appendChild(itemRemoveBtn);
  itemBtnsContainer.appendChild(itemUndoneBtn);
  todoItemElement.appendChild(itemBtnsContainer);
  pageListElement.appendChild(todoItemElement);

  addItemUnDoneListener(itemUndoneBtn, doneitem.id, todoItemElement);
  addRemoveDoneItemListener(itemRemoveBtn, doneitem.id);
};

const addRemoveItemListener = (element, itemId) => {
  element.addEventListener("click", () => {
    const itemIndex = todoArr.findIndex((item) => item.id === itemId);
    todoArr.splice(itemIndex, 1);
    reRenderToDoList(todoArr);
  });
};

const addItemIsDoneListener = (element, itemId) => {
  element.addEventListener("click", () => {
    const itemIndex = todoArr.findIndex((item) => item.id === itemId);
    const splicedArr = todoArr.splice(itemIndex, 1);

    // Add the returning spliced array into doneListArr
    doneListArr = doneListArr.concat(splicedArr);
    reRenderToDoList(todoArr);
  });
};

const addRemoveDoneItemListener = (element, itemId) => {
  element.addEventListener("click", () => {
    const itemIndex = doneListArr.findIndex((item) => item.id === itemId);
    doneListArr.splice(itemIndex, 1);
    reRenderDoneList(doneListArr);
  });
};

const addItemUnDoneListener = (element, itemId) => {
  element.addEventListener("click", () => {
    const itemIndex = doneListArr.findIndex((item) => item.id === itemId);
    const splicedArr = doneListArr.splice(itemIndex, 1);

    // Add the returning spliced array into todoArr
    todoArr = todoArr.concat(splicedArr);
    reRenderDoneList(doneListArr);
  });
};

const switchColorBtn = document.querySelector(".switch-color-btn");
const helperElement = document.querySelector(".helper");
let isLightMode = true;

switchColorBtn.addEventListener("click", () => {
  if (!isLightMode) {
    document.body.style.backgroundColor = "initial";
    helperElement.style.backgroundColor = "initial";
    pageListElement.style.color = "initial";
    addTodoInput.style.backgroundColor = "initial";
    addTodoInput.parentElement.style.backgroundColor = "initial";
    addTodoInput.style.color = "initial";
    isLightMode = !isLightMode;
  } else {
    document.body.style.backgroundColor = "black";
    helperElement.style.backgroundColor = "#262424";
    pageListElement.style.color = "rgb(219 216 216)";
    // itemBtnsContainer.style.color = "#cdcdcd";
    addTodoInput.style.backgroundColor = "#262424";
    addTodoInput.parentElement.style.backgroundColor = "#262424";
    addTodoInput.style.color = "rgb(219 216 216)";
    isLightMode = !isLightMode;
  }
});
