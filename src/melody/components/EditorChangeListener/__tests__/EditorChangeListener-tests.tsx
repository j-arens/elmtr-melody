import EditorChangeListener from '../EditorChangeListener';

describe('EditorChangeListener', () => {
    let Instance;
    let dummyComponent;

    beforeEach(() => {
        dummyComponent = jest.fn();
        Instance = EditorChangeListener(dummyComponent);
    });

    it('passes onEditorChange to the wrapped component', () => {
        const comp = new Instance();
        const rendered = comp.render();
        expect(rendered.attributes.onEditorChange).toBe(comp.onEditorChange);
    });

    it('sets up a listener for elementor editor changes', () => {
        const comp = new Instance();
        comp.componentDidMount();
        expect(comp.tap.on).toBeCalledWith('editor', 'change', comp.fireEditorChange);
    });

    it('removes the change listener when unmounting', () => {
        const comp = new Instance();
        comp.componentDidMount();
        comp.componentWillUnmount();
        expect(comp.tap.off).toBeCalledWith('editor', 'change', comp.fireEditorChange);
    });

    it('registers callbacks to fire on editor change', () => {
        const comp = new Instance();
        const fn = jest.fn();
        comp.onEditorChange(fn);
        expect(comp.callbacks.has(fn)).toBe(true);
    });

    it('fires callbacks when a change in the editor has been made to that instance of melody', () => {
        const comp = new Instance({ wrapperId: '123' });
        const fn = jest.fn();
        comp.onEditorChange(fn);
        comp.fireEditorChange('', { model: { id: '123' } });
        expect(fn).toHaveBeenCalled();
    });
});
