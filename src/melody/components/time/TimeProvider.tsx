import { WithOptionalClassName } from '@components/type';
import { State } from '@redux/type';
import { formatTime } from '@utils/index';
import { AnyComponent, Component, h } from 'preact';
import { connect } from 'preact-redux';

const mapStateToProps = (state: State) => {
    const { currentTrack, tracks, currentTime } = state;
    const activeTrack = tracks[currentTrack];
    return {
        currentTime,
        duration: activeTrack.media_details.length,
    };
};

interface Props extends WithOptionalClassName {
    currentTime: number;
    duration: number;
}

export default (WrappedComponent: AnyComponent<any, any>) => {
    class Wrapper extends Component<Props, {}> {
        getTime = (time: number): string => {
            const { duration } = this.props;

            if (time > duration) {
                return formatTime(duration);
            }

            if (time < 0) {
                return formatTime(0);
            }

            return formatTime(time);
        }

        render() {
            const { currentTime, duration } = this.props;
            return (
                <WrappedComponent
                    currentTime={currentTime}
                    duration={duration}
                    getTime={this.getTime}
                    {...this.props}
                />
            );
        }
    }

    return connect(mapStateToProps)(Wrapper);
};
