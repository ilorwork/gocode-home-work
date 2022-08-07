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

const todoArr = [];

const todoListBtn = document.querySelector(".todo-list-btn");
todoListBtn.addEventListener("click", () => {
  reRenderToDoList(todoArr);
});

addTodoBtn.addEventListener("click", () => {
  if (!addTodoInput.value) return;

  const todoItem = { value: addTodoInput.value, isDone: false, id: Date.now() };
  todoArr.push(todoItem);

  addTodoItem(todoArr[todoArr.length - 1]);

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

  const itemDoneBtn = document.createElement("button");
  itemDoneBtn.className = "item-done-btn";
  itemDoneBtn.innerText = "done";

  todoItemElement.innerText = todoItem.value;
  itemBtnsContainer.appendChild(itemRemoveBtn);
  itemBtnsContainer.appendChild(itemDoneBtn);
  todoItemElement.appendChild(itemBtnsContainer);
  pageListElement.appendChild(todoItemElement);

  addRemoveItemListener(itemRemoveBtn, todoItem.id, todoItemElement);
};

const addRemoveItemListener = (element, itemId) => {
  element.addEventListener("click", () => {
    const itemIndex = todoArr.findIndex((item) => item.id === itemId);
    todoArr.splice(itemIndex, 1);
    reRenderToDoList(todoArr);
  });
};
