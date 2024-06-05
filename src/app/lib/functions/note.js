import {addNote, addNotification, editNote, getCategories, getNotes} from "@/app/lib/database/databaseAPI";
import {toast} from "react-hot-toast";

export async function processUserNotes(id)
{
    const data = await getNotes(id);
    return data || null;
}

export async function processUserCategories(id)
{
    const data = await getCategories(id);
    return data || null;
}

function handleAddingNote(userId, title, description, category, toDelete, data, setCategory, setRefreshData, setTitle, setDescription, setAddingNewNote) {
    return function(e) {
        e.preventDefault();
        setRefreshData(prevRefreshData => !prevRefreshData);
        if (toDelete === undefined && (!title || !description)) return;

        if (!category)
            setCategory("Dom");

        if (data !== undefined) {
            editNote(data.id, "editNote", {heading: title, content: description, category: category});
            toast.success('Pomyślnie zmodyfikowano notatkę!');
        } else if (toDelete !== undefined) {
            editNote(userId, "deleteNote", toDelete);
            let content = 'Pomyślnie usunięto notatkę!';
            toast.success(content);
            addNotification(userId, content, 'success', 'Notatki');
        } else {
            addNote(title, description, category, userId);
            let content = 'Pomyślnie dodano notatkę!';
            toast.success(content);
            addNotification(userId, content, 'success', 'Notatki');
        }

        setTitle("");
        setDescription("");
        setCategory("");
        setAddingNewNote(false);
    }
}
