import { WithOptionalClassName } from '@components/type';
import { h } from 'preact';
import BufferMarkup from './svg/buffer';
import DownloadMarkup from './svg/download';
import ErrorMarkup from './svg/error';
import VolumeMarkup from './svg/fullVol';
import MinusMarkup from './svg/minus';
import NextMarkup from './svg/next';
import PauseMarkup from './svg/pause';
import PlayMarkup from './svg/play';
import PlusMarkup from './svg/plus';
import PrevMarkup from './svg/prev';
import RepeatMarkup from './svg/repeat';
import SettingsMarkup from './svg/settings';
import ShuffleMarkup from './svg/shuffle';

interface Props extends WithOptionalClassName {
    name: IconType;
}

type IconType =
    | 'shuffle'
    | 'prev'
    | 'play'
    | 'pause'
    | 'next'
    | 'repeat'
    | 'buffer'
    | 'error'
    | 'download'
    | 'plus'
    | 'minus'
    | 'settings'
    | 'volume';

const iconMap = {
    shuffle: ShuffleMarkup,
    prev: PrevMarkup,
    play: PlayMarkup,
    pause: PauseMarkup,
    next: NextMarkup,
    repeat: RepeatMarkup,
    buffer: BufferMarkup,
    error: ErrorMarkup,
    download: DownloadMarkup,
    plus: PlusMarkup,
    minus: MinusMarkup,
    settings: SettingsMarkup,
    volume: VolumeMarkup,
};

export default ({ name, className = '' }: Props) => (
    <svg
        class={className}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
    >
        {iconMap[name] || null}
    </svg>
);
