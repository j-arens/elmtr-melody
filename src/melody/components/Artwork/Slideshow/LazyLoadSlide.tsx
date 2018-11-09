import { WithOptionalClassName } from '@components/type';
import { h } from 'preact';

interface Props extends WithOptionalClassName {
    currentTrack: number;
    totalTracks: number;
    index: number;
    className?: string;
    children?: JSX.Element[];
}

const EmptySlide = (className: string): JSX.Element =>
    <li class={className} />;

const LoadedSlide = (
    className: string,
    children: JSX.Element[],
): JSX.Element => (
    <li class={className}>
        {children}
    </li>
);

export default ({
    currentTrack,
    totalTracks,
    index,
    className = '',
    children,
}: Props) => {
    const loadLast = currentTrack === 0 && index === (totalTracks - 1);
    const loadFirst = currentTrack === (totalTracks - 1) && index === 0;
    const aboveRange = index > (currentTrack + 1);
    const belowRange = index < (currentTrack - 1);

    if (loadLast || loadFirst) {
        return LoadedSlide(className, children);
    }

    if (aboveRange || belowRange) {
        return EmptySlide(className);
    }

    return LoadedSlide(className, children);
};
