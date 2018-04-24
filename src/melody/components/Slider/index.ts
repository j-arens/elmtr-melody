import { connect } from 'preact-redux';
import { State } from '@redux/type';
import ArtworkSlider from './Slider';

// const getPreviousTrack = (state: State) => {
//     const { tracks, currentTrack } = state;

//     if (!tracks.length) {
//         return tracks[currentTrack];
//     }

//     if (currentTrack === 0) {
//         return tracks[tracks.length - 1];
//     }

//     return tracks[currentTrack - 1];
// }

// const getNextTrack = (state: State) => {
//     const { tracks, currentTrack } = state;

//     if (!tracks.length) {
//         return tracks[currentTrack];
//     }

//     if (currentTrack === (tracks.length - 1)) {
//         return tracks[0];
//     }

//     return tracks[currentTrack + 1];
// }

const mapStateToProps = (state: State) => ({
    // tracks: [
    //     getPreviousTrack(state),
    //     state.tracks[state.currentTrack],
    //     getNextTrack(state),
    // ],
    tracks: state.tracks,
    currentTrack: state.currentTrack,
});

export default connect(mapStateToProps)(ArtworkSlider);
