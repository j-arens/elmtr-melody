import CatalystButton from '@components/controls/CatalystButton/';
import NextButton from '@components/controls/NextButton/';
import PrevButton from '@components/controls/PrevButton/';
import RepeatButton from '@components/controls/RepeatButton/';
import ShuffleButton from '@components/controls/ShuffleButton/';
import CurrentTrackArtist from '@components/CurrentTrackArtist/';
import CurrentTrackTitle from '@components/CurrentTrackTitle/';
import Dock from '@components/Dock';
import Glider from '@components/Glider/';
import CurrentTimeElapsed from '@components/time/CurrentTimeElapsed';
import CurrentTimeLeft from '@components/time/CurrentTimeLeft';
import VolumeCtrl from '@components/VolumeCtrl/';
import { prefixClasses } from '@utils/index';
import { h } from 'preact';
const s = require('./style.scss');

const leftBtnClasses = prefixClasses('btn-primary-color btn-hover-color btn-width btn-space');
const shuffleRepeatClasses = prefixClasses('btn-primary-color btn-hover-color btn-on-color btn-width btn-space');
const dockClasses = prefixClasses('btn-primary-color btn-hover-color btn-width');
const titleClasses = prefixClasses('title-font title-shadow title-color');
const artistClasses = prefixClasses('artist-font artist-shadow artist-color');
const timeClasses = prefixClasses('time-font time-shadow time-color');

export default () => (
    <div class={`melody__viewContainer ${s.toolbar} ${prefixClasses('toolbar')}`}>
        <div class={`${s.controls} ${s['controls--left']} melody-controls-primary`} >
            <PrevButton className={leftBtnClasses} />
            <CatalystButton className={leftBtnClasses} />
            <NextButton className={leftBtnClasses} />
        </div>
        <div class={`${s.preview} ${prefixClasses('preview-padding trackinfo-width trackinfo-order')}`}>
            <div class={`${s.preview__wrap} ${prefixClasses('trackinfo-margin')}`}>
                <CurrentTimeElapsed
                    className={`${s.preview__time} ${s['preview__time--left']} ${timeClasses}`}
                />
                <div className={s.preview__trackInfo}>
                    <CurrentTrackTitle className={`${s.preview__title} ${titleClasses}`} />
                    <span className={prefixClasses('separator')} />
                    <CurrentTrackArtist className={`${s.preview__artist} ${artistClasses}`} />
                </div>
                <CurrentTimeLeft
                    className={`${s.preview__time} ${s['preview__time--right']} ${timeClasses}`}
                />
            </div>
            <Glider />
        </div>
        <div class={`${s.controls} ${s['controls--right']} melody-controls-secondary`} >
            <VolumeCtrl className={prefixClasses('btn-primary-color btn-width btn-space')} />
            <ShuffleButton className={shuffleRepeatClasses} />
            <RepeatButton className={shuffleRepeatClasses} />
            <Dock className={prefixClasses('btn-space')} triggerClassName={dockClasses} />
        </div>
    </div>
);
