import CatalystButton from '@components/controls/CatalystButton';
import NextButton from '@components/controls/NextButton';
import PrevButton from '@components/controls/PrevButton';
import RepeatButton from '@components/controls/RepeatButton';
import ShuffleButton from '@components/controls/ShuffleButton';
import CurrentTrackArtist from '@components/CurrentTrackArtist/';
import CurrentTrackTitle from '@components/CurrentTrackTitle/';
import Dock from '@components/Dock/';
import Glider from '@components/Glider/';
import TimeElapsed from '@components/time/TimeElapsed';
import TimeLeft from '@components/time/TimeLeft';
import Tracklist from '@components/Tracklist/';
import TracklistItem from '@components/TracklistItem/';
import VolumeCtrl from '@components/VolumeCtrl/';
import { prefixClasses } from '@utils/index';
import { h } from 'preact';
const s = require('./style.scss');

import SimpleToolbar from '@views/SimpleToolbar/SimpleToolbar';

const btnClasses = prefixClasses('btn-primary-color btn-hover-color btn-width btn-space');
const trackClasses = prefixClasses('track-padding border-style border-width border-color');

const ItemInner = props => (
    <TracklistItem
        {...props}
        className={`${s.track} ${trackClasses} melody-tracklist__track`}
        classes={{
            controls: prefixClasses('btn-primary-color btn-hover-color btn-width btn-space'),
            info: s.track__info,
            separator: prefixClasses('separator'),
        }}
    />
);

export default () => {
    return (
        <div class="melody__viewContainer" data-melody-view="tracklist">
            <div class={`${s.preview} ${prefixClasses('preview-padding trackinfo-width trackinfo-order')}`}>
                <div class={s.preview__top}>
                    <div className={s.preview__trackInfo}>
                        <CurrentTrackTitle className={s.preview__title} />
                        <span className={prefixClasses('separator')} />
                        <CurrentTrackArtist className={s.preview__artist} />
                    </div>
                    <div class={`${s.controls} ${s['controls--right']} melody-controls-secondary`} >
                        <VolumeCtrl className={prefixClasses('btn-primary-color btn-width btn-space')} />
                        <ShuffleButton className={btnClasses} />
                        <RepeatButton className={btnClasses} />
                        <Dock className={prefixClasses('btn-space')} triggerClassName={btnClasses} />
                    </div>
                </div>
                <div class={s.preview__playback}>
                    <TimeElapsed className={`${s.preview__time} ${s['preview__time--left']}`} />
                    <Glider />
                    <TimeLeft className={`${s.preview__time} ${s['preview__time--right']}`} />
                </div>
            </div>
            <Tracklist
                className={s.tracklist}
                renderItem={ItemInner}
            />
        </div>
    );
};
