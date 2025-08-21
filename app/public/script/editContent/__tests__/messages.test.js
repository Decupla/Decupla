import { setFieldMessage, resetMessages } from '../modules/messages';
import DOM from '../modules/dom';

jest.mock('../modules/dom', () => ({
    savedMessage: {
        classList: {
            add: jest.fn(),
            remove: jest.fn(),
            contains: jest.fn(),
        },
    },
}));

document.body.innerHTML = `
    <div id="message-field1" class="error-message"></div>
    <div id="message-field2" class="error-message"></div>
    <div id="savedMessage" class="saved-message"></div>
`;

describe('setFieldMessage', () => {
    it('should set message for a field and add visible class', () => {
        const field = 'field1';
        const message = 'This is an error message';

        setFieldMessage(field, message);

        const element = document.querySelector(`#message-${field}`);

        expect(element.innerText).toBe(message);
        expect(element.classList.contains('visible')).toBe(true);
    });
});

describe('resetMessages', () => {
    it('should remove the visible class from all error messages', () => {
        document.querySelector('#message-field1').classList.add('visible');
        document.querySelector('#message-field2').classList.add('visible');

        resetMessages();

        const activeMessages = document.querySelectorAll('.error-message.visible');

        expect(activeMessages.length).toBe(0);
    });

    it('should remove the visible class from the saved message', () => {
        DOM.savedMessage.classList.contains.mockReturnValue(true);

        resetMessages();

        expect(DOM.savedMessage.classList.remove).toHaveBeenCalledWith('visible');
    });
});
