import Slideshow from '@components/Artwork/Slideshow/';
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
    <div class="melody__viewContainer" data-melody-view="slider">
        <div class={s.preview} data-melody-preview>
            <Slideshow className={s.preview__slideshow} />
            <div class={s.preview__header}>
                <VolumeCtrl />
                <Dock />
            </div>
            <div class={s.preview__marquee}>
                <TrackTitle className={s.preview__title} />
                <TrackArtist className={s.preview__artist} />
            </div>
            <div className={s.preview__glider}>
                <Glider />
            </div>
            <div class={s.preview__footer}>
                <TimeElapsed className={s.preview__time} />
                <TimeLeft className={s.preview__time} />
            </div>
        </div>
        <div class={`${s.controlbar} melody-control-bar`} data-melody-control-bar>
            <ShuffleButton className="melody-c-btn-primary-color melody-c-btn-hover-color" />
            <PrevButton className="melody-c-btn-primary-color melody-c-btn-hover-color" />
            <CatalystButton className="melody-c-btn-primary-color melody-c-btn-hover-color" />
            <NextButton className="melody-c-btn-primary-color melody-c-btn-hover-color" />
            <RepeatButton className="melody-c-btn-primary-color melody-c-btn-hover-color" />
        </div>
    </div>
);
