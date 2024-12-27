import { saveMenu } from "./api";
import { entries } from "./data"; 
import { setFieldMessage, resetMessages } from "./validation";

// handles the event when the main form is submitted
export const handleFormSubmit = async (event) => {
    event.preventDefault();
    resetMessages();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    data.entries = entries.toString();

    console.log(data);

    let method = "POST"
    let url = "/menus";

    try {
        const response = await saveMenu(url,method,data);

        if (!response.validation) {
            const messages = response.messages;
            console.log(messages);

            for (const [field, message] of Object.entries(messages)) {
                setFieldMessage(field,message);
            }

            return;
        } else if (response.success) {
            setFieldMessage('saved','Menu saved successfully');
        } else {
            console.error('Something went wrong while trying to save the block');
        }
    } catch (error) {
        console.error('Something went wrong:', error);
    }
}
