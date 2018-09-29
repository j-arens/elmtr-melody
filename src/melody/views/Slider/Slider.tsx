import Slideshow from '@components/Artwork/Slideshow/';
import CatalystButton from '@components/controls/CatalystButton/';
import NextButton from '@components/controls/NextButton/';
import PrevButton from '@components/controls/PrevButton/';
import RepeatButton from '@components/controls/RepeatButton/';
import ShuffleButton from '@components/controls/ShuffleButton/';
import CurrentTrackArtist from '@components/CurrentTrackArtist/';
import CurrentTrackTitle from '@components/CurrentTrackTitle/';
import Dock from '@components/DockControls/Dock/index';
import DockToggle from '@components/DockControls/toggle/';
import Scrubber from '@components/Scrubber/';
import CurrentTimeElapsed from '@components/time/CurrentTimeElapsed';
import CurrentTimeLeft from '@components/time/CurrentTimeLeft';
import VolumeCtrl from '@components/VolumeCtrl/';
import { cySelector } from '@utils/index';
import { h } from 'preact';
import * as classes from './classes';
const s = require('./style.scss');

export default () => (
    <div class="melody__viewContainer">
        <div class={`${s.preview} ${classes.preview}`} {...cySelector('preview')}>
            <Slideshow
                className={`${s.preview__slideshow} ${classes.slideshow}`}
                artworkClassName={classes.artwork}
            />
            <div class={s.preview__header}>
                <VolumeCtrl className={classes.volume} />
                <DockToggle className={classes.dockToggle} />
            </div>
            <div class={s.preview__marquee}>
                <CurrentTrackTitle className={classes.title} />
                <CurrentTrackArtist className={classes.artist} />
            </div>
            <div className={s.preview__glider}>
                <Scrubber />
            </div>
            <div class={s.preview__footer}>
                <CurrentTimeElapsed className={classes.time} />
                <CurrentTimeLeft className={classes.time} />
            </div>
        </div>
        <div
            class={`${s.controlbar} ${classes.controlBar} melody-control-bar`}
            {...cySelector('controlbar')}
        >
            <ShuffleButton className={classes.controls} />
            <PrevButton className={classes.controls} />
            <CatalystButton className={classes.controls} />
            <NextButton className={classes.controls} />
            <RepeatButton className={classes.controls} />
        </div>
        <Dock />
    </div>
);
