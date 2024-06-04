import {addNotification, addStatus} from "@/app/lib/database/databaseAPI";
import {toast} from "react-hot-toast";

function handleAddingStatus(userId, title, description, toDelete, setRefreshData, setTitle, setDescription, setAddingNewNote) {
    return function(e) {
        e.preventDefault();
        setRefreshData(prevRefreshData => !prevRefreshData);
        if (toDelete === undefined && (!title || !description)) return;

        addStatus(title, description, userId);

        let content = 'Pomyślnie dodano nowy status!';
        toast.success(content);
        addNotification(userId, content, 'success', 'Status');

        setTitle("");
        setDescription("");
        setAddingNewNote(false);
    }
}
