import { entries, setNextPriority } from "./data";
import { updateVisualizationPriority } from "./visualization";

export const priorityUp = (entryID) => {
    const index = entries.findIndex(entry => entry.entryID === entryID);

    if (index !== -1) {
        const priority = entries[index].priority;
        const newPriority = priority - 1;

        if (priority > 1) {
            const prevEntry = entries.find(entry => entry.priority === newPriority);

            if (prevEntry) {
                prevEntry.priority++;
                entries[index].priority = newPriority;

                updateVisualizationPriority(entryID, newPriority);
                updateVisualizationPriority(prevEntry.entryID, prevEntry.priority);
            }
        }
    }
}

export const priorityDown = (entryID) => {
    const index = entries.findIndex(entry => entry.entryID === entryID);

    if (index !== -1) {
        const priority = entries[index].priority;
        const newPriority = priority + 1;

        if (priority !== entries.length) {
            const nextEntry = entries.find(entry => entry.priority === newPriority);

            if (nextEntry) {
                nextEntry.priority--;
                entries[index].priority = newPriority;

                updateVisualizationPriority(entryID, newPriority);
                updateVisualizationPriority(nextEntry.entryID, nextEntry.priority);
            }
        }
    }
}