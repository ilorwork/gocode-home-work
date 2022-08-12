const fetchUserData = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos");
    const data = await response.json();
    console.log(data)
    return data
}

const buildTodo = async () => {
    const todosArr = await fetchUserData()
    console.log(todosArr)

    const container = document.createElement("ol")

    todosArr.forEach((todo) => {
        const todoItem = document.createElement("li")

        todoItem.className = "todo-item"
        todoItem.innerText = todo.title

        container.appendChild(todoItem)
        document.body.appendChild(container)
    });
}

buildTodo()