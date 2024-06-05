import {addNotification, insertTaskWork} from "@/app/lib/database/databaseAPI";
import {toast} from "react-hot-toast";

function handleAddingWorkTask(userId, time, dataUstawiona, teacher, toDelete, setRefreshData, setAddingNewNote) {
    return function(e) {
        e.preventDefault();
        setRefreshData(!refreshData);
        if (toDelete === undefined && (!time || !dataUstawiona || !teacher)) return;

        let timeString = `${time.hour}:${time.minute}:${time.second}`;
        let dateString = `${dataUstawiona.day}.${dataUstawiona.month}.${dataUstawiona.year}`;

        insertTaskWork(userId, dateString, timeString, teacher);
        let content = 'Pomyślnie dodano nowe zadanie!';
        toast.success(content);
        addNotification(userId, content, 'success', 'Praca');

        setAddingNewNote(false);
    }
}
