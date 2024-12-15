import {getTodos} from "./api.js";
import {createListTodos, initListeners} from "./dom.js";

/**
 * Fonction principale
 * @returns {Promise<void>}
 */
async function main() {
    const todos = await getTodos()
    const fullTodos =[...todos]

    await createListTodos(todos)

    await initListeners(todos, fullTodos)
}

main()