import { setFieldMessage, resetMessages } from '../modules/validation';
import DOM from '../modules/dom';

jest.mock('../modules/dom', () => ({
  fieldMessages: {
    title: {
      innerText: '',
      classList: {
        add: jest.fn(),
        remove: jest.fn(),
        contains: jest.fn().mockReturnValue(false),
      },
    },
    key: {
      innerText: '',
      classList: {
        add: jest.fn(),
        remove: jest.fn(),
        contains: jest.fn().mockReturnValue(false),
      },
    },
  },
}));

afterEach(() => {
  jest.clearAllMocks();
});

describe('setFieldMessage', () => {
  it('should set the innerText and add visible-class if field exists', () => {
    const field = 'title';
    const message = 'This is a test message';

    setFieldMessage(field, message);

 
    expect(DOM.fieldMessages[field].innerText).toBe(message);
    expect(DOM.fieldMessages[field].classList.add).toHaveBeenCalledWith('visible');
  });

  it('should log error message if field does not exist', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    const field = 'notexistingfield';
    const message = 'This should not be set';

    setFieldMessage(field, message);

    expect(consoleSpy).toHaveBeenCalledWith('Field "notexistingfield" does not exist.');
  });
});

describe('resetMessages', () => {
  it('should remove visible-class from all field messages', () => {
    DOM.fieldMessages.title.classList.contains.mockReturnValue(true);

    resetMessages();

    expect(DOM.fieldMessages.title.classList.remove).toHaveBeenCalledWith('visible');
  });
});
