import {addNotification, addTodo, editTodo, getStatuses, getTodos} from "@/app/lib/database/databaseAPI";
import {toast} from "react-hot-toast";

export async function processUserTodos(id)
{
    const data = await getTodos(id);
    return data || null;
}

export async function processUserStatuses(id)
{
    const data = await getStatuses(id);
    return data || null;
}

function markAsCompleted(userId, data, completed, setCompleted) {
    return function() {
        editTodo(data.id, "markAsCompleted", completed);
        setCompleted(!completed);
    }
}

function handleAddingTodo(userId, title, description, category, toDelete, data, setCategory, setRefreshData, setTitle, setDescription, setAddingNewNote, completed, setCompleted) {
    return function(e) {
        e.preventDefault();
        setRefreshData(!refreshData);
        if (toDelete === undefined && (!title || !description)) return;

        if (!category)
            setCategory("Do zrobienia");

        if (data !== undefined) {
            editTodo(data.id, "editNote", {heading: title, content: description, category: category});
            toast.success('Pomyślnie zmodyfikowano zadanie!');
        } else if (toDelete !== undefined) {
            editTodo(userId, "deleteNote");
            toast.success('Pomyślnie usunięto zadanie!');
        } else {
            addTodo(title, description, category, userId);
            let content = 'Pomyślnie dodano zadanie!';
            toast.success(content);
            addNotification(userId, content, 'success', 'Zadania');
        }

        setTitle("");
        setDescription("");
        setCategory("");
        setAddingNewNote(false);
    }
}
