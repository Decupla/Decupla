import DOM from "./dom";
import { setInputMethod, inputData, getInputId, setInputID, inputID } from "./data";
import { handleTypeChange } from "./eventHandler";
import { validateInput } from "./validation";
import { addInputVisualization, deleteInputVisualization, updateInputVisualization } from "./visualization";
import { getBlockById } from "./api";

// sets which settings should be visible in the input creation, hides all other settings
export const setVisible = (fields) => {
    for (const [name, element] of Object.entries(DOM.inputFormFields)) {
        const parent = element.parentElement;
        if (fields.includes(name) && !parent.classList.contains('visible')) {
            parent.classList.add('visible');
        } else if (!fields.includes(name) && parent.classList.contains('visible')) {
            parent.classList.remove('visible');
        }
    }
}

// opens the input form to create a new input
export const createInput = () => {
    setInputMethod("create");
    handleTypeChange(DOM.inputForm.type.value);
    toggleInputPopup();
}

const toggleInputPopup = () => {
    DOM.inputPopupWrapper.classList.toggle('visible');
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

        } else {
            // to do: fehlermeldung auf der Seite ausgebe
            console.log(blockData.message);
        }
    } catch (error) {
        console.error('Something went wrong:', error);
    }
};

// opens the input form to edit a existing input from the inputData array
export const editInput = (id) => {
    setInputMethod("update");

    const data = inputData.find(input => input.id === id) || null;
    if (data === null) {
        console.log('Input to edit could not be found.');
        return;
    }
    DOM.inputFormFields.type.value = data.type;
    DOM.inputFormFields.name.value = data.name;
    DOM.inputFormFields.label.value = data.label;

    if ('maxLength' in data) {
        DOM.inputFormFields.maxLength.value = data.maxLength;
    }

    setInputID(id);
    handleTypeChange(data.type);
    toggleInputPopup();
}

// deletes existing input from the inputData array
export const deleteInput = (id) => {
    const index = inputData.findIndex(input => input.id === id);

    if (index !== -1) {
        // remove input from the array
        inputData.splice(index, 1);
        // delete the visualization
        deleteInputVisualization(id);

    }
}

export const saveNewInput = (data) => {
    if (!validateInput(data, true)) return;
    data.id = getInputId();
    inputData.push(data);
    addInputVisualization(data);
    toggleInputPopup();
    DOM.inputForm.reset();
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

    data.id = inputID;
    inputData[index] = data;
    updateInputVisualization(inputID, data);
    toggleInputPopup();
    DOM.inputForm.reset();
};