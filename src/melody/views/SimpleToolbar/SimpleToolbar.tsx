import CatalystButton from '@components/controls/CatalystButton';
import NextButton from '@components/controls/NextButton';
import PrevButton from '@components/controls/PrevButton';
import RepeatButton from '@components/controls/RepeatButton';
import ShuffleButton from '@components/controls/ShuffleButton';
import Dock from '@components/Dock';
import Glider from '@components/Glider/';
import TimeElapsed from '@components/time/TimeElapsed';
import TimeLeft from '@components/time/TimeLeft';
import TrackArtist from '@components/TrackArtist';
import TrackTitle from '@components/TrackTitle/';
import VolumeCtrl from '@components/VolumeCtrl/';
import { h } from 'preact';
const s = require('./style.scss');

export default () => (
    <div class="melody__viewContainer" data-melody-view="simple-toolbar">
        <div class={s.leftControls}>
            <PrevButton />
            <CatalystButton />
            <NextButton />
        </div>
        <div class={s.preview}>
            <div class={s.marquee}>
                <TimeElapsed className={s.preview__time} />
                <div className={s.marquee__trackInfo}>
                    <TrackTitle /> - <TrackArtist />
                </div>
                <TimeLeft className={s.preview__time} />
            </div>
            <div class={s.scrubber}>
                <Glider />
            </div>
        </div>
        <div class={s.rightControls}>
            <VolumeCtrl />
            <ShuffleButton />
            <RepeatButton />
            <Dock />
        </div>
    </div>
);
