import DOM from "./dom";
import { saveCollection } from "./api";
import { setFieldMessage, resetMessages } from "./validation";

export const handleCollectionSubmit = async (event) => {
    event.preventDefault();
    resetMessages();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    const url = '/collections';
    const method = 'POST';

    try {
        const response = await saveCollection(url, method, data)
        console.log(response);

        if (!response.validation) {
            const messages = response.messages;

            for (const [field, message] of Object.entries(messages)) {
                setFieldMessage(field, message, true);
            }

            return;
        } else if (response.success) {
            DOM.messageSuccess.classList.add('visible');
        } else {
            console.error('Something went wrong while trying to save the block');
        }
    } catch (error) {
        console.error('Something went wrong:', error);
    }
}