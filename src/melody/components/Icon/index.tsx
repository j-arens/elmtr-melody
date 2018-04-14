import { WithOptionalClassName } from '@components/type';
import { h } from 'preact';
import BufferMarkup from './svg/buffer';
import DownloadMarkup from './svg/download';
import ErrorMarkup from './svg/error';
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
    | 'settings';

export default ({ name, className = '' }: Props) => {
    const getMarkup = (icon: IconType): JSX.Element => {
        switch (icon) {
            case 'shuffle': {
                return ShuffleMarkup;
            }
            case 'prev': {
                return PrevMarkup;
            }
            case 'play': {
                return PlayMarkup;
            }
            case 'pause': {
                return PauseMarkup;
            }
            case 'next': {
                return NextMarkup;
            }
            case 'repeat': {
                return RepeatMarkup;
            }
            case 'buffer': {
                return BufferMarkup;
            }
            case 'error': {
                return ErrorMarkup;
            }
            case 'download': {
                return DownloadMarkup;
            }
            case 'plus': {
                return PlusMarkup;
            }
            case 'minus': {
                return MinusMarkup;
            }
            case 'settings': {
                return SettingsMarkup;
            }
        }
    };

    return (
        <svg
            class={className}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
        >
            {getMarkup(name)}
        </svg>
    );
};
