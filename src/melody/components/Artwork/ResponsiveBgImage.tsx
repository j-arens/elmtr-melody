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

    setArtworkSource = throttle(() => {
        const { artwork: { sizes, source_url } } = this.props;
        const { innerWidth } = window;
        const sorted = sizes.sort(this.makeSortComparator(innerWidth));

        if (sorted.length) {
            this.setState({ artworkSource: sorted[0].uri });
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
