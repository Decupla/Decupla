import DOM from "./dom";
import { setInputMethod, inputData, getInputId, setInputID, inputID, setNextInputId, getPriority, setNextPriority } from "./data";
import { handleTypeChange } from "./eventHandler";
import { validateInput } from "./validation";
import { addInputVisualization, deleteInputVisualization, updateInputVisualization, updateVisualizationPriority, setLastVisualisation } from "./visualization";
import { getBlockById } from "./api";

// sets which settings should be visible in the input creation, hides all other settings
export const setVisible = (fields, element) => {
    const inputFields = element.querySelectorAll('input,select');

    inputFields.forEach((field) => {
        parent = field.parentElement;

        if (fields.includes(field.name) && !parent.classList.contains('visible')) {
            parent.classList.add('visible');
        } else if (!fields.includes(field.name) && parent.classList.contains('visible')) {
            parent.classList.remove('visible');
        }
    })
}

// opens the input form to create a new input
export const createInput = (container) => {
    setInputMethod("create");
    handleTypeChange("shortText",container);
    toggleInputCreation(container);
}

const toggleInputCreation = (container) => {
    closeInputCreation();
    container.classList.add('show-input-creation');
}

export const closeInputCreation = () => {
    const containers = document.querySelectorAll('.show-input-creation');
    containers.forEach((container) => {
        const form = container.querySelector('form.add-input-form');
        if (form) {
            form.reset();
        }

        container.classList.remove('show-input-creation');
    })
}

// get the existing input fields of the block
export const getInputData = async (id) => {
    try {
        const blockData = await getBlockById(id);
        if (blockData.success === true) {
            const input = JSON.parse(blockData.block.input);
            inputData.push(...input);

            inputData.forEach((data) => {
                addInputVisualization(data);
            });

            if (inputData.length > 0) {
                const highestId = Math.max(...inputData.map(input => input.id));
                setNextInputId(highestId+1);
    
                const highestPriority = Math.max(...inputData.map(input => input.priority));
                setNextPriority(highestPriority + 1);

                DOM.addInputContainerEnd.classList.add('visible');
            }

            setLastVisualisation();
        } else {
            // to do: fehlermeldung auf der Seite ausgebe
            console.log(blockData.message);
        }
    } catch (error) {
        console.error('Something went wrong:', error);
    }
};

// opens the input form to edit a existing input from the inputData array
export const editInput = (id, container) => {
    setInputMethod("update");

    const data = inputData.find(input => input.id === id) || null;
    if (data === null) {
        console.log('Input to edit could not be found.');
        return;
    }

    container.querySelector('select[name="type"]').value = data.params.type;
    container.querySelector('input[name="name"]').value = data.params.name;
    container.querySelector('input[name="label"]').value = data.params.label;

    if ('maxLength' in data.params) {
        container.querySelector('input[name="maxLength"]').value = data.params.maxLength;
    }
    if('selection' in data.params) {
        container.querySelector('select[name="selection"]').value = data.params.selection;
    }

    setInputID(id);
    handleTypeChange(data.params.type, container);
    toggleInputCreation(container);
}

// deletes existing input from the inputData array
export const deleteInput = (id) => {
    const index = inputData.findIndex(input => input.id === id);

    if (index !== -1) {

        const removedPriority = inputData[index].priority;

        // remove input from the array
        inputData.splice(index, 1);
        // delete the visualization
        deleteInputVisualization(id);


        //update input priorities
        inputData.forEach(input => {
            if (input.priority > removedPriority) {
                input.priority -= 1;
                updateVisualizationPriority(input.id, input.priority);
            }
        });

        if(inputData.length===0){
            DOM.addInputContainerEnd.classList.remove('visible');
        }

        const highestPriority = Math.max(...inputData.map(input => input.priority));
        setNextPriority(highestPriority + 1);

        setLastVisualisation();
    }
}

export const saveNewInput = (data, priority) => {
    if (!validateInput(data, true)) return;

    const input = {
        id: getInputId(),
        priority: priority,
        params: data
    }

    inputData.forEach(input => {
        if (input.priority >= priority) {
            input.priority += 1;
            updateVisualizationPriority(input.id, input.priority);
        }
    });

    inputData.push(input);
    addInputVisualization(input);
    closeInputCreation();
    DOM.inputForm.reset();

    if(!DOM.addInputContainerEnd.classList.contains('visible')){
        DOM.addInputContainerEnd.classList.add('visible');
    }

    const highestPriority = Math.max(...inputData.map(input => input.priority));
    setNextPriority(highestPriority + 1);

    setLastVisualisation();
};

// updates existing input in the inputData array
export const updateInput = (data) => {
    const index = inputData.findIndex(input => input.id === inputID);
    if (index === -1 || inputID === 0) {
        console.error('The data of the input field could not be found.');
        return;
    }

    if (inputData[index].name !== data.name) {
        if (!validateInput(data, true)) return;
    } else if (!validateInput(data)) {
        return;
    }

    inputData[index].params = data;
    updateInputVisualization(inputID, data);
    closeInputCreation();
};