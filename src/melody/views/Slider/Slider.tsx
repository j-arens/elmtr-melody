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
import Glider from '@components/Glider/';
import CurrentTimeElapsed from '@components/time/CurrentTimeElapsed';
import CurrentTimeLeft from '@components/time/CurrentTimeLeft';
import VolumeCtrl from '@components/VolumeCtrl/';
import { prefixClasses } from '@utils/index';
import { h } from 'preact';
import { MELODY_CUSTOMIZATION_CLASS_PREFIX as c_prefix } from '../../constants';
const s = require('./style.scss');

const volClasses = prefixClasses(
    c_prefix,
    'vol-primary-color vol-hover-color vol-width',
);

const btnClasses = prefixClasses(
    c_prefix,
    'btn-primary-color btn-hover-color btn-space',
);

const previewClasses = prefixClasses(
    c_prefix,
    'preview-bg preview-min-height preview-padding',
);

const slideshowClasses = prefixClasses(
    c_prefix,
    'slider-transition slider-timing',
);

const artworkClasses = prefixClasses(
    c_prefix,
    'artwork-size artwork-repeat artwork-position artwork-attachment image-filters',
);

const titleClasses = prefixClasses(
    c_prefix,
    'title-font title-shadow title-color',
);

const artistClasses = prefixClasses(
    c_prefix,
    'artist-font artist-shadow artist-color',
);

const timeClasses = prefixClasses(
    c_prefix,
    'time-font time-shadow time-color',
);

const dockToggleClasses = prefixClasses(
    c_prefix,
    'dock-toggle-color dock-toggle-size',
);

export default () => (
    <div class="melody__viewContainer">
        <div class={`${s.preview} ${previewClasses}`}>
            <Slideshow
                className={`${s.preview__slideshow} ${slideshowClasses}`}
                artworkClassName={artworkClasses}
            />
            <div class={s.preview__header}>
                <VolumeCtrl className={volClasses} />
                <DockToggle className={dockToggleClasses} />
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
        <div class={`${s.controlbar} ${prefixClasses(c_prefix, 'controlbar')} melody-control-bar`}>
            <ShuffleButton className={btnClasses} />
            <PrevButton className={btnClasses} />
            <CatalystButton className={btnClasses} />
            <NextButton className={btnClasses} />
            <RepeatButton className={btnClasses} />
        </div>
        <Dock />
    </div>
);
