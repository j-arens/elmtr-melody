import Slideshow from '@components/Artwork/Slideshow/';
import CatalystButton from '@components/controls/CatalystButton';
import NextButton from '@components/controls/NextButton';
import PrevButton from '@components/controls/PrevButton';
import RepeatButton from '@components/controls/RepeatButton';
import ShuffleButton from '@components/controls/ShuffleButton';
import CurrentTrackArtist from '@components/CurrentTrackArtist';
import CurrentTrackTitle from '@components/CurrentTrackTitle/';
import Dock from '@components/Dock';
import Glider from '@components/Glider/';
import TimeElapsed from '@components/time/TimeElapsed';
import TimeLeft from '@components/time/TimeLeft';
import VolumeCtrl from '@components/VolumeCtrl/';
import { prefixClasses } from '@utils/index';
import { h } from 'preact';
const s = require('./style.scss');

const volClasses = prefixClasses('vol-primary-color vol-hover-color vol-width');
const btnClasses = prefixClasses('btn-primary-color btn-hover-color btn-space');

export default () => (
    <div class="melody__viewContainer" data-melody-view="slider">
        <div class={s.preview} data-melody-preview>
            <Slideshow className={s.preview__slideshow} />
            <div class={s.preview__header}>
                <VolumeCtrl className={volClasses} />
                <Dock />
            </div>
            <div class={s.preview__marquee}>
                <CurrentTrackTitle className={s.preview__title} />
                <CurrentTrackArtist className={s.preview__artist} />
            </div>
            <div className={s.preview__glider}>
                <Glider />
            </div>
            <div class={s.preview__footer}>
                <TimeElapsed className={s.preview__time} />
                <TimeLeft className={s.preview__time} />
            </div>
        </div>
        <div class={`${s.controlbar} ${prefixClasses('controlbar')} melody-control-bar`}>
            <ShuffleButton className={btnClasses} />
            <PrevButton className={btnClasses} />
            <CatalystButton className={btnClasses} />
            <NextButton className={btnClasses} />
            <RepeatButton className={btnClasses} />
        </div>
    </div>
);
