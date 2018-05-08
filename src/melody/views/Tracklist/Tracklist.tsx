import Tracklist from '@components/Tracklist/';
import TracklistItem from '@components/TracklistItem/';
import PlayTrackButton from '@melody/components/controls/PlayTrackButton';
import { Track } from '@redux/type';
import { MachineStates } from '@state-machine/type';
import { prefixClasses } from '@utils/index';
import { formatTime } from '@utils/index';
import { h } from 'preact';
const s = require('./style.scss');

const ItemButton = ({
    index,
    currentTrack,
    currentState,
}) => {
    const isCurrent = index === currentTrack;
    const isPlaying = currentState === 'playing';
    if (isCurrent && isPlaying) {
        return <div>lol pause button</div>;
    }
    return (
        <PlayTrackButton
            trackIndex={index}
            currentState={currentState}
        />
    );
};

interface ItemInnerProps {
    track: Track;
    currentState: MachineStates;
    index: number;
    currentTrack: number;
}

const ItemInner = ({
    track,
    currentState,
    index,
    currentTrack,
}: ItemInnerProps) => (
    <div>
        {ItemButton({ index, currentTrack, currentState })}
        <div className={s.trackitem__trackInfo}>
            <p>
                {track.media_details.title}
            </p>
            <span className={prefixClasses('separator')} />
            <p>
                {track.media_details.artist}
            </p>
        </div>
        <p className={s.trackitem__artist}>
            {track.media_details.album}
        </p>
    </div>
);

export default () => {
    return (
        <div class="melody__viewContainer" data-melody-view="tracklist">
            <div class={s.preview}>

            </div>
            <Tracklist
                className={s.tracklist}
                renderItem={props => (
                    <TracklistItem
                        {...props}
                        className={s.tracklist__item}
                        renderInner={props => <ItemInner {...props} />}
                    />
                )}
            />
        </div>
    );
};
