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
import { cySelector, prefixClasses } from '@utils/index';
import { h } from 'preact';
import * as classes from './classes';
const s = require('./style.scss');

export default () => (
    <div
        class={`melody__viewContainer ${s.toolbar} ${classes.toolbar}`}
        {...cySelector('toolbar')}
    >
        <div class={`${s.controls} ${s['controls--left']} melody-controls-primary`} >
            <PrevButton className={classes.primaryBtns} />
            <CatalystButton className={classes.primaryBtns} />
            <NextButton className={classes.primaryBtns} />
        </div>
        <div
            class={`${s.preview} ${classes.trackInfo}`}
            {...cySelector('track-info')}
        >
            <div
                class={`${s.preview__wrap} ${classes.trackInfoInner}`}
                {...cySelector('inner-track-info')}
            >
                <CurrentTimeElapsed
                    className={`${s.preview__time} ${s['preview__time--left']} ${classes.time}`}
                />
                <div className={s.preview__trackInfo}>
                    <CurrentTrackTitle className={`${s.preview__title} ${classes.title}`} />
                    <span
                        className={classes.seperator}
                        {...cySelector('seperator')}
                    />
                    <CurrentTrackArtist className={`${s.preview__artist} ${classes.artist}`} />
                </div>
                <CurrentTimeLeft
                    className={`${s.preview__time} ${s['preview__time--right']} ${classes.time}`}
                />
            </div>
            <Glider />
        </div>
        <div class={`${s.controls} ${s['controls--right']} melody-controls-secondary`} >
            <VolumeCtrl className={classes.volume} />
            <ShuffleButton className={classes.shuffleRepeatBtns} />
            <RepeatButton className={classes.shuffleRepeatBtns} />
            <DockToggle className={classes.dockToggle} />
        </div>
        <Dock />
    </div>
);
