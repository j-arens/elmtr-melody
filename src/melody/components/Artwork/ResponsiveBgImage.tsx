import { TrackSize } from '@adapter/type';
import { WithOptionalClassName } from '@components/type';
import { TrackArtwork } from '@redux/type';
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

    makeSortComparator = (innerWidth: number) => (a: TrackSize, b: TrackSize): number => {
        if (a.width === innerWidth || b.width === innerWidth) {
            return 0;
        }

        return (innerWidth - a.width) < (innerWidth - b.width) ? -1 : 1;
    }

    getRelevantSizes(): TrackSize[] {
        const { artwork: { sizes } } = this.props;
        const { innerWidth } = window;
        return sizes
            .filter(size => size.width < innerWidth)
            .sort(this.makeSortComparator(innerWidth));
    }

    setArtworkSource = throttle(() => {
        const { artwork: { source_url } } = this.props;
        const relevantSizes = this.getRelevantSizes();

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
