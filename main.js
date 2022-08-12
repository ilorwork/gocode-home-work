const tabs = {
  todoTab: { name: "todoTab", isActive: "true" },
  doneTab: { name: "doneTab", isActive: "false" },
};

let todoArr = [];
let doneListArr = [];

const addTodoInput = document.querySelector(".todo-input");
const pageListElement = document.querySelector(".page-list");
const todoListBtn = document.querySelector(".todo-list-btn");
const doneListBtn = document.querySelector(".done-list-btn");
const removeAllBtn = document.querySelector(".clear-all-btn");
const switchColorBtn = document.querySelector(".switch-color-btn");
let isLightMode = true;

const addTodoBtn = document.createElement("button");
addTodoBtn.className = "add-todo-item-btn";
addTodoBtn.innerText = "add";

addTodoInput.addEventListener("keyup", (e) => {
  if (e.code === "Enter" || e.code === "NumpadEnter") {
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
  todoArr.unshift(todoItem);

  reRenderToDoList(todoArr);

  addTodoInput.value = "";

  // TODO: when pressing Enter and another key at the same time this line causes "Uncaught TypeError: Cannot read properties of null (reading 'removeChild')" exeption.
  addTodoBtn.parentElement.removeChild(addTodoBtn);
});

todoListBtn.addEventListener("click", () => {
  reRenderToDoList(todoArr);
});

const reRenderToDoList = (todoList) => {
  activateTab(tabs.todoTab.name);

  pageListElement.innerHTML = "";

  if (todoList.length < 1) {
    pageListElement.innerHTML = "You havn't added any task yet.";
  }

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

  itemBtnsContainer.append(itemRemoveBtn, itemDoneBtn);
  todoItemElement.appendChild(itemBtnsContainer);
  pageListElement.appendChild(todoItemElement);

  addItemIsDoneListener(itemDoneBtn, todoItem.id, todoItemElement);
  addRemoveItemListener(itemRemoveBtn, todoItem.id);
};

doneListBtn.addEventListener("click", () => {
  reRenderDoneList(doneListArr);
});

const reRenderDoneList = (doneList) => {
  activateTab(tabs.doneTab.name);

  pageListElement.innerHTML = "";

  if (doneList.length < 1) {
    pageListElement.innerHTML = "You havn't finished any task yet.";
  }

  doneList.forEach((item) => {
    renderDoneItem(item);
  });
};

const renderDoneItem = (doneitem) => {
  const todoItemElement = document.createElement("div");
  todoItemElement.className = "todo-item";
  todoItemElement.innerText = doneitem.value;

  const itemBtnsContainer = document.createElement("div");
  itemBtnsContainer.className = "item-btns-container";

  const itemRemoveBtn = document.createElement("button");
  itemRemoveBtn.className = "item-remove-btn";
  itemRemoveBtn.innerText = "remove";

  const itemUndoneBtn = document.createElement("button");
  itemUndoneBtn.className = "item-undone-btn";
  itemUndoneBtn.innerText = "undone";

  itemBtnsContainer.append(itemRemoveBtn, itemUndoneBtn);
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

    // Concat doneListArr into the returning spliced array
    doneListArr = splicedArr.concat(doneListArr);
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
    todoArr = splicedArr.concat(todoArr);
    reRenderDoneList(doneListArr);
  });
};

switchColorBtn.addEventListener("click", () => {
  if (!isLightMode) {
    // document.body.style.backgroundImage =
    //   "url('./assets/top-view-list-written-black-notebook-black-table-free-space (3).jpg')";
    document.body.style.backgroundColor = "initial";
    pageListElement.style.backgroundColor = "white";
    pageListElement.style.color = "initial";
    addTodoInput.style.backgroundColor = "initial";
    addTodoInput.parentElement.style.backgroundColor = "white";
    addTodoInput.style.color = "initial";
    isLightMode = !isLightMode;
  } else {
    // document.body.style.backgroundImage =
    //   "url('./assets/wepik-photo-mode-202279-340401111.png')";
    document.body.style.backgroundColor = "black";
    pageListElement.style.backgroundColor = "#262424";
    pageListElement.style.color = "rgb(219 216 216)";
    addTodoInput.style.backgroundColor = "#262424";
    addTodoInput.parentElement.style.backgroundColor = "#262424";
    addTodoInput.style.color = "rgb(219 216 216)";
    isLightMode = !isLightMode;
  }
});

const activateTab = (tabName) => {
  if (tabName.match(tabs.todoTab.name)) {
    tabs.todoTab.isActive = true;
    todoListBtn.style.boxShadow = "rgb(71 192 0) 0px 5px 15px";
    doneListBtn.style.boxShadow = "none";
    pageListElement.style.boxShadow = "rgb(71 192 0) 0px 5px 15px";
  } else if (tabName.match(tabs.doneTab.name)) {
    tabs.todoTab.isActive = false;
    document.scrollingElement.style.webkitScrollbarThumb = "blue";
    todoListBtn.style.boxShadow = "none";
    doneListBtn.style.boxShadow = "rgb(70 56 254 / 86%) 0px 5px 15px";
    pageListElement.style.boxShadow = "rgb(4 8 255) 0px 5px 15px";
  }
};

removeAllBtn.addEventListener("click", () => {
  const isUserSure = confirm("Are you sure you want to clear this list?");
  if (!isUserSure) return;

  if (tabs.todoTab.isActive) {
    todoArr = [];
    reRenderToDoList(todoArr);
  } else if (tabs.doneTab.isActive) {
    doneListArr = [];
    reRenderDoneList(doneListArr);
  }
});
