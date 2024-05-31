import {addNotification, insertSubjects} from "@/app/lib/database/databaseAPI";
import {toast} from "react-hot-toast";

function handleAddingSubject(userId, name, toDelete, setRefreshData, setName, setAddingNewNote) {
    return function(e) {
        e.preventDefault();
        setRefreshData(prevRefreshData => !prevRefreshData);
        if (toDelete === undefined && (!name)) return;

        insertSubjects(userId, name);

        let content = 'Pomyślnie dodano nowy przedmiot!';
        toast.success(content);
        addNotification(userId, content, 'success', 'Szkoła');

        setName("");
        setAddingNewNote(false);
    }
}
