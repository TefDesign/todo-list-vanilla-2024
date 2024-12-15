import {actionsTodo, addTodo, filters, searchTodos} from "./actions.js";

/**
 *
 * @param todos Objet qui contient l'ensemble des todos
 * @returns {Promise<void>}
 */
export async function createListTodos(todos) {
    const ul = document.querySelector("#todo-list");
    ul.innerHTML = "";

    // Todos completed à la fin.
    const todosSorted = [...todos].sort((a,b) => a.completed - b.completed)

    for(let todo of todosSorted) {
        const status = todo.completed ? "termine" : "en-cours"

        // Titre de la todo
        const spanText = createEl("span", todo.title, "todo-text")

        // Actions
        const containerActions = createEl("div", "", "todo-actions")
        const btnDone = createEl("button", "✔", "btn")
        btnDone.classList.add("mark-done")
        const btnDelete = createEl("button", "╳", "btn")
        btnDelete.classList.add("delete")
        containerActions.appendChild(btnDone)
        containerActions.appendChild(btnDelete)

        // Li
        const li = createEl("li", "", "todo-item")
        li.classList.add(status)
        li.appendChild(spanText)
        li.appendChild(containerActions)
        ul.appendChild(li)
    }

    //await reverseTodos(todos)
}


/**
 *
 * @param tag Tag HTML à créer
 * @param content Contenu dans l'élément à saisir
 * @param class_name Classe à ajouter sur l'élément HTML créé
 * @returns { HTMLElement }
 */
function createEl(tag, content, class_name="") {
    const el = document.createElement(tag);
    el.innerHTML = content;
    if(class_name !== "") {
        el.classList.add(class_name);
    }

    return el
}

/**
 *
 * @param todos Objet qui contient l'ensemble des todos
 * @param fullTodos Objet qui contient l'ensemble des todos originaux sans modification
 * @returns {Promise<void>}
 */
export async function initListeners(todos, fullTodos) {
    const form = document.querySelector("#todo-form")
    form.addEventListener("keypress", e => addTodo(e, fullTodos))

    const searchInput = document.querySelector("#search-input");
    searchInput.addEventListener("keyup", e => searchTodos(e.target.value, todos))

    const ul = document.querySelector("#todo-list");
    ul.addEventListener("click", e => actionsTodo(e, fullTodos))

    const filtersActions = document.querySelector(".filters");
    filtersActions.addEventListener("click", e => filters(e, todos, fullTodos))
}

