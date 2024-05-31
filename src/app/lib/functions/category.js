import {addCategory, addNotification} from "@/app/lib/database/databaseAPI";
import {toast} from "react-hot-toast";

function handleAddingCategory(userId, title, description, toDelete, setTitle, setDescription, setAddingNewNote, setRefreshData) {
    return function(e) {
        e.preventDefault();
        setRefreshData(prevRefreshData => !prevRefreshData);

        if (toDelete === undefined && (!title || !description)) return;

        addCategory(title, description, userId);

        let content = 'Pomyślnie dodano nową kategorię!';
        toast.success(content);
        addNotification(userId, content, 'success', 'Kategoria');

        setTitle("");
        setDescription("");
        setAddingNewNote(false);
    }
}

