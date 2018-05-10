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

const btnClasses = prefixClasses('btn-primary-color btn-hover-color btn-width btn-space');
const trackClasses = prefixClasses('track-padding border-style border-width border-color');

const ItemInner = props => (
    <TracklistItem
        {...props}
        className={`${s.track} ${trackClasses} melody-tracklist__track`}
        classes={{
            controls: prefixClasses('btn-primary-color btn-hover-color btn-width btn-space'),
            info: s.track__info,
            separator: prefixClasses('separator'),
        }}
    />
);

export default () => {
    return (
        <div class="melody__viewContainer" data-melody-view="tracklist">
            <div class={`${s.preview} ${prefixClasses('preview-padding')}`}>
                <div class={s.preview__top}>
                    <div class={s.preview__marquee}>
                        <CurrentTrackTitle />
                        <CurrentTrackArtist />
                    </div>
                    <div class={`${s.preview__controls} melody-controls-secondary`}>
                        <VolumeCtrl className={btnClasses} />
                        <Dock triggerClassName={btnClasses} />
                    </div>
                </div>
                <div class={s.preview__scrubber}>
                    <TimeElapsed />
                    <Glider />
                    <TimeLeft />
                </div>
                <div class={`${s.preview__controlbar} melody-controls-playback`}>
                    <ShuffleButton className={btnClasses} />
                    <PrevButton className={btnClasses} />
                    <CatalystButton className={btnClasses} />
                    <NextButton className={btnClasses} />
                    <RepeatButton className={btnClasses} />
                </div>
            </div>
            <Tracklist
                className={s.tracklist}
                renderItem={ItemInner}
            />
        </div>
    );
};
