import { handleContentSubmit, handleUrlBlur } from '../modules/eventHandler';
import { saveContentData } from '../modules/api';
import { reloadBlocks, saveBlockInstances } from '../modules/blocks';
import { setFieldMessage, resetMessages } from '../modules/messages';
import DOM from '../modules/dom';
import { setContentID  } from '../modules/data';

jest.mock('../modules/api');
jest.mock('../modules/blocks');
jest.mock('../modules/messages');
jest.mock('../modules/textEditor');
jest.mock('../modules/dom');
jest.mock('../modules/data');

jest.mock('../modules/data', () => ({
    ...jest.requireActual('../modules/data'),
    contentID: 123,
    setContentID: jest.fn(),
}));

describe('handleContentSubmit', () => {
    let event;

    beforeEach(() => {
        const formElement = document.createElement('form');
        formElement.innerHTML = `
            <input name="title" value="Test Title" />
            <textarea name="content">Test Content</textarea>
        `;
        DOM.titleInput = formElement.querySelector('input[name="title"]');
        DOM.urlInput = { value: '' };
        event = { preventDefault: jest.fn(), target: formElement };

        resetMessages.mockClear();
        saveContentData.mockClear();
        saveBlockInstances.mockClear();
        setFieldMessage.mockClear();
        reloadBlocks.mockClear();
        DOM.savedMessage = { classList: { add: jest.fn() } };

        setContentID(123);
        require('../modules/data').contentExists = true;
    });

    it('should update existing content if contentExists is true', async () => {
        const mockResponse = { success: true, url: '/updated-content-url' };
        saveContentData.mockResolvedValue(mockResponse);
        saveBlockInstances.mockResolvedValue(true);

        await handleContentSubmit(event);

        expect(saveContentData).toHaveBeenCalledWith('/content/123', 'PUT', expect.any(Object));
        expect(reloadBlocks).toHaveBeenCalledWith(123);
        expect(DOM.savedMessage.classList.add).toHaveBeenCalledWith('visible');
        expect(DOM.urlInput.value).toBe(mockResponse.url);
    });
});

describe('handleUrlBlur', () => {
    it('should format URL correctly when trimmed input is given', () => {
        const input = { value: '/example-url/' };
        const event = { target: input };

        handleUrlBlur(event);

        expect(input.value).toBe('/example-url/');
    });

    it('should trim URL when leading or trailing slashes are present', () => {
        const input = { value: '///example-url///' };
        const event = { target: input };

        handleUrlBlur(event);

        expect(input.value).toBe('/example-url/');
    });

    it('should not modify URL if no slashes are present', () => {
        const input = { value: 'example-url' };
        const event = { target: input };

        handleUrlBlur(event);

        expect(input.value).toBe('/example-url/');
    });
});
