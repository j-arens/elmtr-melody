import PauseButton from '@components/controls/PauseButton';
import PlayTrackButton from '@components/controls/PlayTrackButton';
import { WithOptionalClassName } from '@melody/components/type';
import { Track } from '@redux/type';
import { MachineStates } from '@state-machine/type';
import { h } from 'preact';

interface Props extends WithOptionalClassName {
    index: number;
    track: Track;
    currentState: MachineStates;
    currentTrack: number;
    classes?: {
        controls?: string;
        info?: string;
        title?: string;
        separator?: string;
        artist?: string;
        album?: string;
    };
}

const classesDefault = {
    controls: '',
    info: '',
    title: '',
    separator: '',
    artist: '',
    album: '',
};

export default ({
    track,
    index,
    currentState,
    currentTrack,
    classes = classesDefault,
    className = '',
}: Props) => {
    const isCurrent = index === currentTrack;
    const isPlaying = currentState === 'playing';
    const { media_details: { title, artist, album } } = track;
    return (
        <li class={className}>
            {isCurrent && isPlaying ?
                <PauseButton className={classes.controls} />
                :
                <PlayTrackButton
                    className={classes.controls}
                    trackIndex={index}
                    currentState={currentState}
                />
            }
            <div class={classes.info}>
                <p class={classes.title}>{title}</p>
                <span class={classes.separator} />
                <p class={classes.artist}>{artist}</p>
            </div>
            <p class={classes.album}>{album}</p>
        </li>
    );
};
