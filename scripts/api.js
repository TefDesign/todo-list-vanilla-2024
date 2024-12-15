/**
 * Récupération des todos via l'api jsonplaceholder
 * @returns {Promise<any|*[]>}
 */
export async function getTodos() {

    try {
        const datas = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=5")
        const todos = await datas.json()

        if(!todos || todos.length === 0) {
            console.error("Aucune donnée à afficher")
            return []
        }

        return todos
    } catch (e) {
        console.error("Erreur de récupération des données", e)
        return []
    }

}