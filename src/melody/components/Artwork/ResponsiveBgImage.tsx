import { TrackSize } from '@adapter/type';
import { WithOptionalClassName } from '@components/type';
import { TrackArtwork } from '@redux/type';
import { getContextualTrackSizes } from '@utils/index';
import { Component, h } from 'preact';
const throttle = require('lodash.throttle');

interface Props extends WithOptionalClassName {
    artwork: TrackArtwork;
}

interface State {
    artworkSource: string;
}

export default class extends Component<Props, State> {
    state = {
        artworkSource: '',
    };

    componentDidMount() {
        this.setArtworkSource();
        window.addEventListener('resize', this.setArtworkSource);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.setArtworkSource);
    }

    setArtworkSource = throttle(() => {
        const { artwork: { sizes, source_url } } = this.props;
        const relevantSizes = getContextualTrackSizes(sizes);

        if (relevantSizes.length) {
            this.setState({ artworkSource: relevantSizes[0].uri });
            return;
        }

        this.setState({ artworkSource: source_url });
    }, 1000);

    render({ className = '' }, { artworkSource }) {
        return (
            <figure
                class={className}
                data-melody-artwork
                style={{ backgroundImage: `url(${artworkSource})` }}
            />
        );
    }
}
