import {addEventsInCalendar, addNotification, getEventsInCalendar} from "@/app/lib/database/databaseAPI";
import {toast} from "react-hot-toast";

export async function processUserEvents(id, value)
{
    const data = await getEventsInCalendar(id);

    let newData = [];
    for (let item of data){
        let dataTime = new Date(item?.created_at)
        let data2 = dataTime.toLocaleDateString();

        if (value.toLocaleDateString() === data2){
            newData.push(item);
        }
    }

    return newData || null;
}

function handleAddingEvent(userId, title, description, fromTime, toTime, setTitle, setDescription, setFromTime, setToTime, setAddingNewNote, setRefreshData) {
    return function(e) {
        let fromTimeString = `${fromTime.hour}:${fromTime.minute}:${fromTime.second}`;
        let toTimeString = `${toTime.hour}:${toTime.minute}:${toTime.second}`;
        e.preventDefault();
        setRefreshData(prevRefreshData => !prevRefreshData);
        if (!title || !description || !fromTime || !toTime) return;

        addEventsInCalendar(userId, title, description, fromTimeString, toTimeString, false);
        let content = 'Pomyślnie dodano wydarzenie!';
        toast.success(content);
        addNotification(userId, content, 'success', 'Kalendarz');

        setTitle("");
        setDescription("");
        setToTime('');
        setFromTime('');
        setAddingNewNote(false);
    }
}
