import {getActivities, getExams, getSubjects, getTimetable} from "@/app/lib/database/databaseAPI";

export async function processUserSubjects(id, value)
{
    const data = await getSubjects(id);
    return data || null;
}

export async function processUserTimetable(id, value)
{
    const data = await getTimetable(id);

    let dataTime = new Date(value);
    let stringDataTime = `${dataTime.getFullYear()}-${dataTime.getMonth()+1 <= 9 ? `0`+(dataTime.getMonth()+1) : (dataTime.getMonth()+1)}-${dataTime.getDate() <= 9 ? `0`+dataTime.getDate() : dataTime.getDate()}`


    let newData = [];
    for (let item of data){
        if (stringDataTime === item?.data){
            newData.push(item);
        }
    }

    return newData || null;
}

export async function processUserExams(id, value)
{
    const data = await getExams(id);

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

export async function processUserActivities(id, value)
{
    const data = await getActivities(id);

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
