import CatalystButton from '@components/controls/CatalystButton/';
import NextButton from '@components/controls/NextButton/';
import PrevButton from '@components/controls/PrevButton/';
import RepeatButton from '@components/controls/RepeatButton/';
import ShuffleButton from '@components/controls/ShuffleButton/';
import CurrentTrackArtist from '@components/CurrentTrackArtist/';
import CurrentTrackTitle from '@components/CurrentTrackTitle/';
import Dock from '@components/DockControls/Dock/index';
import DockToggle from '@components/DockControls/toggle/';
import Glider from '@components/Glider/';
import CurrentTimeElapsed from '@components/time/CurrentTimeElapsed';
import CurrentTimeLeft from '@components/time/CurrentTimeLeft';
import VolumeCtrl from '@components/VolumeCtrl/';
import { prefixClasses } from '@utils/index';
import { MELODY_CUSTOMIZATION_CLASS_PREFIX as c_prefix } from '../../constants';
import { h } from 'preact';
const s = require('./style.scss');

const leftBtnClasses = prefixClasses(c_prefix, 'btn-primary-color btn-hover-color btn-width btn-space');
const shuffleRepeatClasses = prefixClasses(c_prefix, 'btn-primary-color btn-hover-color btn-on-color btn-width btn-space');
const dockToggleClasses = prefixClasses(c_prefix, 'btn-primary-color btn-hover-color btn-width');
const titleClasses = prefixClasses(c_prefix, 'title-font title-shadow title-color');
const artistClasses = prefixClasses(c_prefix, 'artist-font artist-shadow artist-color');
const timeClasses = prefixClasses(c_prefix, 'time-font time-shadow time-color');

export default () => (
    <div class={`melody__viewContainer ${s.toolbar} ${prefixClasses(c_prefix, 'toolbar')}`}>
        <div class={`${s.controls} ${s['controls--left']} melody-controls-primary`} >
            <PrevButton className={leftBtnClasses} />
            <CatalystButton className={leftBtnClasses} />
            <NextButton className={leftBtnClasses} />
        </div>
        <div class={`${s.preview} ${prefixClasses(c_prefix, 'preview-padding trackinfo-width trackinfo-order')}`}>
            <div class={`${s.preview__wrap} ${prefixClasses(c_prefix, 'trackinfo-margin')}`}>
                <CurrentTimeElapsed
                    className={`${s.preview__time} ${s['preview__time--left']} ${timeClasses}`}
                />
                <div className={s.preview__trackInfo}>
                    <CurrentTrackTitle className={`${s.preview__title} ${titleClasses}`} />
                    <span className={prefixClasses(c_prefix, 'separator')} />
                    <CurrentTrackArtist className={`${s.preview__artist} ${artistClasses}`} />
                </div>
                <CurrentTimeLeft
                    className={`${s.preview__time} ${s['preview__time--right']} ${timeClasses}`}
                />
            </div>
            <Glider />
        </div>
        <div class={`${s.controls} ${s['controls--right']} melody-controls-secondary`} >
            <VolumeCtrl className={prefixClasses(c_prefix, 'btn-primary-color btn-width btn-space')} />
            <ShuffleButton className={shuffleRepeatClasses} />
            <RepeatButton className={shuffleRepeatClasses} />
            <DockToggle className={dockToggleClasses} />
        </div>
        <Dock />
    </div>
);
