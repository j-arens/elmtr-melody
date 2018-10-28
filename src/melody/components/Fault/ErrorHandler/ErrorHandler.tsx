import { State } from '@redux/type';
import { h } from 'preact';
import collectErrors from '../Collector';
import ErrorRenderer from '../ErrorRenderer';

export interface StateProps {
    state: State;
}

export interface OwnProps {
    children?: JSX.Element[];
    audioInterface: HTMLAudioElement;
}

type Props = StateProps & OwnProps;

export default ({ state, audioInterface, children }: Props) => {
    const errors = collectErrors(state, audioInterface);
    if (errors.size) {
        return <ErrorRenderer errors={errors} />;
    }
    return (
        <div class="melody-errorhandler">
            {children}
        </div>
    );
};
