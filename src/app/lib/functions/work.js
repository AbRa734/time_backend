import {getActivitiesWork, getMeetingWork, getTasksWork} from "@/app/lib/database/databaseAPI";

export async function processUserWorkActivities(id, value)
{
    const data = await getActivitiesWork(id);
    return data || null;
}

export async function processUserTasks(id, value)
{
    const data = await getTasksWork(id);


    let dataTime = new Date(value);
    let stringDataTime = `${dataTime.getFullYear()}-${dataTime.getMonth()+1 <= 9 ? `0`+(dataTime.getMonth()+1) : (dataTime.getMonth()+1)}-${dataTime.getDate() <= 9 ? `0`+dataTime.getDate() : dataTime.getDate()}`



    let newData = [];
    for (let item of data){
        if (stringDataTime === item?.date){
            newData.push(item);
        }
    }

    return newData || null;
}

export async function processUserMeetings(id, value)
{
    const data = await getMeetingWork(id);
    let dataTime = new Date(value);
    let stringDataTime = `${dataTime.getFullYear()}-${dataTime.getMonth()+1 <= 9 ? `0`+(dataTime.getMonth()+1) : (dataTime.getMonth()+1)}-${dataTime.getDate() <= 9 ? `0`+dataTime.getDate() : dataTime.getDate()}`

    let newData = [];
    for (let item of data){
        if (stringDataTime === item?.date){
            newData.push(item);
        }
    }

    return newData || null;
}
