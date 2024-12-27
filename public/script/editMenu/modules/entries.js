import { getMenuById } from "./api";
import { entries, getEntryId } from "./data";
import { createEntryVisualization, deleteInputVisualization } from "./visualization";

export const getEntriesData = async (id) => {
    try {
        const menuData = await getMenuById(id);
    
        if (menuData.success === true) {
            const existingEntries = JSON.parse(menuData.menu.entries);
            entries.push(...existingEntries);


            entries.forEach((entry)=>{
                createEntryVisualization(entry);
            })

            console.log(entries);
        } else {
            // to do: fehlermeldung auf der Seite ausgebe
            console.log(menuData.message);
        }
    } catch (error) {
        console.error('Something went wrong:', error);
    }

    return;
}

export const addEntry = (content) => {
    const title = content.querySelector('.contentTitle').innerText;

    const entryData = {
        entryID: getEntryId(),
        contentID: content.dataset.id,
        priority: entries.length + 1,
        title
    }

    entries.push(entryData);
    createEntryVisualization(entryData);
}

export const removeEntry = (entryID) => {
    const index = entries.findIndex(entry => entry.entryID === entryID);

    if (index !== -1) {
        entries.splice(index, 1);
        deleteInputVisualization(entryID);
    }
}