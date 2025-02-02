import { setupcontentSelection, toggleContentSelection } from '../modules/content';
import DOM from '../modules/dom';

jest.mock('../modules/entries', () => ({
    addEntry: jest.fn(),
}));

jest.mock('../modules/dom', () => ({
    selectEntryButton: {
        addEventListener: jest.fn(),
    },
    contentListEntries: [
        { addEventListener: jest.fn() },
        { addEventListener: jest.fn() },
    ],
    contentSelection: {
        classList: {
            toggle: jest.fn(),
        },
    },
}));

afterEach(() => {
    jest.clearAllMocks();
});

describe('setupcontentSelection', () => {
    it('should add event listener to selectEntryButton', () => {
        setupcontentSelection();

        expect(DOM.selectEntryButton.addEventListener).toHaveBeenCalledWith('click', expect.any(Function));
    });

    it('should add event listeners to all contentListEntries', () => {
        setupcontentSelection();

        DOM.contentListEntries.forEach((content) => {
            expect(content.addEventListener).toHaveBeenCalledWith('click', expect.any(Function));
        });
    });
});

describe('toggleContentSelection', () => {
    it('should toggle the "visible" class on contentSelection', () => {
        toggleContentSelection();

        expect(DOM.contentSelection.classList.toggle).toHaveBeenCalledWith('visible');
    });
});
