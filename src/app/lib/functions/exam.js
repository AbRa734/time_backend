import {addNotification, insertExams} from "@/app/lib/database/databaseAPI";
import {toast} from "react-hot-toast";

function handleAddingExam(userId, time, dataUstawiona, teacher, category, loadedCategories, toDelete, setAddingNewNote, setRefreshData) {
    return function(e) {
        e.preventDefault();
        setRefreshData(prevRefreshData => !prevRefreshData);
        if (toDelete === undefined && (!time || !dataUstawiona || !teacher)) return;

        let timeString = `${time.hour}:${time.minute}:${time.second}`;
        let dateString = `${dataUstawiona.day}.${dataUstawiona.month}.${dataUstawiona.year}`;

        let result;
        for (let single of loadedCategories){
            if (single.name === category){
                result = single.id;
                break;
            }
        }

        insertExams(userId, timeString, dateString, result, teacher);
        let content = 'Pomyślnie dodano nowy egzamin!';
        toast.success(content);
        addNotification(userId, content, 'success', 'Szkoła');

        setAddingNewNote(false);
    }
}
