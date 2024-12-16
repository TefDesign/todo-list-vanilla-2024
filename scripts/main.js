import {getTodos} from "./api.js";
import {createListTodos, initListeners} from "./dom.js";

/**
 * Fonction principale
 * @returns {Promise<void>}
 */
async function main() {
    const todos = await getTodos()
    const fullTodos =[...todos]

    createListTodos(todos)

    initListeners(todos, fullTodos)
}

main()