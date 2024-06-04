import {addNotification, insertActivitiesWork} from "@/app/lib/database/databaseAPI";
import {toast} from "react-hot-toast";

function handleAddingWorkActivity(userId, dataUstawiona, timeUstawiony, tresc, toDelete, setRefreshData, setAddingNewNote) {
    return function(e) {
        e.preventDefault();
        setRefreshData(!refreshData);
        if (toDelete === undefined && (!dataUstawiona || !tresc)) return;

        let dateString = `${dataUstawiona.day}.${dataUstawiona.month}.${dataUstawiona.year}`;
        let timeString = `${timeUstawiony.hour}:${timeUstawiony.minute}:${timeUstawiony.second}`;

        console.log(userId, dateString, timeString, tresc);

        insertActivitiesWork(userId, dateString, timeString, tresc);
        let content = 'Pomyślnie dodano nową aktywność!';
        toast.success(content);
        addNotification(userId, content, 'success', 'Praca');

        setAddingNewNote(false);
    }
}
