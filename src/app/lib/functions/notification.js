import {getNotifications} from "@/app/lib/database/databaseAPI";

export async function processUserNotifications(id, value)
{
    const data = await getNotifications(id);

    let newData = [];
    for (let item of data){
        let dataTime = new Date(item?.created_at)
        let data2 = dataTime.toLocaleDateString();

        if (value === data2){
            newData.push(item);
        }
    }

    return newData || null;
}
