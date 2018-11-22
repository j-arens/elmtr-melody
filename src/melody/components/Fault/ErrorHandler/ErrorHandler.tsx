import { State } from '@redux/type';
import { h } from 'preact';
import collectErrors from '../Collector';
import ErrorRenderer from '../ErrorRenderer';

export interface DispatchProps {
    getState: any;
}

export interface OwnProps {
    children?: JSX.Element[];
    audioInterface: HTMLAudioElement;
}

type Props = DispatchProps & OwnProps;

export default ({ getState, audioInterface, children }: Props) => {
    const errors = collectErrors(getState(), audioInterface);
    if (errors.size) {
        return <ErrorRenderer errors={errors} />;
    }
    return (
        <div class="melody-errorhandler">
            {children}
        </div>
    );
};
