import {addNotification, insertActivities} from "@/app/lib/database/databaseAPI";
import {toast} from "react-hot-toast";

function handleAddingActivity(userId, dataUstawiona, teacher, toDelete, setAddingNewNote, setRefreshData) {
    return function(e) {
        e.preventDefault();
        setRefreshData(prevRefreshData => !prevRefreshData);

        if (toDelete === undefined && (!dataUstawiona || !teacher)) return;

        let dateString = `${dataUstawiona.day}.${dataUstawiona.month}.${dataUstawiona.year}`;

        insertActivities(userId, dateString, teacher);
        let content = 'Pomyślnie dodano nową aktywność!';
        toast.success(content);
        addNotification(userId, content, 'success', 'Szkoła');

        setAddingNewNote(false);
    }
}
