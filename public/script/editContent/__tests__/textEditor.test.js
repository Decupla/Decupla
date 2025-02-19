global.Quill = jest.fn().mockImplementation(() => {
  return {
    clipboard: {
      convert: jest.fn().mockReturnValue('delta'),
    },
    setContents: jest.fn(),
    root: {
      innerHTML: '<p>Mocked Content</p>',
    },
  };
});

import { createEditor, getEditorData } from '../modules/textEditor';
import { activeTextEditors } from '../modules/data';

beforeEach(() => {
  activeTextEditors.length = 0;
  global.Quill.mockClear();
});

describe('createEditor', () => {
  it('should initialize a Quill editor and add it to activeTextEditors', () => {
    const container = document.createElement('div');
    const name = 'testEditor';
    const value = 'Test content';

    createEditor(container, name, value);

    expect(Quill).toHaveBeenCalledWith(container, expect.objectContaining({
      theme: 'snow',
      modules: {
        toolbar: expect.any(Array),
      },
    }));

    const quillInstance = Quill.mock.results[0].value;
    expect(quillInstance.clipboard.convert).toHaveBeenCalledWith(value);
    expect(quillInstance.setContents).toHaveBeenCalledWith('delta');

    expect(activeTextEditors).toHaveLength(1);
    expect(activeTextEditors[0]).toEqual({
      name: 'testEditor',
      editor: expect.any(Object),
    });
  })

  it('should not set content if value is empty', () => {
    const container = document.createElement('div');
    const name = 'testEditorEmpty';
    const value = '';
  
    createEditor(container, name, value);
  
    const quillInstance = Quill.mock.results[0].value;
    expect(quillInstance.setContents).not.toHaveBeenCalled();
  
    expect(activeTextEditors).toHaveLength(1);
    expect(activeTextEditors[0].name).toBe('testEditorEmpty');
  });
})

describe('getEditorData', () => {
  it('should return correct data from activeTextEditors', () => {
    activeTextEditors.push({
      name: 'mockedEditor1',
      editor: {
        root: {
          innerHTML: '<p>Mocked content 1</p>',
        },
      },
    });
    activeTextEditors.push({
      name: 'mockedEditor2',
      editor: {
        root: {
          innerHTML: '<p>Mocked content 2</p>',
        },
      },
    });
  
    const editorData = getEditorData();
  
    expect(editorData).toEqual([
      { name: 'mockedEditor1', content: '<p>Mocked content 1</p>' },
      { name: 'mockedEditor2', content: '<p>Mocked content 2</p>' },
    ]);
  });
})
