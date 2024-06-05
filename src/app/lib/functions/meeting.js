import {addNotification, insertMeetingWork} from "@/app/lib/database/databaseAPI";
import {toast} from "react-hot-toast";

function handleAddingMeeting(userId, time, dataUstawiona, teacher, toDelete, setAddingNewNote, setRefreshData) {
    return function(e) {
        e.preventDefault();
        setRefreshData(prevRefreshData => !prevRefreshData);
        if (toDelete === undefined && (!time || !dataUstawiona || !teacher)) return;

        let timeString = `${time.hour}:${time.minute}:${time.second}`;
        let dateString = `${dataUstawiona.day}.${dataUstawiona.month}.${dataUstawiona.year}`;

        insertMeetingWork(userId, dateString, timeString, teacher);
        let content = 'Pomyślnie dodano nowe spotkanie!';
        toast.success(content);
        addNotification(userId, content, 'success', 'Praca');

        setAddingNewNote(false);
    }
}
