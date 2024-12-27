import { getMenuById } from "./api";
import { entries } from "./data";
import { createEntryVisualization } from "./visualization";

export const getEntriesData = async (id) => {
    try {
        const menuData = await getMenuById(id);
        console.log(menuData);
        if (menuData.success === true) {
            const entriesData = menuData.menu.entries;
            entriesData.forEach((entry)=>{
                entries.push(entry.id);
                createEntryVisualization(entry.id,entry.title);
            })
        } else {
            // to do: fehlermeldung auf der Seite ausgebe
            console.log(menuData.message);
        }
    } catch (error) {
        console.error('Something went wrong:', error);
    }

    return;
}