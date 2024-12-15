import {createListTodos} from "./dom.js";

/**
 *
 * @param value Titre de la todo à créer
 * @param todos Objet qui contient l'ensemble des todos
 * @returns {Promise<*>}
 */
export async function addTodo(value, todos) {
    const inputTodo = document.querySelector("#todo-input")

    if(value.target && value.target.nodeName === "INPUT" && value.key === "Enter") {
        value.preventDefault()

        const userId = + new Date()
        const id = todos.length + 1

        todos.unshift({
            id: id,
            userId: userId,
            title: value.target.value,
            completed: false
        })

        inputTodo.value = ''

        return createListTodos(todos)
    }
}


/**
 *
 * @param value Valeur à rechercher
 * @param todos Objet qui contient l'ensemble des todos
 * @returns {Promise<void>}
 */
export function searchTodos(value, todos) {
    if(value !== "") {
        const todosFiltered = todos.filter(el => el.title.toLowerCase().includes(value.toLowerCase()))
        return createListTodos(todosFiltered)
    }
    return createListTodos(todos)
}

/**
 *
 * @param todo
 * @param todos Objet qui contient l'ensemble des todos
 * @returns {Promise<void>}
 */
export async function actionsTodo(todo, todos) {
    if(todo.target && todo.target.nodeName === "BUTTON" && todo.target.classList.contains("delete")) {
        const updatedTodos = todos.filter(el => el.title !== todo.target.parentNode.previousSibling.textContent)
        todos.length = 0
        todos.push(...updatedTodos)
        return createListTodos(todos)
    }

    if(todo.target && todo.target.nodeName === "BUTTON" && todo.target.classList.contains("mark-done")) {
        const updatedTodos = todos.map(el => {
            if(el.title === todo.target.parentNode.previousSibling.textContent) {
                return {
                    ...el,
                    completed: !el.completed,
                }
            }
            return el
        })
        // Met à jour directement le tableau global
        todos.length = 0;
        todos.push(...updatedTodos);

        return createListTodos(todos)
    }
}

/**
 *
 * @param e
 * @param todos
 * @param fullTodos
 * @returns {Promise<void>}
 */
export async function filters(e, todos, fullTodos){
    const btnFilters = document.querySelectorAll(".filter-btn")
    btnFilters.forEach(btn => {
        btn.classList.remove("active")
    })
    if(e.target && e.target.nodeName === "BUTTON") {
        const dataFilter = e.target.getAttribute("data-filter")
        let todosFiltered
        todos.length = 0
        todos.push(...fullTodos)
        e.target.classList.add("active")
        if (dataFilter === "en-cours") {
            todosFiltered = todos.filter(el => !el.completed)
            todos.length = 0
            todos.push(...todosFiltered)
        } else if (dataFilter === "termine") {
            todosFiltered = todos.filter(el => el.completed)
            todos.length = 0
            todos.push(...todosFiltered)
        }
        return createListTodos(todos)
    }
}