import { WithOptionalClassName } from '@melody/components/type';
import { Track } from '@redux/type';
import { MachineStates } from '@state-machine/type';
import { h } from 'preact';

interface CommonProps {
    index: number;
    track: Track;
    currentState: MachineStates;
    currentTrack: number;
}

interface Props extends CommonProps, WithOptionalClassName {
    renderInner: (props: CommonProps) => JSX.Element;
}

export default ({
    track,
    index,
    renderInner,
    currentState,
    currentTrack,
    className = '',
}: Props) => (
    <li class={className}>
        {renderInner({ track, currentState, currentTrack, index })}
    </li>
);
