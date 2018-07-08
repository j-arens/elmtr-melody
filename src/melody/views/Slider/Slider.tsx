import Slideshow from '@components/Artwork/Slideshow/';
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

const volClasses = prefixClasses('vol-primary-color vol-hover-color vol-width');
const btnClasses = prefixClasses('btn-primary-color btn-hover-color btn-space');
const previewClasses = prefixClasses('preview-bg preview-min-height preview-padding');
const slideshowClasses = prefixClasses('slider-transition slider-timing');
const artworkClasses = prefixClasses('artwork-size artwork-repeat artwork-position artwork-attachment image-filters');
const titleClasses = prefixClasses('title-font title-shadow title-color');
const artistClasses = prefixClasses('artist-font artist-shadow artist-color');
const timeClasses = prefixClasses('time-font time-shadow time-color');

export default () => (
    <div class="melody__viewContainer" data-melody-view="slider">
        <div class={`${s.preview} ${previewClasses}`}>
            <Slideshow
                className={`${s.preview__slideshow} ${slideshowClasses}`}
                artworkClassName={artworkClasses}
            />
            <div class={s.preview__header}>
                <VolumeCtrl className={volClasses} />
                <Dock />
            </div>
            <div class={s.preview__marquee}>
                <CurrentTrackTitle className={`${s.preview__title} ${titleClasses}`} />
                <CurrentTrackArtist className={`${s.preview__artist} ${artistClasses}`} />
            </div>
            <div className={s.preview__glider}>
                <Glider />
            </div>
            <div class={s.preview__footer}>
                <CurrentTimeElapsed className={`${s.preview__time} ${timeClasses}`} />
                <CurrentTimeLeft className={`${s.preview__time} ${timeClasses}`} />
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
