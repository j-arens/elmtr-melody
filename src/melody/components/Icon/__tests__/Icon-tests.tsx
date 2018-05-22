import { render } from 'preact-render-to-string';
import { h } from 'preact';
import Icon from '../';

describe('Icon', () => {
    it('renders', () => {
        const component = render(
            <Icon className="jet-black" name="" />
        );
        expect(component).toMatchSnapshot();
    });

    it('renders shuffle icon', () => {
        const component = render(
            <Icon className="jet-black" name="shuffle" />
        );
        expect(component).toMatchSnapshot();
    });

    it('renders prev icon', () => {
        const component = render(
            <Icon className="jet-black" name="prev" />
        );
        expect(component).toMatchSnapshot();
    });

    it('renders play icon', () => {
        const component = render(
            <Icon className="jet-black" name="play" />
        );
        expect(component).toMatchSnapshot();
    });

    it('renders pause icon', () => {
        const component = render(
            <Icon className="jet-black" name="pause" />
        );
        expect(component).toMatchSnapshot();
    });

    it('renders next icon', () => {
        const component = render(
            <Icon className="jet-black" name="next" />
        );
        expect(component).toMatchSnapshot();
    });

    it('renders repeat icon', () => {
        const component = render(
            <Icon className="jet-black" name="repeat" />
        );
        expect(component).toMatchSnapshot();
    });

    it('renders buffer icon', () => {
        const component = render(
            <Icon className="jet-black" name="buffer" />
        );
        expect(component).toMatchSnapshot();
    });

    it('renders error icon', () => {
        const component = render(
            <Icon className="jet-black" name="error" />
        );
        expect(component).toMatchSnapshot();
    });

    it('renders download icon', () => {
        const component = render(
            <Icon className="jet-black" name="download" />
        );
        expect(component).toMatchSnapshot();
    });

    it('renders plus icon', () => {
        const component = render(
            <Icon className="jet-black" name="plus" />
        );
        expect(component).toMatchSnapshot();
    });

    it('renders minus icon', () => {
        const component = render(
            <Icon className="jet-black" name="minus" />
        );
        expect(component).toMatchSnapshot();
    });

    it('renders settings icon', () => {
        const component = render(
            <Icon className="jet-black" name="settings" />
        );
        expect(component).toMatchSnapshot();
    });
});
