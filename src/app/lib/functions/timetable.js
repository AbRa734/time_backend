import {addNotification, insertTimetable} from "@/app/lib/database/databaseAPI";
import {toast} from "react-hot-toast";

function handleAddingToTimetable(userId, fromTime, toTime, dataUstawiona, category, loadedCategories, toDelete, setRefreshData, setAddingNewNote) {
    return function(e) {
        e.preventDefault();
        setRefreshData(prevRefreshData => !prevRefreshData);
        if (toDelete === undefined && (!fromTime || !toTime)) return;

        let fromTimeString = `${fromTime.hour}:${fromTime.minute}:${fromTime.second}`;
        let toTimeString = `${toTime.hour}:${toTime.minute}:${toTime.second}`;
        let dateString = `${dataUstawiona.day}.${dataUstawiona.month}.${dataUstawiona.year}`;

        let result;
        for (let single of loadedCategories){
            if (single.name === category){
                result = single.id;
                break;
            }
        }

        console.log(userId, fromTimeString, toTimeString, result, dateString);

        insertTimetable(userId, fromTimeString, toTimeString, result, dateString);
        let content = 'Pomyślnie dodano nowe wydarzenie!';
        toast.success(content);
        addNotification(userId, content, 'success', 'Szkoła');

        setAddingNewNote(false);
    }
}
