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
        <div class={`${s.controls} ${s['controls--left']} melody-controls-left`} >
            <PrevButton className="melody-c-btn-primary-color melody-c-btn-hover-color" />
            <CatalystButton className="melody-c-btn-primary-color melody-c-btn-hover-color" />
            <NextButton className="melody-c-btn-primary-color melody-c-btn-hover-color" />
        </div>
        <div class={s.preview}>
            <div class={s.preview__wrap}>
                <TimeElapsed className={s.preview__time} />
                <div className={s.preview__trackInfo}>
                    <TrackTitle className={s.preview__title} />
                    <span data-melody-seperator>-</span>
                    <TrackArtist className={s.preview__artist} />
                </div>
                <TimeLeft className={s.preview__time} />
            </div>
            <Glider />
        </div>
        <div class={`${s.controls} ${s['controls--right']} melody-controls-right`} >
            <VolumeCtrl className="melody-c-btn-primary-color" />
            <ShuffleButton className="melody-c-btn-primary-color melody-c-btn-hover-color melody-c-btn-on-color" />
            <RepeatButton className="melody-c-btn-primary-color melody-c-btn-hover-color melody-c-btn-on-color" />
            <Dock />
        </div>
    </div>
);
