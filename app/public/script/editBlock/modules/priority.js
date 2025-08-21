import { inputData } from "./data";
import { updateVisualizationPriority, setLastVisualisation } from "./visualization";

export const priorityUp = (id) => {
    const index = inputData.findIndex(input => input.id === id);

    if (index !== -1) {
        const priority = inputData[index].priority;
        const newPriority = priority - 1;

        if (priority > 1) {
            const prevInput = inputData.find(input => input.priority === newPriority);

            if (prevInput) {
                prevInput.priority++;
                inputData[index].priority = newPriority;

                updateVisualizationPriority(id, newPriority);
                updateVisualizationPriority(prevInput.id, prevInput.priority);

                setLastVisualisation();
            }
        }
    }
}

export const priorityDown = (id) => {
    const index = inputData.findIndex(input => input.id === id);

    if (index !== -1) {
        const priority = inputData[index].priority;
        const newPriority = priority + 1;

        if (priority !== inputData.length) {
            const nextInput = inputData.find(input => input.priority === newPriority);

            if (nextInput) {
                nextInput.priority--;
                inputData[index].priority = newPriority;

                updateVisualizationPriority(id, newPriority);
                updateVisualizationPriority(nextInput.id, nextInput.priority);

                setLastVisualisation();
            }
        }
    }
}