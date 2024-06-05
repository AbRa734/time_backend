import {getHiddenTabs} from "@/app/lib/database/databaseAPI";

export async function loadOptions(id)
{
    const data = await getHiddenTabs(id);
    return data || null;
}
