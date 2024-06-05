import {getMeetingWork, getNotes, getNotifications, getTodos} from "@/app/lib/database/databaseAPI";

export async function getStatistics(id)
{
    const dataTodos = await getTodos(id);
    const dataNotes = await getNotes(id);
    const dataNotifications = await getNotifications(id);
    const dataMeetings = await getMeetingWork(id);

    let allTodos = dataTodos.reduce((sum, item)=>sum+1, 0);
    let finishedTodos = dataTodos.reduce((sum, item)=>item?.completed && sum+1, 0);

    let allNotes = dataNotes.reduce((sum, item)=>sum+1, 0);
    let finishedNotes = dataNotes.reduce((sum, item)=>item?.completed && sum+1, 0);

    let allNotifications = dataNotifications.reduce((sum, item)=>sum+1, 0);

    let allMeetings = dataMeetings.reduce((sum, item)=>sum+1, 0);

    return [allTodos, finishedTodos, allNotes, finishedNotes, allNotifications, allMeetings, dataMeetings[0], dataMeetings[1]] || null;
}

export async function processUserTodos(id, value)
{
    const data = await getTodos(id);

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

export async function processUserMeetings(id, value)
{
    const data = await getMeetingWork(id);

    let dataTime = new Date(value);
    let stringDataTime = `${dataTime.getFullYear()}-${dataTime.getDate() <= 9 ? `0`+dataTime.getDate() : dataTime.getDate()}-${dataTime.getMonth()+1 <= 9 ? `0`+(dataTime.getMonth()+1) : (dataTime.getMonth()+1)}`

    let newData = [];
    for (let item of data){
        if (stringDataTime === item?.date){
            newData.push(item);
        }
    }

    return newData || null;
}
