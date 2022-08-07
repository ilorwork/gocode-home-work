const addTodoInput = document.querySelector(".todo-input");
const addTodoBtn = document.createElement("button");
const pageListElement = document.querySelector(".page-list");

addTodoBtn.className = "add-todo-item-btn";
addTodoBtn.innerText = "add";

addTodoInput.addEventListener("keyup", () => {
  if (!!addTodoInput.value && addTodoInput.value !== "") {
    addTodoInput.parentElement.appendChild(addTodoBtn);
  } else if (
    !addTodoInput.value &&
    document.querySelector(".add-todo-item-btn")
  ) {
    addTodoBtn.parentElement.removeChild(addTodoBtn);
  }
});

let todoArr = [];

const todoListBtn = document.querySelector(".todo-list-btn");
todoListBtn.addEventListener("click", () => {
  reRenderToDoList(todoArr);
});

let doneListArr = [];

const doneListBtn = document.querySelector(".done-list-btn");
doneListBtn.addEventListener("click", () => {
  //   doneListArr = todoArr.splice(1, 4);
  reRenderDoneList(doneListArr);
});

const reRenderDoneList = (doneList) => {
  pageListElement.innerHTML = "";
  doneList.forEach((item) => {
    addDoneItem(item);
  });
};

const addDoneItem = (doneitem) => {
  //   const doneItemElement = document.createElement("div");
  //   doneItemElement.className = "done-item";

  //   const itemBtnsContainer = document.createElement("div");
  //   itemBtnsContainer.className = "item-btns-container";

  //   const itemRemoveBtn = document.createElement("button");
  //   itemRemoveBtn.className = "item-remove-btn";
  //   itemRemoveBtn.innerText = "remove";
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

  //   doneItemElement.innerText = doneitem.value;
  //   itemBtnsContainer.appendChild(itemRemoveBtn);
  //   itemBtnsContainer.appendChild(itemUndoneBtn);
  //   doneItemElement.appendChild(itemBtnsContainer);
  //   pageListElement.appendChild(doneItemElement);

  //   addRemoveItemListener(itemRemoveBtn, doneitem.id, doneItemElement);
};

addTodoBtn.addEventListener("click", () => {
  if (!addTodoInput.value) return;
  const todoItem = { value: addTodoInput.value, isDone: false, id: Date.now() };
  todoArr.push(todoItem);

  //   addTodoItem(todoArr[todoArr.length - 1]);
  reRenderToDoList(todoArr);

  addTodoInput.value = "";
  addTodoBtn.parentElement.removeChild(addTodoBtn);
});

const reRenderToDoList = (todoList) => {
  pageListElement.innerHTML = "";
  todoList.forEach((item) => {
    addTodoItem(item);
  });
};

const addTodoItem = (todoItem) => {
  const todoItemElement = document.createElement("div");
  todoItemElement.className = "todo-item";

  const itemBtnsContainer = document.createElement("div");
  itemBtnsContainer.className = "item-btns-container";

  const itemRemoveBtn = document.createElement("button");
  itemRemoveBtn.className = "item-remove-btn";
  itemRemoveBtn.innerText = "remove";
  //   const svg = document.createElement("embed");
  //   svg.src =
  //     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlyYTpYaf1zvyXHKF4LZTAQSwkRoVCKsvR6DjdfvA&s";
  //   svg.width = "10rem";
  //   svg.height = "10rem";
  //   itemRemoveBtn.appendChild(svg);

  const itemDoneBtn = document.createElement("button");
  itemDoneBtn.className = "item-done-btn";
  itemDoneBtn.innerText = "done";

  todoItemElement.innerText = todoItem.value;
  itemBtnsContainer.appendChild(itemRemoveBtn);
  itemBtnsContainer.appendChild(itemDoneBtn);
  todoItemElement.appendChild(itemBtnsContainer);
  pageListElement.appendChild(todoItemElement);

  addItemIsDoneListener(itemDoneBtn, todoItem.id, todoItemElement);
  addRemoveItemListener(itemRemoveBtn, todoItem.id);
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
    //debugger;
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
    //debugger;
    const splicedArr = doneListArr.splice(itemIndex, 1);

    // Add the returning spliced array into todoArr
    todoArr = todoArr.concat(splicedArr);
    reRenderDoneList(doneListArr);
  });
};
