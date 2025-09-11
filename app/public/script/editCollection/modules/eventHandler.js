import DOM from "./dom";
import { saveCollection } from "./api";
import { setFieldMessage, resetMessages, showSuccessMessage } from "./validation";
import { collectionExists, setCollectionExists, collectionID, setCollectionID } from "./data";

export const handleCollectionSubmit = async (event) => {
    event.preventDefault();
    resetMessages();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    let url = '/collections';
    let method = 'POST';

    if (collectionExists) {
        method = "PUT";
        url = `/collections/${collectionID}`;
    }

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
            showSuccessMessage();

            if (!collectionExists) {
                setCollectionID(response.newID);
                setCollectionExists(true);
            }
        } else {
            console.error('Something went wrong while trying to save the block');
        }
    } catch (error) {
        console.error('Something went wrong:', error);
    }
}