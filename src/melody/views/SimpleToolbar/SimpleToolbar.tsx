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
import { prefixClasses } from '@utils/index';
import { h } from 'preact';
const s = require('./style.scss');

export default () => (
    <div class="melody__viewContainer" data-melody-view="simple-toolbar">
        <div class={`${s.controls} ${s['controls--left']} melody-controls-left`} >
            <PrevButton
                className={prefixClasses('btn-primary-color btn-hover-color btn-width btn-space')}
            />
            <CatalystButton
                className={prefixClasses('btn-primary-color btn-hover-color btn-width btn-space')}
            />
            <NextButton
                className={prefixClasses('btn-primary-color btn-hover-color btn-width btn-space')}
            />
        </div>
        <div class={s.preview}>
            <div class={s.preview__wrap}>
                <TimeElapsed className={s.preview__time} />
                <div className={s.preview__trackInfo}>
                    <TrackTitle className={s.preview__title} />
                    <span className={prefixClasses('separator')} />
                    <TrackArtist className={s.preview__artist} />
                </div>
                <TimeLeft className={s.preview__time} />
            </div>
            <Glider />
        </div>
        <div class={`${s.controls} ${s['controls--right']} melody-controls-right`} >
            <VolumeCtrl
                className={prefixClasses('btn-primary-color btn-width btn-space')}
            />
            <ShuffleButton
                className={prefixClasses('btn-primary-color btn-hover-color btn-on-color btn-width btn-space')}
            />
            <RepeatButton
                className={prefixClasses('btn-primary-color btn-hover-color btn-on-color btn-width btn-space')}
            />
            <Dock
                triggerClassName={prefixClasses('btn-primary-color btn-hover-color btn-width btn-space')}
            />
        </div>
    </div>
);
