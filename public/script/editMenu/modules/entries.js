import { getMenuById } from "./api";
import { entries, getEntryId, getPriority, setNextEntryId, setNextPriority } from "./data";
import { createEntryVisualization, deleteInputVisualization, updateVisualizationPriority } from "./visualization";

export const getEntriesData = async (id) => {
    try {
        const menuData = await getMenuById(id);
    
        if (menuData.success === true) {
            const existingEntries = JSON.parse(menuData.menu.entries);
            entries.push(...existingEntries);

            if(entries.length>0){
                setNextEntryId(entries[entries.length - 1].entryID + 1);
                const currentMaxPriority = Math.max(0, ...entries.map(entry => entry.priority));
                setNextPriority(currentMaxPriority + 1);
            }

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
        priority: getPriority(),
        title
    }

    entries.push(entryData);
    createEntryVisualization(entryData);
}

export const removeEntry = (entryID) => {
    const index = entries.findIndex(entry => entry.entryID === entryID);

    if (index !== -1) {
        const removedPriority = entries[index].priority;

        entries.splice(index, 1);

        entries.forEach(entry => {
            if (entry.priority > removedPriority) {
                entry.priority -= 1;
                updateVisualizationPriority(entry.entryID,entry.priority);
            }
        });

        const currentMaxPriority = Math.max(0, ...entries.map(entry => entry.priority));
        setNextPriority(currentMaxPriority + 1);

        deleteInputVisualization(entryID);
    }

    console.log(entries);
};
