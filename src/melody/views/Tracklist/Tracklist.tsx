import CatalystButton from '@components/controls/CatalystButton';
import NextButton from '@components/controls/NextButton';
import PrevButton from '@components/controls/PrevButton';
import RepeatButton from '@components/controls/RepeatButton';
import ShuffleButton from '@components/controls/ShuffleButton';
import CurrentTrackArtist from '@components/CurrentTrackArtist/';
import CurrentTrackTitle from '@components/CurrentTrackTitle/';
import Dock from '@components/Dock/';
import Glider from '@components/Glider/';
import TimeElapsed from '@components/time/TimeElapsed';
import TimeLeft from '@components/time/TimeLeft';
import Tracklist from '@components/Tracklist/';
import TracklistItem from '@components/TracklistItem/';
import VolumeCtrl from '@components/VolumeCtrl/';
import { prefixClasses } from '@utils/index';
import { h } from 'preact';
const s = require('./style.scss');

const ItemInner = props => (
    <TracklistItem
        {...props}
        className="lol"
        classes={{}}
    />
);

export default () => {
    return (
        <div style={{ background: 'orange' }} class="melody__viewContainer" data-melody-view="tracklist">
            <div class={s.preview}>
                <div class={s.preview__top}>
                    <div class={s.preview__marquee}>
                        <CurrentTrackTitle />
                        <CurrentTrackArtist />
                    </div>
                    <div class={s.preview__controls}>
                        <VolumeCtrl />
                        <Dock />
                    </div>
                </div>
                <div class={s.preview__scrubber}>
                    <TimeElapsed />
                    <Glider />
                    <TimeLeft />
                </div>
                <div class={s.preview__controlbar}>
                    <ShuffleButton />
                    <PrevButton />
                    <CatalystButton />
                    <NextButton />
                    <RepeatButton />
                </div>
            </div>
            <Tracklist
                className={s.tracklist}
                renderItem={ItemInner}
            />
        </div>
    );
};
