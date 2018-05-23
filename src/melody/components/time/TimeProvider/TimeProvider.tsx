import { WithOptionalClassName } from '@components/type';
import { formatTime } from '@utils/index';
import { AnyComponent, Component, h } from 'preact';

interface Props extends WithOptionalClassName {
    currentTime: number;
    duration: number;
}

export default (WrappedComponent: AnyComponent<any, any>) =>
    (props: Props) => {
        const getTime = (time: number): string => {
            const { duration } = props;

            if (time > duration) {
                return formatTime(duration);
            }

            if (time < 0) {
                return formatTime(0);
            }

            return formatTime(time);
        }

        return (
            <WrappedComponent
                getTime={getTime}
                {...props}
            />
        );
    }