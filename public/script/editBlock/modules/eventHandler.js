import DOM from "./dom";
import { saveBlock } from "./api";
import { inputData, inputMethod, blockExists, setBlockExists, setBlockID, blockID, setSubmittedForm } from "./data";
import { setFieldMessage,resetMessages } from "./validation";
import { setVisible, updateInput, saveNewInput } from "./input";

// called when the type of a input is changed while creating / editing input
export const handleTypeChange = (type,element) => {
    switch (type) {
        case 'shortText':
            setVisible(['name', 'label', 'type', 'max-length'],element);
            break;
        case 'LongText':
            setVisible(['name', 'label', 'type'],element);
            break;
        default:
            setVisible(['name', 'label', 'type'],element);
    }
}

// called when the input form is submitted
export const handleInputSubmit = (event,priority) => {
    event.preventDefault();
    resetMessages();
    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());


    setSubmittedForm(form);

    if (inputMethod === "create") {
        saveNewInput(data,priority);
    } else if (inputMethod === "update") {
        updateInput(data);
    } else {
        console.log('No input method was given.');
    }
}

//handles the event when the main form (block) is submitted
export const handleBlockSubmit = async (event) => {
    event.preventDefault();
    resetMessages();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    data.title = DOM.titleInput.value;
    data.key = DOM.keyInput.value;

    data.input = JSON.stringify(inputData);

    let method = "POST"
    let url = "/blocks";

    // if we are editing a existing block, we need a different method and url
    if (blockExists) {
        method = "PUT";
        url = `/blocks/${blockID}`;
    }

    try {
        console.log(data);
        const response = await saveBlock(url, method, data)

        if (!response.validation) {
            const messages = response.messages;
            console.log(messages);

            for (const [field, message] of Object.entries(messages)) {
                setFieldMessage(field,message,true);
            }

            return;
        } else if (response.success) {
            DOM.messageSuccess.classList.add('visible');

            if (!blockExists && 'newID' in response) {
                setBlockExists(true);
                setBlockID(response.newID);
            } else if (!blockExists) {
                console.error('could not get id of the created block')
            }

        } else {
            console.error('Something went wrong while trying to save the block');
        }
    } catch (error) {
        console.error('Something went wrong:', error);
    }
}